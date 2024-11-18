import React, { useContext, useState } from "react";
import { AuthContext } from "../Context/AuthContext";
import axios from "axios";
import { ThemeContext } from "../Context/ThemeContext";

const ImageUploader = () => {
  const [image, setImage] = useState(null);
  const [description, setDescription] = useState("");
  const [likedBy, setLikedBy] = useState([]);
  const [loading, setLoading] = useState(false);

  const { darkMode } = useContext(ThemeContext);
  const { user, token, url } = useContext(AuthContext);

  const handleUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file)
    }
  };

  const handleCapture = () => {
    alert("Camera functionality is not implemented in this demo.");
  };

  const uploadPost = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    if (image) formData.append("post", image);
    formData.append("description", description);
    formData.append("likedBy", likedBy);

    try {
      setLoading(true);
      const response = await axios.post(
        `http://localhost:8000/api/v2/post/addpost`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setImage(null);
      setDescription("");
      console.log("post url is: ", response.data.data);
    } catch (error) {
      console.log("error while posting image", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`min-h-screen flex justify-center items-center ${
        darkMode ? "bg-gray-800 text-white" : "bg-gray-100 text-gray-900"
      }`}
    >
      <form
        onSubmit={uploadPost}
        className="bg-white dark:bg-gray-900 shadow-md rounded-xl p-6 w-full max-w-md text-center"
      >
        <h1 className="text-xl font-semibold mb-4">Upload Image Post</h1>

        {/* Image Preview */}
        <div className="relative w-full h-64 bg-gray-100 dark:bg-gray-700 border-2 border-dashed rounded-lg mb-4 flex items-center justify-center">
          {image ? (
            <img
              src={image}
              alt="Uploaded"
              className="object-cover w-full h-full rounded-lg"
            />
          ) : (
            <p className="text-gray-500 dark:text-gray-400">
              No image uploaded
            </p>
          )}
        </div>

        {/* File Input and Camera Buttons */}
        <div className="flex justify-center gap-4 mb-4">
          <label className="bg-blue-500 dark:bg-blue-700 text-white px-4 py-2 rounded-lg cursor-pointer hover:bg-blue-600 dark:hover:bg-blue-800">
            Upload from Device
            <input
              type="file"
              accept="image/*"
              onChange={handleUpload}
              className="hidden"
            />
          </label>
          <button
            type="button"
            onClick={handleCapture}
            className="bg-green-500 dark:bg-green-700 text-white px-4 py-2 rounded-lg hover:bg-green-600 dark:hover:bg-green-800"
          >
            Capture with Camera
          </button>
        </div>

        {/* Description Input */}
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Add a description..."
          className="w-full p-2 mb-4 border rounded-lg dark:bg-gray-800 dark:border-gray-700 dark:text-white"
        ></textarea>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-purple-500 dark:bg-purple-700 text-white px-4 py-2 rounded-lg hover:bg-purple-600 dark:hover:bg-purple-800"
        >
          Upload Post
        </button>
      </form>
    </div>
  );
};

export default ImageUploader;


// import React, { useContext, useState } from "react";
// import { AuthContext } from "../Context/AuthContext";
// import axios from "axios";
// import { ThemeContext } from "../Context/ThemeContext";

// const ImageUploader = () => {
//   const [image, setImage] = useState(null);
//   const [description, setDescription] = useState("");
//   const [likedBy, setLikedBy] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const { darkMode } = useContext(ThemeContext);

//   const { user, token, url } = useContext(AuthContext);

//   const handleUpload = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//     //   const reader = new FileReader();
//     //   reader.onload = () => setImage(reader.result);
//     //   reader.readAsDataURL(file);
//     setImage(file)
//     }
//   };

//   const handleCapture = () => {
//     alert("Camera functionality is not implemented in this demo.");
//   };

//   const uploadPost = async (e) => {
//     e.preventDefault();

//     if (!image) {
//       alert("Please provide both an image and a description.");
//       return;
//     }

//     const formData = new FormData();
//     formData.append("post", image);
//     formData.append("description", description);
//     formData.append("likedBy", likedBy);

//     try {
//       setLoading(true);
//       const response = await axios.post(
//         `http://localhost:8000/api/v2/post/addpost`,
//         formData,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             "Content-Type": "multipart/form-data",
//           },
//         }
//       );
//       console.log("Post URL is: ", response.data.data);
//       setImage(null);
//       setDescription("");
//     } catch (error) {
//       console.error("Error while posting image", error);
//       alert("There was an error uploading the post. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div
//       className={`min-h-screen flex justify-center items-center ${
//         darkMode ? "bg-gray-800 text-white" : "bg-gray-100 text-gray-900"
//       }`}
//     >
//       <form
//         onSubmit={uploadPost}
//         className="bg-white dark:bg-gray-900 shadow-md rounded-xl p-6 w-full max-w-md text-center"
//       >
//         <h1 className="text-xl font-semibold mb-4">Upload Image Post</h1>

//         {/* Image Preview */}
//         <div className="relative w-full h-64 bg-gray-100 dark:bg-gray-700 border-2 border-dashed rounded-lg mb-4 flex items-center justify-center">
//           {image ? (
//             <img
//               src={image}
//               alt="Uploaded"
//               className="object-cover w-full h-full rounded-lg"
//             />
//           ) : (
//             <p className="text-gray-500 dark:text-gray-400">
//               No image uploaded
//             </p>
//           )}
//         </div>

//         {/* File Input and Camera Buttons */}
//         <div className="flex justify-center gap-4 mb-4">
//           <label className="bg-blue-500 dark:bg-blue-700 text-white px-4 py-2 rounded-lg cursor-pointer hover:bg-blue-600 dark:hover:bg-blue-800">
//             Upload from Device
//             <input
//               type="file"
//               accept="image/*"
//               onChange={handleUpload}
//               className="hidden"
//             />
//           </label>
//           <button
//             type="button"
//             onClick={handleCapture}
//             className="bg-green-500 dark:bg-green-700 text-white px-4 py-2 rounded-lg hover:bg-green-600 dark:hover:bg-green-800"
//           >
//             Capture with Camera
//           </button>
//         </div>

//         {/* Description Input */}
//         <textarea
//           value={description}
//           onChange={(e) => setDescription(e.target.value)}
//           placeholder="Add a description..."
//           className="w-full p-2 mb-4 border rounded-lg dark:bg-gray-800 dark:border-gray-700 dark:text-white"
//         ></textarea>

//         {/* Submit Button */}
//         <button
//           type="submit"
//           className="w-full bg-purple-500 dark:bg-purple-700 text-white px-4 py-2 rounded-lg hover:bg-purple-600 dark:hover:bg-purple-800"
//         >
//           {loading ? "Uploading..." : "Upload Post"}
//         </button>
//       </form>
//     </div>
//   );
// };

// export default ImageUploader;
