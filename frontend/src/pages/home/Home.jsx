import React, { useState } from 'react'
import Sidebar from '../../components/sidebar/Sidebar'
import MessageContainer from '../../components/messages/MessageContainer'
import ErrorBoundary from '../../components/ErrorBoundary'

const Home = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen)
  }

  const closeSidebar = () => {
    setSidebarOpen(false)
  }

  return (
    <div className='h-[100dvh] w-[100dvw] flex bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 overflow-hidden'>
      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div 
          className='fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden animate-in fade-in duration-200'
          onClick={closeSidebar}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed lg:relative z-50 h-full
        w-80 bg-white/10 backdrop-blur-xl border-r border-white/20 shadow-2xl
        transform transition-transform duration-300 ease-in-out overflow-hidden
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        lg:shadow-none
      `}>
        <Sidebar />
      </div>
      
      {/* Main Chat Area */}
      <div className='flex-1 bg-gradient-to-br from-slate-800/50 to-purple-900/50 backdrop-blur-sm overflow-hidden'>
        <ErrorBoundary>
          <MessageContainer/>
        </ErrorBoundary>
      </div>

      {/* Floating Toggle Button for Mobile */}
      <button
        onClick={toggleSidebar}
        className={`lg:hidden fixed bottom-25 left-6 z-30 p-4 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 shadow-2xl transition-all duration-300 hover:scale-110 ${
          sidebarOpen ? 'opacity-50 scale-90' : 'opacity-100 scale-100 animate-pulse'
        }`}
        aria-label="Toggle sidebar menu"
      >
        <svg className='w-6 h-6 text-white' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
          <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M4 6h16M4 12h16M4 18h16' />
        </svg>
      </button>
    </div>
  )
}

export default Home