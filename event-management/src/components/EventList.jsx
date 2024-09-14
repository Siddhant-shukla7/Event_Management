import { useEffect, useState } from "react";
import axios from "axios";
import './EventList.css'; // Import the custom CSS file

const EventList = ({ onSelectEvent }) => {
  const [events, setEvents] = useState([]);
  const [error, setError] = useState(""); // Add state to handle errors

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/events');
        setEvents(response.data);
      } catch (error) {
        console.error('Error fetching events:', error);
        setError('Failed to fetch events.');
      }
    };

    fetchEvents();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/events/${id}`); // Fixed URL
      setEvents(events.filter(event => event._id !== id));
    } catch (error) {
      console.error('Error deleting event:', error);
      setError('Failed to delete event.');
    }
  };

  return (
    <div className="event-list-container">
      <h2 className="event-list-title">Upcoming Events</h2>
      {error && <p className="event-list-error">{error}</p>} {/* Display error message */}
      <ul className="event-list">
        {events.map(event => (
          <li key={event._id} className="event-list-item">
            <h3 className="event-list-item-title">{event.eventName}</h3>
            <p className="event-list-item-description">{event.description}</p>
            <p className="event-list-item-date">{event.date}</p>
            <p className="event-list-item-location">{event.location}</p>
            <button
              onClick={() => handleDelete(event._id)}
              className="event-list-item-delete"
            >
              Delete
            </button>
            <button
              onClick={() => onSelectEvent(event)}
              className="event-list-item-view"
            >
              View Details
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EventList;
