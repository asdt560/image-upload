import React from "react";
import { useParams } from "react-router-dom";

const Category = () => {
  let { id } = useParams()

  return (
    <div>
      <h1>Shows images from *category goes here*</h1>
    </div>
  )
}