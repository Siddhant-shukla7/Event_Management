import { useState } from "react";
import PropTypes from 'prop-types';
import axios from "axios";

const EventForm = ({ onCreateEvent }) => {
  const [eventName, setEventName] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [location, setLocation] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const newEvent = {
      eventName,
      description,
      date,
      location,
    };

    try {
      const response = await axios.post('http://localhost:5000/api/events', newEvent);
      console.log('Event created:', response.data);

      // If the parent component needs to do something with the new event
      if (onCreateEvent) {
        onCreateEvent(response.data); // Optional: send back to parent
      }

      // Clear form fields after successful submission
      setEventName("");
      setDescription("");
      setDate("");
      setLocation("");

    } catch (error) {
      console.error('Error creating event:', error);
      setErrorMessage("There was an issue creating the event.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
      <div className="mb-4">
        <label className="block text-gray-700">Event Name:</label>
        <input
          type="text"
          value={eventName}
          onChange={(e) => setEventName(e.target.value)}
          className="mt-1 p-2 border w-full rounded-md"
          placeholder="Enter event name"
          required
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700">Description:</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="mt-1 p-2 border w-full rounded-md"
          placeholder="Enter event description"
          required
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700">Date:</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="mt-1 p-2 border w-full rounded-md"
          required
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700">Location:</label>
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="mt-1 p-2 border w-full rounded-md"
          placeholder="Enter location"
          required
        />
      </div>

      {errorMessage && <p className="text-red-500">{errorMessage}</p>}

      <button
        type="submit"
        className="bg-blue-500 text-white py-2 px-4 rounded-md"
      >
        Create Event
      </button>
    </form>
  );
};

// Define prop-types to validate props
EventForm.propTypes = {
  onCreateEvent: PropTypes.func,
};

export default EventForm;
