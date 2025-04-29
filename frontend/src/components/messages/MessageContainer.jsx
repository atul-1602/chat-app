import React from 'react'
import Messages from './Messages'
import MessageInput from './MessageInput'

const MessageContainer = () => {
    const noChatSelect =true
  return (
    <div className='w-3xl flex flex-col'>
        {noChatSelect ? <NoChatSelected/> : (
            <>
            {/* Header */}
            <div className='bg-slate-500 px-4 py-2 mb-2 flex justify-start'>
                <span className='label-text'>To: </span>
                <span className='text-gray-900'>John Doe</span>
            </div>
            <Messages/>
            <MessageInput/>
            </>
        )}
    </div>
  )
}

export default MessageContainer

const NoChatSelected = () => {
    return(
        <div className='bg-amber-200 w-full h-full flex justify-center items-center'>
            <p>Welcome John Deo<br/>
            Select a chat to start messaging</p>
        </div>
    )
}