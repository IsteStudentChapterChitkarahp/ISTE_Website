import { useEffect, useState } from "react";

const Marquee = () => {
  const [items, setItems] = useState([]);

  // Function to convert various image links to direct URLs
  const getDirectImageUrl = (url) => {
    if (!url) return null;
    
    const cleanUrl = url.trim();
    
    // Handle Google Drive URLs - use thumbnail API for better compatibility
    if (cleanUrl.includes('drive.google.com')) {
      let fileId = null;
      
      // Extract from sharing URL format
      const sharingMatch = cleanUrl.match(/\/file\/d\/([a-zA-Z0-9-_]+)/);
      if (sharingMatch) {
        fileId = sharingMatch[1];
      }
      
      // Extract from uc export format
      const exportMatch = cleanUrl.match(/[?&]id=([a-zA-Z0-9-_]+)/);
      if (exportMatch) {
        fileId = exportMatch[1];
      }
      
      if (fileId) {
        // Use Google Drive thumbnail API which is more reliable
        return `https://drive.google.com/thumbnail?id=${fileId}&sz=w400`;
      }
    }
    
    // Handle Flickr URLs
    if (cleanUrl.includes('flickr.com/photos/')) {
      const photoIdMatch = cleanUrl.match(/photos\/[^\/]+\/(\d+)/);
      if (photoIdMatch) {
        const photoId = photoIdMatch[1];
        // Use Flickr's more reliable format
        return `https://live.staticflickr.com/${Math.floor(photoId / 1000000) % 1000}/${photoId}_b.jpg`;
      }
    }
    
    // Handle Google Photos
    if (cleanUrl.includes('photos.google.com') || cleanUrl.includes('photos.app.goo.gl')) {
      return cleanUrl;
    }
    
    // Return original URL if it looks like a direct image link
    if (cleanUrl.match(/\.(jpg|jpeg|png|gif|webp|svg)(\?|$)/i)) {
      return cleanUrl;
    }
    
    return cleanUrl; // Return original URL as last resort
  };

  useEffect(() => {
    fetch("http://localhost:5000/updates")
      .then((fetchedUpdates) => fetchedUpdates.json())
      .then((res) => {
        setItems(res);
        console.log("items", res);
      })
      .catch((error) => console.error("Error fetching updates:", error));
  }, []);

  return (
    <div className="whitespace-nowrap marquee-container py-6 relative border-y-2 border-white border-opacity-20 overflow-hidden">
      {/* Gradient overlays */}
      <div className="absolute left-0 top-0 w-20 h-full bg-gradient-to-r from-blue-600 to-transparent z-10 pointer-events-none"></div>
      <div className="absolute right-0 top-0 w-20 h-full bg-gradient-to-l from-purple-600 to-transparent z-10 pointer-events-none"></div>

      {/* Top and bottom gradient lines */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400"></div>
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-purple-400 via-blue-400 to-purple-400"></div>

      <div className="flex w-max marquee-content">
        {[...items, ...items].map((item, idx) =>
          item.type === "logo" ? (
            <div
              key={item._id ? `${item._id}-${idx}` : `logo-${idx}`}
              className="mx-8 inline-block group relative"
            >
              {/* Main image container */}
              <div className="relative overflow-hidden rounded-lg bg-white bg-opacity-10 p-3 backdrop-blur-sm border border-white border-opacity-20 transition-all duration-500 ease-out transform group-hover:scale-110 group-hover:bg-opacity-20 group-hover:shadow-2xl group-hover:shadow-purple-500/25 cursor-pointer">
                <img
                  src={getDirectImageUrl(item.link)}
                  alt="Partner logo"
                  className="h-14 w-auto object-contain transition-all duration-500 ease-out group-hover:scale-105"
                  onError={(e) => {
                    console.error('Failed to load image:', item.link);
                    
                    // Try alternative formats for Google Drive
                    if (item.link.includes('drive.google.com') && !e.target.dataset.retried) {
                      const fileIdMatch = item.link.match(/\/file\/d\/([a-zA-Z0-9-_]+)/);
                      if (fileIdMatch) {
                        const fileId = fileIdMatch[1];
                        e.target.dataset.retried = 'true';
                        // Try the uc export format as fallback
                        e.target.src = `https://drive.google.com/uc?export=view&id=${fileId}`;
                        return;
                      }
                    }
                    
                    // Try alternative Flickr format
                    if (item.link.includes('flickr.com') && !e.target.dataset.flickrRetried) {
                      const photoIdMatch = item.link.match(/photos\/[^\/]+\/(\d+)/);
                      if (photoIdMatch) {
                        const photoId = photoIdMatch[1];
                        e.target.dataset.flickrRetried = 'true';
                        e.target.src = `https://live.staticflickr.com/${photoId.substring(0, 4)}/${photoId}_m.jpg`;
                        return;
                      }
                    }
                    
                    // Show placeholder on final failure
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'flex';
                  }}
                  onLoad={() => {
                    console.log('Successfully loaded image:', getDirectImageUrl(item.link));
                  }}
                />
                
                {/* Fallback placeholder (hidden by default) */}
                <div className="h-14 w-14 hidden items-center justify-center bg-gray-400 bg-opacity-30 rounded">
                  <span className="text-xs text-gray-300">📷</span>
                </div>
                
                {/* Hover overlay effect */}
                <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-lg"></div>
                
                {/* Shimmer effect on hover */}
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out bg-gradient-to-r from-transparent via-white/20 to-transparent transform skew-x-12"></div>
              </div>

              {/* Large hover card - positioned above the marquee */}
              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-4 opacity-0 group-hover:opacity-100 transition-all duration-500 ease-out scale-75 group-hover:scale-100 pointer-events-none z-50">
                <div className="relative bg-white bg-opacity-95 backdrop-blur-xl rounded-2xl shadow-2xl border border-white border-opacity-30 p-6 min-w-[300px] max-w-[400px]">
                  {/* Arrow pointing down */}
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2">
                    <div className="w-0 h-0 border-l-8 border-r-8 border-t-8 border-transparent border-t-white border-opacity-95"></div>
                  </div>
                  
                  {/* Large image */}
                  <div className="flex justify-center items-center bg-gray-50 rounded-xl p-4 mb-4">
                    <img
                      src={getDirectImageUrl(item.link)}
                      alt="Large view"
                      className="max-w-full max-h-48 object-contain rounded-lg shadow-lg"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.nextSibling.style.display = 'flex';
                      }}
                    />
                    <div className="hidden w-32 h-32 items-center justify-center bg-gray-200 rounded-lg">
                      <span className="text-gray-400 text-4xl">📷</span>
                    </div>
                  </div>
                  
                  {/* Image info */}
                  <div className="text-center">
                    <h3 className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent font-bold italic text-lg mb-2 drop-shadow-lg">ISTE Chitkara Chapter</h3>
                    <p className="text-gray-600 text-sm">
                      {item.link.includes('drive.google.com') && '📁 Google Drive'}
                      {item.link.includes('flickr.com') && '📸 Flickr'}
                      {item.link.includes('photos.google.com') && '🖼️ Google Photos'}
                    </p>
                  </div>
                  
                  {/* Decorative gradient border */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400 p-0.5 -z-10">
                    <div className="w-full h-full bg-white bg-opacity-95 rounded-2xl"></div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div
              key={item._id ? `${item._id}-${idx}` : `text-${idx}`}
              className="mx-8 inline-flex items-center group"
            >
              <span className="text-purple-700 hover:text-blue-700 text-lg font-bold px-6 py-3 rounded-full bg-white bg-opacity-20 backdrop-blur-sm border border-white border-opacity-30 transition-all duration-300 ease-out transform group-hover:scale-105 group-hover:bg-opacity-30 group-hover:shadow-lg group-hover:shadow-purple-500/25 hover:border-opacity-50 text-glow">
                {item.message}
              </span>
            </div>
          )
        )}
      </div>

      {/* CSS Styles */}
      <style dangerouslySetInnerHTML={{
        __html: `
          .marquee-content {
            animation: marquee 30s linear infinite;
          }
          
          .marquee-container:hover .marquee-content {
            animation-play-state: paused;
          }
          
          @keyframes marquee {
            0% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(-50%);
            }
          }
          
          .text-glow {
            text-shadow: 0 0 10px rgba(255, 255, 255, 0.3);
          }
          
          /* Remove extra padding since cards now appear below */
          .marquee-container {
            position: relative;
            z-index: 10;
          }
          
          /* Ensure hover cards appear above other content */
          .group:hover .absolute.top-full {
            z-index: 1000;
          }
        `
      }} />
    </div>
  );
};

export default Marquee;