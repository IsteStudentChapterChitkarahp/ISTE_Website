
const Navbar = () => {
    return (
        <div className="navbar bg-base-100 shadow-sm">
  <div className="navbar-start">
    <div className="dropdown">
      <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
      </div>
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
        <li><a>Item 1</a></li>
        <li>
          <a>Parent</a>
          <ul className="p-2">
            <li><a>Submenu 1</a></li>
            <li><a>Submenu 2</a></li>
          </ul>
        </li>
        <li><a>Item 3</a></li>
      </ul>
    </div>
    <div className="flex items-center gap-3">
  {/* Logo Image */}
  <img
    src="https://i.ytimg.com/vi/XlrYem8-3fM/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLA4ZL_oGVx3OZ5QPjfuTf-LPxdvVw"
    alt="ISTE Logo"
    className="w-10 h-10 rounded-full object-cover"
  />

  {/* Logo Text */}
  <a
    className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 
               bg-clip-text text-transparent 
               hover:from-blue-700 hover:to-purple-700 
               transition-all duration-300"
  >
    ISTE
  </a>
</div>

  </div>
  <div className="navbar-center hidden lg:flex">
    <ul className="menu menu-horizontal px-1">
      <li><a
         className="text-white hover:text-blue-600 font-medium px-3 py-2 rounded-md hover:bg-blue-50 transition-all duration-200 relative group"
>Events</a></li>
      <li><a
         className="text-white hover:text-blue-600 font-medium px-3 py-2 rounded-md hover:bg-blue-50 transition-all duration-200 relative group"
>Our Team</a></li>
      <li><a
        className="text-white hover:text-blue-600 font-medium px-3 py-2 rounded-md hover:bg-blue-50 transition-all duration-200 relative group"
>About</a></li>
    </ul>
  </div>
  <div className="navbar-end">
    <a  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium py-2 px-6 rounded-full shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-300"
>Login</a>
  </div>
</div>
    );
};

export default Navbar;

