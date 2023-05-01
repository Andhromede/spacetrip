const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
// const userValidation = require("../validation/validation");
// const { OAuth2Client } = require("google-auth-library");
// const client = new OAuth2Client(process.env.APP_CLIENT_ID);
const _ = require("lodash");
const nodemailer = require("nodemailer");
const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;
const refreshtoken = process.env.REFRESH_TOKEN;
const OAuth2_client = new OAuth2(process.env.CLIENT_ID, process.env.CLIENT_SECRET, process.env.REDIRECT_URI);
OAuth2_client.setCredentials({ refresh_token: refreshtoken });



/****************************** GET ONE ******************************/
module.exports.getOneUserById = (req, res) => {
  User.findById({ _id: req.params.id })
    .then((userFound) => res.status(200).json(userFound))
    .catch(() => {
      res.status(400).json({ message: "Utilisateur introuvable" });
    });
};


/****************************** GET ALL ******************************/
module.exports.getAllUsers = (req, res) => {
  User.find().sort({ email: 1 })
    .then((users) => {
      users.map((user) => user.password = undefined)
      return res.status(200).json(users);
    })
    .catch((error) => ({

      message: "Aucun utilisateur pour le moment" + error,
    }));
};


/****************************** HARD DELETE ******************************/
exports.deleteUser = async (req, res) => {
  // const id = await req.params.id;
  User.findByIdAndDelete(req.params.id)
    .then((result) => {
      if (!result) {
        res.status(404).send({ message: `ID inexistant` });
      }
      else {
        res.status(200).send({ message: "Successfully deleted" });
      }
    })
    .catch((error) => {
      return res.status(400).json(error);
    });
};


/****************************** UPDATE ******************************/
exports.updateUser = (req, res) => {
  const id = req.params.id;
  const userObject = req.body;

  User.findByIdAndUpdate(
    id, userObject, { useFindAndModify: false },
    // function (error, data) {
    //   if (error) {
    //     console.log(error);
    //   } else {
    //     console.log("Updated Docs : ", data);
    //   }
    // }
  )
    .then((userUpdated) => {
      userUpdated.password = undefined;
      res.status(200).json({ message: "Utilisateur modifié :", userUpdated });
    })
    .catch((error) => res.status(400).json(error));
};


/****************************** SOFT DELETE******************************/
module.exports.userAnonymous = (req, res) => {
  const id = req.params.id;
  User.findByIdAndUpdate(id, {
    firstName: "",
    lastName: "",
    email: `user${id}@email.fr`,
    password: "",
    address: "",
    addAdress: "",
    city: "",
    zipCode: "",
    country: "",
    phone: "",
    avatar: "",
    deleted: true,
  })
    .then((user) => {
      return res.status(200).json(user);
    })
    .catch((error) => res.status(400).json({ error }));
};


/******************************** UPDATE PASSWORD *******************************/
module.exports.updUserPassword = async (req, res) => {
  const userFound = await User.findOne({ _id: req.params.id });
  const oldPassword = userFound.password;
  const match = await bcrypt.compare(req.body.oldPassword, oldPassword);
  console.log(req.body.oldPassword, oldPassword)
  if (match) {
    bcrypt.hash(req.body.password, 10).then((hash) => {
      User.updateOne({ _id: req.params.id }, { $set: { password: hash } })
        .then(() => {
          res.status(200).json({ message: "Mot de passe modifié !" });
        })

        .catch((error) => res.status(400).json({ error }));
    });
  } else {
    (error) => {
      return res.status(404).json({ message: error });
    };
  }
};


