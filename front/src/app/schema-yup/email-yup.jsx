import * as yup from "yup";

const EmailSchema = yup.object({
    email: yup
        .string()
        .email("L'email n'est pas valide")
        .required("Un email est requis"),
});

export default EmailSchema;