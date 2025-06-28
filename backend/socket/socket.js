import { Server } from "socket.io";
import http from 'http'
import express from "express";

const app = express();
const server = http.createServer(app)

const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:3000';
const NODE_ENV = process.env.NODE_ENV || 'development';

const io = new Server(server, {
    cors: {
        origin: [FRONTEND_URL, 'https://vercel.app', 'https://*.vercel.app'],
        methods: ["GET", "POST"],
        credentials: true
    },
    transports: ['websocket', 'polling'],
    allowEIO3: true,
    // Vercel specific settings
    path: '/socket.io/',
    serveClient: false
})

export const getReceiverSocketId = (receiverId)=>{
  return userSocketMap[receiverId]
}

const userSocketMap = {}; // {userId: socketId}

io.on('connection', (socket) => {
  console.log("A user connected:", socket.id);
  
  const userId = socket.handshake.auth.userId
  if (userId) {
    userSocketMap[userId] = socket.id
    console.log("User mapped:", userId, "->", socket.id);
  }

  io.emit("getOnlineUsers", Object.keys(userSocketMap))

  socket.on('disconnect', () => {
    console.log("A user disconnected:", socket.id);
    if (userId) {
      delete userSocketMap[userId]
    }
    io.emit("getOnlineUsers", Object.keys(userSocketMap))
  })

  // Handle connection errors
  socket.on('error', (error) => {
    console.error('Socket error:', error);
  });
})

export { app, io, server }