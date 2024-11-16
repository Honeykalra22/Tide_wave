import mongoose, { isValidObjectId } from "mongoose";
import { Like } from "../model/like.model.js";
import { Post } from "../model/post.model.js";
import { Tweet } from "../model/tweet.model.js";
import { apiError } from "../utils/apiError.js";
import { apiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";


// const likePost = asyncHandler(async (req, res) => {

//     const tweetId = req.params.id
//     const userId = req.user._id

//     const tweet = await Tweet.findById(tweetId)

//     if (!tweet) {
//         throw new apiError(404, "tweet is not found")
//     }

//     const existingLiked = await Like.findOne(
//         {
//             likedBy: userId,
//             tweet: tweetId
//         }
//     )


//     if (existingLiked) {
//         await existingLiked.deleteOne()
//         console.log('initial number of liked: ', tweet.likedCount)

//         // tweet.likedCount = Math.max(0, likedCount-1)
//         tweet.likedCount = Math.max(0, tweet.likedCount - 1);
//         console.log('after dislike number of likes: ', tweet.likedCount)
//         await tweet.save()

//         return res
//             .status(200)
//             .json(
//                 new apiResponse(200, null, "dislike a post done ")
//             )
//     }
//     else {
//         const like = new Like({
//             likedBy: userId,
//             tweet: tweetId
//         })
//         tweet.likedCount += 1
//         console.log('after like the post number of likes: ', tweet.likedCount)
//         await tweet.save()

//         await like.save()

//         return res
//             .status(200)
//             .json(
//                 new apiResponse(200, like, 'liked done ')
//             )
//     }
// })

const likeTweet = asyncHandler(async (req, res) => {

    const { tweetId } = req.params
    const userId = req.user?._id

    const tweet = await Tweet.findById(tweetId)

    if (!tweet) {
        throw new apiError(404, "post is not found")
    }

    // check if post is already liked or not, if not then like the post and increase the cnt by 1
    if (!tweet.likedBy.some( id => id.toString() === userId.toString())) {
        tweet.likedBy.push(tweetId)
        tweet.likedCount += 1;
    }
    else {
        tweet.likedBy = tweet.likedBy.filter(id => id.toString() !== userId.toString())
        tweet.likedCount -= 1
        if(tweet.likedCount < 0) {
            tweet.likedCount = 0;
        }
    }
    await tweet.save()

    return res
        .status(200)
        .json(
            new apiResponse(200, tweet, "post is liked successfully")
        )
})

const likePost = asyncHandler(async (req, res) => {

    const { tweetId } = req.params
    const userId = req.user?._id

    const post = await (Post.findById(tweetId) || Tweet.findById(tweetId))

    if (!post) {
        throw new apiError(404, "post is not found")
    }

    // check if post is already liked or not, if not then like the post and increase the cnt by 1
    if (!post.likedBy.some( id => id.toString() === userId.toString())) {
        post.likedBy.push(userId)
        post.likedCount += 1;
    }
    else {
        post.likedBy = post.likedBy.filter(id => id.toString() !== userId.toString())
        post.likedCount -= 1
        if(post.likedCount < 0) {
            post.likedCount = 0;
        }
    }
    await post.save()

    return res
        .status(200)
        .json(
            new apiResponse(200, post, "post is liked successfully")
        )
})

const getPostLikes = asyncHandler(async (req, res) => {
    const { postId } = req.params;

    if(!isValidObjectId(postId)){
        throw new apiError(400, "Invalid PostId");
    }
    const likedData = await Post.aggregate([
        {
            $match: {
                _id: mongoose.Types.ObjectId(postId)
            }
        },
        {
            $project: {
                likesCount: {
                    $size: "$likedBy"
                },
                likedBy: 1
            }
        }
    ])

    return res
        .status(200)
        .json(
            new apiResponse(200, likedData, "Number of likes are fetched successfully")
        )
})

export {
    likeTweet,
    likePost,
    getPostLikes,
}
