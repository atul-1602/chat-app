import React, { useEffect } from 'react'
import Messages from './Messages'
import MessageInput from './MessageInput'
import useConversation from '../../zustand/useConversation'
import { useAuthContext } from '../../context/authContext'

const MessageContainer = () => {
    const {selectedConversation, setSelectedConversation}= useConversation()

    useEffect(()=>{
        // clean up function 
        return setSelectedConversation(null);
    },[setSelectedConversation])
    
  return (
    <div className='h-full flex flex-col overflow-hidden'>
        {!selectedConversation ? (
            <NoChatSelected />
        ) : (
            <>
                {/* Header */}
                <div className='bg-white/10 backdrop-blur-xl border-b border-white/20 px-6 py-4 flex-shrink-0'>
                    <div className='flex items-center space-x-3'>
                        <div className='w-10 h-10 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg'>
                            {selectedConversation.fullName?.charAt(0)?.toUpperCase() || 'U'}
                        </div>
                        <div className='flex-1'>
                            <h2 className='text-lg font-semibold text-white'>{selectedConversation.fullName}</h2>
                            <p className='text-sm text-gray-400'>@{selectedConversation.userName}</p>
                        </div>
                        <div className='flex items-center space-x-2'>
                            <div className='w-2 h-2 bg-green-400 rounded-full animate-pulse'></div>
                            <span className='text-xs text-green-400 font-medium'>Online</span>
                        </div>
                    </div>
                </div>
                
                {/* Messages */}
                <div className='flex-1 overflow-y-auto'>
                    <Messages/>
                </div>
                
                {/* Input */}
                <div className='bg-white/10 backdrop-blur-xl border-t border-white/20 flex-shrink-0'>
                    <MessageInput/>
                </div>
            </>
        )}
    </div>
  )
}

export default MessageContainer

const NoChatSelected = () => {
    const {authUser} = useAuthContext()
    return(
        <div className='h-full flex flex-col items-center justify-center text-center px-8'>
            <div className='w-24 h-24 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full flex items-center justify-center mb-6'>
                <svg className='w-12 h-12 text-blue-400' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z' />
                </svg>
            </div>
            <h2 className='text-2xl font-bold text-white mb-2'>Welcome to ChatFlow!</h2>
            <p className='text-gray-300 mb-4'>
                Hi <span className='text-blue-400 font-semibold'>{authUser?.fullName}</span>, 
                select a conversation to start messaging
            </p>
            <div className='flex items-center space-x-2 text-gray-400'>
                <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z' />
                </svg>
                <span className='text-sm'>Your messages will appear here</span>
            </div>
        </div>
    )
}