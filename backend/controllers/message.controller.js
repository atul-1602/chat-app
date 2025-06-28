import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";
import { getReceiverSocketId, io } from "../socket/socket.js";

// Send Message Controller
export const sendMessage = async (req, res) => {
  try {
    const { message } = req.body;
    const { id: receiverId } = req.params;
    const senderId = req.user._id;

    console.log("📨 Processing message from:", senderId, "to:", receiverId);
    console.log("📨 Message content:", message);

    let conversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] },
    });

    if (!conversation) {
      conversation = await Conversation.create({
        participants: [senderId, receiverId],
      });
      console.log("💬 Created new conversation:", conversation._id);
    } else {
      console.log("💬 Found existing conversation:", conversation._id);
    }

    const newMessage = new Message({
      senderId,
      receiverId,
      message,
    });

    if (newMessage) {
      conversation.messages.push(newMessage._id);
    }

    await Promise.all([conversation.save(), newMessage.save()]);
    console.log("💾 Message saved:", newMessage._id);

    // Populate sender information for the response
    const populatedMessage = await Message.findById(newMessage._id).populate("senderId", "fullName userName profilePic");
    console.log("📨 Populated message:", populatedMessage._id);

    const receiverSocketid = getReceiverSocketId(receiverId);
    const senderSocketid = getReceiverSocketId(senderId);

    console.log("🔌 Emitting to receiver socket:", receiverSocketid);
    console.log("🔌 Emitting to sender socket:", senderSocketid);

    if (receiverSocketid && io) {
      io.to(receiverSocketid).emit('newMessage', populatedMessage);
      console.log("✅ Emitted newMessage to receiver");
    }
    if (senderSocketid && io && senderSocketid !== receiverSocketid) {
      io.to(senderSocketid).emit('newMessage', populatedMessage);
      console.log("✅ Emitted newMessage to sender");
    }

    return res.status(200).json(populatedMessage);
  } catch (err) {
    console.error("❌ Error in send message controller", err);
    if (!res.headersSent) {
      return res.status(500).json({ error: "Internal server error" });
    }
  }
};

// Get Messages Controller
export const getMessage = async (req, res) => {
  try {
    const { id: userToChatId } = req.params;
    const senderId = req.user._id;

    console.log("📥 Getting messages between:", senderId, "and:", userToChatId);

    const conversation = await Conversation.findOne({
      participants: { $all: [senderId, userToChatId] },
    }).populate({
      path: "messages",
      populate: {
        path: "senderId",
        select: "fullName userName profilePic"
      }
    });

    if (!conversation) {
      console.log("📥 No conversation found, returning empty array");
      return res.status(200).json([]); // empty array if no conversation exists
    }

    const messages = conversation.messages;
    console.log("📥 Found", messages.length, "messages");
    return res.status(200).json(messages);
  } catch (err) {
    console.error("❌ Error in receiving message controller", err);
    if (!res.headersSent) {
      return res.status(500).json({ error: "Internal server error" });
    }
  }
};
