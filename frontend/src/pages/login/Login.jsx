import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import useLogin from '../../hooks/useLogIn'

const Login = () => {
  const [inputs, setInputs] = useState({
    userName:"",
    password:""
  })
  const {isLoading, login}= useLogin()
  
  const handleSubmit = async(e) =>{
    e.preventDefault()
    await login(inputs)
  }
  
  return (
    <div className='h-[100dvh] w-[100dvw] flex items-center justify-center overflow-hidden'>
      <div className='w-full max-w-md mx-auto px-4'>
        {/* Glassmorphism Card */}
        <div className='relative'>
          {/* Background Blur Effect */}
          <div className='absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl blur-xl opacity-20 animate-pulse'></div>
          
          {/* Main Card */}
          <div className='relative bg-white/10 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/20'>
            {/* Header */}
            <div className='text-center mb-8'>
              <div className='w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg'>
                <svg className='w-8 h-8 text-white' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z' />
                </svg>
              </div>
              <h1 className='text-3xl font-bold text-white mb-2'>
                Welcome Back
              </h1>
              <p className='text-gray-300 text-sm'>
                Sign in to continue chatting
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className='space-y-6'>
              {/* Username Field */}
              <div className='space-y-2'>
                <label className='block text-sm font-medium text-gray-300'>
                  Username
                </label>
                <div className='relative'>
                  <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                    <svg className='h-5 w-5 text-gray-400' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                      <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z' />
                    </svg>
                  </div>
                  <input 
                    type='text' 
                    placeholder='Enter your username' 
                    value={inputs.userName} 
                    onChange={(e)=>setInputs({...inputs, userName:e.target.value})}
                    className='w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300'
                  />
                </div>
              </div>

              {/* Password Field */}
              <div className='space-y-2'>
                <label className='block text-sm font-medium text-gray-300'>
                  Password
                </label>
                <div className='relative'>
                  <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                    <svg className='h-5 w-5 text-gray-400' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                      <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z' />
                    </svg>
                  </div>
                  <input 
                    type='password' 
                    placeholder='Enter your password' 
                    value={inputs.password} 
                    onChange={(e)=>setInputs({...inputs, password:e.target.value})}
                    className='w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300'
                  />
                </div>
              </div>

              {/* Login Button */}
              <button 
                disabled={isLoading}
                className='w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-4 rounded-xl font-medium hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg'
              >
                {isLoading ? (
                  <div className='flex items-center justify-center'>
                    <div className='animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2'></div>
                    Signing in...
                  </div>
                ) : (
                  'Sign In'
                )}
              </button>

              {/* Sign Up Link */}
              <div className='text-center'>
                <Link 
                  to='/signup' 
                  className='text-gray-300 hover:text-white text-sm transition-colors duration-300 hover:underline'
                >
                  Don't have an account? Sign up
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login