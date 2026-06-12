const express = require("express");

const router = express.Router();

const { protect } = require("../middleware/authMiddleware");

const { getInsights } = require("../controllers/aiController");

router.use(protect);

router.get("/insights", getInsights);

module.exports = router;
