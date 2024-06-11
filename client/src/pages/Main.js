import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { getImages } from '../redux/images/imagesSlice';
const Main = () => {
  const [image, setImage] = useState('');

  const randomImage = useSelector((state) => state.sessionReducer.user)
  const dispatch = useDispatch();

  const getRandomImage = async () => {
    await dispatch(getImages('random=true'))
    setImage(randomImage.body[0].filepath)
  }

  useEffect(() => {
    getRandomImage()
  }, [])

  return (
    <main className='flex flex-col items-center gap-8'>
      <h1 className='text-2xl text-white font-bold'>See images here</h1>
      {<img
          className="max-w-36"
          src={`http://localhost:5000/${image}`}
          alt=""
        />}
    </main>
  )
}

export default Main;
