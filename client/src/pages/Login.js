import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { createSession } from '../redux/session/sessionSlice';
import { useDispatch, useSelector } from 'react-redux';
import { checkSession } from '../redux/session/sessionSlice';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] =useState({
    user: null,
    password: null
  })
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
    } else {
      setErrors({user: null, password: null})
      if(resp.payload?.message.split(' ')[0] === "User") {
        setErrors((prevState) => ({...prevState, user: resp.payload?.message}))
      } else {
        setErrors((prevState) => ({...prevState, password: resp.payload?.message}))
      }
    }
  };

  return (
    <main className='flex flex-col items-center gap-8'>
      <h2 className='text-2xl text-white font-bold'>Login</h2>
      <form className="flex gap-4 flex-col items-center" onSubmit={handleSubmit}>
        <div>
          <label className='text-white font-bold'>Username:</label>
          <input className={`p-2 rounded-md border-2 cursor-pointer 
          ${errors.user ? "border-red-400 text-red-500" : "bg-gray-800 text-white"} border-gray-400  w-full`}
            type="text" value={username} onChange={handleUsernameChange} />
          {errors.user && <p className="text-red-500 p-1 text-xs">{errors.user}</p>}
        </div>
        <div>
          <label className='text-white font-bold'>Password:</label>
          <input className={`p-2 rounded-md border-2 cursor-pointer 
          ${errors.password ? "border-red-400 text-red-500" : "bg-gray-800 text-white"} border-gray-400  w-full`}
            type="password" value={password} onChange={handlePasswordChange} />
          {errors.password && <p className="text-red-500 p-1 text-xs">{errors.password}</p>}
        </div>
        <button className="w-full p-2 border-4 border-white border-double 
          rounded-md text-white font-bold text-lg bg-gray-700" 
          type="submit">Login</button>
      </form>
    </main>
  );
};

export default Login;