const express = require("express");

const Event = require("../models/Event");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const domain = req.query.domain;
    const query = {};

    if (
      domain &&
      ["medical-hub", "social-growth", "animal-eco-care"].includes(domain)
    ) {
      query.domain = domain;
    }

    const events = await Event.find(query).sort({ eventDate: 1, createdAt: -1 });
    return res.json(events);
  } catch (_error) {
    return res.status(500).json({ message: "Unable to fetch events." });
  }
});

router.post("/", authMiddleware, async (req, res) => {
  try {
    const { title, description, domain, eventType, eventDate } = req.body;
    if (!title || !description || !domain || !eventType || !eventDate) {
      return res.status(400).json({ message: "All event fields are required." });
    }

    const createdEvent = await Event.create({
      title,
      description,
      domain,
      eventType,
      eventDate,
    });

    return res.status(201).json(createdEvent);
  } catch (_error) {
    return res.status(500).json({ message: "Unable to create event." });
  }
});

router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const { title, description, domain, eventType, eventDate } = req.body;
    const updated = await Event.findByIdAndUpdate(
      req.params.id,
      { title, description, domain, eventType, eventDate },
      { new: true },
    );

    if (!updated) {
      return res.status(404).json({ message: "Event not found." });
    }

    return res.json(updated);
  } catch (_error) {
    return res.status(500).json({ message: "Unable to update event." });
  }
});

router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const deleted = await Event.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: "Event not found." });
    }
    return res.json({ message: "Event deleted." });
  } catch (_error) {
    return res.status(500).json({ message: "Unable to delete event." });
  }
});

module.exports = router;
