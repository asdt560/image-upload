import { NavLink } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav>
      <NavLink to="/">Main</NavLink>
      <NavLink to="/categories">Categories</NavLink>
      <NavLink to="/upload">Add Image</NavLink>
      <NavLink to="/add_category">Add Category</NavLink>
    </nav>
  )
}

export default Navbar;
