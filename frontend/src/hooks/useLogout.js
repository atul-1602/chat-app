import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { useAuthContext } from '../context/authContext'

const useLogout = () => {
  const [isLoading, setIsLoading] = useState(false)
      const { setAuthUser } = useAuthContext()
    
  const logout = async() =>{
   try{
    const res = fetch("/api/auth/logout",{
        method: "POST",
        headers:{"Content-Type": "application/json"}
    })
    const data = (await res).json();
    if(data.error){
        throw new Error(data.error)
    }
    localStorage.removeItem('chat-user')
    setAuthUser(null)
   }catch(err){
    toast.error(err.message)
   }finally{
    setIsLoading(false)
   }
   
  }
  return {isLoading,logout }
}

export default useLogout
