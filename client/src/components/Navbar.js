import { NavLink } from 'react-router-dom';

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
      <NavLink 
        className="py-2 px-8 pointer font-bold text-lg text-white font-sans hover:bg-white hover:text-gray-900" 
        to="/signup"
      >Sign Up</NavLink>
      <NavLink 
        className="py-2 px-8 pointer font-bold text-lg text-white font-sans hover:bg-white hover:text-gray-900" 
        to="/login"
      >Log In</NavLink>
    </nav>
  )
}

export default Navbar;
