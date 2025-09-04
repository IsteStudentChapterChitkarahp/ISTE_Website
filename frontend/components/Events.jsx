import React from 'react';

const Events = () => {
    const [events, setEvents] = useState([]);

    const fetchedEvents = fetch("https://localhost:3000")
    return (
        <div>
            <h2>Events</h2>
            <p>Welcome to the Events page!</p>
        </div>
    );
};

export default Events;