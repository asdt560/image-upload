import React, { useState, useEffect } from 'react'

const Main = () => {
  const [image, setImage] = useState("");

  useEffect(() => {
    fetch("http://localhost:8000/mainimage")
      .then((res) => setImage(res.url))
  }, []);

  return (
    <main>
      <h1>Hello World</h1>
      <img src={image} alt="placeholder" />
    </main>
  )
}

export default Main;
