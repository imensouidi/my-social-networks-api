const { body } = require("express-validator");

exports.registerValidator = [
  body("firstname").notEmpty().withMessage("Prénom obligatoire"),
  body("lastname").notEmpty().withMessage("Nom obligatoire"),
  body("email")
    .isEmail()
    .normalizeEmail()
    .withMessage("Email invalide"),

  body("password")
    .isLength({ min: 6 })
    .withMessage("Mot de passe min 6 caractères")
];
