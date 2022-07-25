const express = require("express");
const conversationController = require("../controllers/conversationController");
const authController = require("../controllers/authController");
const router = express.Router();

router.post("/create", authController.protect, conversationController.create);

module.exports = router;
