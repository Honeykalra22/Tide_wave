import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Context/AuthContext";
import { ThemeContext } from "../Context/ThemeContext";
import { Link } from "react-router-dom";
import Tweet_design from "../components/Tweet_design";

const Home = () => {
  const { user, token } = useContext(AuthContext);
  const { darkMode } = useContext(ThemeContext);
  const [type, setType] = useState("Posts");

  if (!token) {
    console.log("token is invalid");
    return <div className="text-center text-red-500">Token is invalid</div>;
  }

  if (!user) {
    return <div>Loading...</div>;
  }

  //   useEffect(() => {
  //     if(token) {
  //         userdetails();
  //     }
  //   }, []);

  const posts = user?.posts || [];
  const tweets = user?.tweets || [];

  return (
    <div
      className={`min-h-screen transition-all ${
        darkMode ? "bg-black text-white" : "bg-white text-black"
      }`}
    >
      {/* Cover Image */}
      <div className="relative w-full">
        <img
          src={
            user?.coverImage ||
            "https://cdn.pixabay.com/photo/2024/10/18/03/16/ai-generated-9129245_1280.jpg"
          }
          alt="cover image"
          className="w-full h-64 object-cover"
        />
        {/* Avatar Overlay */}
        <div className="flex">
          <div>
            <div className="absolute top-56 left-[10rem] transform -translate-x-1/2">
              <img
                src={
                  user?.avatar ||
                  "https://cdn.pixabay.com/photo/2024/10/18/03/16/ai-generated-9129245_1280.jpg"
                }
                alt="avatar"
                className="w-44 h-44 rounded-full border-4 border-white shadow-lg"
              />
            </div>
            {/* User Information Section */}
            <div className="mt-[10rem] mx-[7rem]">
              <h1 className="text-2xl font-bold">{user.fullname} </h1>
              <Link to={`/dashboard/${user.username}`}>
                <h1
                  className="text-lg text-gray-500 underline font-bold cursor-pointer hover:text-gray-600"
                  style={{ fontFamily: "cursive" }}
                >
                  {user.username}
                </h1>
              </Link>
            </div>
          </div>
          <div className="mt-[5rem]">
            <p className="text-gray-500 ">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Repellendus at
            </p>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="flex justify-start mx-[4rem] space-x-16 mt-8 items-center mb-6">
        <div className="text-center">
          <p className="text-xl font-bold">{user.followers}</p>
          <p className="text-xl text-gray-500">Followers</p>
        </div>
        <div className="text-center">
          <p className="text-xl font-bold">{user.following}</p>
          <p className="text-xl text-gray-500">Following</p>
        </div>
        <div className="text-center">
          <p className="text-xl font-bold">{user.posts.length}</p>
          <p className="text-xl text-gray-500">Posts</p>
        </div>
        <div className="text-center">
          <p className="text-xl font-bold">{user.tweets.length}</p>
          <p className="text-xl text-gray-500">Tweets</p>
        </div>
        <div className="">
          <button className="bg-gray-500 text-white px-6 py-2 rounded-lg shadow-lg hover:bg-gray-600 transition-all">
            Edit Profile
          </button>
        </div>
      </div>
      <hr />
      {/* start posts and tweets done by user with all information */}

      <div
        className="flex justify-center space-x-10 text-xl mt-[2vh]"
        style={{ fontFamily: "fantasy" }}
      >
        <button
          className="focus:underline focus:text-gray-400"
          onClick={() => setType("Posts")}
        >
          Posts
        </button>

        <button
          className="focus:underline focus:text-gray-400"
          onClick={() => setType("Tweets")}
        >
          Tweets
        </button>
      </div>
      <div className="p-6">
        {/* Posts Section */}
        {type === "Posts" && posts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {posts.map((post, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200"
              >
                <img
                  src={post?.post}
                  alt={`Post ${index + 1}`}
                  className="w-full h-40 object-cover" // Ensure images maintain aspect ratio
                />
              </div>
            ))}
          </div>
        ) : (
          type === "Posts" && (
            <p className="text-center text-gray-500">No posts available.</p>
          )
        )}

        {/* Tweets Section */}
        {type === "Tweets" && tweets.length > 0 ? (
          <div className="space-y-4">
            {tweets
              .sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
              .map((tweet, index) => (
                <Tweet_design
                  key={index}
                  content={tweet.content}
                  updatedAt={tweet.updatedAt}
                />
              ))}
          </div>
        ) : (
          type === "Tweets" && (
            <p className="text-center text-gray-500">No tweets available.</p>
          )
        )}
      </div>

      {/* <div>
        {type === "Posts" &&
          posts.map((post, index) => (
            <div key={index}>
              <img src={post.post} alt="" />
            </div>
          ))}
          {
            type==='Tweets' && 
            tweets.map((tweet, index) => (
                <p>{tweet.content}</p>
            ))
          }
      </div> */}
    </div>
  );
};

export default Home;
