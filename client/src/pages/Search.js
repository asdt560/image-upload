import { searchImages } from "../redux/images/imagesSlice";
import { useDispatch, useSelector } from "react-redux";
import { mainClass, h1Class, inputClass } from "../constants";

const Search = () => {
  const dispatch = useDispatch()

  const images = useSelector((state) => state.images)
  const handleSearch = (e) => {
    dispatch(searchImages({searchText: e.target.value}))
  }
  return (
    <main className={mainClass}>
      <h1 className={h1Class}>Find image by name</h1>
      <input 
        className={inputClass}  
        placeholder="Search..." type="text" onChange={handleSearch}></input>
      {images.length &&
      images.map((image) => (
        <div className="flex flex-col items-center">
          <p className='text-1xl text-white font-bold'>{image.img_name}</p>
          <p className='text-1xl text-white font-bold'>{image.created_at}</p>
          <img className="w-full rounded-sm" key={image.id} alt='' src={`http://localhost:5000/${image.filepath}`}/>
        </div>
      ))}
    </main>
  )
}

export default Search;