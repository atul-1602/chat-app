import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { useAuthContext } from '../context/authContext'

const useLogIn = () => {
  const [isLoading, setIsLoading] = useState(false)
  const { setAuthUser } = useAuthContext()

  const login = async ({ userName, password }) => {
    const success = handleInputErrors({ userName, password })
    if (!success) return;
    setIsLoading(true)
    try {
      const res = await fetch('/api/auth/login', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: 'include',
        body: JSON.stringify({ userName, password })
      })

      const data = await res.json();
      
      if (data.error) {
        throw new Error(data.error);
      }
      localStorage.setItem('chat-user', JSON.stringify(data))
      setAuthUser(data)
    } catch (err) {
      console.error("Login error:", err)
      toast.error(err.message || "Login failed")
    } finally {
      setIsLoading(false)
    }
  }
  return { isLoading, login }
}

export default useLogIn

function handleInputErrors({ userName, password }) {
  if (!userName || !password) {
    toast.error('Please fill all the fields')
    return false
  }
  if (password.length < 6) {
    toast.error("Password must be at least 6 characters long")
    return false
  }

  return true
}