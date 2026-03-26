const express = require("express");

const Branch = require("../models/Branch");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", async (_req, res) => {
  try {
    const branches = await Branch.find().sort({ createdAt: -1 });
    return res.json(branches);
  } catch (_error) {
    return res.status(500).json({ message: "Unable to fetch branches." });
  }
});

router.post("/", authMiddleware, async (req, res) => {
  try {
    const { name, description, locationName, latitude, longitude } = req.body;

    if (!name || !description || !locationName) {
      return res.status(400).json({ message: "name, description and locationName are required." });
    }

    const branch = await Branch.create({
      name,
      description,
      locationName,
      latitude: Number(latitude) || 0,
      longitude: Number(longitude) || 0,
    });

    return res.status(201).json(branch);
  } catch (_error) {
    return res.status(500).json({ message: "Unable to create branch." });
  }
});

router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const { name, description, locationName, latitude, longitude } = req.body;

    const branch = await Branch.findByIdAndUpdate(
      req.params.id,
      {
        name,
        description,
        locationName,
        latitude: Number(latitude) || 0,
        longitude: Number(longitude) || 0,
      },
      { new: true },
    );

    if (!branch) {
      return res.status(404).json({ message: "Branch not found." });
    }

    return res.json(branch);
  } catch (_error) {
    return res.status(500).json({ message: "Unable to update branch." });
  }
});

router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const branch = await Branch.findByIdAndDelete(req.params.id);
    if (!branch) {
      return res.status(404).json({ message: "Branch not found." });
    }

    return res.json({ message: "Branch deleted." });
  } catch (_error) {
    return res.status(500).json({ message: "Unable to delete branch." });
  }
});

module.exports = router;
