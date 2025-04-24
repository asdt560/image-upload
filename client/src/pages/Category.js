import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import { getCategoryById } from '../redux/categories/categorySlice';
import { getImagesPerCategory } from "../redux/images/imagesSlice";
import { useParams } from "react-router-dom";

const Category = () => {
  let { categoryId } = useParams()

  const [category, setCategory] = useState({})
  const [images, setImages] = useState([])

  const dispatch = useDispatch();

  const getCategoryImages = async () => {
    const categoryImages = await dispatch(getImagesPerCategory(categoryId))
    console.log(categoryImages.payload.body)
    setImages(categoryImages.payload.body)
  }

  const getCategoryData = async () => {
    const categoryData = await dispatch(getCategoryById(categoryId))
    console.log(categoryData)
    if(categoryData.payload) setCategory(categoryData.payload.data.category[0]);
  }

  useEffect(() => {
    getCategoryData()
    getCategoryImages()
  }, [])

  return (
    <main className="flex flex-col items-center gap-8">
      <h1 className='text-2xl text-white font-bold'>Shows images from {category.categoryname}</h1>
      <div className="flex flex-col items-center">
        {images.map((image) => (
          <div className="flex flex-col items-center">
            <p className='text-1xl text-white font-bold'>{image.img_name}</p>
            <p className='text-1xl text-white font-bold'>{image.created_at}</p>
            <img className="w-full rounded-sm" key={image.id} alt='' src={`http://localhost:5000/${image.filepath}`}/>
          </div>
        ))}
      </div>
    </main>
  )
}

export default Category;