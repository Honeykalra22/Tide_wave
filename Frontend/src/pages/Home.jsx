import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../Context/AuthContext';
import { useNavigate } from 'react-router-dom';
import Postdesign from '../components/Postdesign';
import TweetDesign from '../components/Tweet_design';

function Home() {
  const isLoggedIn = !!localStorage.getItem("accessToken");
  const { followerData, followerPost } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [type, setType] = useState('Post')

  const navigate = useNavigate()
  useEffect(() => {
    if (isLoggedIn) {
      followerPost().then(() => setLoading(false));
    } else {
      navigate('/login');
    }
  }, [isLoggedIn]);

  if (loading) {
    return <p>Loading followers...</p>;
  }


  return (
    <div>
      {/* Toggle between Posts and Tweets */}
      <div className="flex text-xl text-gray-200 space-x-4">
        <p
          className={`cursor-pointer ${type === 'Post' ? 'underline' : ''}`}
          onClick={() => setType('Post')}
        >
          Posts
        </p>
        <p
          className={`cursor-pointer ${type === 'Tweet' ? 'underline' : ''}`}
          onClick={() => setType('Tweet')}
        >
          Tweets
        </p>
      </div>

      {/* Render follower data */}
      {followerData && followerData.followers && followerData.followers.length > 0 ? (
        followerData.followers.map((follower, index) => (
          <div key={index} className="border p-4 mb-4 rounded-lg shadow">
            {/* Render Posts */}
            {type === 'Post' && (
              <div>
                {follower.posts.map((post, postIndex) => (
                  <Postdesign
                    key={postIndex}
                    avatar={follower.avatar}
                    fullname={follower.fullname}
                    updatedAt={post.updatedAt}
                    description={post.description}
                    post={post.post}
                  />
                ))}
              </div>
            )}

            {/* Render Tweets */}
            {type === 'Tweet' && (
              <div>
                {follower.tweets.map((tweet, tweetIndex) => (
                  <TweetDesign
                    key={tweetIndex}
                    username={follower.username}
                    fullname = {follower.fullname}
                    updatedAt={tweet.updatedAt}
                    content={tweet.content}
                    _id={tweet._id}
                    avatar={follower.avatar}
                  />
                ))}
              </div>
            )}
          </div>
        ))
      ) : (
        <p>No followers found.</p>
      )}
    </div>

  );
}

export default Home;
