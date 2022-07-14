const express = require("express");
const postController = require("../controllers/postController");
const authController = require("../controllers/authController");
const router = express.Router();

router.post("/create", authController.protect, postController.create);

module.exports = router;
