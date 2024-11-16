import React, { useState, useContext } from "react";
import { ThemeContext } from "../Context/ThemeContext";
import axios from "axios";
import { AuthContext } from "../Context/AuthContext";
import { Link } from "react-router-dom";

function TweetBox() {
  const { darkMode } = useContext(ThemeContext);
  const [tweetContent, setTweetContent] = useState("");
  const [tweets, setTweets] = useState([]);
  const [error, setError] = useState(null);
  // const [time, setTime] = useState("Just Now");
  const url = "http://localhost:8000/api/v2";

  const { user } = useContext(AuthContext);

  const handleTweetSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!tweetContent) {
        setError("Tweet content cannot be empty.");
        return;
      }
      const response = await axios.post(
        `${url}/tweet/addtweets`,
        { content: tweetContent },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      setTweets([response.data.data, ...tweets]);
      setTweetContent("");
      setError(null);
    } catch (err) {
      setError(err.response?.data?.message || "An error occurred.");
    }
  };

  const handleLike = async (id) => {
    try {
      const response = await axios.post(
        `${url}/tweet/liked/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      console.log("post is liked successfully");
    } catch (error) {
      console.log("error while liking the post", error);
      
      // console.log('data is: ',)
    }
  };

  return (
    <div
      className={`p-4 ${
        darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-900"
      } rounded-lg shadow-md mb-4`}
    >
      <form onSubmit={handleTweetSubmit}>
        <textarea
          value={tweetContent}
          onChange={(e) => setTweetContent(e.target.value)}
          placeholder="What's happening?"
          className={`w-full p-2 rounded-md border resize-none ${
            darkMode
              ? "bg-gray-700 border-gray-600 text-white"
              : "border-gray-300"
          } focus:outline-none focus:ring-2 ${
            darkMode ? "focus:ring-blue-500" : "focus:ring-blue-600"
          }`}
          rows="3"
        />

        {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
        <button
          type="submit"
          className="mt-2 w-full bg-blue-600 text-white py-2 rounded-md"
        >
          Tweet
        </button>
      </form>

      <div className="mt-4 space-y-4">
        {tweets.map((tweet, index) => (
          <div
            key={index}
            className={`p-4 rounded-lg ${
              darkMode ? "bg-gray-700 text-white" : "bg-gray-100 text-gray-900"
            } shadow-md overflow-hidden break-words`}
          >
            <Link to={`/dashboard/${user.username}`}>
              <div className="flex items-center space-x-4">
                <img
                  // src={user.avatar}
                  src={`${user.avatar}`}
                  alt="User Avatar"
                  className="w-8 h-8 rounded-full border border-gray-400"
                />
                <h3 className="font-semibold">{user.username}</h3>
              </div>
            </Link>
            <span
              className={`text-sm hover:underline ${
                darkMode ? "text-gray-400" : "text-gray-500"
              }`}
            >
              {tweet.updatedAt}
            </span>
            <p className="mt-2">{tweet.content}</p>
            <div className="flex space-x-4 my-3 items-center"
             
            >
              {/* like */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                className="size-6"
                onClick={() => handleLike(tweet._id)}
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M6.633 10.25c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 0 1 2.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 0 0 .322-1.672V2.75a.75.75 0 0 1 .75-.75 2.25 2.25 0 0 1 2.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282m0 0h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 0 1-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 0 0-1.423-.23H5.904m10.598-9.75H14.25M5.904 18.5c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 0 1-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 9.953 4.167 9.5 5 9.5h1.053c.472 0 .745.556.5.96a8.958 8.958 0 0 0-1.302 4.665c0 1.194.232 2.333.654 3.375Z"
                />
              </svg>
              {/* comment */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="size-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 0 1-.923 1.785A5.969 5.969 0 0 0 6 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337Z"
                />
              </svg>
              {/* share */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="size-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M7.217 10.907a2.25 2.25 0 1 0 0 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186 9.566-5.314m-9.566 7.5 9.566 5.314m0 0a2.25 2.25 0 1 0 3.935 2.186 2.25 2.25 0 0 0-3.935-2.186Zm0-12.814a2.25 2.25 0 1 0 3.933-2.185 2.25 2.25 0 0 0-3.933 2.185Z"
                />
              </svg>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TweetBox;
