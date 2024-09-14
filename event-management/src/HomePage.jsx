import { useState } from "react";
import EventDetail from "./components/EventDetail";
import EventList from "./components/EventList";
import CreateEvent from "./components/CreateEvent"; // Ensure this is the correct path

function HomePage() {

  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showCreateEvent, setShowCreateEvent] = useState(false);


  // Handle event creation
  const handleCreateEvent = async (newEvent) => {
    try {
      const response = await fetch('http://localhost:5000/api/events', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newEvent),
      });
  
      setShowCreateEvent(false);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const data = await response.json();
      console.log('Event created successfully:', data);
  
    } catch (error) {
      console.error('Failed to create event:', error);
    }
  };

  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold text-center my-6">Event Management</h1>

      {showCreateEvent ? (
        <CreateEvent onCreateEvent={handleCreateEvent} />
      ) : selectedEvent ? (
        <>
          <button
            className="mb-4 text-blue-500 underline"
            onClick={() => setSelectedEvent(null)}
          >
            Back to event list
          </button>
          <EventDetail event={selectedEvent} />
        </>
      ) : (
        <>
          <button
            onClick={() => setShowCreateEvent(true)}
            className="bg-blue-500 text-white py-2 px-4 rounded mb-4"
          >
            Create New Event
          </button>
          <div className="max-h-[500px] overflow-y-auto"> {/* Scroll container */}
            <EventList onSelectEvent={setSelectedEvent} />
          </div>
        </>
      )}
    </div>
  );
}

export default HomePage;
