const { Router, urlencoded } = require("express");
const router = Router();

const mainController = require("../controllers/mainController");
const productsRouter = require("./products");
const usersRouter = require("./users");

const loginValidations = require("../validations/login-validations");
const loginMiddleware = require("../middlewares/login-middleware");

// Main Routes
router.get("/", mainController.index);

router.post(
  "/login/auth",
  loginValidations,
  loginMiddleware,
  mainController.auth,
);

router.get("/login", mainController.login);
router.get("/search", mainController.search);

// Other Routes
router.use("/products", productsRouter);
router.use("/users", usersRouter);

module.exports = router;
