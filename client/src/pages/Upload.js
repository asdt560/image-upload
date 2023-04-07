import React from "react";
import { useForm } from "react-hook-form";
const Upload = () => {
  const { register, handleSubmit } = useForm();
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
        <input type="text" placeholder="Category" {...register("category")} />
        <input type="file" {...register("file")} />

        <input type="submit" />
      </form>
    </main>
  )
}

export default Upload;
