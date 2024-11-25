import { apiError } from "../utils/apiError.js";
import { apiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Follow } from "../model/follow.model.js";
import { User } from "../model/user.model.js";
import mongoose from "mongoose";

const followedBy = asyncHandler(async (req, res) => {
  const userId = req.user?._id;

  if (!userId) {
    throw new apiError(400, "user id is missing");
  }

  const user = await User.aggregate([
    {
      $match: {
        _id: new mongoose.Types.ObjectId(userId),
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "followedBy",
        foreignField: "_id",
        as: "follower",
      },
    },
    {
      $project: {
        username: 1,
        fullname: 1,
        avatar: 1,
      },
    },
  ]);

  if (!user || user.length === 0) {
    throw new apiError(404, "User is not found");
  }

  return res
    .status(200)
    .json(
      200,
      new apiResponse(200, user[0], "users followers are fetched successfully")
    );
});

const followedTo = asyncHandler(async (req, res) => {
  const userId = req.user?._id;
  if (!userId) {
    throw new apiError(400, "User id is missing");
  }

  const follow = await User.aggregate([
    {
      $match: {
        _id: new mongoose.Types.ObjectId(userId),
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "followedTo",
        foreignField: "_id",
        as: "following",
        pipeline: [
          {
            $project: {
              username: 1,
              fullname: 1,
              avatar: 1,
            },
          },
        ],
      },
    },
  ]);

  if (!follow || follow.length === 0) {
    throw new apiError(404, "User is not found");
  }

  return res
    .status(200)
    .json(
      200,
      new apiResponse(200, follow[0], "followings are fetched successfully")
    );
});

const followTheUser = asyncHandler(async (req, res) => {
  const userId = req.user?._id;
  const { targetId } = req.params;

  if (userId.toString() === targetId.toString()) {
    throw new apiError(400, "You can't follow yourself");
  }

  const [user, target] = await Promise.all([
    User.findById(userId),
    User.findById(targetId),
  ]);

  if (!user || !target) {
    throw new apiError(404, "user not found");
  }

  const isAlreadyFollow = user.followedTo.includes(targetId);

  if (isAlreadyFollow) {
    // throw new apiError(400, "You have already followed each other")
    user.followedTo.pop(targetId);
    if (user.following > 0) user.following -= 1;

    target.followedBy.pop(userId);
    if (target.followers > 0) target.followers -= 1;
  } else {
    user.followedTo.push(targetId);
    user.following += 1;
    target.followedBy.push(userId);
    target.followers += 1;
  }

  await user.save();
  await target.save();

  return res
    .status(200)
    .json(
      200,
      new apiResponse(200, { user, target }, "Successfully followed the user")
    );
});

const followersDetails = asyncHandler(async (req, res) => {
  const userId = req.user?._id;
  if (!userId) {
    throw new apiError(400, "User ID is missing");
  }

  const followersData = await User.aggregate([
    {
      $match: {
        _id: new mongoose.Types.ObjectId(userId),
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "followedTo", // Field in User schema containing IDs of followers
        foreignField: "_id",
        as: "followers",
        pipeline: [
          // Fetch followers' basic details
          {
            $project: {
              _id: 1,
              username: 1,
              fullname: 1,
              avatar: 1,
              updatedAt: 1,
            },
          },
        ],
      },
    },
    {
      $unwind: "$followers",
    },
    {
      $lookup: {
        from: "posts",
        localField: "followers._id",
        foreignField: "owner",
        as: "followersPosts",
      },
    },
    {
      $lookup: {
        from: "tweets",
        localField: "followers._id",
        foreignField: "owner",
        as: "followersTweets",
      },
    },
    {
      $group: {
        _id: "$_id",
        followers: {
          $push: {
            username: "$followers.username",
            fullname: "$followers.fullname",
            avatar: "$followers.avatar",
            posts: {
              $map: {
                input: "$followersPosts",
                as: "post",
                in: {
                  _id: "$$post._id",
                  post: "$$post.post",
                  description: "$$post.description",
                  views: "$$post.views",
                  updatedAt: '$$post.updatedAt',
                  likedBy: { $ifNull: ["$$post.likedBy", []] },
                  likedCount: { $size: { $ifNull: ["$$post.likedBy", []] } },
                },
              },
            },
            tweets: {
              $map: {
                input: "$followersTweets",
                as: "tweet",
                in: {
                  _id: "$$tweet._id",
                  content: "$$tweet.content",
                  updatedAt: '$$tweet.updatedAt',
                  likedBy: { $ifNull: ["$$tweet.likedBy", []] },
                  likedCount: { $size: { $ifNull: ["$$tweet.likedBy", []] } },
                },
              },
            },
          },
        },
      },
    },
    {
      $project: {
        _id: 0,
        followers: 1,
      },
    },
  ]);

  // if (!followersData || followersData.length === 0) {
  //   throw new apiError(404, "No followers found");
  // }

  return res
    .status(200)
    .json(
      200,
      new apiResponse(200, followersData[0], "Followers fetched successfully")
    );
});


export { followedBy, followedTo, followTheUser, followersDetails };

// check this on postman first then start
