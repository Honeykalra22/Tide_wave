import axios from "axios";
import React, { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const url = "http://localhost:8000/api/v2";

  const [user, setUser] = useState(null);
  const [updated, setUpdated] = useState(null);

  const  token = localStorage.getItem("accessToken");

  const userdetails = async () => {
    try {
      const response = await axios.get(`${url}/user/details`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const followResponse = await axios.get(`${url}/user/following`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const userdata = response.data.data;
      setUser({
        username: userdata.username,
        coverImage: userdata.coverImage,
        avatar: userdata.avatar,
        fullname: userdata.fullname,
        posts: userdata.userPosts,
        tweets: userdata.userTweets,
        followers: followResponse.data.data.followers,
        following: followResponse.data.data.following.length,
      });
      console.log("user data is: ", userdata);
      console.log("Tweet Id is: ", userdata.userTweets[0]._id);
      // console.log('avatar is: ', userdata.avatar)
    } catch (error) {
      console.error("Error fetching user details:", error);
      setUser(null);
    }
  };

  const likeTweet = async (tweetId) => {
    // url is {url}/post/:tweetId/liked POST
    // const tweetId = user.tweets[0]._id
    try {
      const TweetLikeresponse = await axios.post(
        `${url}/tweet/${tweetId}/like`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setUser({
        ...user,
        tweetlikedBy: TweetLikeresponse.data.data.likedBy,
        tweetlikes: TweetLikeresponse.data.data.likedCount || 0,
      });
    } catch (error) {
      console.log("error while liking the post");
    }
  };

  const likePost = async (postId) => {
    // const postId = user.posts._id;
    try {
      const PostLikeresponse = await axios.post(
        `${url}/post/${postId}/liked`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setUser({
        ...user,
        postlikedBy: PostLikeresponse.data.data.likedBy,
        postlikes: PostLikeresponse.data.data.likedCount,
      });
    } catch (error) {
      console.log("error while liking the post");
    }
  };

  return (
    <AuthContext.Provider
      value={{ userdetails, user, token, url, likeTweet, likePost }}
    >
      {children}
    </AuthContext.Provider>
  );
};
