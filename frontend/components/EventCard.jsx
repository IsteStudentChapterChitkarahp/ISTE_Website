import React, { useContext, useState } from 'react';
import { UserContext } from '../utils/UserContext';
import { Calendar, Clock, MapPin, User, ExternalLink, Camera, X, ChevronLeft, ChevronRight } from 'lucide-react';

const EventCard = ({ eventDetails, isPreview = false }) => {
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
  const [showPhotoGallery, setShowPhotoGallery] = useState(false);
  const [photos, setPhotos] = useState([]);
  const [loadingPhotos, setLoadingPhotos] = useState(false);
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);

  const fetchEventPhotos = async () => {
    try {
      setLoadingPhotos(true);
      const response = await fetch('/api/event/images'); // Adjust base URL as needed
      if (response.ok) {
        const allPhotos = await response.json();
        // Filter photos for this specific event
        const eventPhotos = allPhotos.filter(photo => 
          photo.eventTitle.toLowerCase() === name.toLowerCase()
        );
        setPhotos(eventPhotos);
        setShowPhotoGallery(true);
        setCurrentPhotoIndex(0);
      } else {
        console.error('Failed to fetch photos');
      }
    } catch (error) {
      console.error('Error fetching photos:', error);
    } finally {
      setLoadingPhotos(false);
    }
  };

  const closePhotoGallery = () => {
    setShowPhotoGallery(false);
    setPhotos([]);
    setCurrentPhotoIndex(0);
  };

  const nextPhoto = () => {
    setCurrentPhotoIndex((prev) => (prev + 1) % photos.length);
  };

  const prevPhoto = () => {
    setCurrentPhotoIndex((prev) => (prev - 1 + photos.length) % photos.length);
  };

  const getStatusStyles = (status) => {
    switch (status?.toLowerCase()) {
      case 'active':
      case 'upcoming':
        return {
          bg: 'bg-gradient-to-r from-emerald-500 to-teal-600',
          text: 'text-white',
          glow: 'shadow-emerald-500/40'
        };
      case 'completed':
        return {
          bg: 'bg-gradient-to-r from-blue-500 to-indigo-600',
          text: 'text-white',
          glow: 'shadow-blue-500/40'
        };
      case 'cancelled':
        return {
          bg: 'bg-gradient-to-r from-red-500 to-rose-600',
          text: 'text-white',
          glow: 'shadow-red-500/40'
        };
      default:
        return {
          bg: 'bg-gradient-to-r from-slate-500 to-slate-700',
          text: 'text-white',
          glow: 'shadow-slate-500/40'
        };
    }
  };

  const statusStyles = getStatusStyles(status);

  // Photo Gallery Modal Component
  const PhotoGalleryModal = () => {
    if (!showPhotoGallery) return null;

    return (
      <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center">
        <div className="relative w-full h-full flex items-center justify-center p-4">
          {/* Close Button */}
          <button
            onClick={closePhotoGallery}
            className="absolute top-4 right-4 z-60 bg-slate-800/80 hover:bg-slate-700/80 text-white rounded-full p-2 transition-all duration-200"
          >
            <X className="w-6 h-6" />
          </button>

          {photos.length === 0 ? (
            <div className="text-center">
              <Camera className="w-16 h-16 text-slate-400 mx-auto mb-4" />
              <p className="text-slate-300 text-xl">No photos available for this event</p>
            </div>
          ) : (
            <>
              {photos.length === 1 ? (
                // Single photo display
                <div className="flex justify-center">
                  <div className="relative max-w-2xl">
                    <img
                      src={photos[0].photoUrl}
                      alt={photos[0].imageTitle || `${name} photo`}
                      className="max-w-full max-h-[60vh] object-contain rounded-xl shadow-2xl"
                      onError={(e) => {
                        console.error('Single image failed to load:', photos[0].photoUrl);
                        e.target.src = 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80';
                      }}
                    />
                    
                    {/* Photo Info */}
                    <div className="mt-4 bg-slate-700/50 rounded-lg p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          {photos[0].imageTitle && (
                            <h3 className="text-white font-semibold text-lg mb-1">
                              {photos[0].imageTitle}
                            </h3>
                          )}
                          <p className="text-slate-300 text-sm">Event: {photos[0].eventTitle}</p>
                        </div>
                        {photos[0].createdBy && (
                          <div className="text-right">
                            <p className="text-slate-300 text-sm font-medium">
                              {photos[0].createdBy.firstName}
                            </p>
                            <p className="text-slate-400 text-xs">
                              {photos[0].createdBy.role}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                // Multiple photos grid
                <div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-h-[60vh] overflow-y-auto">
                    {photos.map((photo, index) => (
                      <div key={index} className="group cursor-pointer" onClick={() => setCurrentPhotoIndex(index)}>
                        <div className="relative overflow-hidden rounded-lg bg-slate-700/30">
                          <img
                            src={photo.photoUrl}
                            alt={photo.imageTitle || `${name} photo ${index + 1}`}
                            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                          
                          {/* Photo overlay info */}
                          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3">
                            {photo.imageTitle && (
                              <p className="text-white text-sm font-medium truncate">
                                {photo.imageTitle}
                              </p>
                            )}
                            {photo.createdBy && (
                              <p className="text-slate-300 text-xs">
                                by {photo.createdBy.firstName}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  {/* Selected photo viewer */}
                  {currentPhotoIndex >= 0 && photos[currentPhotoIndex] && (
                    <div className="mt-6 border-t border-slate-600/50 pt-6">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-white font-semibold">
                          {photos[currentPhotoIndex].imageTitle || `Photo ${currentPhotoIndex + 1}`}
                        </h3>
                        <div className="flex items-center space-x-2">
                          {photos.length > 1 && (
                            <>
                              <button
                                onClick={(e) => { e.stopPropagation(); prevPhoto(); }}
                                className="bg-slate-700 hover:bg-slate-600 text-white rounded-full p-1 transition-colors duration-200"
                              >
                                <ChevronLeft className="w-4 h-4" />
                              </button>
                              <span className="text-slate-300 text-sm">
                                {currentPhotoIndex + 1} of {photos.length}
                              </span>
                              <button
                                onClick={(e) => { e.stopPropagation(); nextPhoto(); }}
                                className="bg-slate-700 hover:bg-slate-600 text-white rounded-full p-1 transition-colors duration-200"
                              >
                                <ChevronRight className="w-4 h-4" />
                              </button>
                            </>
                          )}
                        </div>
                      </div>
                      
                      <div className="flex justify-center">
                        <img
                          src={photos[currentPhotoIndex].photoUrl}
                          alt={photos[currentPhotoIndex].imageTitle || `${name} photo`}
                          className="max-w-full max-h-[40vh] object-contain rounded-lg shadow-lg"
                        />
                      </div>
                    </div>
                  )}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    );
  };

  if (isPreview) {
    // Horizontal layout for home page preview
    return (
      <>
        <div className="group relative w-full max-w-6xl mx-auto">
          <div className="bg-slate-800/60 backdrop-blur-xl rounded-2xl overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-500 border border-slate-700/50 hover:border-slate-600/70">
            
            <div className="flex flex-col lg:flex-row items-stretch">
              {/* Image Side */}
              <div className="lg:w-5/12 relative overflow-hidden">
                <img
                  src={
                    photoUrl ||
                    'https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
                  }
                  alt={name}
                  className="w-full h-80 lg:h-96 object-cover transition-all duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent to-slate-900/30 lg:to-slate-900/60" />
              </div>

              {/* Content Side */}
              <div className="lg:w-7/12 p-8 lg:p-12 flex flex-col justify-center">
                {/* Event Title */}
                <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight tracking-tight">
                  {name.toUpperCase()}
                </h2>

                {/* Description */}
                <p className="text-slate-300 text-lg lg:text-xl leading-relaxed mb-8 font-light">
                  {description}
                </p>

                {/* Event Details */}
                <div className="space-y-2 mb-8">
                  <div className="flex items-center text-slate-300">
                    <Calendar className="w-5 h-5 mr-3 text-blue-400" />
                    <span className="text-lg font-medium">
                      {new Date(eventDate).toLocaleDateString('en-US', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric'
                      })}
                    </span>
                  </div>
                  
                  <div className="flex items-center text-slate-300">
                    <MapPin className="w-5 h-5 mr-3 text-blue-400" />
                    <span className="text-lg font-medium">{venue}</span>
                  </div>

                  {time && (
                    <div className="flex items-center text-slate-300">
                      <Clock className="w-5 h-5 mr-3 text-blue-400" />
                      <span className="text-lg font-medium">{time}</span>
                    </div>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-4">
                  {registrationLink && (
                    <a
                      href={registrationLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center bg-gradient-to-r from-blue-600 to-purple-700 hover:from-blue-500 hover:to-purple-600 text-white font-bold py-4 px-8 rounded-lg text-lg shadow-lg hover:shadow-xl hover:shadow-blue-500/30 transform hover:scale-105 transition-all duration-300"
                    >
                      Register
                    </a>
                  )}
                  
                  <button
                    onClick={fetchEventPhotos}
                    disabled={loadingPhotos}
                    className="inline-flex items-center justify-center bg-gradient-to-r from-slate-600 to-slate-700 hover:from-slate-500 hover:to-slate-600 text-white font-bold py-4 px-8 rounded-lg text-lg shadow-lg hover:shadow-xl hover:shadow-slate-500/30 transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Camera className="w-5 h-5 mr-2" />
                    {loadingPhotos ? 'Loading...' : 'View Photos'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <PhotoGalleryModal />
      </>
    );
  }

  // Vertical card layout for events page
  return (
    <>
      <div className="group relative bg-slate-800/40 backdrop-blur-sm rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 border border-slate-700/50 hover:border-slate-600/70 max-w-sm">
        
        {/* Event Image */}
        <div className="relative overflow-hidden">
          <img
            src={
              photoUrl ||
              'https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'
            }
            alt={name}
            className="w-full h-64 object-cover transition-all duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent" />
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Event Title */}
          <h3 className="text-2xl font-bold text-white mb-4 leading-tight group-hover:text-blue-300 transition-colors duration-300">
            {name}
          </h3>

          {/* Event Details */}
          <div className="space-y-3 mb-4 text-slate-300">
            <div className="flex items-center">
              <Calendar className="w-4 h-4 mr-3 text-orange-400" />
              <span className="text-sm font-medium">
                {new Date(eventDate).toLocaleDateString('en-US', {
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric'
                })}
              </span>
            </div>
            
            <div className="flex items-center">
              <Clock className="w-4 h-4 mr-3 text-orange-400" />
              <span className="text-sm font-medium">{time || 'TBA'}</span>
            </div>
            
            <div className="flex items-center">
              <MapPin className="w-4 h-4 mr-3 text-orange-400" />
              <span className="text-sm font-medium">{venue}</span>
            </div>
          </div>

          {/* Description */}
          <p className="text-slate-400 text-sm leading-relaxed mb-6 line-clamp-4">
            {description}
          </p>

          {/* Action Buttons */}
          <div className="space-y-3">
            {registrationLink && (
              <a
                href={registrationLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center w-full bg-gradient-to-r from-blue-600 to-purple-700 hover:from-blue-500 hover:to-purple-600 text-white font-semibold py-3 px-6 rounded-lg text-sm shadow-lg hover:shadow-xl hover:shadow-blue-500/30 transform hover:scale-105 transition-all duration-300"
              >
                Register Now
                <ExternalLink className="w-4 h-4 ml-2" />
              </a>
            )}
            
            <button
              onClick={fetchEventPhotos}
              disabled={loadingPhotos}
              className="inline-flex items-center justify-center w-full bg-gradient-to-r from-slate-600 to-slate-700 hover:from-slate-500 hover:to-slate-600 text-white font-semibold py-3 px-6 rounded-lg text-sm shadow-lg hover:shadow-xl hover:shadow-slate-500/30 transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Camera className="w-4 h-4 mr-2" />
              {loadingPhotos ? 'Loading...' : 'View Photos'}
            </button>
          </div>

          {/* Creator Info */}
          {auth && createdBy && (
            <div className="pt-4 mt-4 border-t border-slate-700/50">
              <div className="flex items-center text-xs text-slate-400">
                <User className="w-3 h-3 mr-2" />
                <span>Updated by </span>
                <span className="text-blue-300 font-medium ml-1">
                  {createdBy?.firstName || 'Unknown'}
                </span>
                {createdBy?.role && (
                  <>
                    <span className="mx-1">•</span>
                    <span className="text-purple-300 font-medium">
                      {createdBy.role}
                    </span>
                  </>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
      <PhotoGalleryModal />
    </>
  );
};

export default EventCard;