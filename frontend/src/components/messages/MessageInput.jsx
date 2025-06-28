import React, { useState } from 'react'
import useSendMessage from '../../hooks/useSendMessage'

const MessageInput = () => {
  const [message, setMessage] = useState('')
  const { loading, sendMessage } = useSendMessage()

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!message.trim()) return

    await sendMessage(message)
    setMessage('')
  }

  return (
    <form className='p-4' onSubmit={handleSubmit}>
      <div className='flex items-center space-x-3'>
        {/* Message Input */}
        <div className='flex-1 relative'>
          <textarea
            placeholder='Type your message...'
            className='w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 resize-none'
            rows='1'
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            disabled={loading}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault()
                handleSubmit(e)
              }
            }}
          />
        </div>

        {/* Send Button */}
        <button 
          type="submit" 
          disabled={loading || !message.trim()}
          className='bg-gradient-to-r from-blue-500 to-purple-600 text-white p-3 rounded-xl hover:from-blue-600 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg flex items-center justify-center min-w-[48px] h-[48px]'
        >
          {loading ? (
            <div className='animate-spin rounded-full h-5 w-5 border-b-2 border-white'></div>
          ) : (
            <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 19l9 2-9-18-9 18 9-2zm0 0v-8' />
            </svg>
          )}
        </button>
      </div>
    </form>
  )
}

export default MessageInput
