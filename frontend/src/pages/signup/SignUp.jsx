import React from 'react'
import GenderCheckbox from './GenderCheckbox'

const SignUp = () => {
  return (
    <div className='flex items-center justify-center min-w-96 max-auto'>
      <div>
        <h1>SignUp 
          <span> Chat App</span>
        </h1>
        <form>
        <div>
            <label>Full Name : </label>
            <input type='text' placeholder='Enter Fullname'/>
          </div>
          <div>
            <label>Username : </label>
            <input type='text' placeholder='Enter usenname'/>
          </div>
          <div>
            <label>Password : </label>
            <input type='text' placeholder='Enter password'/>
          </div>
          <div>
            <label>Confirm password : </label>
            <input type='text' placeholder='Enter confirm password'/>
          </div>
          <div>
            <GenderCheckbox/>
          </div>
          <a href="#">Already have an account?</a>
          <div>
            <button>Signup</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default SignUp