import { searchImages } from "../redux/images/imagesSlice";
import { useDispatch, useSelector } from "react-redux";

const Search = () => {
  const dispatch = useDispatch()

  const images = useSelector((state) => state.images)
  const handleSearch = (e) => {
    dispatch(searchImages({searchText: e.target.value}))
  }
  return (
    <main>
      <h1>Find image by name</h1>
      <input type="text" onChange={handleSearch}></input>
    </main>
  )
}

export default Search;