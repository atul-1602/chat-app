'use client'
import React from 'react'
import Conversation from './Conversation'
import useGetConversations from '../../hooks/useGetConversations'

const Conversations = () => {
  const { conversations, isLoading } = useGetConversations()  

  if (isLoading) {
    return (
      <div className='flex items-center justify-center h-32'>
        <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500'></div>
      </div>
    )
  }

  if (conversations.length === 0) {
    return (
      <div className='flex flex-col items-center justify-center h-32 text-center px-4'>
        <div className='w-12 h-12 bg-gray-600/20 rounded-full flex items-center justify-center mb-3'>
          <svg className='w-6 h-6 text-gray-400' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z' />
          </svg>
        </div>
        <p className='text-gray-400 text-sm font-medium'>No conversations yet</p>
        <p className='text-gray-500 text-xs mt-1'>Start chatting with someone!</p>
      </div>
    )
  }

  return (
    <div className='space-y-1 px-4 pb-2'>
      {conversations.map((conversation, index) => (
        <div 
          key={conversation._id}
          className='animate-fadeIn'
          style={{ animationDelay: `${index * 100}ms` }}
        >
          <Conversation conversation={conversation} />
        </div>
      ))}
    </div>
  )
}

export default Conversations