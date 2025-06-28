import React, { useMemo } from 'react'
import useConversation from '../../zustand/useConversation'
import { useSocketContext } from '../../context/socketContext'

const Conversation = ({ conversation }) => {
  const { selectedConversation, setSelectedConversation } = useConversation()
  const isSelected = useMemo(() => {
    return selectedConversation?._id === conversation._id
  }, [conversation._id, selectedConversation?._id])
  
  const { onlineUsers } = useSocketContext()
  const isOnline = onlineUsers.includes(conversation._id)
  
  return (
    <div 
      className={`group relative p-3 rounded-xl cursor-pointer transition-all duration-300 ${
        isSelected 
          ? 'bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/30 shadow-lg' 
          : 'hover:bg-white/10 border border-transparent hover:border-white/20'
      }`}
      onClick={() => setSelectedConversation(conversation)}
    >
      <div className='flex items-center space-x-3'>
        {/* Avatar */}
        <div className='relative'>
          <div className={`w-12 h-12 rounded-full bg-gradient-to-r from-amber-400 to-orange-500 flex items-center justify-center text-white font-bold text-lg shadow-lg ${
            isOnline ? 'ring-2 ring-green-400' : ''
          }`}>
            {conversation.fullName?.charAt(0)?.toUpperCase() || 'U'}
          </div>
          {isOnline && (
            <div className='absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white animate-pulse'></div>
          )}
        </div>

        {/* User Info */}
        <div className='flex-1 min-w-0'>
          <div className='flex items-center justify-between'>
            <p className={`font-semibold truncate ${
              isSelected ? 'text-white' : 'text-gray-200'
            }`}>
              {conversation.fullName}
            </p>
            {isOnline && (
              <div className='flex items-center space-x-1'>
                <div className='w-2 h-2 bg-green-400 rounded-full animate-pulse'></div>
                <span className='text-xs text-green-400 font-medium'>Online</span>
              </div>
            )}
          </div>
          <p className={`text-sm truncate ${
            isSelected ? 'text-gray-300' : 'text-gray-400'
          }`}>
            @{conversation.userName}
          </p>
        </div>
      </div>

      {/* Hover Effect */}
      <div className={`absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
        isSelected ? 'opacity-100' : ''
      }`}></div>
    </div>
  )
}

export default Conversation