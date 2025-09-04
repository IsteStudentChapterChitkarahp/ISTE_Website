import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../utils/UserContext';

const TeamCard = ({teamDetails}) => {
    const { firstName,photoUrl,role, username, description } = teamDetails;
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
    alt={firstName} 
    style={{ width: '100%', borderRadius: '8px', marginBottom: '8px' }} 
/>
            <h3> {firstName}</h3>
            <p>{role}</p>
            <p>{description}</p>
{        auth ? 
(<p>Email-Id: {username}</p>
) : null
}

      </div>
    );
};

export default TeamCard