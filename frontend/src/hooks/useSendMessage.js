import React, { useState } from 'react'
import useConversation from '../zustand/useConversation'
import toast from 'react-hot-toast'

const useSendMessage = () => {
  const [loading, setLoading] = useState(false)
  const { messages, setMessages, selectedConversation } = useConversation()

  const sendMessage = async (newMessage) => {
    if (!selectedConversation?._id) {
      toast.error("No conversation selected")
      return
    }

    setLoading(true)
    try {
      const res = await fetch(`/api/messages/send/${selectedConversation._id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({ message: newMessage })
      })

      const data = await res.json()
      if (data.error) throw new Error(data.error)

      setMessages([...messages, data])
    } catch (err) {
      console.error("Send message error:", err)
      toast.error(err.message || 'Failed to send message')
    } finally {
      setLoading(false)
    }
  }

  return { loading, sendMessage }
}

export default useSendMessage
