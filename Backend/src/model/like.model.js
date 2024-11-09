import mongoose from "mongoose";

const likeSchema = new mongoose.Schema({

    owner: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    },
    likedBy: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true
    },
    likedCount: {
        type: Number,
        default: 0
    },
    


}, { timestamps: true })

export const Like = mongoose.model("Like", likeSchema)