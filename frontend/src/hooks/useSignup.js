import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { useAuthContext } from '../context/authContext'

const useSignUp = () => {
  const [isLoading, setIsLoading] = useState(false)
  const { setAuthUser } = useAuthContext()
  const signup = async({fullName, userName, password, confirmPassword, gender}) =>{
   const success= handleInputErrors({fullName, userName, password, confirmPassword, gender})
   
   if(!success) return;
   setIsLoading(true)
   try{
    const res= await fetch('/api/auth/signup',{
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({fullName, userName, password, confirmPassword, gender})
    })
    
    const data = await res.json();
    if(data.error){
      throw new Error(data.error)
    }
    localStorage.setItem("chat-user", JSON.stringify(data))
    setAuthUser(data)
    
   }catch(err){
    toast.error(err)
   }finally{
    setIsLoading(false)
   }
  }
  return {isLoading,signup }
}

export default useSignUp

function handleInputErrors({fullName, userName, password, confirmPassword, gender}){
    if(!fullName || !userName || !password || !confirmPassword || !gender) {
        toast.error('please fill all the fields')
        return false
    }
    if(password !== confirmPassword){
      toast.error("Password not match")
      return false
    }
    if(password.length<6){
      toast.error("Password must be 6 digit length")
      return false
    }

    return true
}