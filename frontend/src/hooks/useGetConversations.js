import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useAuthContext } from '../context/authContext'

const useGetConversations = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [conversations, setConversations] = useState([])
  const { authUser } = useAuthContext()

  useEffect(()=>{
    const getConversation = async()=>{
        if (!authUser) {
            return
        }
        
        setIsLoading(true)
        try{
            const res = await fetch("/api/users", {
                credentials: 'include'
            })
            
            const data = await res.json();
            
            if(data.error){
                throw new Error(data.error)
            }
            setConversations(data)
        }catch(err){
            console.error("Error fetching conversations:", err)
            toast.error(err.message || "Failed to load conversations")
        }finally{
            setIsLoading(false)
        }
    }
    getConversation()
  },[authUser])
  return {isLoading, conversations}
}

export default useGetConversations