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
    <div className='flex items-center justify-center min-w-96 max-auto'>
      <div>
        <h1>SignUp
          <span> Chat App</span>
        </h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Full Name : </label>
            <input type='text' placeholder='Enter Fullname'
              value={inputs.fullName}
              onChange={(e) => setInputs({ ...inputs, fullName: e.target.value })} />
          </div>
          <div>
            <label>Username : </label>
            <input type='text' placeholder='Enter usenname' 
            value={inputs.userName}
              onChange={(e) => setInputs({ ...inputs, userName: e.target.value })}/>
          </div>
          <div>
            <label>Password : </label>
            <input type='text' placeholder='Enter password' 
            value={inputs.password}
            onChange={(e) => setInputs({ ...inputs, password: e.target.value })}/>
          </div>
          <div>
            <label>Confirm password : </label>
            <input type='text' placeholder='Enter confirm password' 
            value={inputs.confirmPassword}
            onChange={(e) => setInputs({ ...inputs, confirmPassword: e.target.value })}/>
          </div>
          <div>
            <GenderCheckbox onCheckboxChange={handleCheckboxChange} selectedGender={inputs.gender}/>
          </div>
          <Link to="/login">Already have an account?</Link>
          <div>
            <button disabled={isLoading}>Signup</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default SignUp