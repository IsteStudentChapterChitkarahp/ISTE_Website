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

  return (
    <div className="fixed inset-0 bg-black/95 backdrop-blur-sm z-50 flex items-center justify-center p-8">
      <div className="relative w-full h-full max-w-7xl max-h-[90vh] flex flex-col bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl border-2 border-blue-500/30 shadow-2xl overflow-hidden">
        
        {/* Header with Event Name, Event Title and Close Button */}
        <div className="flex items-center justify-between p-6 border-b-2 border-blue-500/20 bg-gradient-to-r from-blue-900/20 to-purple-900/20 flex-shrink-0">
          <div>
            <h1 className="text-white text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              {name}
            </h1>
            {photos && photos.length > 0 && photos[0] && photos[0].eventTitle && (
              <p className="text-blue-300 text-lg mt-2 bg-blue-500/10 rounded-lg px-3 py-1 inline-block border border-blue-500/20">
                {photos[0].eventTitle}
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
          {photos.length === 0 ? (
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
              {photos.length === 1 ? (
                // Single photo display
                <div className="flex justify-center w-full">
                  <div className="relative max-w-4xl w-full">
                    <img
                      src={photos[0].photoUrl}
                      alt={photos[0].imageTitle || `${name} photo`}
                      className="w-full max-h-[60vh] object-contain rounded-2xl shadow-lg border-2 border-purple-500/20"
                      onError={(e) => {
                        console.error(
                          "Single image failed to load:",
                          photos[0].photoUrl
                        );
                        e.target.src =
                          "https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80";
                      }}
                    />

                    {/* Photo Info */}
                    <div className="mt-6 bg-gradient-to-r from-blue-900/30 to-purple-900/30 rounded-xl p-6 border border-blue-500/20 backdrop-blur-sm">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          {photos[0].imageTitle && (
                            <h3 className="text-white font-bold text-xl mb-3 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                              {photos[0].imageTitle}
                            </h3>
                          )}
                          <div className="space-y-2">
                            {photos[0].createdAt && (
                              <p className="text-purple-300 text-sm bg-purple-500/10 rounded-lg px-3 py-1 inline-block border border-purple-500/20">
                                {new Date(photos[0].createdAt).toLocaleDateString()}
                              </p>
                            )}
                          </div>
                        </div>
                        {photos[0].createdBy && (
                          <div className="text-right bg-gradient-to-br from-green-900/20 to-blue-900/20 rounded-lg p-3 border border-green-500/20">
                            <p className="text-green-300 text-sm font-semibold">
                              Photo by {photos[0].createdBy.firstName || "User"}
                            </p>
                            <p className="text-green-400/70 text-xs mt-1">
                              ID: {photos[0].createdBy._id ? photos[0].createdBy._id.slice(-8) : "N/A"}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                // Multiple photos grid
                <div className="w-full h-full flex flex-col">
                  {/* Grid Header */}
                  <div className="mb-4 text-center flex-shrink-0">
                    <p className="text-blue-300 text-lg bg-blue-500/10 rounded-lg px-4 py-2 inline-block border border-blue-500/20">
                      {photos.length} photos
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 overflow-y-auto flex-1 scrollbar-thin scrollbar-thumb-blue-600 scrollbar-track-gray-800 pr-2">
                    {photos.map((photo, index) => (
                      <div
                        key={photo._id || index}
                        className="group cursor-pointer transform hover:scale-105 transition-all duration-300"
                        onClick={() => setCurrentPhotoIndex(index)}
                      >
                        <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-gray-800 to-gray-700 border-2 border-transparent hover:border-blue-400/50 shadow-lg hover:shadow-blue-500/20">
                          <img
                            src={photo.photoUrl}
                            alt={photo.imageTitle || `${name} photo ${index + 1}`}
                            className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
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
                              <p className="text-white text-sm font-semibold truncate mb-1">
                                {photo.imageTitle}
                              </p>
                            )}
                            <p className="text-blue-300 text-xs bg-blue-500/20 rounded px-2 py-1 inline-block border border-blue-500/30">
                              {photo.createdAt &&
                                new Date(photo.createdAt).toLocaleDateString()}
                            </p>
                          </div>

                          {/* Selection indicator */}
                          {currentPhotoIndex === index && (
                            <div className="absolute top-2 right-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full p-2 shadow-lg">
                              <div className="w-3 h-3 bg-white rounded-full"></div>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Selected photo viewer */}
                  {currentPhotoIndex >= 0 && photos[currentPhotoIndex] && (
                    <div className="mt-6 border-t-2 border-blue-500/20 pt-6 flex-shrink-0">
                      <div className="flex items-center justify-between mb-4 bg-gradient-to-r from-blue-900/20 to-purple-900/20 rounded-xl p-4 border border-blue-500/20">
                        <h3 className="text-white font-bold text-lg bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                          {photos[currentPhotoIndex].imageTitle ||
                            `Photo ${currentPhotoIndex + 1}`}
                        </h3>
                        <div className="flex items-center space-x-3">
                          {photos.length > 1 && (
                            <>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  prevPhoto();
                                }}
                                className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-full p-2 transition-all duration-200 shadow-lg hover:shadow-blue-500/25 border border-blue-400/30"
                              >
                                <ChevronLeft className="w-4 h-4" />
                              </button>
                              <span className="text-blue-300 text-sm font-semibold bg-blue-500/10 rounded-lg px-3 py-1 border border-blue-500/20">
                                {currentPhotoIndex + 1} of {photos.length}
                              </span>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  nextPhoto();
                                }}
                                className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white rounded-full p-2 transition-all duration-200 shadow-lg hover:shadow-purple-500/25 border border-purple-400/30"
                              >
                                <ChevronRight className="w-4 h-4" />
                              </button>
                            </>
                          )}
                        </div>
                      </div>

                      <div className="flex justify-center mb-4">
                        <div className="relative">
                          <img
                            src={photos[currentPhotoIndex].photoUrl}
                            alt={
                              photos[currentPhotoIndex].imageTitle ||
                              `${name} photo`
                            }
                            className="max-w-full max-h-[30vh] object-contain rounded-2xl shadow-2xl border-2 border-purple-500/20"
                            onError={(e) => {
                              console.error(
                                "Selected image failed to load:",
                                photos[currentPhotoIndex].photoUrl
                              );
                              e.target.src =
                                "https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80";
                            }}
                          />
                          <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-purple-500/10 to-transparent pointer-events-none"></div>
                        </div>
                      </div>

                      {/* Selected photo info */}
                      <div className="text-center">
                        {photos[currentPhotoIndex].createdAt && (
                          <p className="text-purple-300 text-sm bg-gradient-to-r from-purple-900/30 to-blue-900/30 rounded-lg px-4 py-2 inline-block border border-purple-500/20">
                            Added on {new Date(photos[currentPhotoIndex].createdAt).toLocaleDateString()}
                          </p>
                        )}
                      </div>
                    </div>
                  )}
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