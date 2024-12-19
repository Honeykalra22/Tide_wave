import mongoose from 'mongoose'

const messageSchema = new mongoose.Schema({

    sender: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true
    },
    message: {
        type: String,
        required: true
    },
    roomId: {
        type: String,
        required: true
    },


}, {timestamps: true})

export const Message = mongoose.model("Message", messageSchema)