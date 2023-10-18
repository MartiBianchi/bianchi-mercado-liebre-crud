const { validationResult } = require("express-validator");

const loginMiddleware = (req, res, next) => {
  const errors = validationResult(req);

  console.log(errors.mapped());

  if (!errors.isEmpty()) {
    return res.send("hay errores");
  }

  next();
};

module.exports = loginMiddleware;
