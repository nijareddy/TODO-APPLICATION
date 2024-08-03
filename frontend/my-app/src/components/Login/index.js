// Login.js
import React, { useState } from 'react';
import {useNavigate,Navigate} from 'react-router-dom'
 

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

const navigate=useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3005/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      const data = await response.json();
      if (response.ok) {
        localStorage.setItem('jwtToken', data.jwtToken);
        alert('Login successful');
        setPassword('')
        setUsername('')
        navigate('/todos')
      } else {
        alert(data);
        <Navigate to ='/register'/>
      }
    } catch (err) {
      console.error('Error:', err);
    }
  };

  return (
    <div className='register'>
      <h2 className='heading'>Login</h2>
      <form onSubmit={handleSubmit} className='form-cont'>
        <label className='' htmlFor='username'>
          Username
          </label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            
            id="username"
             className='user-input'
          />
        
        <label htmlFor='password'>
          Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            
            id="password"
            className='user-input'
          />
      
        <button type="submit" className='register-btn'>Login</button>
      </form>
    </div>
  );
};

export default Login;
