import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createRegistration } from '../redux/registration/registrationSlice';
import { createSession } from '../redux/session/sessionSlice';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({
    email: null,
    user: null,
    password: null
  })
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const signup = await dispatch(createRegistration({email, username, password}))
    console.log(signup)
    if(signup.payload?.success) {
      const login = await dispatch(createSession({username, password}))
      if(login.payload?.logged) {
        navigate('/')
      }
    } else {
      setErrors({email: null, user: null, password: null})
      if(signup.payload?.message.split(' ')[0] === "User") {
        setErrors((prevState) => ({...prevState, user: signup.payload?.message}))
      } else if(signup.payload?.message.split(' ')[0] === "Email") {
        setErrors((prevState) => ({...prevState, email: signup.payload?.message}))
      }
    }
  };

  return (
    <main className='flex flex-col items-center gap-8'>
      <h2 className='text-2xl text-white font-bold'>Signup</h2>
      <form className="flex gap-4 flex-col items-center" onSubmit={handleSubmit}>
        <label className="w-full text-white font-bold">
          Email:
          <input 
            className="p-2 rounded-md border-2 cursor-pointer 
            border-gray-400 bg-gray-800 text-white w-full"
            type="email" value={email} onChange={handleEmailChange} />
        </label>
        {errors.email && <p className="text-red-500 p-1 text-xs">{errors.email}</p>}
        <label className="w-full text-white font-bold">
          Username:
          <input 
            className="p-2 rounded-md border-2 cursor-pointer 
            border-gray-400 bg-gray-800 text-white w-full"
            type="text" value={username} onChange={handleUsernameChange} />
        </label>
        {errors.user && <p className="text-red-500 p-1 text-xs">{errors.user}</p>}
        <label className="w-full text-white font-bold">
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
