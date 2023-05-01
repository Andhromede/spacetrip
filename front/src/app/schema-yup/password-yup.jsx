import * as yup from "yup";

const PasswordSchema = yup.object({

  password: yup
    .string()
    .min(8, "Le mot de passe doit contenir au minimum 8 caractéres")
    .max(15, "Le mot de passe doit contenir au maximum 15 caractéres")
    .required("Le mot de passe est requis")
    .matches(
        /^(?=.*\d)(?=.*[@#\-_$%^&+=ยง!\?])(?=.*[a-z])(?=.*[A-Z])[0-9A-Za-z@#\-_$%^&+=ยง!\?]+$/,
      "Le mot de passe doit contenir une lettre majuscule, une lettre minuscule ,un chiffre et un caractére spéciale au minimum"
    ),
});

export default PasswordSchema;