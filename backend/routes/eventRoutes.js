const express = require("express");
const Event = require("../models/Event");
const User = require("../models/User");
const router = express.Router();

// Create a new event
router.post("/events", async (req, res) => {
  try {
    const newEvent = new Event(req.body);
    await newEvent.save();
    const events = await Event.findAll();
    res.status(201).json(events);
  } catch (err) {
    res.status(400).json({ error: "Failed to create event" });
  }
});

// Get all events
router.get("/events", async (req, res) => {
  try {
    const events = await Event.find();
    res.status(200).json(events);
  } catch (err) {
    res.status(400).json({ error: "Failed to fetch events" });
  }
});

// Get a specific event
router.get("/events/:id", async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (event) {
      res.status(200).json(event);
    } else {
      res.status(404).json({ error: "Event not found" });
    }
  } catch (err) {
    res.status(400).json({ error: "Failed to fetch event" });
  }
});

// Delete an event
router.delete("/events/:id", async (req, res) => {
  try {
    const event = await Event.findByIdAndDelete(req.params.id);
    if (event) {
      res.status(200).json({ message: "Event deleted" });
    } else {
      res.status(404).json({ error: "Event not found" });
    }
  } catch (err) {
    res.status(400).json({ error: "Failed to delete event" });
  }
});

// RSVP to an event
router.post('/events/:id/rsvp', async (req, res) => {
  try {
    const eventId = req.params.id;
    const { userId, status } = req.body;

    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    const existingRsvp = event.rsvps.find(rsvp => rsvp.userId === userId);
    if (existingRsvp) {
      existingRsvp.status = status;
    } else {
      event.rsvps.push({ userId, status });
    }

    await event.save();
    res.status(200).json(event);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
