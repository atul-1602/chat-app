import './App.css'
import React from "react";
import Login from './pages/login/Login';
import SignUp from './pages/signup/SignUp';
import Home from './pages/home/Home';


function App() {
  return (
    <div className='p-4 h-screen flex items-center justify-center'>
      <Home/>
     {/* <Login/> */}
     {/* <SignUp/> */}
    </div>
  )
}

export default App
