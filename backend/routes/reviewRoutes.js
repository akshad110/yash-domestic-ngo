const express = require("express");

const Review = require("../models/Review");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { name, message, rating } = req.body;

    if (!name || !message || !rating) {
      return res.status(400).json({ message: "name, message and rating are required." });
    }

    const review = await Review.create({
      name,
      message,
      rating,
      status: "pending",
    });

    return res.status(201).json(review);
  } catch (_error) {
    return res.status(500).json({ message: "Unable to create review." });
  }
});

router.get("/", async (req, res) => {
  try {
    const requestedStatus = req.query.status;
    const status = requestedStatus === "pending" ? "pending" : "approved";
    const reviews = await Review.find({ status }).sort({ createdAt: -1 });
    return res.json(reviews);
  } catch (_error) {
    return res.status(500).json({ message: "Unable to fetch reviews." });
  }
});

router.patch("/:id/approve", authMiddleware, async (req, res) => {
  try {
    const review = await Review.findByIdAndUpdate(
      req.params.id,
      { status: "approved" },
      { new: true },
    );

    if (!review) {
      return res.status(404).json({ message: "Review not found." });
    }

    return res.json(review);
  } catch (_error) {
    return res.status(500).json({ message: "Unable to approve review." });
  }
});

router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const review = await Review.findByIdAndDelete(req.params.id);
    if (!review) {
      return res.status(404).json({ message: "Review not found." });
    }

    return res.json({ message: "Review deleted." });
  } catch (_error) {
    return res.status(500).json({ message: "Unable to delete review." });
  }
});

module.exports = router;
