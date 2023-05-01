import * as yup from "yup";

const RateSchema = yup.object({
  comment: yup
    .string()
    .required("Un commentaire est requis"),

});

export default RateSchema;
