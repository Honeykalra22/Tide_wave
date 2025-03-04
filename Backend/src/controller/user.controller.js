import { User } from "../model/user.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { apiError } from "../utils/apiError.js";
import { apiResponse } from "../utils/apiResponse.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { Tweet } from "../model/tweet.model.js";
import mongoose, { isValidObjectId } from "mongoose";

const generateAccessTokenRefreshToken = async (userId) => {
  try {
    const user = await User.findById(userId);
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (error) {
    throw new apiError(
      500,
      "something went wrong while generating referesh and access token"
    );
  }
};

const registerUser = asyncHandler(async (req, res) => {
  /*
        1. user data from frontend
        2. validation of data if any data is missing or not
        3. check if user is already registered or not
        4. check for avatar and cover image if they upload or not
        5. create a new user in database
        6. register user is completed
    */

  const { fullname } = req.body;

  const { username, email, password } = req.body;
  if ([username, password].some((field) => field?.trim() === "")) {
    throw new apiError(500, "All fields are requied");
  }

  const existedUser = await User.findOne({
    $or: [{ username }, { email }],
  });

  // const existedUser = await User.findOne({username})

  if (existedUser) {
    throw new apiError(401, "user is already existed");
  }

  // const avatarLocalPath = req.files?.avatar[0]?.path;
  let avatarLocalPath;
  if (
    req.files &&
    Array.isArray(req.files.avatar) &&
    req.files.avatar.length > 0
  ) {
    avatarLocalPath = req.files.avatar[0].path;
  }

  let coverImagepath;
  if (
    req.files &&
    Array.isArray(req.files.coverImage) &&
    req.files.coverImage.length > 0
  ) {
    coverImagepath = req.files.coverImage[0].path;
  }

  // if (!avatarLocalPath) {
  //     throw new apiError(500, 'avatar is required')
  // }

  // upload on cloudinary
  const avatar = avatarLocalPath
    ? await uploadOnCloudinary(avatarLocalPath)
    : null;
  // const coverImage = await uploadOnCloudinary(coverImagepath)
  const coverImage = coverImagepath
    ? await uploadOnCloudinary(coverImagepath)
    : null;

  // console.log(coverImage.url)

  if ((avatarLocalPath && !avatar) || (coverImagepath && !coverImage)) {
    throw new apiError(401, "Avatar or coverImage upload failed");
  }

  const user = await User.create({
    fullname,
    avatar: avatar?.url || null,
    coverImage: coverImage?.url || null,
    username,
    email,
    password,
  });

  const createUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  if (!createUser) {
    throw new apiError(401, "something went wrong");
  }

  return res
    .status(200)
    .json(new apiResponse(200, createUser, "user is registerd successfully"));
});

const loginUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;
  if (!username) {
    throw new apiError(500, "username is required");
  }

  const user = await User.findOne({
    $or: [{ email }, { username }],
  });
  if (!user) {
    throw new apiError(404, "user is not registered");
  }

  const isPasswordValid = await user.isPasswordCorrect(password);
  if (!isPasswordValid) {
    throw new apiError(500, "password is not correct");
  }

  const { accessToken, refreshToken } = await generateAccessTokenRefreshToken(
    user._id
  );

  // console.log(accessToken, refreshToken)
  const loginUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  const options = {
    httpOnly: true,
    secure: false,
  };

  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new apiResponse(
        200,
        {
          user: loginUser,
          accessToken,
          refreshToken,
        },
        "user login successfully done"
      )
    );
});

const logoutUser = asyncHandler(async (req, res) => {
  await User.findByIdAndUpdate(
    req.user._id,
    {
      $set: {
        refreshToken: '',
        accessToken: '',
      },
    },
    {
      new: true,
    }
  );

  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .cookie("accessToken", options)
    .cookie("refreshToken", options)
    .json(new apiResponse(200, "user log out succesfully"));
});

const updatePassword = asyncHandler(async (req, res) => {
  const { oldPassword, newPassword } = req.body;

  const user = await User.findById(req.user?._id);
  const isPasswordCorrect = await isPasswordCorrect(oldPassword);

  if (!isPasswordCorrect) {
    throw new apiError(500, "Password is not correct");
  }

  user.password = newPassword;

  await user.save({ validateBeforeSave: false });

  return res
    .status(200)
    .json(new apiResponse(200, {}, "password is changed successfully"));
});

const changeAvatar = asyncHandler(async (req, res) => {
  const avatarLocalPath = req.file?.path;
  if (!avatarLocalPath) {
    throw new apiError(404, "avatar is not find");
  }

  const avatar = await uploadOnCloudinary(avatarLocalPath);

  if (!avatar.url) {
    throw new apiError(404, "avatar is not uploaded on cloudinary");
  }

  const user = await User.findByIdAndUpdate(
    req.user?._id,
    {
      $set: {
        avatar: avatar.url,
      },
    },
    {
      new: true,
    }
  ).select("-password -refreshToken");

  return res
    .status(200)
    .json(new apiResponse(200, user, "avatar is changed successfully"));
});

const changeProfileDetails = asyncHandler(async (req, res) => {
  const { fullname, username } = req.body;

  if (!fullname || !username) {
    throw new apiError(500, "make some input for updated");
  }

  const user = await User.findByIdAndUpdate(
    req.user?._id,
    {
      $set: {
        username: username,
        fullname: fullname,
      },
    },
    {
      new: true,
    }
  ).select("-password -refreshToken");

  return res
    .status(200)
    .json(
      new apiResponse(200, user, "profile details are updated successfully")
    );
});

