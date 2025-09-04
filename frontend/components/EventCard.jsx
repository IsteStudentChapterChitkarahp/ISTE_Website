import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../utils/UserContext';

const EventCard = ({eventDetails}) => {
    const { name,photoUrl, description, status, venue, eventDate, createdBy } = eventDetails;
  const { auth } = useContext(UserContext);
       
    return (
        <div style={{
            border: '1px solid #ddd',
            borderRadius: '8px',
            padding: '16px',
            maxWidth: '300px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
        }}>
<img 
    src={photoUrl ? photoUrl : "https://play-lh.googleusercontent.com/PhgyB8JGhS6Dl4WI4z6R2nEBUlWoLV7Yk-VHhLiEI5XAfRWmXu5Y2TogfRd8UxC9oPA"} 
    alt={name} 
    style={{ width: '100%', borderRadius: '8px', marginBottom: '8px' }} 
/>
            <h3>Event: {name}</h3>
            <p>Venue: {venue}</p>
            <p>Date: {new Date(eventDate).toLocaleString()}</p>
            <p>Status: {status}</p>
            <p>Description: {description}</p>
{        auth ? 
(<p>Updated By: {createdBy?.firstName ?? "Unknown"}- {createdBy?.role ?? "Unknown"}</p>
) : null
}        </div>
    );
};

export default EventCard