import { useState } from "react";
import axios from "axios";
import PropTypes from "prop-types";

const EventDetail = ({ event }) => {
  const [attendeeName, setAttendeeName] = useState("");
  const [eventAttendees, setEventAttendees] = useState(event.attendees || []);
  const [rsvpStatus, setRsvpStatus] = useState("");

  // Handle adding an attendee
  const handleAddAttendee = async (e) => {
    e.preventDefault();
    if (attendeeName) {
      try {
        // Assuming you have an API to add attendees
        const response = await axios.post(`http://localhost:5000/api/events/${event._id}/attendees`, {
          name: attendeeName,
        });
        setEventAttendees([...eventAttendees, response.data.attendee]);
        setAttendeeName(""); // Clear input after adding
      } catch (error) {
        console.error("Error adding attendee:", error);
      }
    }
  };

  // Handle RSVP functionality
  const handleRsvp = async (status) => {
    try {
      const response = await axios.post(`http://localhost:5000/api/events/${event._id}/rsvp`, {
        userId: "user123", // Replace this with a real userId from your auth system
        status,
      });
      setRsvpStatus(response.data.status); // Update the RSVP status based on the backend response
    } catch (error) {
      console.error("Error sending RSVP:", error);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-3xl font-bold mb-4">{event.eventName}</h2>
      <p className="mb-2 text-gray-600">{event.description}</p>
      <p className="mb-2 font-semibold">Date: {event.date}</p>
      <p className="mb-2 font-semibold">Location: {event.location}</p>

      {/* RSVP Section */}
      <div className="mt-4">
        <h3 className="text-2xl font-semibold mb-2">RSVP:</h3>
        <button
          onClick={() => handleRsvp("attending")}
          className={`mr-4 p-2 ${rsvpStatus === "attending" ? "bg-green-500" : "bg-gray-200"} text-white rounded-md`}
        >
          Attending
        </button>
        <button
          onClick={() => handleRsvp("not attending")}
          className={`p-2 ${rsvpStatus === "not attending" ? "bg-red-500" : "bg-gray-200"} text-white rounded-md`}
        >
          Not Attending
        </button>
      </div>

      {/* Attendees List */}
      <div className="mt-4">
        <h3 className="text-2xl font-semibold mb-2">Attendees:</h3>
        <ul className="list-disc pl-6">
          {eventAttendees && eventAttendees.length > 0 ? (
            eventAttendees.map((attendee, index) => (
              <li key={index} className="mb-1">{attendee.name}</li>  /* Ensure attendee has a 'name' field */
            ))
          ) : (
            <p>No attendees yet</p>
          )}
        </ul>
      </div>

      {/* Add Attendee Form */}
      <form onSubmit={handleAddAttendee} className="mt-4">
        <input
          type="text"
          value={attendeeName}
          onChange={(e) => setAttendeeName(e.target.value)}
          placeholder="Enter attendee name"
          className="p-2 border rounded-md w-full mb-2"
          required
        />
        <button
          type="submit"
          className="bg-green-500 text-white py-2 px-4 rounded-md"
        >
          Add Attendee
        </button>
      </form>
    </div>
  );
};

// Move PropTypes outside the component
EventDetail.propTypes = {
  event: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    eventName: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
    attendees: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string,
        status: PropTypes.string,
      })
    ),
  }).isRequired,
};

export default EventDetail;
