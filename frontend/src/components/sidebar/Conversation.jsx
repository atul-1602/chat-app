import React from 'react'

const Conversation = () => {
  return (
    <>
    <div className='flex gap-2 items-center rounded px-2 py-1 cursor-pointer'>
      {/* avatar */}
        <div className="rounded-full bg-amber-400 w-10">A</div>

        <div className='flex flex-col flex-1'>
          <div className='flex gap-3 justify-between'>
            <p className='font-bold'>John doe</p>
            <span></span>
          </div>
        </div>
    </div>
    <div className='border border-1'></div>
    </>
  )
}

export default Conversation