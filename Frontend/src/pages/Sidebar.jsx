import React, { useContext, useEffect } from "react";
import { ThemeContext } from "../Context/ThemeContext";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";

function Sidebar() {
  const { darkMode } = useContext(ThemeContext);
  const navigate = useNavigate();

  const { userdetails, user } = useContext(AuthContext);

  const isLoggedIn = !!localStorage.getItem("accessToken");

  useEffect(() => {
    if (isLoggedIn) {
      userdetails();
    } 
    // else {
    //   setUser(null);
    // }
  }, [isLoggedIn]);

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    navigate("/login");
  };

  return (
    <div className="flex flex-col lg:flex-row">
      <aside
        className={`${
          darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-r"
        } w-full lg:w-1/4 p-4 border-r`}
      >
        <nav className="space-y-5 flex flex-col">
          {isLoggedIn && user && (
            <Link to={`/dashboard/${user.username}`}>
              <div className="flex items-center space-x-4 mb-4">
                <img
                  // src={user.avatar}
                  src={`${user.avatar}`}
                  alt="User Avatar"
                  className="w-10 h-10 rounded-full border border-gray-400"
                />
                <span
                  className={`text-lg font-semibold ${
                    darkMode ? "text-gray-300" : "text-gray-600"
                  }`}
                >
                  {user.username}
                </span>
              </div>
            </Link>
          )}
          <Link
            to="/dashboard"
            className={`block text-lg ${
              darkMode
                ? "text-gray-300 hover:text-white"
                : "text-gray-600 hover:text-blue-600"
            }`}
          >
            Home
          </Link>
          <Link
            to="/profile"
            className={`block text-lg ${
              darkMode
                ? "text-gray-300 hover:text-white"
                : "text-gray-600 hover:text-blue-600"
            }`}
          >
            Profile
          </Link>
          <Link
            to="/message"
            className={`block text-lg ${
              darkMode
                ? "text-gray-300 hover:text-white"
                : "text-gray-600 hover:text-blue-600"
            }`}
          >
            Messages
          </Link>
          <Link
            to="/setting"
            className={`block text-lg ${
              darkMode
                ? "text-gray-300 hover:text-white"
                : "text-gray-600 hover:text-blue-600"
            }`}
          >
            Settings
          </Link>
          {isLoggedIn ? (
            <button
              onClick={handleLogout}
              className={`block text-lg ${
                darkMode
                  ? "text-red-500 hover:text-white"
                  : "text-red-600 hover:text-red-700"
              }`}
            >
              Logout
            </button>
          ) : (
            <Link
              to="/login"
              className={`block text-lg ${
                darkMode
                  ? "text-green-400 hover:text-white"
                  : "text-green-600 hover:text-green-700"
              }`}
            >
              Login
            </Link>
          )}
        </nav>
      </aside>
    </div>
  );
}

export default Sidebar;
