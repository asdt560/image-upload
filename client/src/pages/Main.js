import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { getImages } from '../redux/images/imagesSlice';
const Main = () => {
  const [image, setImage] = useState('');

  const dispatch = useDispatch();

  const getRandomImage = async () => {
    const randomImage = await dispatch(getImages('random=true'))
    console.log(randomImage)
    setImage(randomImage.payload.body[0].filepath)
  }

  useEffect(() => {
    getRandomImage()
  }, [])

  return (
    <main className='flex flex-col items-center gap-8'>
      <h1 className='text-2xl text-white font-bold'>See images here</h1>
      {<img
          className="max-w-36"
          src={`https://image-upload-qate.onrender.com/${image}`}
          alt=""
        />}
    </main>
  )
}

export default Main;
