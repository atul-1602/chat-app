// Socket functionality for Vercel deployment
// Note: Vercel doesn't support WebSockets, so this is a placeholder

import { Server } from "socket.io";

let io;
const connectedUsers = new Map();

// Initialize socket (no-op for Vercel)
export const initSocket = (server) => {
  io = new Server(server, {
    cors: {
      origin: process.env.FRONTEND_URL || "http://localhost:3000",
      credentials: true,
    },
  });

  io.on("connection", (socket) => {
    console.log("🔌 User connected:", socket.id);

    // Store user connection
    socket.on("userConnected", (userId) => {
      // Convert userId to string to ensure consistent storage
      const userIdString = userId.toString();
      connectedUsers.set(userIdString, socket.id);
      socket.userId = userIdString;
      console.log("👤 User stored:", userIdString, "Socket:", socket.id);
      
      // Broadcast online users to all clients
      io.emit("getOnlineUsers", Array.from(connectedUsers.keys()));
      console.log("👥 Broadcasting online users:", Array.from(connectedUsers.keys()));
    });

    // Handle disconnection
    socket.on("disconnect", () => {
      if (socket.userId) {
        connectedUsers.delete(socket.userId);
        console.log("👤 User disconnected:", socket.userId);
        
        // Broadcast updated online users to all clients
        io.emit("getOnlineUsers", Array.from(connectedUsers.keys()));
        console.log("👥 Broadcasting updated online users:", Array.from(connectedUsers.keys()));
      }
    });
  });

  console.log("🔌 Socket.io server initialized");
};

// Get receiver socket ID (no-op for Vercel)
export const getReceiverSocketId = (receiverId) => {
  // Convert receiverId to string to ensure consistent lookup
  const receiverIdString = receiverId.toString();
  const socketId = connectedUsers.get(receiverIdString);
  console.log("🔍 Looking up socket for user:", receiverIdString, "Found:", socketId);
  return socketId;
};

// Export io object (null for Vercel)
export { io }; 