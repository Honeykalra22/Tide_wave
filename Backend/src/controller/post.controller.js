import { asyncHandler } from "../utils/asyncHandler.js";
import { apiError } from "../utils/apiError.js";
import { apiResponse } from "../utils/apiResponse.js";
import { Post } from "../model/post.model.js";
import { User } from "../model/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { isValidObjectId } from "mongoose";


const addPost = asyncHandler(async (req, res) => {

    /*
        1. add photo
        2. discription of photo
        3. user
        4. 
    */

    const { userId } = req.params
    console.log(userId)
    const user = await User.findById(userId)

    if (!user) {
        throw new apiError(404, "user is not found")
    }
    console.log("File will start from now")
    const postpath = req?.files?.postFile?.[0] || "file error: file not found"
    console.log(req.files)

    // const { postpath } = req.body

    if (!postpath) {
        throw new apiError(500, "post is required")
    }

    const postFilePath = postpath.path;

    const post = await uploadOnCloudinary(postFilePath)
    if (!post.url) {
        throw new apiError(500, "post is not uploaded on cloudinary")
    }

    const { description } = req.body

    const posttouploaded = new Post({
        owner: userId,
        post: post.url,
        description
    })

    const savedPost = await posttouploaded.save()

    return res
        .status(200)
        .json(
            new apiResponse(200, savedPost, "post is uploaded successfully")
        )
})


const deletePost = asyncHandler(async (req, res) => {

    const { postId } = req.params
    const  userId  = req.user?._id

    if (!isValidObjectId(postId) || !isValidObjectId(userId)) {
        throw new apiError(400, "userid or postid is not valid")
    }

    const postpath = await Post.findById(postId)

    if (!postpath) {
        throw new apiError(404, "post path is not valid")
    }

    if (postpath.owner.toString() !== userId.toString()) {
        throw new apiError(400, "you are not authorized to delete the post")
    }

    const post = await Post.findById(postId)

    await postpath.deleteOne(post)

    return res
        .status(200)
        .json(
            new apiResponse(200, null, "post is deleted successfully")
        )

})




export {
    addPost,
    deletePost,
}


// both function are varified on postman