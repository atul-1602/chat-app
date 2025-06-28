import React, { useState } from 'react'
import GenderCheckbox from './GenderCheckbox'
import { Link } from 'react-router-dom'
import useSignUp from '../../hooks/useSignUp'

const SignUp = () => {
  const [inputs, setInputs] = useState({
    fullName: "",
    userName: "",
    password: "",
    confirmPassword: "",
    gender: ""
  })
  const {isLoading, signup}= useSignUp()
  
  const handleSubmit =async(e)=>{
    e.preventDefault();
    await signup(inputs)
  }

  const handleCheckboxChange=(gender)=>{
    setInputs({...inputs, gender})
  }
  
  return (
    <div className='h-[90dvh] w-[100dvw] flex items-center justify-center overflow-hidden'>
      <div className='w-full max-w-md mx-auto px-4'>
        {/* Glassmorphism Card */}
        <div className='relative'>
          {/* Background Blur Effect */}
          <div className='absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-3xl blur-xl opacity-20 animate-pulse'></div>
          
          {/* Main Card */}
          <div className='relative bg-white/10 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/20'>
            {/* Header */}
            <div className='text-center mb-4'>
              <div className='w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg'>
                <svg className='w-8 h-8 text-white' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z' />
                </svg>
              </div>
              <h3 className='text-xl font-bold text-white mb-2'>
                Join ChatFlow
              </h3>
              <p className='text-gray-300 text-sm'>
                Create your account to start chatting
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className='space-y-2'>
              {/* Full Name Field */}
              <div className='space-y-2'>
                <label className='block text-sm font-medium text-gray-300'>
                  Full Name
                </label>
                <div className='relative'>
                  <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                    <svg className='h-5 w-5 text-gray-400' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                      <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z' />
                    </svg>
                  </div>
                  <input 
                    type='text' 
                    placeholder='Enter your full name'
                    value={inputs.fullName}
                    onChange={(e) => setInputs({ ...inputs, fullName: e.target.value })}
                    className='w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300'
                  />
                </div>
              </div>

              {/* Username Field */}
              <div className='space-y-2'>
                <label className='block text-sm font-medium text-gray-300'>
                  Username
                </label>
                <div className='relative'>
                  <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                    <svg className='h-5 w-5 text-gray-400' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                      <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z' />
                      <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M15 12a3 3 0 11-6 0 3 3 0 016 0z' />
                    </svg>
                  </div>
                  <input 
                    type='text' 
                    placeholder='Choose a username' 
                    value={inputs.userName}
                    onChange={(e) => setInputs({ ...inputs, userName: e.target.value })}
                    className='w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300'
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
                    placeholder='Create a password' 
                    value={inputs.password}
                    onChange={(e) => setInputs({ ...inputs, password: e.target.value })}
                    className='w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300'
                  />
                </div>
              </div>

              {/* Confirm Password Field */}
              <div className='space-y-2'>
                <label className='block text-sm font-medium text-gray-300'>
                  Confirm Password
                </label>
                <div className='relative'>
                  <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                    <svg className='h-5 w-5 text-gray-400' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                      <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z' />
                    </svg>
                  </div>
                  <input 
                    type='password' 
                    placeholder='Confirm your password' 
                    value={inputs.confirmPassword}
                    onChange={(e) => setInputs({ ...inputs, confirmPassword: e.target.value })}
                    className='w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300'
                  />
                </div>
              </div>

              {/* Gender Selection */}
              <div>
                <GenderCheckbox onCheckboxChange={handleCheckboxChange} selectedGender={inputs.gender}/>
              </div>

              {/* Sign Up Button */}
              <button 
                disabled={isLoading}
                className='w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 px-4 rounded-xl font-medium hover:from-purple-700 hover:to-pink-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg'
              >
                {isLoading ? (
                  <div className='flex items-center justify-center'>
                    <div className='animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2'></div>
                    Creating account...
                  </div>
                ) : (
                  'Create Account'
                )}
              </button>

              {/* Login Link */}
              <div className='text-center'>
                <Link 
                  to="/login" 
                  className='text-gray-300 hover:text-white text-sm transition-colors duration-300 hover:underline'
                >
                  Already have an account? Sign in
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignUp