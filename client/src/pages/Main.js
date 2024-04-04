import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { getImages } from '../redux/images/imagesSlice';
const Main = () => {
  const [image, setImage] = useState('');

  const dispatch = useDispatch();

  const getRandomImage = async () => {
    const randomImage = await dispatch(getImages('random=true'))
    console.log(randomImage)
    setImage(randomImage.payload.body)
  }

  useEffect(() => {
    getRandomImage()
  }, [])

  return (
    <main>
      <h1>See images here</h1>
      <img
          src={`data:image/jpeg;base64,${image}`}
          alt=""
      />
    </main>
  )
}

export default Main;
