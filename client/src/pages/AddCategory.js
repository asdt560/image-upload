import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addCategory } from '../redux/categories/categorySlice';
const AddCategory = () => {
  const [category, setCategory] = useState({
    category: ''
  })
  const dispatch = useDispatch();
  const handleChange = (e) => {
    setCategory({
      category: e.target.value
    })
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(category)
    await dispatch(addCategory(category));
  };
  return (
    <main>
      <h1>Create Category</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Category" onChange={handleChange}/>
        <input type="submit" />
      </form>
    </main>
  )
}

export default AddCategory;
