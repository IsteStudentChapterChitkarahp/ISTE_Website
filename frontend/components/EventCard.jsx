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

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'active':
      case 'upcoming':
        return 'bg-green-400';
      case 'completed':
        return 'bg-blue-400';
      case 'cancelled':
        return 'bg-red-400';
      default:
        return 'bg-blue-400';
    }
  };

  return (
    <div className="bg-black bg-opacity-10 backdrop-blur-sm rounded-xl p-6 max-w-sm border border-white border-opacity-20 shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 hover:bg-opacity-15">
      {/* Event Image */}
      <div className="relative mb-4 overflow-hidden rounded-lg">
        <img
          src={
            photoUrl
              ? photoUrl
              : 'https://play-lh.googleusercontent.com/PhgyB8JGhS6Dl4WI4z6R2nEBUlWoLV7Yk-VHhLiEI5XAfRWmXu5Y2TogfRd8UxC9oPA'
          }
          alt={name}
          className="w-full h-48 object-cover transition-transform duration-300 hover:scale-110"
        />
        {/* Status Badge */}
        <div className={`absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-bold ${getStatusColor(status)}`}>
          {status}
        </div>
      </div>

      {/* Event Title */}
      <h3 className="text-xl font-bold text-white mb-3 leading-tight hover:text-blue-400 transition-colors duration-200">
        {name}
      </h3>

      {/* Event Details */}
      <div className="space-y-2 mb-4">
        <div className="flex items-start">
          <span className="text-blue-400 font-medium text-sm w-16 flex-shrink-0">Venue:</span>
          <span className="text-gray-200 text-sm">{venue}</span>
        </div>
        
        <div className="flex items-start">
          <span className="text-blue-400 font-medium text-sm w-16 flex-shrink-0">Date:</span>
          <span className="text-gray-200 text-sm">
            {new Date(eventDate).toLocaleDateString()}
          </span>
        </div>
        
        <div className="flex items-start">
          <span className="text-blue-400 font-medium text-sm w-16 flex-shrink-0">Time:</span>
          <span className="text-gray-200 text-sm">{time ?? 'TBA'}</span>
        </div>
      </div>

      {/* Description */}
      <p className="text-gray-300 text-sm mb-6 leading-relaxed line-clamp-3">
        {description}
      </p>

      {/* Register Button */}
      {registrationLink && (
        <a
          href={registrationLink}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-lg text-center text-sm shadow-lg transform hover:scale-105 transition-all duration-300 hover:shadow-xl mb-4"
        >
          Register Now
        </a>
      )}

      {/* Creator Info (only if logged in) */}
      {auth && (
        <div className="pt-3 border-t border-white border-opacity-20">
          <p className="text-xs text-gray-400">
            <span className="font-medium">Updated by:</span>{' '}
            <span className="text-blue-300">{createdBy?.firstName ?? 'Unknown'}</span>
            {createdBy?.role && (
              <>
                {' • '}
                <span className="text-purple-300">{createdBy.role}</span>
              </>
            )}
          </p>
        </div>
      )}
    </div>
  );
};

export default EventCard;