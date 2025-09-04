import React from 'react';

const EventCard = () => {
    return (
        <div style={{
            border: '1px solid #ddd',
            borderRadius: '8px',
            padding: '16px',
            maxWidth: '300px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
        }}>
            <h3>Event Title</h3>
            <p>Date: 2024-06-01</p>
            <p>Description of the event goes here.</p>
        </div>
    );
};

export default EventCard