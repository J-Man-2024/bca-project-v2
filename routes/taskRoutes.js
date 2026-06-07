const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");

const { createTask } = require("../controllers/taskController");

router.route("/").post(protect, createTask);

module.exports = router;
