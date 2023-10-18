const { body } = require("express-validator");

const validations = [
  body("name", "El nombre es requerido").notEmpty().isLength({ min: 2 }).bail(),
  body("email", "El mail es requerido").isEmail().notEmpty().bail(),
  body("password", "La contraseña es requerida")
    .notEmpty()
    .isLength({ min: 6 })
    .bail(),
];

module.exports = validations;
