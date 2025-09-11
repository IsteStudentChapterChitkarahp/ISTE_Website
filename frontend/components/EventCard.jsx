import { API_URL } from '../src/api';
import React, { useContext, useState } from 'react';
import { UserContext } from '../utils/UserContext';
import { Calendar, Clock, MapPin, User, ExternalLink, Camera } from 'lucide-react';
import PhotoGalleryModal from './PhotoGalleryModel';

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

  // ✅ New state for Read More
  const [isExpanded, setIsExpanded] = useState(false);

  // ✅ Split description into words
  const words = description?.split(" ") || [];
  const truncatedDescription = words.slice(0, 20).join(" ") + (words.length > 20 ? "..." : "");

  const fetchEventPhotos = async () => {
    try {
      setLoadingPhotos(true);
  const response = await fetch(`${API_URL}/event/images`);
      if (response.ok) {
        const allPhotos = await response.json();

        const eventPhotos = allPhotos.filter(
          (photo) =>
            photo.eventTitle &&
            photo.eventTitle.toLowerCase().trim() === name.toLowerCase().trim()
        );

        setPhotos(eventPhotos);
      } else {
        console.error('Failed to fetch photos. Status:', response.status);
        setPhotos([]);
      }
    } catch (error) {
      console.error('Error fetching photos:', error);
      setPhotos([]);
    } finally {
      setShowPhotoGallery(true);
      setCurrentPhotoIndex(0);
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

  if (isPreview) {
    return (
      <>
        {/* Preview Card */}
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
                <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight tracking-tight">
                  {name.toUpperCase()}
                </h2>
                <p className="text-slate-300 text-lg lg:text-xl leading-relaxed mb-4 font-light">
                  {isExpanded ? description : truncatedDescription}
                </p>
                {words.length > 20 && (
                  <button
                    onClick={() => setIsExpanded(!isExpanded)}
                    className="text-blue-400 font-medium hover:underline mb-8"
                  >
                    {isExpanded ? "Read Less" : "Read More"}
                  </button>
                )}
                
                <div className="space-y-2 mb-8">
                  <div className="flex items-center text-slate-300">
                    <Calendar className="w-5 h-5 mr-3 text-blue-400" />
                    <span className="text-lg font-medium">
                      {new Date(eventDate).toLocaleDateString('en-US', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric',
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

        {/* ✅ Fixed modal with props */}
        <PhotoGalleryModal
          showPhotoGallery={showPhotoGallery}
          closePhotoGallery={closePhotoGallery}
          photos={photos}
          name={name}
          currentPhotoIndex={currentPhotoIndex}
          setCurrentPhotoIndex={setCurrentPhotoIndex}
          nextPhoto={nextPhoto}
          prevPhoto={prevPhoto}
        />
      </>
    );
  }

  return (
    <>
      {/* Vertical Card */}
      <div className="group relative bg-slate-800/40 backdrop-blur-sm rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 border border-slate-700/50 hover:border-slate-600/70 max-w-sm">
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

        <div className="p-6">
          <h3 className="text-2xl font-bold text-white mb-4 leading-tight group-hover:text-blue-300 transition-colors duration-300">
            {name}
          </h3>
          <div className="space-y-3 mb-4 text-slate-300">
            <div className="flex items-center">
              <Calendar className="w-4 h-4 mr-3 text-orange-400" />
              <span className="text-sm font-medium">
                {new Date(eventDate).toLocaleDateString('en-US', {
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric',
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

          <p className="text-slate-400 text-sm leading-relaxed mb-2">
            {isExpanded ? description : truncatedDescription}
          </p>
          {words.length > 20 && (
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-blue-400 text-xs font-medium hover:underline mb-4"
            >
              {isExpanded ? "Read Less" : "Read More"}
            </button>
          )}

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
              className="inline-flex items-center justify-center w-full bg-gradient-to-r from-blue-600 to-purple-700 hover:from-blue-500 hover:to-purple-600 text-white font-semibold py-3 px-6 rounded-lg text-sm shadow-lg hover:shadow-xl hover:shadow-slate-500/30 transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Camera className="w-4 h-4 mr-2" />
              {loadingPhotos ? 'Loading...' : 'View Photos'}
            </button>
          </div>

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

      {/* ✅ Fixed modal with props */}
      <PhotoGalleryModal
        showPhotoGallery={showPhotoGallery}
        closePhotoGallery={closePhotoGallery}
        photos={photos}
        name={name}
        currentPhotoIndex={currentPhotoIndex}
        setCurrentPhotoIndex={setCurrentPhotoIndex}
        nextPhoto={nextPhoto}
        prevPhoto={prevPhoto}
      />
    </>
  );
};

export default EventCard;
