const express = require("express");
const conversationController = require("../controllers/conversationController");
const authController = require("../controllers/authController");
const router = express.Router();

router.post("/create", authController.protect, conversationController.create);
router.get(
  "/get-conversations",
  authController.protect,
  conversationController.getConversationsOfUser
);
router.post(
  "/get-conversation",
  authController.protect,
  conversationController.getConversation
);

module.exports = router;
