const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userValidation = require("../validation/validation");
const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client(process.env.APP_CLIENT_ID);
const _ = require("lodash");
const nodemailer = require("nodemailer");
const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;
const refreshtoken = process.env.REFRESH_TOKEN;
const OAuth2_client = new OAuth2(process.env.CLIENT_ID, process.env.CLIENT_SECRET, process.env.REDIRECT_URI);
OAuth2_client.setCredentials({ refresh_token: refreshtoken });



/*********************************** INSCRIPTION ********************************/
exports.signUp = async (req, res) => {
    const { email, password } = req.body;
    const accessToken = await OAuth2_client.getAccessToken();

    // Validation des données avec Joi
    const { body } = req;
    const { error } = userValidation(body);
    if (error) return res.status(400).json(error.details[0].message);

    const isToken = jwt.sign({ email }, process.env.JWT_ACC_ACTIVATE, {
        expiresIn: "20m",
    });

    // Cryptage MDP
    const passCrypt = await bcrypt.hash(password, 10);
    const nUser = new User({
        email,
        password: passCrypt,
        role: "635f892d714c5654281d66c4",
        isValidate: false,
        avatar: "./src/app/assets/images/avatar/Avatar0.jpg",
        isToken: isToken,
    });
    try {
        nUser.save();

        //Création du transporteur du nodemailer
        const mailTransporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                type: "OAuth2",
                user: process.env.EMAIL_USER,
                clientId: process.env.CLIENT_ID,
                clientSecret: process.env.CLIENT_SECRET,
                refreshToken: refreshtoken,
                accessToken: accessToken,
            },
        });

        const dataObj = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: `Lien d'activation de compte`,
            html: `
          <div style="text-align:center;">
            <img style="height:400px;width:800px;" src="https://cdn.discordapp.com/attachments/1027950103874502728/1052877276825534494/Navy__Beige_Illustration_Desktop_Wallpaper.jpg"/>
            <h2 style="color:darkblue;font-size:3em;"><a href="${process.env.CLIENT_URL}/activation/activate?isToken=${isToken}" >Veuillez cliquez sur le lien pour activer votre compte </a></h2>
          </div>
      `,
        };

        mailTransporter.sendMail(dataObj, function (error) {
            if (error) {
                return res.status(400).json({
                    error: error,
                });
            }
            return res.json({
                message:
                    "L'email a été envoyé, merci de suivre les instructions pour activer votre compte",
            });
        });
    } catch (error) {
        return console.log(error);
    }
};


/************************************ CONNEXION *********************************/
module.exports.signIn = async (req, res) => {
    const { password, email } = req.body;
    const i_user = await User.findOne({ email });
    const isValidate = i_user?.isValidate;

    if (i_user && isValidate === true) {
        const passMatch = await bcrypt.compare(password, i_user.password);

        if (passMatch) {
            const payload = {
                email: i_user.email,
                role: i_user.role,
                id: i_user._id,
            };
            const token = jwt.sign(payload, process.env.SECRET, { expiresIn: "30d" });
            return res.status(201).json({ token });
        } else {
            return res.status(404).json({ message: "mot de passe incorrect" });
        }
    } else {
        return res.status(404).json({ message: "Utilisateur incorrect" });
    }
};


/********************************** GOOGLE LOGIN ********************************/
/**
verification si utilisateur existe ou non
si existe alors verification mot de passe
si mot de passe pas correcte alors accès refuser !!! 
attention asher mot de passe.
si utilisateur n'existe pas alors le créer et enregistrer en bdd.
**/
module.exports.googleLogin = (req, res) => {
    const { tokenId } = req.body;
    // const{email, password } = req.body;
    client
        .verifyIdToken({
            idToken: tokenId,
            audience: process.env.APP_CLIENT_ID,
        })
        .then((response) => {
            // response de l'api
            const { email_verified, name, email } = response.payload;
            User.findOne({ email: email }).then((user) => {
                if (user) {
                    // voir si mail est dans la BDD si oui on vérifie le mot de passe !
                    const payload = { email: user.email, role: user.role, id: user._id };
                    const token = jwt.sign(payload, process.env.SECRET, {
                        expiresIn: "1d",
                    });
                    return res.status(201).json({ token });
                } else {
                    console.log("else");
                    if (email_verified) {
                        console.log(email_verified);
                        let password = email + process.env.APP_CLIENT_ID;
                        let newUser = new User({ name, email, password });
                        newUser.save((error, data) => {
                            if (error) {
                                return res.status(400).json({
                                    error: "quelquechose n'est pas correct",
                                });
                            }
                            const payload = {
                                email: data.email,
                                role: data.role,
                                id: data._id,
                            };
                            const token = jwt.sign(payload, process.env.SECRET, {
                                expiresIn: "1d",
                            });

                            const { _id, name, email } = newUser;

                            res.json({
                                token,
                                user: { _id, name, email },
                            });
                        });
                    }
                }
            });
        });
};


/******************************** ACTIVATE ACCOUNT ******************************/
module.exports.activateAccount = (req, res) => {
    const { isToken } = req.body;
    if (isToken) {
        jwt.verify(isToken, process.env.JWT_ACC_ACTIVATE,
            function (error) {
                if (error) {
                    return res.status(400).json({ error: "Lien incorrect ou expiré" });
                }
                User.findOneAndUpdate({ "isToken": isToken }, { $set: { isToken: " ", isValidate: true } }, { useFindAndModify: false })
                    .then(() => {
                        return res.status(200).json({
                            message: "La validation a bien été effectuée",
                        });
                    })
                    .catch((error) => {
                        console.log(error);
                        return res
                            .status(400)
                            .json({ error: "L'utilisateur avec ce token n'existe pas" });
                    });


                // User.findOne({ isToken: isToken }, (error, user) => {
                //   if (error || !user) {
                //     return res
                //       .status(400)
                //       .json({ error: "L'utilisateur avec ce token n'existe pas" });
                //   }
                //   user.updateOne(
                //     { isToken: "", isValidate: true },
                //     function (error) {
                //       console.log(error);
                //       return res
                //         .status(200)
                //         .json({ message: "La validation a bien été effectuer" });
                //     }
                //   );
                // });
            }
        );
    }
};
