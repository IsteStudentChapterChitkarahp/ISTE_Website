import { API_URL } from '../src/api';
import { useContext, useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { UserContext } from "../utils/UserContext";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLogoutMessage, setShowLogoutMessage] = useState(false);
  const navigate = useNavigate(); 

  const { role, refreshUser, clearUser } = useContext(UserContext);

  useEffect(() => {
    const checkLoggedIn = async () => {
      try {
        const res = await fetch(`${API_URL}/me`, {
          credentials: "include", 
        });

        if (res.ok) {
          setIsLoggedIn(true);
        } else {
          setIsLoggedIn(false);
        }
      } catch (err) {
        console.error("Invalid User", err);
        setIsLoggedIn(false);
      }
    };

    checkLoggedIn();
  }, []);

  const handleLogout = async () => {
    try {
      const res = await fetch(`${API_URL}/user/logout`, {
        method: "POST",
        credentials: "include",
      });

      if (res.ok) {
        // clear frontend context state
        clearUser();  
        setIsLoggedIn(false);

        setShowLogoutMessage(true);
        setTimeout(() => {
          setShowLogoutMessage(false);
          navigate("/");
        }, 1200);
      } else {
        const errData = await res.json();
        console.error("Logout failed:", errData);
      }
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  const handleLogin = () => navigate("/login"); 
  const handleAddEvents = () => navigate("/admin/add-event");
  const handleChangeUpdates = () => navigate("/admin/update");
  const handleUpdateTeam = () => navigate("/admin/update-team");
  const handleImageGalleryUpdate = () => navigate("/admin/event/photos");
  const handleAddMembers = () => navigate("/admin/addMembers");

  return (
    <>
      {/* Logout Success Message */}
      {showLogoutMessage && (
        <div className="fixed top-20 left-1/2 transform -translate-x-1/2 z-50 
                        bg-red-500 text-white px-6 py-3 rounded-lg shadow-lg
                        animate-fade-in-down">
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path 
                fillRule="evenodd" 
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 
                   01-1.414 0l-4-4a1 1 0 011.414-1.414L8 
                   12.586l7.293-7.293a1 1 0 011.414 0z" 
                clipRule="evenodd" 
              />
            </svg>
            <span className="font-medium">Logged out successfully!</span>
          </div>
        </div>
      )}

      <div className="navbar fixed top-0 left-0 w-full z-50 h-16 
                      bg-[url('https://betterstack.com/assets/v2/homepage-v3/hero-bg-sm-a7f682621b3ceceb1a711f30165a0feab8f901cdbb1e0b9b41c1729f848ea0')] 
                      bg-cover bg-center bg-no-repeat 
                      bg-base-100/80 backdrop-blur-md shadow-sm">
        
        <div className="navbar-start">
          {role && (
            <div className="dropdown">
              <div tabIndex={0} role="button" className="btn btn-ghost">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth="2" 
                    d="M4 6h16M4 12h8m-8 6h16" 
                  />
                </svg>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
              >
                <li><a onClick={handleAddEvents} className="cursor-pointer">Add Events</a></li>
                <li><a onClick={handleChangeUpdates} className="cursor-pointer">Change Updates</a></li>
                <li><a onClick={handleImageGalleryUpdate} className="cursor-pointer">Update Image Gallery</a></li>
                <li><a className="cursor-pointer">Update About Us</a></li>

                {(role === "Faculty" || role === "Technical Head" || role === "Membership Chair") && (
                  <>
                    <li><a onClick={handleUpdateTeam} className="cursor-pointer">Update Team</a></li>
                    <li><a onClick={handleAddMembers} className="cursor-pointer">Add Members</a></li>
                  </>
                )}
              </ul>
            </div>
          )}

          <div className="flex items-center gap-3">
            <img
              src="https://i.ytimg.com/vi/XlrYem8-3fM/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLA4ZL_oGVx3OZ5QPjfuTf-LPxdvVw"
              alt="ISTE Logo"
              className="w-10 h-10 rounded-full object-cover"
            />
            <Link
              to="/"
              className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 
                         bg-clip-text text-transparent 
                         hover:from-blue-700 hover:to-purple-700 
                         transition-all duration-300"
            >
              ISTE
            </Link>
          </div>
        </div>

        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            <li>
              <a 
                onClick={() => navigate('/events')}
                className="text-white hover:text-blue-600 font-medium px-3 py-2 rounded-md hover:bg-blue-50 transition-all duration-200 relative group cursor-pointer"
              >
                Events
              </a>
            </li>
            <li>
              <a 
                onClick={() => navigate('/team')}
                className="text-white hover:text-blue-600 font-medium px-3 py-2 rounded-md hover:bg-blue-50 transition-all duration-200 relative group cursor-pointer"
              >
                Our Team
              </a>
            </li>
            <li>
              <a 
                onClick={() => navigate('/about')}
                className="text-white hover:text-blue-600 font-medium px-3 py-2 rounded-md hover:bg-blue-50 transition-all duration-200 relative group cursor-pointer"
              >
                About
              </a>
            </li>
          </ul>
        </div>

        <div className="navbar-end">
          {isLoggedIn ? (
            <button
              onClick={handleLogout}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 
                         text-white font-medium py-2 px-6 rounded-full shadow-md 
                         hover:shadow-lg transform hover:scale-105 transition-all duration-300"
            >
              Logout
            </button>
          ) : (
            <button
              onClick={handleLogin}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 
                         text-white font-medium py-2 px-6 rounded-full shadow-md 
                         hover:shadow-lg transform hover:scale-105 transition-all duration-300"
            >
              Admin Login
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default Navbar;
