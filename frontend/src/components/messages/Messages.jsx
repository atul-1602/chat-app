import React, { useRef, useEffect } from 'react'
import Message from './Message'
import useGetMessages from '../../hooks/useGetMessages'

const Messages = () => {
  const { messages, loading } = useGetMessages()
  const lastMsgRef = useRef()
  useEffect(() => {
    setTimeout(() => {
      lastMsgRef.current?.scrollIntoView({ behaviour: "smooth" })
    }, 50);
  }, [messages])

  return (
    <div className='px-4 flex-1 overflow-auto w-full max-h-[calc(100vh-150px)]'>
      {!loading && messages?.length > 0 && messages.map((message) => (
        <div ref={lastMsgRef} key={message._id}>
          <Message message={message} />
        </div>
      ))
      }
      {loading && <div>Loading messages....</div>}
      {!loading && messages?.length === 0 && <div> Send a message to start a conversation</div>}
    </div>
  )
}

export default Messages