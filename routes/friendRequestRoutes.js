const express = require("express");
const friendRequestController = require("../controllers/friendRequestController");

const router = express.Router();

router.post("/create", friendRequestController.create);

module.exports = router;
