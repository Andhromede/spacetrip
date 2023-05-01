const Booking = require("../models/Booking");
const Housing = require("../models/Housing");
const _ = require('lodash');
const nodemailer = require("nodemailer");
const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2
const refreshtoken = process.env.REFRESH_TOKEN;

const OAuth2_client = new OAuth2(process.env.CLIENT_ID, process.env.CLIENT_SECRET, process.env.REDIRECT_URI)
OAuth2_client.setCredentials({ refresh_token: refreshtoken })



/****************************** GET ONE ******************************/
const getOneBooking = async (req, res) => {
   const id = await req.params.id;

   Booking.find({ _id: id })
      .populate("user")
      .populate("booking")
      .populate({
         path: "housing",
         populate: [{ path: "picture" }],
      })
      .populate({
         path: "housing",
         populate: [{ path: "destination" }],
      })
      .then((result) => {
         return res.status(200).json(result);
      })
      .catch((error) => {
         return res.status(400).json(error);
      });
};


/****************************** GET BY USER ******************************/
const getBookingByIdUser = async (req, res) => {
   const id = await req.params.id;

   Booking.find({ user: id }).sort({ bookingDate: -1 })
      .populate("user")
      .populate("booking")
      .populate({
         path: "housing",
         populate: [{ path: "picture" }],
      })
      .populate({
         path: "housing",
         populate: [{ path: "destination" }],
      })
      .then((result) => {
         return res.status(200).json(result);
      })
      .catch((error) => {
         return res.status(400).json(error);
      });
};


/****************************** GET BY HOUSING ******************************/
const getBookingByHousing = (req, res) => {
   const id = req.params.id;
   Booking.find({ housing: id })
      .populate({
         path: "housing",
         populate: [{ path: "picture" }],
      })
      .populate({
         path: "housing",
         populate: [{ path: "destination" }],
      })
      .then((result) => {
         return res.status(200).json(result);
      })
      .catch((error) => {
         return res.status(400).json(error);
      });
};


/****************************** GET ALL ******************************/
const getAllBooking = async (req, res) => {

   Booking.find()
      .populate("user")
      .populate({
         path: "housing",
         populate: [{ path: "destination" }],
      })
      .then((result) => {
         return res.status(200).json(result);
      })
      .catch((error) => {
         return res.status(400).json(error);
      });
};


/****************************** DELETE ******************************/
const deleteBooking = async (req, res) => {
   const id = await req.params.id;
   Booking.findByIdAndDelete(id)
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


/****************************** INSERT ONE ******************************/
const createBooking = async (req, res) => {
   const accessToken = await OAuth2_client.getAccessToken();
   const email = "brunet.guillaume59267@gmail.com";

   //Création du transporteur du nodemailer
   const mailTransporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
         type: "OAuth2",
         user: process.env.EMAIL_USER,
         clientId: process.env.CLIENT_ID,
         clientSecret: process.env.CLIENT_SECRET,
         refreshToken: refreshtoken,
         accessToken: accessToken
      }
   })

   const dataObj = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: `Validation de réservation`,
      html: `
   <div style="text-align:center;">
     <img style="height:400px;width:800px;" src="https://cdn.discordapp.com/attachments/1027950103874502728/1052877276825534494/Navy__Beige_Illustration_Desktop_Wallpaper.jpg"/>
     <h2 style="color:darkblue;font-size:2em;">Votre réservation à bien été validé, veuillez cliquez <a href="${process.env.CLIENT_URL}/mes-reservations/" >ici</a> pour retrouvé ici votre facture.</h2>
   </div>
`
   }

   Booking.create(req.body)
      .then((booking) => {
         booking.housing.map((id_booking) => {
            Housing.findByIdAndUpdate(
               id_booking,
               { $push: { booking: booking._id } },
               { new: true, useFindAndModify: false }
            )
               .then((res) =>
                  mailTransporter.sendMail(dataObj, function (error, body) {
                     if (error) {
                        return res.status(400).json({ error: error })
                     }
                     return res.json({ message: "L'email a été envoyé, merci de suivre les instructions pour activer votre compte" })
                  })
               );
         });

         return res.status(200).json(booking);
      })
      .catch((error) => {
         return res.status(400).json(error);
      });
};


/****************************** UPDATE ******************************/
const updateBooking = async (req, res) => {
   const id = await req.params.id;

   Booking.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
      .then((result) => {
         if (!result) {
            res.status(404).send({ message: `ID inexistant` });
         }
         else {
            return res.status(200).json(result);
         }
      })
      .catch((error) => {
         return res.status(400).json(error);
      });
};


module.exports = {
   getAllBooking,
   getOneBooking,
   getBookingByIdUser,
   createBooking,
   updateBooking,
   deleteBooking,
   getBookingByHousing,
};