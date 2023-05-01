const Role = require('../models/Role');



/********************* GET ALL *********************/
const getAllRole = async (req, res) => {
   Role.find()
      .then((role) => { return res.status(200).json(role) })
      .catch((error) => { return res.status(400).json(error) })
}


/********************* DELETE *********************/
const deleteRole = async (req, res) => {
   Role.findByIdAndDelete(req.params.id)
      .then(data => {
         if (!data) {
            return res.status(404).send({
               message: `Impossible de supprimer le role avec cet id: ${id}.`
            });
         } else {
            return res.status(200).send({
               message: "Role supprimé avec succès"
            });
         }
      })
      .catch(error => {
         return res.status(400).send({
            message: "Impossible de supprimer le role avec cet id=" + id
         });
      });
}


/********************* INSERT *********************/
const createRole = async (req, res) => {
   const newRole = await new Role(req.body);
   newRole.save()
      .then((result) => {
         return res.status(200).json(result);
      })
      .catch((error) => {
         return res.status(400).json(error);
      });
}


/********************* UPDATE *********************/
const updateRole = async (req, res) => {
   const id = await req.params.id;

   Role.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
      .then(result => {
         if (!result) {
            res.status(404).send({message: `Impossible de mettre à jour le role avec cet id=${id}.`});
         }
         else {
            res.status(200).send({ message: "Le role à été modifié avec succès" });
         }
      })
      .catch(error => {
         return res.status(400).json(error);
      });
}


module.exports = { createRole, getAllRole, updateRole, deleteRole }