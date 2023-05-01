import * as yup from "yup";

const RegisterSchema = yup.object({
  email: yup
    .string()
    .email("L'email n'est pas valide")
    .required("Un email est requis"),

  password: yup
    .string()
    .min(8, "Le mot de passe doit contenir au minimum 8 caractéres")
    .max(15, "Le mot de passe doit contenir au maximum 15 caractéres")
    .required("Le mot de passe est requis")
    .matches(
        /^(?=.*\d)(?=.*[@#\-_$%^&+=ยง!\?])(?=.*[a-z])(?=.*[A-Z])[0-9A-Za-z@#\-_$%^&+=ยง!\?]+$/,
      "Le mot de passe doit contenir une lettre majuscule, une lettre minuscule ,un chiffre et un caractére spéciale au minimum"
    ),

  confirmPassword: yup
    .string()
    .required("La confirmation du mot de passe est requis")
    .oneOf(
      [yup.ref("password"), null],
      "Le mot de passe de confirmation ne correspond pas"
    ),
    recaptcha: yup.string().required("veuillez cochez la case.")
});

export default RegisterSchema;
