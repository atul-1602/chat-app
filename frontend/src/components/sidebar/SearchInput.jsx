import React, { useState } from 'react'
import useConversation from '../../zustand/useConversation'
import toast from 'react-hot-toast'
import useGetConversations from '../../hooks/useGetConversations'

const SearchInput = () => {
  const [search, setSearch] = useState("")
  const { setSelectedConversation } = useConversation()
  const { conversations} = useGetConversations() // <- default empty array
console.log("debug12", {conversations});

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!search) return;
    if (search.length < 3) {
      return toast.error("Search term must be at least 3 characters long");
    }

    const conversation = conversations.find((c) =>
      c.fullName.toLowerCase().includes(search.toLowerCase())
    );

    if (conversation) {
      setSelectedConversation(conversation)
      setSearch("")
    } else {
      toast.error('No such user found!')
    }
  };

  return (
    <form className='flex gap-2 mb-4' onSubmit={handleSubmit}>
      <input
        type='text'
        placeholder='Search by name...'
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className='border px-4 py-2 rounded-md w-full'
      />
      <button type='submit' className='bg-blue-500 text-white px-4 py-2 rounded-md'>
        Search
      </button>
    </form>
  )
}

export default SearchInput;
