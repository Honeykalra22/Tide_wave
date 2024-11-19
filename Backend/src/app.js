import express from "express"
import cookieParser from "cookie-parser"
import cors from "cors"
import { Server } from "socket.io"
import http from 'http'


const app = express();
// const server = require('socket.io')
const server = http.createServer(app)
const io = new Server(server, {
  cors: {
    origin: '*',
  },
});


app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

app.use(express.json({ limit: "128kb" }));
app.use(express.urlencoded({ extended: true, limit: "128kb" }));
app.use(cookieParser());


io.on("connection", (socket) => {
  console.log('A user connected', socket.id)

  socket.on("joinRoom", ({roomId}) => {
    socket.join(roomId)
    console.log(`User joined room: ${roomId}`)
  })

  socket.on('chatMessage', (message) => {
    io.to(message.roomId).emit("message", message)
  })

  socket.on('disconnect', () => {
    console.log('A user is disconnected: ', socket.id)
  })
})




import userRoute from "./route/user.route.js";
app.use("/api/v2/user", userRoute);

import tweetrouter from "./route/tweet.route.js";
app.use("/api/v2/tweet", tweetrouter);

import postrouter from "./route/post.route.js";
app.use("/api/v2/post", postrouter);

import commentRouter from "./route/comment.route.js";
app.use("/api/v2/comment", commentRouter);

import messageRouter from './route/message.route.js'
app.use('/api/v2/message', messageRouter)

export { app, server };
