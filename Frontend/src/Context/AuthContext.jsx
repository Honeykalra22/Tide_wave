import axios from "axios";
import React, { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const url = "tide-wave-tuoq.vercel.app/api/v2";

  const [user, setUser] = useState(null);
  const [followerData, setFollowerData] = useState({ followers: [] });

  const token = localStorage.getItem("accessToken");

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
      console.log("User data is:", userdata);
    } catch (error) {
      console.error("Error fetching user details:", error.response?.data || error.message);
      setUser(null);
    }
  };

  const likeTweet = async (tweetId) => {
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

      setUser((prevUser) => ({
        ...prevUser,
        tweets: prevUser.tweets.map((tweet) =>
          tweet._id === tweetId
            ? { ...tweet, likedBy: TweetLikeresponse.data.data.likedBy, likedCount: TweetLikeresponse.data.data.likedCount }
            : tweet
        ),
      }));
    } catch (error) {
      console.log("Error while liking the tweet:", error.response?.data || error.message);
    }
  };

  const likePost = async (postId) => {
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

      setUser((prevUser) => ({
        ...prevUser,
        posts: prevUser.posts.map((post) =>
          post._id === postId
            ? { ...post, likedBy: PostLikeresponse.data.data.likedBy, likedCount: PostLikeresponse.data.data.likedCount }
            : post
        ),
      }));
    } catch (error) {
      console.log("Error while liking the post:", error.response?.data || error.message);
    }
  };

  const followerPost = async () => {
    try {
      console.log('first step for follower details')
      const response = await axios.get(`${url}/user/followersdetails`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      console.log("Response data:", response.data);
  
      const followersData = response.data.data.followers.map((follower) => ({
        username: follower.username,
        fullname: follower.fullname,
        avatar: follower.avatar,
        posts: follower.posts || [], // Default to empty array if undefined
        tweets: follower.tweets || [], // Default to empty array if undefined
      }));
  
      setFollowerData({
        followers: followersData,
      });
    } catch (error) {
      console.error("Error fetching follower details:", error.response?.data || error.message);
    }
  };
  

  return (
    <AuthContext.Provider
      value={{
        userdetails,
        user,
        token,
        url,
        likeTweet,
        likePost,
        followerData,
        followerPost,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
