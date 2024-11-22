import React, { useContext } from "react";
import { ThemeContext } from "../Context/ThemeContext";
import { Link } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";

function Navbar() {
  const { darkMode, toggleTheme } = useContext(ThemeContext);
  const {user} = useContext(AuthContext)

  return (
    <header
      className={`w-full p-4 flex items-center justify-between ${
        darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-900 shadow-md"
      }`}
    >
      <Link to={`/${user?.username}`}>
        <div className="text-center selection:bg-none">
          <h1
            className="text-3xl text-sky-500 font-bold cursor-pointer"
            style={{ fontFamily: "cursive" }}
          >
            Tide-Wave
          </h1>
          <p className="text-pink-500 capitalize hover:underline cursor-pointer">
            connect to the world
          </p>
        </div>
      </Link>

      {/* Theme Toggle Button */}
      <button
        onClick={toggleTheme}
        className={`relative w-12 h-6 rounded-full flex items-center ${
          darkMode ? "bg-blue-600" : "bg-gray-300"
        }`}
      >
        <div
          className={`absolute w-6 h-6 bg-white rounded-full transform transition-transform ${
            darkMode ? "translate-x-6" : "translate-x-0"
          }`}
        ></div>
      </button>
    </header>
  );
}

export default Navbar;
