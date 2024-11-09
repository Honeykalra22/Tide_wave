import express from 'express'
import cookieParser from 'cookie-parser'
import cors from 'cors'

const app = express()

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
}))

app.use(express.json({ limit: "128kb" }))
app.use(express.urlencoded({ extended: true, limit: "128kb" }))
app.use(cookieParser())


import userRoute from './route/user.route.js'
app.use('/api/v2/user', userRoute)

import tweetrouter from './route/tweet.route.js'
app.use('/api/v2/tweet', tweetrouter)

import postrouter from './route/post.route.js'
app.use('/api/v2/post', postrouter)

import commentRouter from './route/comment.route.js'
app.use('/api/v2/comment', commentRouter)


export { app }