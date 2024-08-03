import React from 'react';
import './index.css'
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Implement logout logic here (e.g., remove token from local storage)
    localStorage.removeItem('token'); // Replace 'token' with your actual token key
    navigate('/login'); // Redirect to login page after logout
  };

  return (
    <div className='header'>
      <button className='logout-btn' onClick={handleLogout}>Logout1 </button>
    </div>
  );
};

export default Header;