/******************************** RESET PASSWORD ********************************/
module.exports.resetPassword = async (req, res) => {
  const { resetLink, password } = req.body;
  const passCrypt = await bcrypt.hash(password, 10);
  if (resetLink) {
    jwt.verify(
      resetLink,
      process.env.RESET_PASSWORD_KEY,
      function (error, decodedData) {
        if (error) {
          return res.status(401).json({
            error: "Token incorrect ou expiré",
          });
        }
        User.findOne({ resetLink }, (error, user) => {
          if (error || !user) {
            return res
              .status(400)
              .json({ error: "L'utilisateur avec ce token n'existe pas" });
          }
          const obj = {
            password: passCrypt,
            resetLink: "",
          };

          user = _.extend(user, obj);
          user.save((error, result) => {
            if (error) {
              return res
                .status(400)
                .json({
                  error:
                    "Il y a une erreur avec la réinitialisation du mot de passe",
                });
            } else {
              return res
                .status(200)
                .json({ message: "Votre mot de passe a bien été changé" });
            }
          });
        });
      }
    );
  } else {
    return res.status(401).json({ error: "Erreur d'authentification" });
  }
};


/********************************** UPDATE EMAIL ********************************/
module.exports.updUserEmail = async (req, res) => {
  const { email } = req.body;
  const accessToken = await OAuth2_client.getAccessToken();

  User.findOne({ _id: req.params.id }, (error, user) => {
    if (error || !user) {
      return res
        .status(400)
        .json({ error: "L'id de l'utilisateur n'existe pas" });
    }
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

    const isToken = jwt.sign({ email }, process.env.JWT_ACC_ACTIVATE, {
      expiresIn: "20m",
    });

    const data = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: `Changement d'email`,
      html: `
              <div style="text-align:center;">
              <img style="height:400px;width:800px;" src="https://cdn.discordapp.com/attachments/1027950103874502728/1052877276825534494/Navy__Beige_Illustration_Desktop_Wallpaper.jpg"/>
              <h2 style="color:darkblue;font-size:3em;"><a href="${process.env.CLIENT_URL}/activation/activate?isToken=${isToken}" >Veuillez cliquez ici pour valider votre changement d'email </a></h2>
              </div>
              
          `,
    };

    user.updateOne({ email, isToken: isToken, isValidate: false })
      .then(() => {
        mailTransporter.sendMail(data, function (error) {
          if (error) {
            return res.status(400).json({
              error: error,
            });
          }
          return res.json({
            message: "L'email a été envoyé, merci de suivre les instructions",
          });
        });
      })
      .catch((error) => {
        console.log(error);
        return res.status(400).json({
          error: "Il y a une erreur avec le lien de changement d'email",
        });
      });
  });
};


/******************************** FORGET PASSWORD *******************************/
module.exports.forgotPassword = async (req, res) => {
  const { email } = req.body;

  const accessToken = await OAuth2_client.getAccessToken();

  User.findOne({ email }, (error, user) => {
    if (error || !user) {
      return res
        .status(400)
        .json({ error: "L'email de l'utilisateur n'existe pas" });
    }

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

    const resetLink = jwt.sign(
      { _id: user._id },
      process.env.RESET_PASSWORD_KEY,
      { expiresIn: "20m" }
    );

    const data = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Réinitialisation de mot de passe",
      html: `
          <div style="text-align:center;">
            <img style="height:400px;width:800px;" src="https://cdn.discordapp.com/attachments/1027950103874502728/1052877276825534494/Navy__Beige_Illustration_Desktop_Wallpaper.jpg"/>
            <h2 style="color:darkblue;font-size:3em;"><a href="${process.env.CLIENT_URL}/resetpassword?resetLink=${resetLink}" >Veuillez cliquez sur le lien pour réinitialiser le mot de passe </a></h2>
          </div>
      `,
    };

    return user.updateOne({ resetLink: resetLink }, function (error, success) {
      if (error) {
        return res
          .status(400)
          .json({
            error:
              "Il y a une erreur avec le lien de réinitialisation du mot de passe",
          });
      } else {
        mailTransporter.sendMail(data, function (error, body) {
          if (error) {
            return res.status(400).json({
              error: error,
            });
          }
          return res.json({
            message: "L'email a été envoyé, merci de suivre les instructions",
          });
        });
      }
    });
  });
};
