import React, { useContext } from "react";
import { AuthContext } from "../Context/AuthContext";
import { ThemeContext } from "../Context/ThemeContext";
import { Link } from "react-router-dom";

const Postdesign = ({ avatar, fullname,username, updatedAt, description, post }) => {
  const { user } = useContext(AuthContext);
  const { darkMode } = useContext(ThemeContext);

  return (
    <div
      className={`max-w-full sm:max-w-lg mx-auto my-6 rounded-lg shadow-lg ${darkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900"
        }`}
    >
      {/* Header: User Info */}
      <Link to={`${username}/profile`}>
        <div className="flex items-center px-4 py-3">
          <img
            src={
              avatar ||
              "https://cdn.pixabay.com/photo/2024/10/18/03/16/ai-generated-9129245_1280.jpg"
            }
            alt="User Avatar"
            className="w-10 h-10 rounded-full border border-gray-300"
          />
          <div className="ml-4">
            <p className="font-semibold text-sm">{fullname}</p>
            <p
              className={`text-xs ${darkMode ? "text-gray-400" : "text-gray-500"
                }`}
            >
              {new Date(`${updatedAt}`).toLocaleDateString()}
              {/* {post.updatedAt} */}
            </p>
          </div>
        </div>
      </Link>

      {/* Post Description */}
      <p className="mx-4 text-sm sm:text-base">{description}</p>

      {/* Post Content: Image */}
      <div className="mt-4">
        <img
          src={post}
          alt="Post Content"
          className="w-full h-[65vh] object-cover rounded-lg"
        />
      </div>

      <div className="px-4 py-3">
        <div className="flex space-x-4 mb-2">
          <div className="flex border px-3 py-1 rounded-xl items-center space-x-5">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6 cursor-pointer"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6.633 10.25c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 0 1 2.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 0 0 .322-1.672V2.75a.75.75 0 0 1 .75-.75 2.25 2.25 0 0 1 2.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282m0 0h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 0 1-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 0 0-1.423-.23H5.904m10.598-9.75H14.25M5.904 18.5c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 0 1-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 9.953 4.167 9.5 5 9.5h1.053c.472 0 .745.556.5.96a8.958 8.958 0 0 0-1.302 4.665c0 1.194.232 2.333.654 3.375Z"
              />
            </svg>
            <p>9</p>
          </div>
          <div className="flex border px-3 py-1 rounded-xl items-center space-x-5">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6 cursor-pointer"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 0 1-.923 1.785A5.969 5.969 0 0 0 6 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337Z"
              />
            </svg>
            <p>9</p>
          </div>
          <div className="flex border px-3 py-1 rounded-xl items-center space-x-5">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6 cursor-pointer"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M7.217 10.907a2.25 2.25 0 1 0 0 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186 9.566-5.314m-9.566 7.5 9.566 5.314m0 0a2.25 2.25 0 1 0 3.935 2.186 2.25 2.25 0 0 0-3.935-2.186Zm0-12.814a2.25 2.25 0 1 0 3.933-2.185 2.25 2.25 0 0 0-3.933 2.185Z"
              />
            </svg>
            <p>98</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Postdesign;
