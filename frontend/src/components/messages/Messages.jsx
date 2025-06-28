import React, { useRef, useEffect } from 'react'
import Message from './Message'
import useGetMessages from '../../hooks/useGetMessages'
import useListenMessage from '../../hooks/useListenMessages'

const Messages = () => {
  const { messages, loading } = useGetMessages()
  const lastMsgRef = useRef()
  useListenMessage()
  
  useEffect(() => {
    setTimeout(() => {
      lastMsgRef.current?.scrollIntoView({ behaviour: "smooth" })
    }, 50);
  }, [messages])

  if (loading) {
    return (
      <div className='flex items-center justify-center h-full'>
        <div className='text-center'>
          <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4'></div>
          <p className='text-gray-400'>Loading messages...</p>
        </div>
      </div>
    )
  }

  if (!messages || messages.length === 0) {
    return (
      <div className='flex items-center justify-center h-full'>
        <div className='text-center'>
          <div className='w-16 h-16 bg-gray-600/20 rounded-full flex items-center justify-center mx-auto mb-4'>
            <svg className='w-8 h-8 text-gray-400' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z' />
            </svg>
          </div>
          <p className='text-gray-400 font-medium'>No messages yet</p>
          <p className='text-gray-500 text-sm mt-1'>Send a message to start the conversation</p>
        </div>
      </div>
    )
  }

  return (
    <div className='flex-1 overflow-y-auto px-6 py-4 space-y-4'>
      {messages.map((message, index) => (
        <div 
          ref={index === messages.length - 1 ? lastMsgRef : null} 
          key={message._id}
          className='animate-fadeIn'
          style={{ animationDelay: `${index * 50}ms` }}
        >
          <Message message={message} />
        </div>
      ))}
    </div>
  )
}

export default Messages