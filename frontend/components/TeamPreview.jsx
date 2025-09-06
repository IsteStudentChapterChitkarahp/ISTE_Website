import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import TeamCard from "./TeamCard";
import { Users, ArrowRight, GraduationCap } from 'lucide-react';

const TeamPreview = () => {
    const [facultyData, setFacultyData] = useState([]);
    const [loading, setLoading] = useState(true);

    // Function to check if member is faculty
    const isFaculty = (member) => {
        const facultyRoles = [
            'faculty coordinator',
            'coordinator',
            'professor',
            'dr.',
            'faculty',
            'advisor',
            'mentor'
        ];
        
        const role = member.role?.toLowerCase() || '';
        const name = member.firstName?.toLowerCase() || '';
        
        return facultyRoles.some(facultyRole => 
            role.includes(facultyRole) || name.includes('dr.')
        );
    };

    useEffect(() => {
        fetch("http://localhost:5000/user/details")
            .then((res) => res.json())
            .then((data) => {
                // Filter only faculty members
                const facultyMembers = data.filter(member => isFaculty(member));
                console.log("Faculty members:", facultyMembers);
                setFacultyData(facultyMembers);
                setLoading(false);
            })
            .catch(error => {
                console.error("Error fetching team data:", error);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return (
            <div className="min-h-96 bg-gradient-to-br from-gray-900 via-black to-gray-800 flex items-center justify-center">
                <div className="text-white text-lg flex items-center space-x-2">
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                    <span>Loading faculty...</span>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 py-12 px-4" id="team">
            <div className="max-w-7xl mx-auto">
                {/* Header Section */}
                <div className="text-center mb-12">
                    <div className="flex items-center justify-center mb-4">
                        <GraduationCap className="w-8 h-8 text-blue-400 mr-3" />
                        <h2 className="text-4xl md:text-5xl font-bold text-white">
                            Faculty <span className="text-blue-400">Coordinators</span>
                        </h2>
                    </div>
                    <p className="text-gray-300 text-lg max-w-2xl mx-auto mb-8">
                        Meet our dedicated faculty members who guide and mentor our student chapter
                    </p>
                </div>

                {/* Faculty Grid */}
                {facultyData.length > 0 ? (
                    <>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center mb-12">
                            {facultyData.map((member) => (
                                <TeamCard key={member._id} teamDetails={member} />
                            ))}
                        </div>
                        
                        {/* View All Team Button */}
                        <div className="text-center">
                            <Link 
                                to="/team"
                                className="inline-flex items-center bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold py-4 px-8 rounded-lg shadow-lg transform hover:scale-105 transition-all duration-300 hover:shadow-xl text-lg"
                            >
                                <Users className="w-5 h-5 mr-2" />
                                <span>Meet Our Full Team</span>
                                <ArrowRight className="w-5 h-5 ml-2" />
                            </Link>
                        </div>
                    </>
                ) : (
                    <div className="text-center py-20">
                        <GraduationCap className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                        <div className="text-gray-400 text-xl mb-4">No faculty coordinators found</div>
                        <p className="text-gray-500">Faculty information will be updated soon!</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default TeamPreview;