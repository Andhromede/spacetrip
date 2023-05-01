import * as yup from "yup";


const ContactFormSchema = yup.object({
    email: yup
    .string()
    .email("L'email n'est pas valide")
    .required("Un email est requis"),

    name: yup
    .string()
    .min(3, "Votre nom doit contenir au minimum 3 caractéres")
    .max(50, "Le mot de passe doit contenir au maximum 50 caractéres")
    .required("Votre nom est requis"),

    message: yup
    .string()
    .min(10, "Votre message doit contenir au minimum 10 caractéres")
    .max(500, "Le mot de passe doit contenir au maximum 500 caractéres")
    .required("Votre message est requis"),
})


export default ContactFormSchema;