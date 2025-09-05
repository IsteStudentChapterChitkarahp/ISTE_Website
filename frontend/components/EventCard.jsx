import React, { useContext } from 'react';
import { UserContext } from '../utils/UserContext';

const EventCard = ({ eventDetails }) => {
  const {
    name,
    photoUrl,
    description,
    status,
    venue,
    eventDate,
    time,
    registrationLink,
    createdBy,
  } = eventDetails;

  const { auth } = useContext(UserContext);

  return (
    <div
      style={{
        border: '1px solid #ddd',
        borderRadius: '8px',
        padding: '16px',
        maxWidth: '320px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
      }}
    >
      <img
        src={ photoUrl
            ? photoUrl
            : 'https://play-lh.googleusercontent.com/PhgyB8JGhS6Dl4WI4z6R2nEBUlWoLV7Yk-VHhLiEI5XAfRWmXu5Y2TogfRd8UxC9oPA'
        }
        alt={name}
        style={{
          width: '100%',
          borderRadius: '8px',
          marginBottom: '8px',
          objectFit: 'cover',
        }}
      />

      <h3 style={{ fontWeight: 'bold', fontSize: '18px', marginBottom: '6px' }}>
        {name}
      </h3>
      <p>
        <strong>Venue:</strong> {venue}
      </p>
      <p>
        <strong>Date:</strong>{' '}
        {new Date(eventDate).toLocaleDateString()} {/* ✅ only date */}
      </p>
      <p>
        <strong>Time:</strong> {time ?? 'TBA'}
      </p>
      <p>
        <strong>Status:</strong> {status}
      </p>
      <p style={{ marginBottom: '12px' }}>{description}</p>

      {/* ✅ Register Button */}
      {registrationLink && (
        <a
          href={registrationLink}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'inline-block',
            backgroundColor: '#2563eb',
            color: 'white',
            padding: '8px 16px',
            borderRadius: '6px',
            textDecoration: 'none',
            fontWeight: '500',
            marginBottom: '10px',
          }}
        >
          Register
        </a>
      )}

      {/* ✅ Show creator info only if logged in */}
      {auth && (
        <p style={{ fontSize: '14px', marginTop: '8px', color: '#555' }}>
          Updated By: {createdBy?.firstName ?? 'Unknown'} -{' '}
          {createdBy?.role ?? 'Unknown'}
        </p>
      )}
    </div>
  );
};

export default EventCard;
