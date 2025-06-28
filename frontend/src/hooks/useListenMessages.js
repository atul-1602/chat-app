import { useEffect, useCallback } from "react"
import { useSocketContext } from "../context/socketContext"
import useConversation from "../zustand/useConversation"
import { useAuthContext } from "../context/authContext"
import notificationSound from "../assets/sound/sound.mp3"

const useListenMessage = () => {
  const { socket } = useSocketContext()
  const { addMessage, selectedConversation } = useConversation()
  const { authUser } = useAuthContext()

  const handleNewMessage = useCallback((newMessage) => {
    try {
      console.log('📨 useListenMessages: Received new message:', newMessage)
      console.log('📨 Current conversation:', selectedConversation?._id)
      console.log('📨 Current user:', authUser?._id)
      console.log('📨 Message sender:', newMessage.senderId?._id || newMessage.senderId)
      console.log('📨 Message receiver:', newMessage.receiverId)
      
      // Validate message object
      if (!newMessage || !newMessage._id) {
        console.error('❌ Invalid message object received:', newMessage)
        return
      }
      
      // Get the current user ID
      const currentUserId = authUser?._id
      const messageSenderId = newMessage.senderId?._id || newMessage.senderId
      const messageReceiverId = newMessage.receiverId
      
      // Check if this message involves the current user
      const isMessageForCurrentUser = 
        currentUserId === messageSenderId || 
        currentUserId === messageReceiverId
      
      if (!isMessageForCurrentUser) {
        console.log('❌ Message not for current user, ignoring')
        return
      }
      
      // Check if this message belongs to the current conversation
      // A message belongs to the current conversation if:
      // 1. The current conversation is with the sender OR receiver
      // 2. The message involves both the sender and receiver of the current conversation
      const isCurrentConversation = 
        (selectedConversation?._id === messageSenderId && currentUserId === messageReceiverId) ||
        (selectedConversation?._id === messageReceiverId && currentUserId === messageSenderId)

      if (isCurrentConversation) {
        console.log('✅ Adding message to current conversation')
        
        // Play notification sound for received messages (not sent by current user)
        if (messageSenderId !== currentUserId) {
          try {
            const sound = new Audio(notificationSound)
            sound.play().catch(err => console.log('🔊 Sound play error:', err))
          } catch (err) {
            console.log('🔊 Sound error:', err)
          }
        }
        
        // Add message to conversation using the optimized method
        addMessage(newMessage)
      } else {
        console.log('❌ Message not for current conversation, but for current user')
        console.log('   Current conversation ID:', selectedConversation?._id)
        console.log('   Message sender ID:', messageSenderId)
        console.log('   Message receiver ID:', messageReceiverId)
        console.log('   Current user ID:', currentUserId)
        // You could add a notification here for messages in other conversations
      }
    } catch (error) {
      console.error('❌ Error in handleNewMessage:', error)
    }
  }, [selectedConversation, addMessage, authUser])

  useEffect(() => {
    if (!socket) {
      console.log('❌ No socket available for message listening')
      return
    }

    console.log('🎧 Setting up message listener for conversation:', selectedConversation?._id)
    
    socket.on("newMessage", handleNewMessage)

    return () => {
      console.log('🎧 Cleaning up message listener')
      socket.off("newMessage", handleNewMessage)
    }
  }, [socket, handleNewMessage])
}

export default useListenMessage
