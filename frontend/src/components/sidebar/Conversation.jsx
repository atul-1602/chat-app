import React, { useMemo } from 'react'
import useConversation from '../../zustand/useConversation'

const Conversation = ({conversation}) => {
  const {selectedConversation, setSelectedConversation}= useConversation()
  const isSelected = useMemo(()=>{
    return selectedConversation?._id === conversation._id
  }, [conversation._id, selectedConversation?._id])
  
  return (
    <>
    <div className={`flex gap-2 items-center rounded px-2 py-1 cursor-pointer ${isSelected? "bg-sky-400": ""}`}
    onClick={()=>setSelectedConversation(conversation)}
    >
      {/* avatar */}
        <div className="rounded-full bg-amber-400 w-10">A</div>

        <div className='flex flex-col flex-1'>
          <div className='flex gap-3 justify-between'>
            <p className='font-bold'>{conversation.fullName}</p>
            <span></span>
          </div>
        </div>
    </div>
    <div className='border border-1'></div>
    </>
  )
}

export default Conversation