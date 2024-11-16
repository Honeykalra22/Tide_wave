import { asyncHandler } from "../utils/asyncHandler.js";
import { apiError } from "../utils/apiError.js";
import { apiResponse } from "../utils/apiResponse.js";
import { User } from "../model/user.model.js";
import { Tweet } from "../model/tweet.model.js";
import { Like } from "../model/like.model.js";

const addTweet = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user?._id);
  if (!user) {
    throw new apiError(404, "User is not found");
  }

  const { content } = req.body;

  if (!content) {
    throw new apiError(400, "content is missing");
  }

  const tweet = new Tweet({
    owner: req.user._id,
    // owner: {
    //     username: user.username
    // },
    content,
  });


  await tweet.save();

  return res
    .status(200)
    .json(new apiResponse(200, tweet, "tweeted successfully done"));
});

const deleteTweet = asyncHandler(async (req, res) => {
  const tweetId = req.params.id;
  const userId = req.user._id;

  const tweet = await Tweet.findById(tweetId);

  if (!tweet) {
    throw new apiError(404, "tweet is not found");
  }

  if (tweet.owner.toString() !== userId.toString()) {
    throw new apiError(500, "you are not authorized to delete this tweet");
  }

  // await tweet.remove()
  await tweet.deleteOne({ _id: tweetId });

  return res
    .status(200)
    .json(new apiResponse(200, null, "tweet is deleted succesfully"));
});

const displayAllTweetsAnduser = asyncHandler(async (req, res) => {
  const userId = req.user?._id;
  const user = await User.findById(userId);
  if (!user) {
    throw new apiError(404, "User is not found");
  }

  const tweets = await Tweet.find({ owner: userId }).sort({ createdAt: -1 });

  const UserDetails = {
    username: user.username,
    avatar: user.avatar,
    userId,
    tweets: tweets.map((tweet) => ({
      content: tweet.content,
      createdAt: tweet.createdAt,
    })),
  };

  return res
    .status(200)
    .json(
      200,
      new apiResponse(200, UserDetails, "User data is fetched successfully")
    );
});

export { addTweet, deleteTweet, displayAllTweetsAnduser };
