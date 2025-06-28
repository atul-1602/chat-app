import React from 'react';
import useLogout from '../../hooks/useLogOut';

const LogoutButton = () => {
  const { isLoading, logout } = useLogout();

  const handleLogout = () => {
    logout();
  };

  return (
    <button
      onClick={handleLogout}
      disabled={isLoading}
      className='w-full bg-gradient-to-r from-red-500 to-pink-600 text-white py-3 px-4 rounded-xl font-medium hover:from-red-600 hover:to-pink-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg flex items-center justify-center space-x-2'
    >
      {isLoading ? (
        <>
          <div className='animate-spin rounded-full h-4 w-4 border-b-2 border-white'></div>
          <span>Signing out...</span>
        </>
      ) : (
        <>
          <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1' />
          </svg>
          <span>Sign Out</span>
        </>
      )}
    </button>
  );
};

export default LogoutButton;
