import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getCategories } from '../redux/categories/categorySlice';
const Categories = () => {
  const [categories, setCategories] = useState([])

  const dispatch = useDispatch();

  const getCategoryArray = async () => {
    const categoryArray = await dispatch(getCategories())
    setCategories(categoryArray.payload.data.categories)
  }

  useEffect(() => {
    getCategoryArray()
  }, [])

  return (
    <main >
      <h1 className='text-2xl text-white font-bold'>Look at images per category</h1>
      <div className='flex items-center gap-4'>
        {categories.map((category) => (
          <p className='border-2 p-2 border-double border-white cursor-pointer w-1/5' key={category.id}>{category.categoryname}</p>
        ))}
      </div>
    </main>
  )
}

export default Categories;
