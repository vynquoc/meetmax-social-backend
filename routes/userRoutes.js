const express = require("express");
const userController = require("../controllers/userController");
const authController = require("../controllers/authController");
const router = express.Router();

router.post("/signup", authController.signup);
router.post("/signin", authController.signin);

router.get("/check-token", authController.getUserByToken);

router.route("/").get(userController.getAllUsers);

router
  .route("/:username")
  .get(authController.protect, userController.getUserByUsername);

router
  .route("/:id")
  .get(userController.getUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

module.exports = router;
