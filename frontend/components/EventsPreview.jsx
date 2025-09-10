import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, ArrowRight } from 'lucide-react';
import EventCard from './EventCard';

const EventsPreview = () => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        fetch("http://localhost:5000/events")
            .then(fetchedEvents => fetchedEvents.json())
            .then((res) => {
                // Filter only completed events and show first 2
                const completedEvents = res.filter(event => 
                    event.status?.toLowerCase() === 'upcoming'
                ).slice(0, 2);
                setEvents(completedEvents);
                // console.log(completedEvents);
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
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-400"></div>
                    <span>Loading completed events...</span>
                </div>
            </div>
        );
    }
    
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 py-16 px-4" id="events">
            <div className="max-w-7xl mx-auto">
                {/* Header Section */}
                <div className="text-center mb-16">
                    <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">
                        Upcoming <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">Events</span>
                    </h2>
                    <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-purple-400 mx-auto mb-8"></div>
                    <p className="text-slate-300 text-xl max-w-4xl mx-auto leading-relaxed">
                       Be part of our exciting events where you’ll boost your technical skills, connect with like-minded people, and explore the latest technologies through hands-on learning.
                    </p>
                </div>

                {/* Events Display */}
                {events.length > 0 ? (
                    <>
                        <div className="space-y-16 mb-20">
                            {events.map((e, index) => (
                                <div key={e._id} className={`${index % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}>
                                    <EventCard eventDetails={e} isPreview={true} />
                                </div>
                            ))}
                        </div>
                        
                        {/* View All Events Button */}
                        <div className="text-center">
                            <Link 
                                to="/events"
                                className="inline-flex items-center bg-gradient-to-r from-blue-600 to-purple-700 hover:from-blue-500 hover:to-purple-600 text-white font-bold py-5 px-10 rounded-xl shadow-2xl transform hover:scale-105 transition-all duration-300 hover:shadow-blue-500/30 text-xl border border-slate-700/50 hover:border-slate-600/70"
                            >
                                <span>View All Events</span>
                                <ArrowRight className="w-6 h-6 ml-3" />
                            </Link>
                        </div>
                    </>
                ) : (
                    <div className="text-center py-20">
                        <Calendar className="w-20 h-20 text-slate-500 mx-auto mb-6" />
                        <div className="text-slate-300 text-2xl mb-4">No completed events available</div>
                        <p className="text-slate-400 text-lg">Check back later to see our successful events!</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default EventsPreview;