import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { createSession } from '../redux/session/sessionSlice';
import { useDispatch, useSelector } from 'react-redux';
import { checkSession } from '../redux/session/sessionSlice';

const Login = () => {
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

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const resp = await dispatch(createSession({username, password}))
    console.log(resp)
    if(resp.payload?.logged) {
      navigate('/')
    }
  };

  return (
    <main className='flex flex-col items-center gap-8'>
      <h2 className='text-2xl text-white font-bold'>Login</h2>
      <form className="flex gap-4 flex-col items-center" onSubmit={handleSubmit}>
        <div>
          <label className='text-white font-bold'>Username:</label>
          <input className="p-2 rounded-md border-2 cursor-pointer 
            border-gray-400 bg-gray-800 text-white w-full" 
            type="text" value={username} onChange={handleUsernameChange} />
        </div>
        <div>
          <label className='text-white font-bold'>Password:</label>
          <input className="p-2 rounded-md border-2 cursor-pointer 
            border-gray-400 bg-gray-800 text-white w-full"
            type="password" value={password} onChange={handlePasswordChange} />
        </div>
        <button className="w-full p-2 border-4 border-white border-double 
          rounded-md text-white font-bold text-lg bg-gray-700" 
          type="submit">Login</button>
      </form>
    </main>
  );
};

export default Login;