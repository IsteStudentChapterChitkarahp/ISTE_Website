import React, { useEffect, useState } from 'react';
import EventCard from './EventCard';

const Events = () => {
    const [events, setEvents] = useState([]);
    
useEffect(()=>{
fetch("http://localhost:5000/events")
    .then(fetchedEvents => fetchedEvents.json())
    .then((res) => {
        setEvents(res);
        console.log(res);
})
    .catch(error => console.error("Error fetching events:", error));

},[])
    
    return (
        <div>
            {
            events.map((e)=>(
                <EventCard key={e._id} eventDetails={e}/>
            ))
            }
        </div>
    );
};

export default Events;