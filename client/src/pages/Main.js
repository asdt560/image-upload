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

  const checkLogin = async () => {
    const response = await fetch('http://127.0.0.1:5000/api/v1/users', {
      method: 'GET',
      headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer {token}'
      },
      credentials: "include",
    })
      .then((response) => response.json())
    console.log(response)
  }

  useEffect(() => {
    checkLogin()
    /*getRandomImage()*/
  }, [])

  return (
    <main className='flex flex-col items-center gap-8'>
      <h1 className='text-2xl text-white font-bold'>See images here</h1>
      {/*<img
          className="max-w-36"
          src={`http://localhost:5000/${image}`}
          alt=""
        />*/}
    </main>
  )
}

export default Main;
