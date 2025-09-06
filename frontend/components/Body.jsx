const Body = () => {
  return (
    <div className="pt-16 bg-[url('https://betterstack.com/assets/v2/homepage-v3/hero-bg-408d1e858d0c9969863b4116bf2ad625e96cb10643f5868768c35b604208b9ad.jpg')] bg-cover bg-center min-h-screen relative">

      <div className=" inset-0 bg-black bg-opacity-50"></div>
      
      <div className="relative z-0 flex flex-col items-center justify-center min-h-screen px-4 py-8">
        <div className="mb-8 transform hover:scale-105 transition-transform duration-300">
          <img 
            src="https://i.ytimg.com/vi/XlrYem8-3fM/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLA4ZL_oGVx3OZ5QPjfuTf-LPxdvVw" 
            alt="ISTE Logo"
            className="w-48 h-48 object-cover rounded-full shadow-2xl border-4 border-white mx-auto block"
          />
        </div>
        
        <div className="mb-6 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight">
            Indian Society For 
            <span className="block text-blue-400">Technical Education</span>
          </h1>
        </div>
        
        <p className="text-lg md:text-xl text-gray-200 max-w-3xl text-center mb-8 leading-relaxed px-4">
          Indian Society for Technical Education (ISTE) is a national professional body that promotes technical education, skill development, and innovation through workshops, seminars, and student activities.
        </p>
        
        <button 
         onClick={() => window.open("https://paym.chitkara.edu.in/enrollment-for-student-chapter-25/", "_blank")}
        className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-4 px-8 rounded-full text-lg shadow-lg transform hover:scale-105 transition-all duration-300 hover:shadow-xl">
          Register Now
        </button>
        
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl w-full">
          <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-lg p-6 text-center border border-white border-opacity-30">
            <div className="text-3xl font-bold text-blue-400 mb-2">500+</div>
            <div className="text-gray-600 text-sm font-medium">Workshops Conducted</div>
          </div>
          <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-lg p-6 text-center border border-white border-opacity-30">
            <div className="text-3xl font-bold text-purple-400 mb-2">10K+</div>
            <div className="text-gray-600 text-sm font-medium">Students Benefited</div>
          </div>
          <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-lg p-6 text-center border border-white border-opacity-30">
            <div className="text-3xl font-bold text-green-400 mb-2">50+</div>
            <div className="text-gray-600 text-sm font-medium">Partner Institutions</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Body;