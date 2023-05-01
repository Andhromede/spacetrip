const Housing = require("../models/Housing");
const Destination = require("../models/Destination");
const Picture = require("../models/Picture");
const { Storage } = require("@google-cloud/storage");
const storage = new Storage({
   projectId: "space-trip-b44d5",
   keyFilename: "firebase.json",
});
const bucket = storage.bucket("gs://space-trip-b44d5.appspot.com");



/********************* GET ONE  *********************/
const getOneHousing = async (req, res) => {
   const id = await req.params.id;
   Housing.findOne({ _id: id })
      .populate("picture")
      .populate({
         path: "destination",
         populate: [{ path: "activity", populate: [{ path: "picture" }] }],
      })
      .populate("booking")
      .then((housing) => {
         return res.status(200).json(housing);
      })
      .catch((error) => {
         return res.status(400).json(error);
      });
};


/********************* GET BY ID  *********************/
const getHousingByDestination = (req, res) => {
   const id = req.params.id;
   Housing.find({ destination: id, deleted: false })
      .populate("picture")
      .populate({
         path: "destination",
         populate: [{ path: "activity", populate: [{ path: "picture" }] }],
      })
      .populate("booking")
      .then((result) => {
         return res.status(200).json(result);
      })
      .catch((error) => {
         return res.status(400).json(error);
      });
};


/********************* GET ALL  *********************/
const getAllHousing = async (req, res) => {
   Housing.find().sort({ name: 1 })
      .populate("picture")
      .populate({
         path: "destination",
         populate: [{ path: "activity", populate: [{ path: "picture" }] }],
      })
      .populate("booking")
      .then((result) => {
         return res.status(200).json(result);
      })
      .catch((error) => {
         return res.status(400).json(error);
      });
};


/********************* DELETE  *********************/
const deleteHousing = async (req, res) => {
   Housing.findByIdAndDelete(req.params.id)
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
const createHousing = async (req, res) => {
   /* FIREBASE */
   const file = req.file;

   if (file) {
      let housingObject = req.body;
      let newHousing = new Housing({ ...housingObject });
      // let tabDestination = [req.body.destination];
      // tabDestination = req.body.destination.split(",");
      // newHousing.destination = tabDestination;
      const debutCheminImg = "https://firebasestorage.googleapis.com/v0/b/space-trip-b44d5.appspot.com/o/housings%2F";
      const finCheminImg = "?alt=media";
      const nameImg = req.file.originalname + "-" + Date.now();

      let fileUpload = bucket.file(`housings/${nameImg}`);
      const blobStream = fileUpload.createWriteStream({
         metadata: {
            contentType: file.mimetype,
         },
      });

      blobStream.on("error", (error) => {
         console.log(error);
      });

      blobStream.end(file.buffer);

      /* MONGO DB */
      Picture.create({ path: debutCheminImg + nameImg + finCheminImg })
         .then((picture) => {
            newHousing.picture.push(picture._id);
            newHousing
               .save()
               .then((result) => {
                  return res.status(200).json(result);
               })
               .catch((error) => {
                  return res.status(400).json(error);
               });
         })
         .catch((error) => {
            return res.status(410).json(error);
         });
   }
   else {
      delete req.body.picture;
      Housing
         .create(req.body)
         .then((housing) => {
            Destination.findByIdAndUpdate(req.body.destination, { $push: { housing: housing._id } }, { new: true, useFindAndModify: false })
               .then((result) => {
                  return res.status(200).json(result);
               })
               .catch((error) => {
                  return res.status(400).json(error);
               });
         })
         .catch((error) => {
            return res.status(400).json(error);
         });
   };
}


/********************* UPDATE  *********************/
const updateHousing = async (req, res) => {
   const id = req.params.id;
   const file = req.file;

   if (file) {
      let housingObject = { ...req.body };
      housingObject.destination = JSON.parse(housingObject.destination);
      const debutCheminImg = "https://firebasestorage.googleapis.com/v0/b/space-trip-b44d5.appspot.com/o/housings%2F";
      const finCheminImg = "?alt=media";
      const nameImg = req.file.originalname + "-" + Date.now();

      /* FIREBASE */
      let fileUpload = bucket.file(`housings/${nameImg}`);
      const blobStream = fileUpload.createWriteStream({
         metadata: { contentType: file.mimetype },
      });

      blobStream.on("error", (error) => console.log(error));
      blobStream.end(file.buffer);

      /* MONGO DB */
      Picture.create({ path: debutCheminImg + nameImg + finCheminImg })
         .then(
            (picture) => {
               housingObject.picture = picture._id;
               Housing.findByIdAndUpdate(req.params.id, housingObject, {
                  useFindAndModify: false,
               })
                  .then((result) => {
                     return res.status(200).json(result);
                  })
                  .catch((error) => {
                     return res.status(400).json(error);
                  });
            }
         );
   }
   else {
      delete req.body.picture;
      Housing.updateOne({ _id: id }, req.body)
         .then((result) => {
            return res.status(200).json(result);
         })
         .catch((error) => {
            return res.status(400).json(error);
         });
   }
};


module.exports = {
   createHousing,
   getOneHousing,
   getAllHousing,
   updateHousing,
   deleteHousing,
   getHousingByDestination,
};
