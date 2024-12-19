import express from "express"
import cookieParser from "cookie-parser"
import cors from "cors"
import { Server } from "socket.io"
import { createServer } from "http"

const app = express();

const server = createServer(app)

const io = new Server(server, {
  cors: {
    origin: 'http://localhost:5173/',
    methods: ["GET", "POST"],
    credentials: true,
  },
});

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);
app.use(express.json({ limit: "128kb" }));
app.use(express.urlencoded({ extended: true, limit: "128kb" }));
app.use(cookieParser());


io.on("connection", (socket) => {
  console.log('Connected', socket.id);

  socket.on('join-room', (room) => {
    socket.join(room);
    console.log(`User is joined room: ${room}`);
  })

  socket.on('message', ({ message, room }) => {
    socket.to(room).emit('receive-message', message)
  })

  socket.on("disconnect", () => {
    console.log('user is disconnected', socket.id);
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

export { server };
