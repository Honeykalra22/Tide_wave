import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Context/AuthContext";
import axios from "axios";
import { ThemeContext } from "../Context/ThemeContext";

const UpdateDetails = () => {
  const [data, setData] = useState({
    username: "",
    fullname: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const { user, url, token } = useContext(AuthContext);
  const { darkMode } = useContext(ThemeContext);

  useEffect(() => {
    if (user) {
      setData({
        username: user.username,
        fullname: user.fullname,
      });
    }
  }, [user]);

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const updateDetails = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    try {
      const response = await axios.patch(
        `${url}/user/changeProfileDetail`,
        {
          ...data,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const userdata = response.data.data;
      console.log("userdata in updated list is: ", userdata);
      setData({
        username: userdata.username,
        fullname: userdata.fullname,
      });
      setSuccess("Profile updated successfully!");
    } catch (error) {
      setError("An error occured while updating the details, check again...");
      console.log("error while updating the user details", error);
    }
  };

  return (
    <div
      className={`flex justify-center items-center min-h-screen ${
        darkMode ? "bg-gray-900" : "bg-gray-100"
      }`}
    >
      <div
        className={`bg-gray-700 p-8 rounded-lg shadow-lg w-full max-w-sm transition-all duration-500 ${
          darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-900"
        }`}
      >
        <form onSubmit={updateDetails} className="space-y-4">
          <div className="flex flex-col">
            <label
              htmlFor="username"
              className={`font-semibold mb-2 ${
                darkMode ? "text-gray-300" : "text-gray-700"
              }`}
            >
              Username
            </label>
            <input
              type="text"
              name="username"
              id="username"
              placeholder="Enter your username"
              className={`p-3 border transition-all duration-300 ease-in-out ${
                darkMode
                  ? "border-gray-600 bg-gray-700 text-white focus:ring-blue-500 focus:border-blue-500"
                  : "border-gray-300 bg-white text-black focus:ring-blue-500 focus:border-blue-500"
              } rounded-md focus:outline-none`}
              onChange={handleChange}
              value={data.username}
            />
          </div>

          <div className="flex flex-col">
            <label
              htmlFor="fullname"
              className={`font-semibold mb-2 ${
                darkMode ? "text-gray-300" : "text-gray-700"
              }`}
            >
              Full Name
            </label>
            <input
              type="text"
              name="fullname"
              id="fullname"
              placeholder="Enter your full name"
              className={`p-3 border transition-all duration-300 ease-in-out ${
                darkMode
                  ? "border-gray-600 bg-gray-700 text-white focus:ring-blue-500 focus:border-blue-500"
                  : "border-gray-300 bg-white text-black focus:ring-blue-500 focus:border-blue-500"
              } rounded-md focus:outline-none`}
              onChange={handleChange}
              value={data.fullname}
            />
          </div>

          <div
            className={`${
              error ? "text-red-600" : "text-green-700"
            } opacity-100 transition-opacity duration-500 ease-in-out`}
          >
            {error && (
              <div className="text-red-600 opacity-100 transition-opacity duration-500 ease-in-out">
                {error}
              </div>
            )}

            {success && (
              <div className="text-green-700 opacity-100 transition-opacity duration-500 ease-in-out">
                {success}
              </div>
            )}
          </div>

          <div>
            <button
              type="submit"
              className={`w-full py-3 transition-all duration-300 ease-in-out ${
                darkMode
                  ? "bg-blue-500 text-white hover:bg-blue-600"
                  : "bg-blue-600 text-white hover:bg-blue-700"
              } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
            >
              Update Details
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateDetails;
