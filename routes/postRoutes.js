const express = require("express");
const postController = require("../controllers/postController");
const authController = require("../controllers/authController");
const router = express.Router();

router.post("/create", authController.protect, postController.create);
router.get("/getPostList", authController.protect, postController.getPostList);
router.patch("/:id/like", authController.protect, postController.addLike);
router.patch("/:id/unlike", authController.protect, postController.unlike);
router.get("/:id", postController.getPost);

module.exports = router;
