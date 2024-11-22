import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Context/AuthContext";
import axios from "axios";
import { ThemeContext } from "../Context/ThemeContext";

const UpdateDetails = () => {
  const [data, setData] = useState({ username: "", fullname: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const { user, url, token } = useContext(AuthContext);
  const { darkMode } = useContext(ThemeContext);

  useEffect(() => {
    if (user) {
      setData({ username: user.username, fullname: user.fullname });
    }
  }, [user]);

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const updateDetails = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    try {
      const response = await axios.patch(
        `${url}/user/changeProfileDetail`,
        { ...data },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const userdata = response.data.data;
      setData({ username: userdata.username, fullname: userdata.fullname });
      setSuccess("Profile updated successfully!");
    } catch (error) {
      setError("An error occurred while updating the details. Please try again.");
      console.error("Error while updating user details", error);
    }
  };

  return (

    <div
      className={`p-6 rounded-md ${darkMode ? "bg-gray-800 text-gray-300" : "bg-white text-gray-900"
        }`}
    >
      <h2
        className={`text-xl font-semibold mb-4 ${darkMode ? "text-gray-300" : "text-gray-700"
          }`}
      >
        Update Profile Details
      </h2>
      <form onSubmit={updateDetails} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col">
            <label
              htmlFor="username"
              className={`font-semibold mb-2 ${darkMode ? "text-gray-300" : "text-gray-700"
                }`}
            >
              Username
            </label>
            <input
              type="text"
              name="username"
              id="username"
              placeholder="Enter your username"
              className={`p-3 border rounded-md focus:ring-2 focus:ring-blue-500 ${darkMode
                  ? "bg-gray-700 border-gray-600 text-white"
                  : "bg-gray-100 border-gray-300 text-black"
                }`}
              onChange={handleChange}
              value={data.username}
            />
          </div>

          <div className="flex flex-col">
            <label
              htmlFor="fullname"
              className={`font-semibold mb-2 ${darkMode ? "text-gray-300" : "text-gray-700"
                }`}
            >
              Full Name
            </label>
            <input
              type="text"
              name="fullname"
              id="fullname"
              placeholder="Enter your full name"
              className={`p-3 border rounded-md focus:ring-2 focus:ring-blue-500 ${darkMode
                  ? "bg-gray-700 border-gray-600 text-white"
                  : "bg-gray-100 border-gray-300 text-black"
                }`}
              onChange={handleChange}
              value={data.fullname}
            />
          </div>
        </div>

        <div className="mt-4">
          {error && <div className="text-red-500">{error}</div>}
          {success && <div className="text-green-500">{success}</div>}
        </div>

        <button
          type="submit"
          className={`w-full py-3 rounded-md transition-all ${darkMode
              ? "bg-blue-600 hover:bg-blue-700 text-white"
              : "bg-blue-500 hover:bg-blue-600 text-white"
            }`}
        >
          Update Details
        </button>
      </form>
    </div>

    // <div>
    //   <h2 className="text-xl font-semibold text-gray-300 mb-4">Update Profile Details</h2>
    //   <form onSubmit={updateDetails} className="space-y-6">
    //     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    //       <div className="flex flex-col">
    //         <label htmlFor="username" className="font-semibold mb-2 text-gray-300">
    //           Username
    //         </label>
    //         <input
    //           type="text"
    //           name="username"
    //           id="username"
    //           placeholder="Enter your username"
    //           className="p-3 border rounded-md focus:ring-2 focus:ring-blue-500 bg-gray-600 text-white"
    //           onChange={handleChange}
    //           value={data.username}
    //         />
    //       </div>

    //       <div className="flex flex-col">
    //         <label htmlFor="fullname" className="font-semibold mb-2 text-gray-300">
    //           Full Name
    //         </label>
    //         <input
    //           type="text"
    //           name="fullname"
    //           id="fullname"
    //           placeholder="Enter your full name"
    //           className="p-3 border rounded-md focus:ring-2 focus:ring-blue-500 bg-gray-600 text-white"
    //           onChange={handleChange}
    //           value={data.fullname}
    //         />
    //       </div>
    //     </div>

    //     <div className="mt-4">
    //       {error && <div className="text-red-500">{error}</div>}
    //       {success && <div className="text-green-500">{success}</div>}
    //     </div>

    //     <button
    //       type="submit"
    //       className="w-full py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-all"
    //     >
    //       Update Details
    //     </button>
    //   </form>
    // </div>
  );
};

export default UpdateDetails;
