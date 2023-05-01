const joi = require('joi');

function userValidation(body){

    const regExp = /^(?=.*\d)(?=.*[@#\-_$%^&+=ยง!\?])(?=.*[a-z])(?=.*[A-Z])[0-9A-Za-z@#\-_$%^&+=ยง!\?]+$/;

    const userValidationSchema = joi.object({
        email: joi.string().email().trim().required().messages({
            "any.required" : "Un email est requis.",
            "string.email" : "L'email n'est pas valide.",
            "string.empty" : "Un email est obligatoire."
        }),
        password: joi.string()
        .pattern(new RegExp(regExp))
        .min(8)
        .max(15)
        .trim()
        .required()
        .messages({
            "any.required" : "Le mot de passe est requis.",
            "string.pattern.base" : "Le mot de passe doit contenir une lettre majuscule, une lettre minuscule ,un chiffre et un caractére spéciale au minimum.",
            "string.min" : "Le mot de passe doit contenir au minimum 8 caractéres.",
            "string.max" : "Le mot de passe doit contenir au maximum 15 caractéres.",
            "string.empty" : "Un mot de passe est obligatoire."
        })
    
        

    })
    return userValidationSchema.validate(body)
}

module.exports = userValidation;