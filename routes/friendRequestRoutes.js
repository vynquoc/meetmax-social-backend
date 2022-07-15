const express = require("express");
const friendRequestController = require("../controllers/friendRequestController");
const authController = require("../controllers/authController");

const router = express.Router();

router.post("/create", authController.protect, friendRequestController.create);
router.post(
  "/accept",
  authController.protect,
  friendRequestController.acceptRequest
);
router.post(
  "/reject",
  authController.protect,
  friendRequestController.rejectRequest
);

module.exports = router;
