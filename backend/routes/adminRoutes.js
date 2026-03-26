const express = require("express");

const Review = require("../models/Review");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.use(authMiddleware);

router.get("/reviews", async (_req, res) => {
  try {
    const reviews = await Review.find().sort({ createdAt: -1 });
    return res.json(reviews);
  } catch (_error) {
    return res.status(500).json({ message: "Unable to fetch admin reviews." });
  }
});

module.exports = router;
