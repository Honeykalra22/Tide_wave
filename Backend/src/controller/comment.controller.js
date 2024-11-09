import { Comment } from "../model/comment.model.js";
import { apiError } from "../utils/apiError.js";
import { apiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const CommentOnPost = asyncHandler(async (req, res) => {
    const userId = req.user?._id;
    if(!userId) {
        throw new apiError(400, "userId is missing");
    }
    // const { postId, tweetId } = req.params;
    const { postId } = req.params;
    const {content} = req.body;

    if(!postId) {
        throw new apiError(400, "postId is missing");
    }
    // if (!userId || (!postId && !tweetId)) {
    //     throw new apiError(400, "userId, postId, or tweetId is missing");
    // }

    const comment = new Comment({
        commentBy: userId,
        content,
        postId: postId || undefined,
        // tweetId: tweetId || undefined
    });

    await comment.save();

    return res
        .status(200)
        .json( new apiResponse(200, comment, "Comment on post/tweet is done"));
});

export { CommentOnPost };


// comment check on postman first