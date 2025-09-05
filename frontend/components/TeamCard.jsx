import React, { useContext } from 'react';
import { UserContext } from '../utils/UserContext';

const TeamCard = ({ teamDetails }) => {
    const { firstName, photoUrl, role, username, description } = teamDetails;
    const { auth } = useContext(UserContext);

    const getRoleColor = (role) => {
        switch (role?.toLowerCase()) {
            case 'president':
            case 'chairperson':
                return 'text-yellow-400 bg-yellow-400';
            case 'vice president':
            case 'vice-president':
                return 'text-orange-400 bg-orange-400';
            case 'secretary':
                return 'text-green-400 bg-green-400';
            case 'treasurer':
                return 'text-blue-400 bg-blue-400';
            case 'coordinator':
            case 'member':
                return 'text-purple-400 bg-purple-400';
            default:
                return 'text-blue-400 bg-blue-400';
        }
    };

    return (
        <div className="bg-black bg-opacity-80 backdrop-blur-sm rounded-xl p-6 max-w-sm border border-gray-700 shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 hover:bg-opacity-90 group">
            {/* Profile Image */}
            <div className="relative mb-4 overflow-hidden rounded-lg">
                <img 
                    src={photoUrl ? photoUrl : "https://play-lh.googleusercontent.com/PhgyB8JGhS6Dl4WI4z6R2nEBUlWoLV7Yk-VHhLiEI5XAfRWmXu5Y2TogfRd8UxC9oPA"} 
                    alt={firstName} 
                    className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-110"
                />
            </div>

            {/* Member Name */}
            <h3 className="text-2xl font-bold text-white mb-2 text-center group-hover:text-blue-400 transition-colors duration-200">
                {firstName}
            </h3>

            {/* Role Display */}
            <div className="text-center mb-4">
                <span className="inline-block px-4 py-2 rounded-full text-sm font-semibold text-black bg-blue-400">
                    {role}
                </span>
            </div>

            {/* Description */}
            {description && (
                <p className="text-gray-300 text-sm mb-4 leading-relaxed text-center line-clamp-3">
                    {description}
                </p>
            )}

            {/* Contact Info (only if logged in) */}
            {auth && username && (
                <div className="pt-4 border-t border-gray-600">
                    <div className="flex items-center justify-center space-x-2">
                        <svg className="w-4 h-4 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/>
                            <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/>
                        </svg>
                        <p className="text-xs text-gray-400">
                            {username}
                        </p>
                    </div>
                </div>
            )}

            {/* Hover Effect Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-blue-600 via-transparent to-transparent opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-xl pointer-events-none"></div>
        </div>
    );
};

export default TeamCard;