import { NavLink } from 'react-router-dom';
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { checkSession, destroySession } from '../redux/session/sessionSlice';

const Navbar = () => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.sessionReducer.user)

  const logout = async () => {
    dispatch(destroySession())
  }

  const getUserData = async () => {
    const data = await dispatch(checkSession())
    console.log(data.payload.user)
  }

  useEffect(() => {
    console.log(user, 'user')
    getUserData()
  }, [])
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
      {user ?
        <>
          <NavLink
            className="py-2 px-8 pointer font-bold text-lg text-white font-sans hover:bg-white hover:text-gray-900"
            to="/upload"
          >Add Image</NavLink>
          <NavLink
            className="py-2 px-8 pointer font-bold text-lg text-white font-sans hover:bg-white hover:text-gray-900"
            to="/add_category"
          >Add Category</NavLink>
          <div
            onClick={() => logout()}
            className="py-2 px-8 pointer font-bold text-lg text-white 
          font-sans hover:bg-white hover:text-gray-900"
          >
            {user.username}
          </div>
        </>
        :
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
        </div>}
    </nav>
  )
}

export default Navbar;
