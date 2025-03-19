import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { getCategories } from "../redux/categories/categorySlice";
import { useForm } from "react-hook-form";
import { addImage } from "../redux/images/imagesSlice";
import { useNavigate } from "react-router-dom";
import { checkSession } from "../redux/session/sessionSlice";

const Upload = () => {
  const [categories, setCategories] = useState([])
  const { register, handleSubmit } = useForm();
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const user = useSelector((state) => state.sessionReducer.user)

  const getUserData = async () => {
    await dispatch(checkSession())
    if(!user) {
      navigate('/')
    }
    return;
  }

  const getCategoryArray = async () => {
    const categoryArray = await dispatch(getCategories())
    setCategories(categoryArray.payload.data.categories)
  }

  useEffect(() => {
    getUserData()
    getCategoryArray()
  }, [])

  const onSubmit = async (data) => {
    const formData = new FormData();
    console.log(data)
    formData.append("img_name", data.img_name)
    formData.append("category", data.category)
    formData.append("files", data.files[0]);
    const res = await dispatch(addImage(formData))
    alert(JSON.stringify(`${res.payload.message}, status: ${res.payload.status}`));
  }

  return (
    <main className='flex flex-col items-center gap-8'>
      <h1 className='text-2xl text-white font-bold'>Upload image to server</h1>
      <form className="flex gap-4 flex-col items-center" onSubmit={handleSubmit(onSubmit)}>
        <select 
          className="p-2 rounded-md border-2 cursor-pointer 
          border-gray-400 bg-gray-800 text-white w-full" 
          placeholder="Category" {...register("category")} required defaultValue="none">
            <option value="none">
              Select a Category
            </option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.categoryname}
            </option>
          ))}
        </select>
        <input
          className="block w-full text-sm text-white border rounded-md 
          cursor-pointer bg-gray-700 border-gray-600 placeholder-gray-400
          file:bg-gray-900 file:text-white file:border-0 file:p-2" 
          type="text" {...register("img_name")} required />
        <input 
          className="block w-full text-sm text-white border rounded-md 
          cursor-pointer bg-gray-700 border-gray-600 placeholder-gray-400
          file:bg-gray-900 file:text-white file:border-0 file:p-2" 
          type="file" {...register("files")} required />
        <button 
          className="w-full p-2 border-4 border-white border-double 
          rounded-md text-white font-bold text-lg bg-gray-700" 
          type="submit">
            Upload Image
        </button>
      </form>
    </main>
  )
}

export default Upload;
