import React, { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { getCategories } from "../redux/categories/categorySlice";
import { useForm } from "react-hook-form";
const Upload = () => {
  const { register, handleSubmit } = useForm();
  const categories = useSelector((state) => state.categoryReducer.categories)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getCategories())
  }, [])

  console.log(categories)
  const onSubmit = async (data) => {
    const formData = new FormData();
        formData.append("file", data.file[0]);
        console.log(data)
        formData.append("category", data.category)

        const res = await fetch("http://localhost:5000/upload-file", {
            method: "POST",
            body: formData,
        }).then((res) => res.json());
        alert(JSON.stringify(`${res.message}, status: ${res.status}`));
  }

  return (
    <main>
      <h1>Upload image to server</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <select type="text" placeholder="Category" {...register("category")} required>
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
