import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import EventCard from './EventCard';
import { Calendar, ArrowRight } from 'lucide-react';

const EventsPreview = () => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        fetch("http://localhost:5000/events")
            .then(fetchedEvents => fetchedEvents.json())
            .then((res) => {
                // Show only the first 2 events on home page
                setEvents(res.slice(0, 2));
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
            <div className="min-h-96 bg-gradient-to-br from-gray-900 via-black to-gray-800 flex items-center justify-center">
                <div className="text-white text-lg flex items-center space-x-2">
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                    <span>Loading events...</span>
                </div>
            </div>
        );
    }
    
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 py-12 px-4" id="events">
            <div className="max-w-7xl mx-auto">
                {/* Header Section */}
                <div className="text-center mb-12">
                    <div className="flex items-center justify-center mb-4">
                        <Calendar className="w-8 h-8 text-blue-400 mr-3" />
                        <h2 className="text-4xl md:text-5xl font-bold text-white">
                            Featured <span className="text-blue-400">Events</span>
                        </h2>
                    </div>
                    <p className="text-gray-300 text-lg max-w-2xl mx-auto mb-8">
                        Don't miss out on our latest workshops, seminars, and technical sessions
                    </p>
                </div>

                {/* Events Grid */}
                {events.length > 0 ? (
                    <>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 justify-items-center mb-12">
                            {events.map((e) => (
                                <EventCard key={e._id} eventDetails={e} />
                            ))}
                        </div>
                        
                        {/* View All Events Button */}
                        <div className="text-center">
                            <Link 
                                to="/events"
                                className="inline-flex items-center bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-4 px-8 rounded-lg shadow-lg transform hover:scale-105 transition-all duration-300 hover:shadow-xl text-lg"
                            >
                                <span>View All Events</span>
                                <ArrowRight className="w-5 h-5 ml-2" />
                            </Link>
                        </div>
                    </>
                ) : (
                    <div className="text-center py-20">
                        <Calendar className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                        <div className="text-gray-400 text-xl mb-4">No events available</div>
                        <p className="text-gray-500">Check back later for upcoming events!</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default EventsPreview;