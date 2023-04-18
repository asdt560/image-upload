import React, { useEffect, useState } from 'react'

const Main = () => {
  const [data, setData] = useState('');

  const fetchRandomImage = async () => {
    const res = (await fetch('http://localhost:5000/api/v1/random-image')
      .then((res) => res.json())
    );
    console.log(res)
    setData(res.body);
  };
  useEffect(() => {
    fetchRandomImage();
  }, [])

  return (
    <main>
      <h1>See images here</h1>
      <img
          src={`data:image/jpeg;base64,${data}`}
          alt=""
      />
    </main>
  )
}

export default Main;
