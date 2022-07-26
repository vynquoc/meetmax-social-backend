const express = require("express");
const messageController = require("../controllers/messageController");
const authController = require("../controllers/authController");
const router = express.Router();

router.post("/create", authController.protect, messageController.create);
router.get(
  "/:conversationId",
  authController.protect,
  messageController.getMessages
);
module.exports = router;
