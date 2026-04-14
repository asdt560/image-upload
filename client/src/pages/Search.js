import { searchImages } from "../redux/search/searchSlice";
import { useDispatch, useSelector } from "react-redux";
import { mainClass, h1Class, pClass } from "../constants";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const Search = () => {
  const dispatch = useDispatch()
  const search = useLocation().search;
  const query = new URLSearchParams(search).get("query")
  const images = useSelector((state) => state.images)

  const handleSearch = () => {
    dispatch(searchImages({searchText: query}))
  }

  useEffect(() => {
    handleSearch()
  })
  return (
    <main className={mainClass}>
      <h1 className={h1Class}>Results for: {query}</h1>
      {images.length ?
      images.map((image) => (
        <div className="flex flex-col items-center">
          <p className={pClass}>{image.img_name}</p>
          <p className={pClass}>{image.created_at}</p>
          <img className="w-full rounded-sm" key={image.id} alt='' src={`http://localhost:5000/${image.filepath}`}/>
        </div>
      )) : <p>No Results Found</p>}
    </main>
  )
}

export default Search;