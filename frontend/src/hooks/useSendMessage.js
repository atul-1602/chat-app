import React, { useState } from 'react'
import useConversation from '../zustand/useConversation'
import toast from 'react-hot-toast'
const API_BASE_URL = import.meta.env.VITE_API_URL;
const useSendMessage = () => {
  const [loading, setLoading] = useState(false)
  const { selectedConversation, addMessage } = useConversation()

  const sendMessage = async (newMessage) => {
    if (!selectedConversation?._id) {
      toast.error("No conversation selected")
      return
    }

    console.log('📤 Sending message to:', selectedConversation._id)
    console.log('📤 Message content:', newMessage)

    setLoading(true)
    try {
      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), 15000) // 15 second timeout
      
      const res = await fetch(`${API_BASE_URL}/messages/send/${selectedConversation._id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({ message: newMessage }),
        signal: controller.signal
      })

      clearTimeout(timeoutId)

      if (res.status === 429) {
        throw new Error('Rate limit exceeded. Please wait a moment and try again.')
      }

      const data = await res.json()
      if (data.error) throw new Error(data.error)

      console.log('✅ Message sent successfully:', data)
      
      // Immediately add the message to the state for instant UI update
      addMessage(data)
      
    } catch (err) {
      console.error("❌ Send message error:", err)
      
      // Handle rate limiting
      if (err.message.includes('Rate limit')) {
        toast.error('Too many requests. Please wait a moment.')
        return
      }
      
      // Handle timeout
      if (err.name === 'AbortError') {
        toast.error('Request timeout. Please check your connection.')
        return
      }
      
      toast.error(err.message || 'Failed to send message')
    } finally {
      setLoading(false)
    }
  }

  return { loading, sendMessage }
}

export default useSendMessage
