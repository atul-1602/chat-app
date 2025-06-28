// Socket functionality for Vercel deployment
// Note: Vercel doesn't support WebSockets, so this is a placeholder

let io = null;
const connectedUsers = new Map();

// Initialize socket (no-op for Vercel)
export const initSocket = (server) => {
  // Socket initialization is not supported on Vercel
  console.log('Socket initialization skipped - not supported on Vercel');
};

// Get receiver socket ID (no-op for Vercel)
export const getReceiverSocketId = (receiverId) => {
  // Return null since WebSockets are not supported on Vercel
  return null;
};

// Export io object (null for Vercel)
export { io }; 