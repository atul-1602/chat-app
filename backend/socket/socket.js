import { Server } from "socket.io";
import http from 'http'
import express from "express";

const app = express();
const server = http.createServer(app)
const io = new Server(server, {
    cors: {
        origin: ["http://localhost:3000"],
        methods: ["GET", "POST"]
    }
})

export const getReceiverSocketId = (receiverId)=>{
  return userSocketMap[receiverId]
}

const userSocketMap = {}; // {userId: socketId}

io.on('connection', (socket) => {
  const userId = socket.handshake.auth.userId
  if (userId) {
    userSocketMap[userId] = socket.id
  }

  io.emit("getOnlineUsers", Object.keys(userSocketMap))

  socket.on('disconnect', () => {
    if (userId) {
      delete userSocketMap[userId]
    }
    io.emit("getOnlineUsers", Object.keys(userSocketMap))
  })
})


export { app, io, server }