import * as yup from "yup";

import "yup-phone";

const ProfilSchema = yup.object({
    firstname: yup
        .string()
        .max(20, "Le Prénom doit comporter au maximum 20 caractères"),
    
    lastname: yup
        .string()
        .max(20, "Le Nom doit comporter au maximum 20 caractères"),

    email: yup
        .string()
        .email("L'email n'est pas valide"),

    address: yup
        .string(),
        
    addAdress: yup
        .string(),

    city: yup
        .string()
        .max(20, "La ville doit comporter au maximum 20 caractères"),

    zipCode: yup
        .string()
        .min(2, "Le Code Postal doit comporter au maximum 2 caractères")
        .max(10, "Le Code Postal doit comporter au maximum 10 caractères"),

    phone: yup
        .string()
        .phone("FR",false, "Le Numéro de téléphone n'est pas valide"),

});

export default ProfilSchema;