const changeCoverImage = asyncHandler(async (req, res) => {
  const coverImagepath = req.file?.path;
  if (!coverImagepath) {
    throw new apiError(500, "cover image is required");
  }

  const coverImage = await uploadOnCloudinary(coverImagepath);

  if (!coverImage.url) {
    throw new apiError(500, "cover image is not uploaded on cloudinary");
  }

  const user = await User.findByIdAndUpdate(
    req.user?._id,
    {
      $set: {
        coverImage: coverImage.url,
      },
    },
    {
      new: true,
    }
  ).select("-password -refreshToken");

  return res
    .status(200)
    .json(new apiResponse(200, user, "cover image is updated"));
});

const getCurrentUser = asyncHandler(async (req, res) => {
  return res.status(200).json(200, req.user, "Current user is fetched");
});

// const getUserDetails = asyncHandler(async(req, res) => {
//   const userId = req.user?._id
//   const user = await User.findById(userId)

//   if(!user) {
//     throw new apiError(404, "User is not found")
//   }

//   const userTweet = await User.aggregate([
//     {
//       $match: {
//         _id: mongoose.Types.ObjectId(userId)
//       }
//     },
//     {
//       $lookup: {
//         from: 'tweets',
//         localField: '_id',
//         foreignField: ''
//       }
//     }
//   ])

//   const userDetail = {
//     username: user.username,
//     email: user.email,
//     avatar: user.avatar,
//     coverImage: user.coverImage
//   }

// })

const getUserDetails = asyncHandler(async (req, res) => {
  const userId = req.user?._id;
  if (!isValidObjectId(userId)) {
    throw new apiError(400, "User id is not correct");
  }

  const user = await User.findById(userId);
  if (!user) {
    throw new apiError(404, "User is not found");
  }

  const userPostsAndTweets = await User.aggregate([
    {
      $match: {
        _id: new mongoose.Types.ObjectId(userId.toString()),
      },
    },
    {
      $lookup: {
        from: "posts",
        localField: "_id",
        foreignField: "owner",
        as: "userPosts",
      },
    },
    {
      $lookup: {
        from: "tweets",
        localField: "_id",
        foreignField: "owner",
        as: "userTweets",
      },
    },
    {
      $project: {
        username: 1,
        fullname: 1,
        avatar: 1,
        coverImage: 1,
        email: 1,
        userPosts: {
          $map: {
            input: "$userPosts",
            as: "post",
            in: {
              _id: "$$post._id",
              post: '$$post.post',
              description: "$$post.description",
              views: "$$post.views",
              updatedAt: "$$post.updatedAt",
              likedBy: { $ifNull: ["$$post.likedBy", []] },
              likedCount: { $size: { $ifNull: ["$$post.likedBy", []] } },
            },
          },
        },
        userTweets: {
          $map: {
            input: "$userTweets",
            as: "tweet",
            in: {
              _id: "$$tweet._id",
              content: "$$tweet.content",
              updatedAt: "$$tweet.updatedAt",
              likedBy: { $ifNull: ["$$tweet.likedBy", []] },
              likedCount: { $size: { $ifNull: ["$$tweet.likedBy", []] } },
            },
          },
        },
      },
    },
    // {
    //   $project: {
    //     userPosts: {
    //       $map: {
    //         input: "$userPosts",
    //         as: "post",
    //         in: {
    //           _id: "$$post._id",
    //           post: "$$post.post",
    //           description: "$$post.description",
    //           views: "$$post.views",
    //           likedBy: { $ifNull: ["$$post.likedBy", []] },
    //           likedCount: { $size: { $ifNull: ["$$post.likedBy", []] } },
    //         },
    //       },
    //     },
    //     usetTweets: {
    //       $map: {
    //         input: "$userTweets",
    //         as: "tweet",
    //         in: {
    //           _id: "$$tweet._id",
    //           content: "$$tweet.content",
    //           likedBy: { $ifNull: ["$$tweet.likedBy", []] },
    //           likedCount: { $size: { $ifNull: ["$$tweet.likedBy", []] } },
    //         },
    //       },
    //     },
    //   },
    // },
    // {
    //   $unwind: {
    //     path: '$userPosts',
    //     preserveNullAndEmptyArrays: false,
    //   },
    // },
    // {
    //   $project: {
    //     post: '$userPosts',
    //     description: '$userPosts.description',
    //     views: '$userPosts.views',
    //     likedBy: '$userPosts.likedBy', // Assuming `likedBy` exists in post schema
    //     likedCount: { $size: '$userPosts.likedBy' }, // Calculate liked count based on likedBy array size
    //   },
    // },
  ]);

  const userDetail = {
    username: user.username,
    fullname: user.fullname,
    avatar: user.avatar,
    coverImage: user.coverImage,
    email: user.email,
    userPosts: userPostsAndTweets[0]?.userPosts || [],
    userTweets: userPostsAndTweets[0]?.userTweets || [],
  };

  return res
    .status(200)
    .json(
      200,
      new apiResponse(200, userDetail, "User  details fetched successfully")
    );
});

const searchUser = asyncHandler(async (req, res) => {

  const userId = req.user?._id
  if (!isValidObjectId(userId)) {
    throw new apiError(400, "User id is not valid")
  }

  const {username}  = req.body
  if (!username) {
    throw new apiError(404, `Search Parameter ${username} is required`)
  }

  const searchResult = await User.find({
    username: {
      $regex: username,
      $options: 'i'
    }
  })

  if(searchResult.length === 0) {
    throw new apiError(404, `No user is found with username : ${username}`)
  }

  return res
  .status(200)
  .json(200, 
    new apiResponse(200, searchResult, `${username} is find`)
  )

})

export {
  loginUser,
  registerUser,
  logoutUser,
  updatePassword,
  changeAvatar,
  changeProfileDetails,
  changeCoverImage,
  getCurrentUser,
  getUserDetails,
  searchUser,
};
