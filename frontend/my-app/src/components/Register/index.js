// Register.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './index.css'

const Register = (props) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
 
const navigate=useNavigate()
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3005/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      const data = await response.text();
      if (response.ok) {
        alert('User registered successfully');
        setUsername('')
          setPassword('')
       
        navigate('/login');
      } else {
        alert(data);
      }
    } catch (err) {
      console.error('Error:', err);
    }
  };

  return (
    <div className='register'>
      <h2 className='heading'>Register</h2>
      <form onSubmit={handleSubmit} className='form-cont'>
        <label htmlFor='username'>
          Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            id="username"
            className='user-input'
            
          />
        
        <label htmlFor="password">
          Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            
            id="password"
            className='user-input'
          />
       
        <button type="submit" className='register-btn'>Register</button>
      </form>
    </div>
  );
};

export default Register;
