import * as yup from "yup";

const ActivitySchema = yup.object({
  name: yup.string().matches(/^[A-zÀ-ÿ]*$/, "Uniquement des lettres 🙏").required("Le nom de l'activité est requise"),
  description: yup.string().required("La description est requise"),
  destination: yup.mixed().required("Veuillez choisir au minimum une destination"),
});

export default ActivitySchema;