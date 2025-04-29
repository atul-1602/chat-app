import React from 'react'
import Sidebar from '../../components/sidebar/Sidebar'
import MessageContainer from '../../components/messages/MessageContainer'

const Home = () => {
  return (
    <div className='flex bg-gray-400'>
      <Sidebar/>
      <MessageContainer/>
    </div>
  )
}

export default Home