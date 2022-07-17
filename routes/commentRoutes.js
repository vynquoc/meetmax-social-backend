const express = require("express");
const commentController = require("../controllers/commentController");
const authController = require("../controllers/authController");
const router = express.Router();

router.post("/create", authController.protect, commentController.create);

module.exports = router;
