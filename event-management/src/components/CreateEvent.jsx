import { useState } from "react";
import PropTypes from 'prop-types';
import './CreateEvent.css'; // Import the custom CSS file

const CreateEvent = ({ onCreateEvent }) => {
  const [eventName, setEventName] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [location, setLocation] = useState("");
  const [error, setError] = useState(""); // Add state to handle errors

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create the new event object
    const newEvent = { eventName, description, date, location };

    try {
      // Call the parent function to handle event creation
      await onCreateEvent(newEvent);
      // Reset form fields
      setEventName("");
      setDescription("");
      setDate("");
      setLocation("");
      setError(""); // Clear any previous errors
    } catch (err) {
      // Set error message to display to the user
      setError("Failed to create event. Please try again.");
    }
  };

  return (
    <div className="create-event-container">
      <h2 className="create-event-title">Create New Event</h2>
      {error && <p className="create-event-error">{error}</p>} {/* Display error message */}
      <form onSubmit={handleSubmit} className="create-event-form">
        <div className="create-event-field">
          <label htmlFor="eventName" className="create-event-label">Event Name:</label>
          <input
            id="eventName"
            type="text"
            value={eventName}
            onChange={(e) => setEventName(e.target.value)}
            className="create-event-input"
            placeholder="Enter event name"
            required
          />
        </div>
        <div className="create-event-field">
          <label htmlFor="description" className="create-event-label">Description:</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="create-event-textarea"
            placeholder="Enter event description"
            required
          />
        </div>
        <div className="create-event-field">
          <label htmlFor="date" className="create-event-label">Date:</label>
          <input
            id="date"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="create-event-input"
            required
          />
        </div>
        <div className="create-event-field">
          <label htmlFor="location" className="create-event-label">Location:</label>
          <input
            id="location"
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="create-event-input"
            placeholder="Enter location"
            required
          />
        </div>
        <div className="create-event-submit">
          <button
            type="submit"
            className="create-event-button"
          >
            Create Event
          </button>
        </div>
      </form>
    </div>
  );
};

// Define prop-types to validate props
CreateEvent.propTypes = {
  onCreateEvent: PropTypes.func.isRequired,
};

export default CreateEvent;
