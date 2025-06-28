import './App.css'
import React from "react";
import Login from './pages/login/Login';
import SignUp from './pages/signup/SignUp';
import Home from './pages/home/Home';
import { Navigate, Route, Routes } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { useAuthContext } from './context/authContext';

function App() {
  const { authUser } = useAuthContext()
  
  return (
    <div className='h-[100dvh] w-[100dvw] overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900'>
      <div className='h-full w-full flex items-center justify-center'>
        <Routes>
          <Route path='/' element={authUser? <Home/>: <SignUp/>}/>
          <Route path='/login' element={ authUser? <Navigate to="/"/> :<Login/>}/>
          <Route path='/signup' element={ authUser? <Navigate to="/"/> : <SignUp/>}/>
        </Routes>
      </div>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#1F2937',
            color: '#F9FAFB',
            border: '1px solid #374151',
          },
          success: {
            iconTheme: {
              primary: '#10B981',
              secondary: '#F9FAFB',
            },
          },
          error: {
            iconTheme: {
              primary: '#EF4444',
              secondary: '#F9FAFB',
            },
          },
        }}
      />
    </div>
  )
}

export default App
