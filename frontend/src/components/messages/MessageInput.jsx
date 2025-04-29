import React from 'react'

const MessageInput = () => {
  return (
    <form className='px-4 my-3'>
        <div className='w-full flex justify-between bg-amber-200 gap-4'>
            <input type='text' placeholder='enter your message' className='bg-amber-400 w-full'/>
            <button>Send</button>
        </div>
    </form>
  )
}

export default MessageInput