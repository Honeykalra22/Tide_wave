import React, { useContext, useState } from "react";
import axios from "axios";
import { AuthContext } from "../Context/AuthContext";
import { ThemeContext } from "../Context/ThemeContext";

const UpdataCoverImage = () => {
  const { url, token } = useContext(AuthContext);
  const { darkMode } = useContext(ThemeContext);
  const [newCI, setNewCI] = useState(null);
  const [preview, setPreview] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewCI(file);
      setPreview(URL.createObjectURL(file)); // Generate preview
    }
  };

  const updateCI = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!newCI) {
      setError("Please select an image to update cover image");
      return;
    }

    const formData = new FormData();
    formData.append('coverImage', newCI);
    try {
      const response = await axios.patch(
        `${url}/user/changeCoverImage`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setSuccess("Cover image updated successfully!");
      setError("");
      setPreview(""); // Clear preview after successful upload
    } catch (error) {
      setError("An error occurred while updating the cover image.");
      console.error("Cover image update error:", error);
    }
  };

  return (
    <div>
      <h2 className="text-xl font-semibold text-gray-300 mb-4">Update Cover Image</h2>

      <form onSubmit={updateCI} className="space-y-6">
        <div className="relative w-full h-64 bg-gray-700 border-2 border-dashed rounded-lg flex items-center justify-center overflow-hidden mb-6">
          {preview ? (
            <img src={preview} alt="Preview" className="object-cover w-full h-full rounded-lg" />
          ) : (
            <p className="text-gray-500">No image selected</p>
          )}
        </div>

        <label className="bg-blue-500 text-white px-4 py-2 rounded-lg cursor-pointer hover:bg-blue-600">
          Choose Image
          <input type="file" accept="image/*" onChange={handleUpload} className="hidden" />
        </label>

        <div className="mt-4">
          {error && <div className="text-red-500">{error}</div>}
          {success && <div className="text-green-500">{success}</div>}
        </div>

        <button
          type="submit"
          className="w-full py-3 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-all"
        >
          Update Cover Image
        </button>
      </form>
    </div>
  );
};

export default UpdataCoverImage;
