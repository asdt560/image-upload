import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { checkSession } from '../redux/session/sessionSlice';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const user = useSelector((state) => state.sessionReducer.user)

  const getUserData = async () => {
    await dispatch(checkSession())
    if(user) {
      navigate('/')
    }
    return;
  }

  useEffect(() => {
    getUserData()
  }, [])

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await fetch('http://localhost:5000/api/v1/users/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        username,
        password,
      }),
    });
    return response.json();
  };

  return (
    <main className='flex flex-col items-center gap-8'>
      <h2 className='text-2xl text-white font-bold'>Signup</h2>
      <form className="flex gap-4 flex-col items-center" onSubmit={handleSubmit}>
        <label>
          Email:
          <input 
            className="p-2 rounded-md border-2 cursor-pointer 
            border-gray-400 bg-gray-800 text-white w-full"
            type="email" value={email} onChange={handleEmailChange} />
        </label>
        <label>
          Username:
          <input 
            className="p-2 rounded-md border-2 cursor-pointer 
            border-gray-400 bg-gray-800 text-white w-full"
            type="text" value={username} onChange={handleUsernameChange} />
        </label>
        <br />
        <label>
          Password:
          <input 
            className="p-2 rounded-md border-2 cursor-pointer 
            border-gray-400 bg-gray-800 text-white w-full"
            type="password" value={password} onChange={handlePasswordChange} />
        </label>
        <br />
        <button 
          className="w-full p-2 border-4 border-white border-double 
          rounded-md text-white font-bold text-lg bg-gray-700" 
          type="submit">Sign up</button>
      </form>
    </main>
  );
};

export default Signup;
