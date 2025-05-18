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
    <div className='w-3xl flex flex-col'>
        {!selectedConversation ? <NoChatSelected/> : (
            <>
            {/* Header */}
            <div className='bg-slate-500 px-4 py-2 mb-2 flex justify-start'>
                <span className='label-text'>To: </span>
                <span className='text-gray-900'>{selectedConversation.fullName}</span>
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
    const {authUser} = useAuthContext()
    return(
        <div className='bg-amber-200 w-full h-full flex justify-center items-center'>
            <p>Welcome {authUser.fullName}<br/>
            Select a chat to start messaging</p>
        </div>
    )
}