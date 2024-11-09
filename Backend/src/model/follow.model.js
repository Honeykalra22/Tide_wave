import mongoose from 'mongoose'

const followSchema = new mongoose.Schema({

    user: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    },
    followedBy: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    },
    followedTo: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    },
    totalFollowers: {
        type: Number,
        reuired: true,
        default: 0
    },
    totalFollowing: {
        type: Number,
        reuired: true,
        default: 0
    }

}, {timestamps: true})

export const Follow = mongoose.model("Follow", followSchema)