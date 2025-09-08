import React from "react";
import { X, Camera, ChevronLeft, ChevronRight } from "lucide-react";

const PhotoGalleryModal = ({
  showPhotoGallery,
  closePhotoGallery,
  photos,
  name,
  currentPhotoIndex,
  setCurrentPhotoIndex,
  nextPhoto,
  prevPhoto
}) => {
  if (!showPhotoGallery) return null;

  // Filter out photos that don't have valid URLs
  const validPhotos = photos?.filter(photo => photo?.photoUrl && photo.photoUrl.trim() !== '') || [];

  return (
    <div className="fixed inset-0 bg-black/95 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="relative w-full h-full max-w-7xl max-h-[95vh] flex flex-col bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl border-2 border-blue-500/30 shadow-2xl overflow-hidden">
        
        {/* Header with Event Name, Event Title and Close Button */}
        <div className="flex items-center justify-between p-6 border-b-2 border-blue-500/20 bg-gradient-to-r from-blue-900/20 to-purple-900/20 flex-shrink-0">
          <div>
            <h1 className="text-white text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              {name}
            </h1>
            {validPhotos.length > 0 && validPhotos[0].eventTitle && (
              <p className="text-blue-300 text-lg mt-2 bg-blue-500/10 rounded-lg px-3 py-1 inline-block border border-blue-500/20">
                {validPhotos[0].eventTitle}
              </p>
            )}
          </div>
          <button
            onClick={closePhotoGallery}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-full p-3 transition-all duration-300 shadow-lg hover:shadow-blue-500/25 border border-blue-400/30"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-hidden flex items-center justify-center p-6">
          {validPhotos.length === 0 ? (
            <div className="text-center">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-full p-4 w-24 h-24 mx-auto mb-6 flex items-center justify-center">
                <Camera className="w-12 h-12 text-white" />
              </div>
              <p className="text-white text-2xl font-semibold mb-2">
                No photos available for this event
              </p>
            </div>
          ) : (
            <>
              {validPhotos.length === 1 ? (
                // Single photo display
                <div className="flex justify-center w-full h-full">
                  <div className="relative max-w-5xl w-full flex flex-col justify-center">
                    <img
                      src={validPhotos[0].photoUrl}
                      alt={validPhotos[0].imageTitle || `${name} photo`}
                      className="w-full max-h-[65vh] object-contain rounded-2xl shadow-lg border-2 border-purple-500/20"
                      onError={(e) => {
                        console.error(
                          "Single image failed to load:",
                          validPhotos[0].photoUrl
                        );
                        e.target.src =
                          "https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80";
                      }}
                    />

                    {/* Photo Info */}
                    <div className="mt-6 bg-gradient-to-r from-blue-900/30 to-purple-900/30 rounded-xl p-6 border border-blue-500/20 backdrop-blur-sm">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          {validPhotos[0].imageTitle && (
                            <h3 className="text-white font-bold text-xl mb-3 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                              {validPhotos[0].imageTitle}
                            </h3>
                          )}
                          <div className="space-y-2">
                            {validPhotos[0].createdAt && (
                              <p className="text-purple-300 text-sm bg-purple-500/10 rounded-lg px-3 py-1 inline-block border border-purple-500/20">
                                {new Date(validPhotos[0].createdAt).toLocaleDateString()}
                              </p>
                            )}
                          </div>
                        </div>
                        {validPhotos[0].createdBy && (
                          <div className="text-right bg-gradient-to-br from-green-900/20 to-blue-900/20 rounded-lg p-3 border border-green-500/20">
                            <p className="text-green-300 text-sm font-semibold">
                              Photo by {validPhotos[0].createdBy.firstName || "User"}
                            </p>
                            <p className="text-green-400/70 text-xs mt-1">
                              ID: {validPhotos[0].createdBy._id ? validPhotos[0].createdBy._id.slice(-8) : "N/A"}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                // Multiple photos grid - Enhanced layout
                <div className="w-full h-full flex flex-col">
                  {/* Responsive grid with larger photos */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6 overflow-y-auto flex-1 scrollbar-thin scrollbar-thumb-blue-600 scrollbar-track-gray-800 pr-2">
                    {validPhotos.map((photo, index) => (
                      <div
                        key={photo._id || index}
                        className="group cursor-pointer transform hover:scale-105 transition-all duration-300"
                        onClick={() => setCurrentPhotoIndex(index)}
                      >
                        <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-gray-800 to-gray-700 border-2 border-transparent hover:border-blue-400/50 shadow-lg hover:shadow-blue-500/20">
                          <img
                            src={photo.photoUrl}
                            alt={photo.imageTitle || `${name} photo ${index + 1}`}
                            className="w-full h-64 sm:h-72 md:h-80 object-cover group-hover:scale-110 transition-transform duration-500"
                            onError={(e) => {
                              console.error(
                                "Grid image failed to load:",
                                photo.photoUrl
                              );
                              e.target.src =
                                "https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80";
                            }}
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                          {/* Photo overlay info */}
                          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent p-4 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                            {photo.imageTitle && (
                              <p className="text-white text-sm font-semibold truncate mb-2">
                                {photo.imageTitle}
                              </p>
                            )}
                            <div className="flex items-center justify-between">
                              <p className="text-blue-300 text-xs bg-blue-500/20 rounded px-2 py-1 border border-blue-500/30">
                                {photo.createdAt &&
                                  new Date(photo.createdAt).toLocaleDateString()}
                              </p>
                              {photo.createdBy && (
                                <p className="text-green-300 text-xs bg-green-500/20 rounded px-2 py-1 border border-green-500/30">
                                  {photo.createdBy.firstName || "User"}
                                </p>
                              )}
                            </div>
                          </div>

                          {/* Selection indicator */}
                          {currentPhotoIndex === index && (
                            <div className="absolute top-3 right-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full p-2 shadow-lg border-2 border-white/30">
                              <div className="w-3 h-3 bg-white rounded-full"></div>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>


                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default PhotoGalleryModal;