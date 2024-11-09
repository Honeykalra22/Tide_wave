import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({

    commentBy: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    },
    content: {
        type: String,
        required: true
    },
    postId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",
        required: function () {
            return !this.tweetId;
        }
    },
    tweetId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Tweet",
        required: function () {
            return !this.postId;
        }
    }

}, { timestamps: true })

export const Comment = mongoose.model("Comment", commentSchema)