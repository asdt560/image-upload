import { NavLink } from 'react-router-dom';
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { checkSession } from '../redux/session/sessionSlice';

const RightEnd = () => {

  const [user, setUser] = useState(null)
  const dispatch = useDispatch()

  const getUserData = async () => {
    const data = await dispatch(checkSession())
    console.log(data.payload.user)
    setUser(data.payload.user)
  }
  useEffect(() => {
    getUserData()
  }, [])

  if (user) {
    return (
      <div
      className="py-2 px-8 pointer font-bold text-lg text-white 
      font-sans hover:bg-white hover:text-gray-900">
        {user.username}
      </div>
    )
  } else {
    return (
      <div className="flex justify-between bg-gray-900">
        <NavLink
          className="py-2 px-8 pointer font-bold text-lg text-white 
          font-sans hover:bg-white hover:text-gray-900"
          to="/signup"
        >Sign Up</NavLink>
        <NavLink
          className="py-2 px-8 pointer font-bold text-lg text-white 
          font-sans hover:bg-white hover:text-gray-900"
          to="/login"
        >Log In</NavLink>
      </div>
    )
  }
}

const Navbar = () => {

  return (
    <nav className="flex border-b-4 border-white justify-between bg-gray-900">
      <NavLink
        className="py-2 px-8 pointer font-bold text-lg text-white font-sans hover:bg-white hover:text-gray-900"
        to="/"
      >Main</NavLink>
      <NavLink
        className="py-2 px-8 pointer font-bold text-lg text-white font-sans hover:bg-white hover:text-gray-900"
        to="/categories"
      >Categories</NavLink>
      <NavLink
        className="py-2 px-8 pointer font-bold text-lg text-white font-sans hover:bg-white hover:text-gray-900"
        to="/upload"
      >Add Image</NavLink>
      <NavLink
        className="py-2 px-8 pointer font-bold text-lg text-white font-sans hover:bg-white hover:text-gray-900"
        to="/add_category"
      >Add Category</NavLink>
      <RightEnd />
    </nav>
  )
}

export default Navbar;
