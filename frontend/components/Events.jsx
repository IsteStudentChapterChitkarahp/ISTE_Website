import React, { useEffect, useState } from 'react';
import EventCard from './EventCard';

const Events = () => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        fetch("http://localhost:5000/events")
            .then(fetchedEvents => fetchedEvents.json())
            .then((res) => {
                setEvents(res);
                console.log(res);
                setLoading(false);
            })
            .catch(error => {
                console.error("Error fetching events:", error);
                setLoading(false);
            });
    }, []);
    
    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 flex items-center justify-center">
                <div className="text-white text-lg">Loading events...</div>
            </div>
        );
    }
    
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 py-12 px-4">
            <div className="max-w-7xl mx-auto">
                {/* Header Section */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                        Upcoming <span className="text-blue-400">Events</span>
                    </h1>
                    <p className="text-gray-300 text-lg max-w-2xl mx-auto">
                        Discover and register for our latest workshops, seminars, and technical sessions
                    </p>
                </div>

                {/* Events Grid */}
                {events.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 justify-items-center">
                        {events.map((e) => (
                            <EventCard key={e._id} eventDetails={e} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20">
                        <div className="text-gray-400 text-xl mb-4">No events available</div>
                        <p className="text-gray-500">Check back later for upcoming events!</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Events;