import React, { useContext, useState } from "react";
import { AuthContext } from "../Context/AuthContext";
import { ThemeContext } from "../Context/ThemeContext";
import axios from "axios";

const UpdateAvatar = () => {
  const { url, token } = useContext(AuthContext);
  const { darkMode } = useContext(ThemeContext);
  const [newAvatar, setNewAvatar] = useState(null);
  const [preview, setPreview] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewAvatar(file);
      setPreview(URL.createObjectURL(file)); // Generate preview
    }
  };

  const updateAvatar = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!newAvatar) {
      setError("Please select an image to update avatar");
      return;
    }

    const formData = new FormData();
    formData.append('avatar', newAvatar);
    try {
      const response = await axios.patch(
        `${url}/user/changeAvatar`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setSuccess("Avatar updated successfully!");
      setPreview(""); // Clear preview after successful upload
    } catch (error) {
      setError("An error occurred while updating the avatar.");
      console.error("Avatar update error:", error);
    }
  };

  return (
    <div className="">
      <h2 className="text-xl font-semibold text-gray-300 mb-4">Update Avatar</h2>
      <form onSubmit={updateAvatar} className="space-y-6">
        <div className="relative w-32 h-32 bg-gray-700 border-2 border-dashed rounded-full flex items-center justify-center overflow-hidden mb-6">
          {preview ? (
            <img src={preview} alt="Preview" className="object-cover w-full h-full rounded-full" />
          ) : (
            <p className="text-gray-500">No avatar selected</p>
          )}
        </div>

        <label className="bg-blue-500 text-white px-4 py-2 rounded-lg cursor-pointer hover:bg-blue-600">
          Choose Avatar
          <input type="file" accept="image/*" onChange={handleUpload} className="hidden" />
        </label>

        <div className="mt-4">
          {error && <div className="text-red-500">{error}</div>}
          {success && <div className="text-green-500">{success}</div>}
        </div>

        <button
          type="submit"
          className="w-full py-3 bg-green-600 text-white rounded-md hover:bg-green-700 transition-all"
        >
          Update Avatar
        </button>
      </form>
    </div>
  );
};

export default UpdateAvatar;
