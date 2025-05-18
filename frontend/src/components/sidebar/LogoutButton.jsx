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
      className={`mt-auto px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition 
                 ${isLoading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
    >
      {isLoading ? 'Logging out...' : 'Logout'}
    </button>
  );
};

export default LogoutButton;
