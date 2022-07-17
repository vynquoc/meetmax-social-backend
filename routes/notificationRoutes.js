const express = require("express");
const notificationController = require("../controllers/notificationController");
const authController = require("../controllers/authController");
const router = express.Router();

router.post("/create", authController.protect, notificationController.create);
router.get(
  "/get-notification-list",
  authController.protect,
  notificationController.getNotificationList
);
router.patch("/:id", authController.protect, notificationController.update);
module.exports = router;
