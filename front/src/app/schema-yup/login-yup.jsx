import * as yup from "yup";

const LoginSchema = yup.object({
    email: yup
        .string()
        .email("L'email n'est pas valide")
        .required("Un email est requis"),
    
    password: yup
        .string()
        .required("Le mot de passe est requis")
});

export default LoginSchema;