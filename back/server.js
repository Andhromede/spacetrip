const express = require("express");
const { initializeApp, cert } = require("firebase-admin/app");
// const { getStorage } = require("firebase-admin/storage");
const app = express();
app.use(express.json());
const serverConfig = require("./app/config/server.config");
const PORT = serverConfig.PORT || 5000;
const stripe = require("stripe")(process.env.STRIPE_SECRET);
const cors = require("cors");


/****************************** FIREBASE CONFIG ******************************/
const serviceAccount = require("./firebase.json");
const BUCKET_NAME = `${process.env.FIREBASE_PROJECT_ID}.appspot.com`;

initializeApp({
  credential: cert(serviceAccount),
  storageBucket: `gs://${BUCKET_NAME}`,
});


/****************************** RATE LIMIT ******************************/
// const rateLimit = require('express-rate-limit')
// const limiter = rateLimit({
// 	windowMs: 15 * 60 * 1000, // 15 minutes
// 	max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
// 	standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
// 	legacyHeaders: false, // Disable the `X-RateLimit-*` headers
// })

// // Apply the rate limiting middleware to all requests
// app.use(limiter)


/****************************** STRIPE ******************************/
app.post("/api/stripe/charge", cors(), async (req,res)=>{
  let {amount, id} = req.body;
  try{
    const payment = await stripe.paymentIntents.create({
      amount: amount,
      currency: "EUR",
      description: "SpaceTrip",
      payment_method: id,
      confirm: true,
    });
    res.json({
      message:"Paiement réussi",
      success: true,
    })
  } catch(error){
    console.log("erreur...", error);
    res.json({
      message:"Le paiement à échoué",
      success: false,
    })
  }
});


/****************************** HELMET ******************************/
const helmet = require("helmet");
app.use(helmet());


/****************************** CORS ******************************/
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});


/****************************** CONNEXION MONGO DB ******************************/
const mongoose = require("mongoose");
mongoose
  .connect(
    `mongodb+srv://${process.env.ACCES_DB}:${process.env.CODE_DB}@cluster0.6lxl3po.mongodb.net/?retryWrites=true&w=majority`,
    { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true }
  )
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch(() => console.log("Connexion à MongoDB échouée !"));


/****************************** ROUTES ******************************/
const routeHousing = require('./app/routes/housingRouter');
const routeRate = require('./app/routes/RateRouter');
const routeBooking = require('./app/routes/bookingRouter');
const routeActivity = require('./app/routes/activityRouter');
const routePicture = require('./app/routes/pictureRouter');
const destinationsRoutes = require("./app/routes/destinationRouter");
const routeRole = require("./app/routes/roleRouter");
const routeUser = require("./app/routes/userRouter");
const routeAuth = require("./app/routes/authRouter");


app.get("/api", (req, res) => res.status(200).send({ message: "test server" }));
app.use("/api/destination", destinationsRoutes);
app.use('/api/housing/', routeHousing);
app.use('/api/rate/', routeRate);
app.use('/api/picture/', routePicture);
app.use('/api/activity/', routeActivity);
app.use('/api/booking/', routeBooking);
app.use('/api/role/', routeRole);
app.use("/api/user/", routeUser);
app.use("/api/auth/", routeAuth);


app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));