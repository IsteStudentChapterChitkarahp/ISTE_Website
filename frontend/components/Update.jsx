import { useEffect, useState } from "react";

const Marquee = () => {
  const [items, setItems] = useState([]);
  const [isHoveringCard, setIsHoveringCard] = useState(false);

  // Sample data for demonstration
  useEffect(() => {
    // Using sample data since we can't fetch from localhost
    const sampleItems = [
      { _id: "1", type: "logo", link: "https://via.placeholder.com/200x80/4F46E5/white?text=LOGO1" },
      { _id: "2", type: "text", message: "Welcome to ISTE!" },
      { _id: "3", type: "logo", link: "https://via.placeholder.com/200x80/7C3AED/white?text=LOGO2" },
      { _id: "4", type: "text", message: "Innovation & Technology" },
      { _id: "5", type: "logo", link: "https://via.placeholder.com/200x80/EC4899/white?text=LOGO3" },
      { _id: "6", type: "text", message: "Join Us Today!" },
    ];
    setItems(sampleItems);
  }, []);

  // Function to convert various image links to direct URLs
  const getDirectImageUrl = (url) => {
    if (!url) return null;
    const cleanUrl = url.trim();

    if (cleanUrl.includes("drive.google.com")) {
      let fileId = null;
      const sharingMatch = cleanUrl.match(/\/file\/d\/([a-zA-Z0-9-_]+)/);
      if (sharingMatch) fileId = sharingMatch[1];
      const exportMatch = cleanUrl.match(/[?&]id=([a-zA-Z0-9-_]+)/);
      if (exportMatch) fileId = exportMatch[1];
      if (fileId) return `https://drive.google.com/thumbnail?id=${fileId}&sz=w400`;
    }

    if (cleanUrl.includes("flickr.com/photos/")) {
      const photoIdMatch = cleanUrl.match(/photos\/[^\/]+\/(\d+)/);
      if (photoIdMatch) {
        const photoId = photoIdMatch[1];
        return `https://live.staticflickr.com/${Math.floor(photoId / 1000000) % 1000}/${photoId}_b.jpg`;
      }
    }

    if (cleanUrl.includes("photos.google.com") || cleanUrl.includes("photos.app.goo.gl")) {
      return cleanUrl;
    }

    if (cleanUrl.match(/\.(jpg|jpeg|png|gif|webp|svg)(\?|$)/i)) {
      return cleanUrl;
    }

    return cleanUrl;
  };

  return (
    <div
      className={`whitespace-nowrap marquee-container py-6 relative border-y-2 border-white border-opacity-20 
        ${isHoveringCard ? "overflow-visible" : "overflow-hidden"} 
      `}
    >
      {/* Gradient overlays */}
      <div className="absolute left-0 top-0 w-20 h-full bg-gradient-to-r from-blue-600 to-transparent z-10 pointer-events-none"></div>
      <div className="absolute right-0 top-0 w-20 h-full bg-gradient-to-l from-purple-600 to-transparent z-10 pointer-events-none"></div>

      {/* Top and bottom gradient lines - these will now pause with the marquee */}
      <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400 marquee-border ${isHoveringCard ? 'paused' : ''}`}></div>
      <div className={`absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-purple-400 via-blue-400 to-purple-400 marquee-border ${isHoveringCard ? 'paused' : ''}`}></div>

      <div className={`flex w-max marquee-content ${isHoveringCard ? 'paused' : ''}`}>
        {[...items, ...items].map((item, idx) =>
          item.type === "logo" ? (
            <div
              key={item._id ? `${item._id}-${idx}` : `logo-${idx}`}
              className="mx-8 inline-block group relative"
              onMouseEnter={() => setIsHoveringCard(true)}
              onMouseLeave={() => setIsHoveringCard(false)}
            >
              {/* Main image container */}
              <div className="relative overflow-hidden rounded-lg bg-white bg-opacity-10 p-3 backdrop-blur-sm border border-white border-opacity-20 transition-all duration-500 ease-out transform group-hover:scale-110 group-hover:bg-opacity-20 group-hover:shadow-2xl group-hover:shadow-purple-500/25 cursor-pointer">
                <img
                  src={getDirectImageUrl(item.link)}
                  alt="Partner logo"
                  className="h-14 w-auto object-contain transition-all duration-500 ease-out group-hover:scale-105"
                  onError={(e) => (e.target.style.display = "none")}
                />
              </div>

              {/* Hover card */}
              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-4 opacity-0 group-hover:opacity-100 transition-all duration-500 ease-out scale-75 group-hover:scale-100 pointer-events-none z-50">
                <div className="relative bg-white bg-opacity-95 backdrop-blur-xl rounded-2xl shadow-2xl border border-white border-opacity-30 p-6 min-w-[300px] max-w-[400px]">
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2">
                    <div className="w-0 h-0 border-l-8 border-r-8 border-t-8 border-transparent border-t-white border-opacity-95"></div>
                  </div>
                  <div className="flex justify-center items-center bg-gray-50 rounded-xl p-4 mb-4">
                    <img
                      src={getDirectImageUrl(item.link)}
                      alt="Large view"
                      className="max-w-full max-h-48 object-contain rounded-lg shadow-lg"
                    />
                  </div>
                  <div className="text-center">
                    <h3 className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent font-bold italic text-lg mb-2 drop-shadow-lg">
                      ISTE Chitkara Chapter
                    </h3>
                    <p className="text-gray-600 text-sm">
                      {item.link.includes("drive.google.com") && "📁 Google Drive"}
                      {item.link.includes("flickr.com") && "📸 Flickr"}
                      {item.link.includes("photos.google.com") && "🖼️ Google Photos"}
                      {!item.link.includes("drive.google.com") && !item.link.includes("flickr.com") && !item.link.includes("photos.google.com") && "🖼️ Image"}
                    </p>
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

      {/* Enhanced CSS Styles */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
          @keyframes marquee {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }

          @keyframes gradientShift {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }

          .marquee-container {
            background: linear-gradient(135deg, #1e40af 0%, #7c3aed 50%, #1e40af 100%);
            background-size: 200% 200%;
            animation: gradientShift 8s ease infinite;
          }

          .marquee-content {
            animation: marquee 25s linear infinite;
          }

          .marquee-container:hover .marquee-content {
            animation-play-state: paused;
          }

          .marquee-border {
            animation: marquee 25s linear infinite;
          }

          .marquee-border.paused {
            animation-play-state: paused;
          }

          .text-glow {
            text-shadow: 
              0 0 10px rgba(255, 255, 255, 0.5),
              0 0 20px rgba(255, 255, 255, 0.3),
              0 0 30px rgba(255, 255, 255, 0.2);
          }

          .logo-hover {
            transition: all 0.3s ease;
          }

          .logo-hover:hover {
            transform: scale(1.1);
            filter: brightness(1.2) drop-shadow(0 4px 8px rgba(0, 0, 0, 0.3));
          }
        `,
        }}
      />
    </div>
  );
};

export default Marquee;