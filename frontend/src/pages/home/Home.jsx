import React from 'react'
import Sidebar from '../../components/sidebar/Sidebar'
import MessageContainer from '../../components/messages/MessageContainer'

const Home = () => {
  return (
    <div className='h-[100dvh] w-[100dvw] flex bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 overflow-hidden'>
      {/* Sidebar */}
      <div className='w-80 bg-white/10 backdrop-blur-xl border-r border-white/20 shadow-2xl overflow-hidden'>
        <Sidebar/>
      </div>
      
      {/* Main Chat Area */}
      <div className='flex-1 bg-gradient-to-br from-slate-800/50 to-purple-900/50 backdrop-blur-sm overflow-hidden'>
        <MessageContainer/>
      </div>
    </div>
  )
}

export default Home