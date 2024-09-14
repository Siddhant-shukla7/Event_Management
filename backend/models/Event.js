const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  eventName: { type: String, required: true },
  description: { type: String, required: true },
  date: { type: String, required: true },
  location: { type: String, required: true },
  attendees: { type: [String], default: [] },
  rsvps: [{             // New field for RSVPs
    userId: String,
    status: { type: String, enum: ['attending', 'not attending'], default: 'not attending' }
  }]
});

const Event = mongoose.model("Event", eventSchema);
module.exports = Event;
