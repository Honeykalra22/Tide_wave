import React, { useState, useContext } from "react";
import { ThemeContext } from "../Context/ThemeContext";
import axios from "axios";
import { AuthContext } from "../Context/AuthContext";
import { Link } from "react-router-dom";
import Tweet_design from "../components/Tweet_design";
import Postdesign from "../components/Postdesign";

function TweetBox() {
  const { darkMode } = useContext(ThemeContext);
  const [tweetContent, setTweetContent] = useState("");
  const [tweets, setTweets] = useState([]);
  const [error, setError] = useState(null);
  // const [time, setTime] = useState("Just Now");
  const url = "tide-wave-tuoq.vercel.app/api/v2";

  const { user } = useContext(AuthContext);
  const posts = user?.posts || [];
  const tweetsuser = user?.tweets || []

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
      console.log("tweet console is: ", response.data);
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
          <Tweet_design
            key={index}
            content={tweet.content}
            updatedAt={tweet.updatedAt}
          />
        ))}
      </div>

      <div className="mt-4 space-y-4">
        {tweetsuser.map((tweet, index) => (
          <Tweet_design
            key={index}
            content={tweet.content}
            updatedAt={tweet.updatedAt}
            _id = {tweet._id}
          />
        ))}
      </div>

      {/* <div className="max-w-full sm:max-w-lg mx-auto my-6">
        {posts.map((post, index) => (
          <Postdesign key={index} post={post} />
        ))}
      </div> */}

      {/* <div>
        {
          posts.map((post, index) => (
            <Postdesign
              key = {index}
              post = {post}
            />
          ))
        }
      </div> */}
    </div>
  );
}

export default TweetBox;
