import React from 'react'

const Login = () => {
  return (
    <div className='flex items-center justify-center min-w-96 max-auto'>
      <div>
        <h1>Login 
          <span> Chat App</span>
        </h1>
        <form>
          <div>
            <label>username : </label>
            <input type='text' placeholder='Enter usenname'/>
          </div>
          <div>
            <label>password : </label>
            <input type='text' placeholder='Enter password'/>
          </div>
          <a href="#">Don't have an account?</a>
          <div>
            <button>Login</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login