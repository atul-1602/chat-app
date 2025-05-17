import React, { useState } from 'react'
import useSendMessage from '../../hooks/useSendMessage'

const MessageInput = () => {
  const [message, setMessage] = useState('')
  const { loading, sendMessage } = useSendMessage()

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!message.trim()) return

    console.log('debug', message)
    await sendMessage(message)
    setMessage('')
  }

  return (
    <form className='px-4 my-3' onSubmit={handleSubmit}>
      <div className='w-full flex justify-between bg-amber-200 gap-4'>
        <input
          type='text'
          placeholder='Enter your message'
          className='bg-amber-400 w-full px-2 py-1'
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button type="submit">
          {loading ? <div>...</div> : <div>Send</div>}
        </button>
      </div>
    </form>
  )
}

export default MessageInput
