const Rate = require("../models/Rate");



/********************* GET BY HOUSING *********************/
const getRatesByHousing = (req, res) => {
   const id = req.params.id;
   Rate.find({ housing: id })
      .populate("housing")
      .populate("user")
      .then((result) => {
         return res.status(200).json(result);
      })
      .catch((error) => {
         return res.status(400).json(error);
      });
};


/********************* GET BY USER *********************/
const getRatesByUser = (req, res) => {
   const id = req.params.id;
   Rate.find({ user: id })
      .populate("housing")
      .populate("user")
      .then((result) => {
         return res.status(200).json(result);
      })
      .catch((error) => {
         return res.status(400).json(error);
      });
};


/********************* GET ALL *********************/
const getRates = (req, res) => {
   Rate.find()
      .populate("housing")
      .populate("user")
      .then((result) => {
         return res.status(200).json(result);
      })
      .catch((error) => {
         return res.status(400).json(error);
      });
};


/********************* DELETE *********************/
const deleteRate = async (req, res) => {
   Rate.findByIdAndDelete(req.params.id)
      .then((result) => {
         if(!result) {
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


/********************* INSERT *********************/
const createRate = async (req, res) => {
   const newRate = await new Rate(req.body);
   newRate
      .save()
      .then((result) => {
         return res.status(200).json(result);
      })
      .catch((error) => {
         return res.status(400).json(error);
      });
};


/********************* UPDATE *********************/
const updateRate = async (req, res) => {
   const id = await req.params.id;

   Rate.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
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
   createRate,
   getRatesByHousing,
   getRatesByUser,
   updateRate,
   deleteRate,
   getRates,
};
