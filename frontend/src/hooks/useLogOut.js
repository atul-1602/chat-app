import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { useAuthContext } from '../context/authContext'

const useLogOut = () => {
  const [isLoading, setIsLoading] = useState(false)
  const { setAuthUser } = useAuthContext()
    
  const logout = async() =>{
    setIsLoading(true)
    try{
      const res = await fetch("/api/auth/logout",{
          method: "POST",
          headers:{"Content-Type": "application/json"},
          credentials: 'include'
      })
      const data = await res.json();
      if(data.error){
          throw new Error(data.error)
      }
      localStorage.removeItem('chat-user')
      setAuthUser(null)
    }catch(err){
      console.error("Logout error:", err)
      toast.error(err.message || "Logout failed")
    }finally{
      setIsLoading(false)
    }
  }
  return {isLoading, logout }
}

export default useLogOut
