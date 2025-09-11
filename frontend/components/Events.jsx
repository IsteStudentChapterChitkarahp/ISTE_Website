import { API_URL } from '../src/api';
import React, { useEffect, useState } from 'react';
import EventCard from './EventCard';
import { Calendar, Filter, Search } from 'lucide-react';

const Events = () => {
    const [events, setEvents] = useState([]);
    const [filteredEvents, setFilteredEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    
    useEffect(() => {
    fetch(`${API_URL}/events`)
            .then(fetchedEvents => fetchedEvents.json())
            .then((res) => {
                setEvents(res);
                setFilteredEvents(res);
                // console.log(res);
                setLoading(false);
            })
            .catch(error => {
                console.error("Error fetching events:", error);
                setLoading(false);
            });
    }, []);

    // Filter and search functionality
    useEffect(() => {
        let filtered = events;

        // Filter by status
        if (statusFilter !== 'all') {
            filtered = filtered.filter(event => 
                event.status?.toLowerCase() === statusFilter.toLowerCase()
            );
        }

        // Search by name or description
        if (searchTerm) {
            filtered = filtered.filter(event => 
                event.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                event.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                event.venue?.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        setFilteredEvents(filtered);
    }, [events, searchTerm, statusFilter]);
    
    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 flex items-center justify-center">
                <div className="text-white text-lg flex items-center space-x-2">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-400"></div>
                    <span>Loading all events...</span>
                </div>
            </div>
        );
    }
    
    return (
        <div className="mt-16 min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 py-12 px-4">
            <div className="max-w-7xl mx-auto">
                {/* Header Section */}
                <div className="text-center mb-16">
                    <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
                        Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">Events</span>
                    </h1>
                    <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-purple-400 mx-auto mb-8"></div>
                    <p className="text-slate-300 text-xl max-w-3xl mx-auto mb-6">
                        Explore our collection of successful workshops, seminars, and technical sessions
                    </p>
                    <div className="text-blue-400 font-semibold text-lg">
                        {filteredEvents.length} {filteredEvents.length === 1 ? 'event' : 'events'} found
                    </div>
                </div>

                {/* Search and Filter Section */}
                <div className="mb-12 max-w-4xl mx-auto">
                    <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50">
                        <div className="flex flex-col md:flex-row gap-4">
                            {/* Search Bar */}
                            <div className="flex-1 relative">
                                <input
                                    type="text"
                                    placeholder="Search events by name, description, or venue..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600/50 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                />
                            </div>

                            {/* Status Filter */}
                            <div className="relative">
                                <select
                                    value={statusFilter}
                                    onChange={(e) => setStatusFilter(e.target.value)}
                                    className="px-4 py-3 bg-slate-700/50 border border-slate-600/50 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 appearance-none cursor-pointer min-w-40"
                                >
                                    <option value="all">All Status</option>
                                    <option value="active">Active</option>
                                    <option value="upcoming">Upcoming</option>
                                    <option value="completed">Completed</option>
                                    <option value="cancelled">Cancelled</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Events Grid */}
                {filteredEvents.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
                        {filteredEvents.map((e) => (
                            <EventCard key={e._id} eventDetails={e} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20">
                        <Calendar className="w-20 h-20 text-slate-500 mx-auto mb-6" />
                        <div className="text-slate-300 text-2xl mb-4">
                            {searchTerm || statusFilter !== 'all' ? 'No matching events found' : 'No events available'}
                        </div>
                        <p className="text-slate-400 text-lg">
                            {searchTerm || statusFilter !== 'all' 
                                ? 'Try adjusting your search or filter criteria' 
                                : 'Check back later for upcoming events!'
                            }
                        </p>
                        {(searchTerm || statusFilter !== 'all') && (
                            <button
                                onClick={() => {
                                    setSearchTerm('');
                                    setStatusFilter('all');
                                }}
                                className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg transition-colors duration-200"
                            >
                                Clear Filters
                            </button>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Events;