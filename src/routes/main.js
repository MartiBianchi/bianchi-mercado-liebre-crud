const express = require("express");
const router = express.Router();

const mainController = require("../controllers/mainController");
const productsRouter = require("./products");

const loginValidations = require("../validations/login-validations");
const loginMiddleware = require("../middlewares/login-middleware");

// Main Routes
router.get("/login", mainController.login);
router.post(
  "/login/auth",
  loginValidations,
  loginMiddleware,
  mainController.auth,
);

router.get("/", mainController.index);
router.get("/search", mainController.search);

// Other Routes
router.use("/products", productsRouter);

module.exports = router;
