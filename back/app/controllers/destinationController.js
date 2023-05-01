const Destination = require("../models/Destination");
// const { values } = require("lodash");
const { Storage } = require("@google-cloud/storage");
const storage = new Storage({
   projectId: process.env.FIREBASE_PROJECT_ID,
   keyFilename: "firebase.json",
});
const bucket = storage.bucket("gs://space-trip-b44d5.appspot.com");



/********************* GET ONE  *********************/
exports.getOneDestination = (req, res, next) => {
   Destination.findOne({ _id: req.params.id })
      .populate({
         path: "activity",
         populate: [{ path: "picture" }],
      })
      .then((result) => res.status(200).json(result))
      .catch((error) => {
         return res.status(400).json(error);
      });
};


/********************* GET ALL  *********************/
exports.getAllDestination = (req, res, next) => {
   Destination.find().sort({ name: 1 })
      .populate({
         path: "activity",
         populate: [{ path: "picture" }],
      })
      .then((result) => res.status(200).json(result))
      .catch((error) => {
         return res.status(400).json(error);
      });
};


/********************* DELETE  *********************/
exports.deleteDestination = (req, res, next) => {
   Destination.findOne({ _id: req.params.id });
   Destination.deleteOne({ _id: req.params.id })
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


/********************* INSERT ONE  *********************/
exports.createDestination = (req, res, next) => {
   /* FIREBASE */
   const file = req.file;
   let newDestination = new Destination({ ...req.body });
   const debutCheminImg = "https://firebasestorage.googleapis.com/v0/b/space-trip-b44d5.appspot.com/o/activities%2F";
   const finCheminImg = "?alt=media";
   const nameImg = req.file.originalname + "-" + Date.now();
   let fileUpload = bucket.file(`activities/${nameImg}`);
   const blobStream = fileUpload.createWriteStream({
      metadata: { contentType: file.mimetype },
   });

   blobStream.on("error", (error) => {
      console.log(error);
   });

   blobStream.end(file.buffer);
   // TODO supprimer l'ancienne image dans Firebase

   /* MONGO DB */
   newDestination.picture = debutCheminImg + nameImg + finCheminImg;
   Destination
      .create(newDestination)
      .then((result) => {
         return res.status(200).json(result)
      })
      .catch((error) => {
         return res.status(400).json(error);
      });

};


/********************* UPDATE  *********************/
exports.updateDestination = async (req, res, next) => {
   const destinationObject = req.body;
   delete destinationObject._id;

   /* FIREBASE */
   if (req.file) {
      const file = req.file;
      const debutCheminImg = "https://firebasestorage.googleapis.com/v0/b/space-trip-b44d5.appspot.com/o/planets%2F";
      const finCheminImg = "?alt=media";
      const nameImg = req.file.originalname + "-" + Date.now();

      let fileUpload = bucket.file(`planets/${nameImg}`);
      const blobStream = fileUpload.createWriteStream({
         metadata: {
            contentType: file.mimetype,
         },
      });
      blobStream.on("error", (error) => {
         console.log(error);
      });

      blobStream.end(file.buffer);
      destinationObject.picture = debutCheminImg + nameImg + finCheminImg;
   }

   /* MONGO DB */
   Destination.findByIdAndUpdate(req.params.id, destinationObject, { useFindAndModify: false })
      .then((result) => {
         return res.status(200).send(result);
      })
      .catch((error) => {
         return res.status(400).json(error);
      });
};
