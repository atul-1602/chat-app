import React from 'react'

const Message = () => {
  return (
    <>
    <div className='flex justify-end items-center gap-2'>
      {/* chat   */}
      <div className='flex flex-row justify-between gap-4 my-2'>
        <div className=' bg-amber-300 px-4'>Hello how are u?</div> 
        <div className='bg-amber-700 w-8 h-8 rounded-full justify-center items-center'>U</div>
      </div>
      <div> 3:20</div>
      {/* chat from my end */}
    </div>
    </>
  )
}

export default Message