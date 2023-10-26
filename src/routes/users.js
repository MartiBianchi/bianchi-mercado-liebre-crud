const express = require("express");
const router = express.Router();
const path = require("path");

const multer = require("multer");

const storage = multer.diskStorage({
  destination: path.join(__dirname, "../../public/images/users"),
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname),
    );
  },
});

const upload = multer({
  storage: storage,
});

const usersController = require("../controllers/usersController");

router.get("/crud", usersController.crud);

router.get("/create", usersController.create);
router.post("/", upload.single("profilePicture"), usersController.store);

module.exports = router;
