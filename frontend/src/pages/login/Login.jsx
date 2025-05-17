import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import useLogin from '../../hooks/useLogin'

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
    <div className='flex items-center justify-center min-w-96 max-auto'>
      <div>
        <h1>Login 
          <span> Chat App</span>
        </h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label>username : </label>
            <input type='text' placeholder='Enter usenname' value={inputs.userName} onChange={(e)=>setInputs({...inputs, userName:e.target.value})}/>
          </div>
          <div>
            <label>password : </label>
            <input type='text' placeholder='Enter password' value={inputs.password} onChange={(e)=>setInputs({...inputs, password:e.target.value})}/>
          </div>
          <Link to='/signup'>Don't have an account?</Link>
          <div>
            <button disabled={isLoading}>Login</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login