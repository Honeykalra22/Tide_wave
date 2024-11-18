import mongoose from 'mongoose'

const postSchema = new mongoose.Schema({

    post: {
        type: String,
        required: true
    },
    description: {
        type: String,
    },
    owner: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true
    },
    views: {
        type: Number,
        default: 0
    },
    likedBy: [
        {
            type: mongoose.Types.ObjectId,
            ref: 'User',
        }
    ],
    likedCount: {
        type: Number,
        default: 0,
    },



}, {timestamps: true})

export const Post = mongoose.model("Post", postSchema)
