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
    <main>
      <h1>Look at images per category</h1>
      <div>
        {categories.map((category) => (
          <p key={category.id}>{category.categoryname}</p>
        ))}
      </div>
    </main>
  )
}

export default Categories;
