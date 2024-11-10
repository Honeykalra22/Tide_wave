import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const userSchema = new mongoose.Schema({

    fullname: {
        type: String,
        // required: true,
        trim: true
    },
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    email: {
        type: String,
        // required: true,
        unique: true,
        trim: true
    },
    age: {
        type: Number,
    },
    refreshToken: {
        type: String
    },
    avatar: {
        type: String,
        // required: true
    },
    coverImage: {
        type: String,
    },
    password: {
        type: String,
        required: true,
    },
    followers: {
        type: Number,
        default: 0
    },
    following: {
        type: Number,
        default: 0
    },
    followedBy: [
        {
            type: mongoose.Types.ObjectId,
            ref: 'User'
        }
    ],
    followedTo: [
        {
            type: mongoose.Types.ObjectId,
            ref: 'User'
        }
    ],

}, { timestamps: true })


userSchema.pre("save", async function (next) {
    if (!this.isModified('password')) return next()

    this.password = await bcrypt.hash(this.password, 10)
    next()
})

userSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password)
}

userSchema.methods.generateAccessToken = function () {
    return jwt.sign(
        {
            _id: this._id,
            userSchema: this.username,
            fullname: this.fullname,
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}

userSchema.methods.generateRefreshToken = function () {
    return jwt.sign(
        {
            _id: this._id,
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}

export const User = mongoose.model("User", userSchema)

/*

    UserDetails:
        username
        fullname,
        age,
        avatar,
        coverimage
        password


*/