import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addCategory } from '../redux/categories/categorySlice';
import { useNavigate } from 'react-router-dom';
import { checkSession } from '../redux/session/sessionSlice';
const AddCategory = () => {
  const [category, setCategory] = useState('')
  const [privacy, setPrivacy] = useState(false)

  const dispatch = useDispatch();
  const navigate = useNavigate()
  const user = useSelector((state) => state.sessionReducer.user)

  const getUserData = async () => {
    await dispatch(checkSession())
    if(!user) {
      navigate('/')
    }
    return;
  }

  useEffect(() => {
    getUserData()
  }, [])

  const handleCheckbox = (e) => {
    setPrivacy(e.currentTarget.checked)
  }

  const handleChange = (e) => {
    setCategory(`${e.target.value}`)
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const resp = await dispatch(addCategory({category, privacy}));
    if(resp.payload?.message) {
      navigate('/')
    }
  };

  return (
    <main className='flex flex-col items-center gap-8'>
      <h1 className='text-2xl text-white font-bold'>Create Category</h1>
      <form className="flex gap-4 flex-col items-center" onSubmit={handleSubmit}>
        <input 
          className="p-2 rounded-md border-2 cursor-pointer 
          border-gray-400 bg-gray-800 text-white w-full" 
          type="text" placeholder="Category" onChange={handleChange}/>
        <label>
          Private:
          <input type="checkbox" onChange={handleCheckbox} />
        </label>
        <button 
          className="w-full p-2 border-4 border-white border-double 
          rounded-md text-white font-bold text-lg bg-gray-700" 
          type="submit">
          Submit Category
        </button>
      </form>
    </main>
  )
}

export default AddCategory;
