const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const methodOverride = require("method-override");

// Express
const app = express();

// Middlewares
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "../public")));
app.use(methodOverride("_method"));

// view engine setup
app.set("view engine", "ejs");
app.set("views", __dirname + "/" + "views");

// Routes systems require and use
const mainRouter = require("./routes/main");

app.use("/", mainRouter);

// PORT
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`El server está corriendo en http://localhost:${PORT}`);
});
