const Marquee = () => {
  const items = [
    { id: 1, type: "logo", url: "/images/a.jpg" }, 
    { id: 2, type: "logo", url: "/images/b.jpg" }, 
    { id: 3, type: "logo", url: "/images/c.jpg" }, 
    { id: 4, type: "text", message: "🚀 Welcome new batch 2025!" },
    { id: 5, type: "text", message: "🎉 Register fast for the upcoming event!" },
    { id: 6, type: "logo", url: "/images/d.jpg" }, 
    { id: 7, type: "logo", url: "/images/e.jpg" }, 
    { id: 8, type: "logo", url: "/images/f.jpg" }, 
    { id: 9, type: "logo", url: "/images/g.jpg" }, 
  ];

  return (
    <div className="overflow-hidden whitespace-nowrap marquee-container py-6 relative border-y-2 border-white border-opacity-20">
      {/* Gradient overlay for fade effect */}
      <div className="absolute left-0 top-0 w-20 h-full bg-gradient-to-r from-blue-600 to-transparent z-10 pointer-events-none"></div>
      <div className="absolute right-0 top-0 w-20 h-full bg-gradient-to-l from-purple-600 to-transparent z-10 pointer-events-none"></div>
      
      {/* Decorative top/bottom border */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400"></div>
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-purple-400 via-blue-400 to-purple-400"></div>
      
      <div className="flex w-max marquee-content">
        {/* First set of items */}
        {items.map((item) =>
          item.type === "logo" ? (
            <div key={item.id} className="mx-8 inline-block">
              <img
                src={item.url}
                alt="Partner logo"
                className="h-14 w-auto object-contain logo-hover rounded-lg bg-white bg-opacity-10 p-2 backdrop-blur-sm"
                onError={(e) => {
                  e.target.src =
                    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='60' viewBox='0 0 60 60'%3E%3Crect width='60' height='60' fill='%23f3f4f6'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' fill='%236b7280' font-size='12'%3ELogo%3C/text%3E%3C/svg%3E";
                }}
              />
            </div>
          ) : (
            <div key={item.id} className="mx-8 inline-flex items-center">
              <span className="text-gray-600 text-lg font-bold px-4 py-2 rounded-full bg-white bg-opacity-20 backdrop-blur-sm text-glow border border-white border-opacity-30 hover:bg-opacity-30 transition-all duration-300">
                {item.message}
              </span>
            </div>
          )
        )}
        
        {/* Duplicate set for seamless loop */}
        {items.map((item) =>
          item.type === "logo" ? (
            <div key={item.id + "-copy"} className="mx-8 inline-block">
              <img
                src={item.url}
                alt="Partner logo"
                className="h-14 w-auto object-contain logo-hover rounded-lg bg-white bg-opacity-10 p-2 backdrop-blur-sm"
                onError={(e) => {
                  e.target.src =
                    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='60' viewBox='0 0 60 60'%3E%3Crect width='60' height='60' fill='%23f3f4f6'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' fill='%236b7280' font-size='12'%3ELogo%3C/text%3E%3C/svg%3E";
                }}
              />
            </div>
          ) : (
            <div key={item.id + "-copy"} className="mx-8 inline-flex items-center">
              <span className="text-gray-600 text-lg font-bold px-4 py-2 rounded-full bg-white bg-opacity-20 backdrop-blur-sm text-glow border border-white border-opacity-30 hover:bg-opacity-30 transition-all duration-300">
                {item.message}
              </span>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default Marquee;
