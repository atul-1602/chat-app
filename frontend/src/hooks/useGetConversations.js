import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'

const useGetConversations = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [conversations, setConversations] = useState([])

  useEffect(()=>{
    const getConversation = async()=>{
        setIsLoading(true)
        try{
            const res = await fetch("/api/users")
            const data = await res.json();
            
            if(data.error){
                throw new Error(data.error)
            }
            setConversations(data)
        }catch(err){
            toast.error(err)
        }finally{
            setIsLoading(false)
        }
    }
    getConversation()
  },[])
  return {isLoading, conversations}
}

export default useGetConversations