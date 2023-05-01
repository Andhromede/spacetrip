const service = require("../services/destinationService")
const Activity = require("../models/Activity");
const Destination = require("../models/Destination");
const Picture = require("../models/Picture");
const { Storage } = require("@google-cloud/storage");
const storage = new Storage({
   projectId: process.env.FIREBASE_PROJECT_ID,
   keyFilename: "firebase.json",
});
const bucket = storage.bucket("gs://space-trip-b44d5.appspot.com");



/********************* GET ONE *********************/
const getOneActivity = async (req, res) => {
   const id = await req.params.id;

   Activity.findOne({ _id: id })
      .populate("picture")
      .populate("destination")
      .then((result) => {
         return res.status(200).json(result);
      })
      .catch((error) => {
         return res.status(400).json(error);
      });
};


/********************* GET ALL *********************/
const getAllActivity = async (req, res) => {
   Activity.find().sort({ name: 1 })
      .populate("picture")
      .populate("destination")
      .then((result) => {
         return res.status(200).json(result);
      })
      .catch((error) => {
         return res.status(400).json(error);
      });
};


/********************* DELETE *********************/
const deleteActivity = async (req, res) => {
   Activity.findByIdAndDelete(req.params.id)
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


/********************* INSERT ONE *********************/
const createActivity = async (req, res) => {
   /* FIREBASE */
   const file = req.file;

   if (file) {
      let activityObject = req.body;
      let newActivity = new Activity({ ...activityObject });
      let tabDestination = [req.body.destination];
      tabDestination = req.body.destination.split(",");
      newActivity.destination = tabDestination;

      const debutCheminImg = "https://firebasestorage.googleapis.com/v0/b/space-trip-b44d5.appspot.com/o/activities%2F";
      const finCheminImg = "?alt=media";
      const nameImg = req.file.originalname + "-" + Date.now();

      let fileUpload = bucket.file(`activities/${nameImg}`);
      const blobStream = fileUpload.createWriteStream({
         metadata: { contentType: file.mimetype },
      });

      blobStream.on("error", (error) => { console.log(error); });
      blobStream.end(file.buffer);

      /* MONGO DB */
      Picture.create({ path: debutCheminImg + nameImg + finCheminImg })
         .then((picture) => {
            newActivity.picture.push(picture._id);

            newActivity
               .save()
               .then((activity) => {
                  activity.destination.map((id_destination) => {
                     Destination.findByIdAndUpdate(
                        id_destination,
                        { $push: { activity: activity._id } },
                        { new: true, useFindAndModify: false }
                     ).then((res) => console.log("res update destination", res));
                  });
                  return res.status(200).json(activity);
               })
               .catch((error) => {
                  return res.status(400).json(error);
               });
         })
         .catch((error) => {
            return res.status(400).json(error);
         });
   }
   else {
      delete req.body.picture;

      Activity
         .create(req.body)
         .then((activity) => {
            activity.destination.map((id_destination) => {
               Destination.findByIdAndUpdate(
                  id_destination,
                  { $push: { activity: activity._id } },
                  { new: true, useFindAndModify: false }
               ).then((res) => console.log("res update destination", res));
            });
            return res.status(200).json(activity);
         })
         .catch((error) => {
            return res.status(400).json(error);
         });
   }
};


/********************* UPDATE *********************/
const updateActivity = async (req, res) => {
   const id = req.params.id;
   const file = req.file;

   if (file) {
      let activityObject = { ...req.body };
      activityObject.destination = JSON.parse(activityObject.destination);
      const debutCheminImg = "https://firebasestorage.googleapis.com/v0/b/space-trip-b44d5.appspot.com/o/activities%2F";
      const finCheminImg = "?alt=media";
      const nameImg = req.file.originalname + "-" + Date.now();

      /* FIREBASE */
      let fileUpload = bucket.file(`activities/${nameImg}`);
      const blobStream = fileUpload.createWriteStream({
         metadata: { contentType: file.mimetype },
      });

      blobStream.on("error", (error) => console.log(error));
      blobStream.end(file.buffer);

      /* MONGO DB */
      Picture.create({ path: debutCheminImg + nameImg + finCheminImg })
         .then((picture) => {
            activityObject.picture = picture._id;

            Activity.findById(id)
               .then((activityDB) => {
                  activityDB.destination.map((id_destination) => {
                     const index = activityObject.destination.findIndex(
                        (reqDestination) => reqDestination._id == id_destination
                     );

                     if (index === -1) {
                        service.deleteActivityFromDestination(id_destination, id)
                     }
                  });

                  activityObject.destination.map((destinationFront) => {
                     const index = activityDB.destination.findIndex(
                        (destinationDbId) => destinationDbId == destinationFront._id
                     );

                     if (index === -1) {
                        service.addActivityToDestination(destinationFront._id, id)
                     }
                  })

                  Activity.updateOne({ _id: id }, activityObject)
                     .then((result) => {
                        return res.status(200).json(result);
                     })
               })
               .catch((error) => {
                  res.status(400).send({ message: error + "Erreur de mise a jour avec l'id=" + id });
               });
         })
         .catch((error) => {
            return res.status(400).json(error);
         });
   }
   else {
      delete req.body.picture;
      Activity.findById(id)
         .then((activityDB) => {
            activityDB.destination.map((id_destination) => {
               const index = req.body.destination.findIndex(
                  (reqDestination) => reqDestination._id == id_destination
               );

               if (index === -1) {
                  service.deleteActivityFromDestination(id_destination, id)
               }
            });

            req.body.destination.map((destinationFront) => {
               const index = activityDB.destination.findIndex(
                  (destinationDbId) => destinationDbId == destinationFront._id
               );
               if (index === -1) {
                  service.addActivityToDestination(destinationFront._id, id)
               }
            })

            Activity.updateOne({ _id: id }, req.body)
               .then((result) => {
                  return res.status(200).json(result)
               })
               .catch((error) => {
                  return res.status(400).json(error)
               });
         })
         .catch((error) => {
            res.status(400).send({ message: error + " Erreur de mise a jour avec l'id = " + id });
         });
   };
}


module.exports = {
   createActivity,
   getOneActivity,
   getAllActivity,
   updateActivity,
   deleteActivity,
};
