import * as yup from "yup";

const HousingSchema = yup.object({
  name: yup.string().matches(/^[A-zÀ-ÿ]*$/, "Uniquement des lettres 🙏").required("Le nom de l'activité est requise"),
  description: yup.string().required("La description est requise"),
  destination: yup.mixed().required("Veuillez choisir au minimum une destination"),
  nbrPersons: yup.number().required("Veuillez choisir le nombre de places maximum"),
  nbBed1: yup.number().required("Veuillez choisir le nombre de lits 1 personne"),
  nbBed2: yup.number().required("Veuillez choisir le nombre de lits 2 personnes"),
  price: yup.number().required("Veuillez choisir le prix par nuit"),
  offers: yup.number(),
  picture: yup.string().required("Veuillez choisir une photo du logement"),

});

export default HousingSchema;