import React, { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { getCategories } from "../redux/categories/categorySlice";
import { useForm } from "react-hook-form";
import { addImage } from "../redux/images/imagesSlice";
const Upload = () => {
  const { register, handleSubmit } = useForm();
  const categories = useSelector((state) => state.categoryReducer.categories)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getCategories())
  }, [])

  const onSubmit = async (data) => {
    const formData = new FormData();
        formData.append("file", data.file[0]);
        formData.append("category", data.category)
        const res = await dispatch(addImage(formData))
        /*const res = await fetch("http://localhost:5000/upload-file", {
            method: "POST",
            body: formData,
        }).then((res) => res.json());*/
        alert(JSON.stringify(`${res.payload.message}, status: ${res.payload.status}`));
  }

  return (
    <main>
      <h1>Upload image to server</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <select placeholder="Category" {...register("category")} required defaultValue="none">
            <option value="none">
              Select a Category
            </option>
          {categories.map((category, index) => (
            <option key={index} value={category}>
              {category}
            </option>
          ))}
        </select>
        <input type="file" {...register("file")} required />
        <input type="submit" />
      </form>
    </main>
  )
}

export default Upload;
