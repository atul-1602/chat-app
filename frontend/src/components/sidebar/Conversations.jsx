import React from 'react'
import Conversation from './Conversation'
import useGetConversations from '../../hooks/useGetConversations'

const Conversations = () => {
  const { conversations} = useGetConversations()  
  
  return (
    <div className='flex flex-col'>
        {conversations.map((conversation)=>(
          <Conversation key={conversation._id}
          conversation={conversation} />
        ))}
    </div>
  )
}

export default Conversations