import { NavLink } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav>
      <NavLink to="/">Main</NavLink>
      <NavLink to="/upload">Add Image</NavLink>
    </nav>
  )
}

export default Navbar;
