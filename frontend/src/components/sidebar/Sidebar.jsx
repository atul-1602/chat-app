import React from 'react'
import SearchInput from './SearchInput'
import Conversations from './Conversations'
import LogoutButton from './LogoutButton'
import { useAuthContext } from '../../context/authContext'

const Sidebar = () => {
  const { authUser } = useAuthContext()

  return (
    <div className='h-full flex flex-col'>
      {/* Header */}
      <div className='p-6 border-b border-white/20'>
        <div className='flex items-center justify-between mb-4'>
          <div className='flex items-center space-x-3'>
            <div className='w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg'>
              <svg className='w-6 h-6 text-white' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z' />
              </svg>
            </div>
            <div>
              <h1 className='text-xl font-bold text-white'>ChatFlow</h1>
              <p className='text-xs text-gray-400'>Real-time messaging</p>
            </div>
          </div>
          
          {/* Close button for mobile */}
          {/* {onClose && (
            <button
              onClick={onClose}
              className='lg:hidden p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors duration-200'
            >
              <svg className='w-5 h-5 text-white' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M6 18L18 6M6 6l12 12' />
              </svg>
            </button>
          )} */}
        </div>
        
        {/* User Profile */}
        <div className='flex items-center space-x-3 p-3 bg-white/10 rounded-xl border border-white/20'>
          <div className='w-10 h-10 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg'>
            {authUser?.fullName?.charAt(0)?.toUpperCase() || 'U'}
          </div>
          <div className='flex-1 min-w-0'>
            <p className='text-sm font-medium text-white truncate'>{authUser?.fullName}</p>
            <p className='text-xs text-gray-400 truncate'>@{authUser?.userName}</p>
          </div>
          <div className='w-2 h-2 bg-green-400 rounded-full animate-pulse'></div>
        </div>
      </div>

      {/* Search */}
      <div className='p-4'>
        <SearchInput/>
      </div>

      {/* Conversations */}
      <div className='flex-1 overflow-hidden flex flex-col'>
        <div className='px-4 pb-2 flex-shrink-0'>
          <h2 className='text-sm font-semibold text-gray-300 uppercase tracking-wider mb-3'>Conversations</h2>
        </div>
        <div className='flex-1 overflow-y-auto pb-6'>
          <Conversations/>
        </div>
      </div>

      {/* Logout */}
      <div className='p-4 border-t border-white/20 bg-white/5 backdrop-blur-sm flex-shrink-0'>
        <LogoutButton/>
      </div>
    </div>
  )
}

export default Sidebar