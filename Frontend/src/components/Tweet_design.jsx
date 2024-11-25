import React, { useContext } from "react";
import { AuthContext } from "../Context/AuthContext";
import { ThemeContext } from "../Context/ThemeContext";
import { Link } from "react-router-dom";

const TweetDesign = ({avatar, username, content, updatedAt, _id}) => {
  const { user, likeTweet } = useContext(AuthContext);
  const { darkMode } = useContext(ThemeContext);

  return (
    <div className="p-4">
      <div
        className={`p-4 rounded-lg shadow-md break-words ${
          darkMode ? "bg-gray-700 text-white" : "bg-gray-100 text-gray-900"
        }`}
      >
        {/* User Info */}
        <Link to={`/${username}/profile`}>
          <div className="flex items-center space-x-4">
            <img
              src={
                avatar ||
                "https://cdn.pixabay.com/photo/2024/10/18/03/16/ai-generated-9129245_1280.jpg"
              }
              alt="User Avatar"
              className="w-8 h-8 rounded-full border border-gray-400"
            />
            <h3 className="font-semibold">{username}</h3>
          </div>
        </Link>

        {/* Timestamp */}
        <span
          className={`text-sm block mt-1 ${
            darkMode ? "text-gray-400" : "text-gray-500"
          }`}
        >
          {/* {new Date(tweet.updatedAt).toLocaleDateString("en-GB")} */}
          {new Date(updatedAt).toLocaleDateString()}
        </span>

        {/* Tweet Content */}
        <p className="mt-2">{content}</p>

        {/* Action Buttons */}
        <div className="flex space-x-4 my-3 items-center">
          <button
            className="flex items-center border px-3 py-1 rounded-xl space-x-2"
            onClick={() => likeTweet(_id)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6.633 10.25c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 0 1 2.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 0 0 .322-1.672V2.75a.75.75 0 0 1 .75-.75 2.25 2.25 0 0 1 2.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282m0 0h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 0 1-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 0 0-1.423-.23H5.904m10.598-9.75H14.25M5.904 18.5c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 0 1-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 9.953 4.167 9.5 5 9.5h1.053c.472 0 .745.556.5.96a8.958 8.958 0 0 0-1.302 4.665c0 1.194.232 2.333.654 3.375Z"
              />
            </svg>
            <p>{user.tweetlikes || 0}</p>
          </button>

          {/* Comment Button */}
          <button className="flex items-center border px-3 py-1 rounded-xl space-x-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 0 1-.923 1.785A5.969 5.969 0 0 0 6 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337Z"
              />
            </svg>
            <p>0</p>
          </button>

          {/* Share Button */}
          <button className="flex items-center border px-3 py-1 rounded-xl space-x-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M7.217 10.907a2.25 2.25 0 1 0 0 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186 9.566-5.314m-9.566 7.5 9.566 5.314m0 0a2.25 2.25 0 1 0 3.935 2.186 2.25 2.25 0 0 0-3.935-2.186Zm0-12.814a2.25 2.25 0 1 0 3.933-2.185 2.25 2.25 0 0 0-3.933 2.185Z"
              />
            </svg>
            <p>0</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default TweetDesign;
