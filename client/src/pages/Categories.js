import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getCategories } from '../redux/categories/categorySlice';
import { NavLink } from 'react-router-dom';

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
    <main className="flex flex-col items-center gap-8">
      <h1 className='text-2xl text-white font-bold'>Look at images per category</h1>
      <div className='flex gap-4 w-full p-2'>
        {categories.map((category) => (
          <NavLink to={`/category/${category.id}`} key={category.id}
          className='flex justify-center border-2 p-2 border-double border-white cursor-pointer w-1/5'>
            <p className="text-lg text-white font-bold">
              {category.categoryname}
            </p>
          </NavLink>
        ))}
      </div>
    </main>
  )
}

export default Categories;
