import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getImages } from '../redux/images/imagesSlice';
const Main = () => {
  const [image, setImage] = useState('');
  const dispatch = useDispatch();

  const getRandomImage = async () => {
    const randomImage = await dispatch(getImages('random=true'))
    console.log(randomImage)
    if(randomImage.payload) {
      setImage(randomImage.payload.body[0])
    }
  }

  useEffect(() => {
    getRandomImage() 
  }, [])

  return (
    <main className='flex flex-col items-center gap-8'>
      <h1 className='text-2xl text-white font-bold'>See images here</h1>
      <img
          className="max-w-36"
          src={`http://localhost:5000/${image.filepath}` || '#'}
          alt=""
        />
      <p className='text-1xl text-white font-bold'>{image.img_name}</p>
    </main>
  )
}

export default Main;
