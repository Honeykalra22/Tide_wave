import { apiError } from "../utils/apiError.js";
import { apiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Follow } from "../model/follow.model.js";
import { User } from "../model/user.model.js";
import mongoose from "mongoose";


const followedBy = asyncHandler(async(req, res) => {

    const userId = req.user?._id

    if(!userId) {
        throw new apiError(400, "user id is missing")
    }

    const user = await User.aggregate([
        {
            $match: {
                _id: mongoose.Types.ObjectId(userId)
            }
        },
        {
            $lookup: {
                from: "users",
                localField: "followedBy",
                foreignField: "_id",
                as: "follower",
                pipeline: [
                    {
                        $project: {
                            username: 1,
                            fullname: 1,
                            avatar: 1
                        }
                    }
                ]
            },
        },
        
    ])

    if(!user || user.length === 0) {
        throw new apiError(404, "User is not found")
    }

    return res
    .status(200)
    .json(200, 
        new apiResponse(200, user[0], "users followers are fetched successfully")
    )
})

const followedTo = asyncHandler(async(req, res) => {

    const userId = req.user?._id
    if(!userId) {
        throw new apiError(400, "User id is missing")
    }

    const follow = await User.aggregate([
        {
            $match: {
                _id: mongoose.Types.ObjectId(userId)
            }
        },
        {
            $lookup: {
                from: 'users',
                localField: 'followedTo',
                foreignField: '_id',
                as: 'following',
                pipeline: [
                    {
                        $project: {
                            username: 1,
                            fullname: 1,
                            avatar: 1
                        }
                    }
                ]
            }
        }
    ])

    if(!follow || follow.length === 0) {
        throw new apiError(404, "User is not found")
    }

    return res
    .status(200)
    .json(200, 
        new apiResponse(200, follow[0], "followings are fetched successfully")
    )

})

const followTheUser = asyncHandler(async(req, res) => {

})

export {
    followedBy,
    followedTo,
    followTheUser,
}