import * as yup from "yup";

const DestinationSchema = yup.object({
  name: yup.string().matches(/^[A-zÀ-ÿ]*$/, "Uniquement des lettres 🙏").required("Le nom de la destination est requise"),
  slogan: yup.string().required("Le slogan est requis"),
  description: yup.string().required("La description est requise"),
  picture: yup.string().required("Veuillez choisir une photo de la destination"),
});

export default DestinationSchema;