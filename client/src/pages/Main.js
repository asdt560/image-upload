import React, { useState, useEffect } from 'react'

const Main = () => {
  const [image, setImage] = useState("");

  useEffect(() => {
    fetch("http://localhost:8000/mainimage")
      .then((res) => res.json())
      .then((data) => setImage(data.message));
  }, []);

  return (
    <h1>Hello World</h1>
  )
}

export default Main;
