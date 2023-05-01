const Picture = require("../models/Picture");



/********************* GET ONE *********************/
const getOnePicture = async (req, res) => {
   const id = await req.params.id;
   Picture.findOne({ _id: id })
      .then((result) => {
         return res.status(200).json(result);
      })
      .catch((error) => {
         return res.status(400).json(error);
      });
};


/********************* GET ALL *********************/
const getAllPicture = async (req, res) => {
   Picture.find()
      .then((result) => {
         return res.status(200).json(result);
      })
      .catch((error) => {
         return res.status(400).json(error);
      });
};


/********************* DELETE *********************/
const deletePicture = async (req, res) => {
   Picture.findByIdAndDelete(req.params.id)
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
const createPicture = async (req, res) => {
   const newPicture = await new Picture(req.body);
   newPicture
      .save()
      .then((result) => {
         return res.status(200).json(result);
      })
      .catch((error) => {
         return res.status(400).json(error);
      });
};


/********************* UPDATE *********************/
const updatePicture = async (req, res) => {
   const id = await req.params.id;
   Picture.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
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
   createPicture,
   getOnePicture,
   getAllPicture,
   updatePicture,
   deletePicture,
};
