import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Main from './pages/Main'
import Categories from "./pages/Categories";
import Category from "./pages/Category"
import AddCategory from "./pages/AddCategory";
import Upload from "./pages/Upload"
import './App.css';
import Search from "./pages/Search";
import Navbar from "./components/Navbar";

function App() {
  return (
    <div className="bg-gray-900 h-screen">
      <Router>  
        <Navbar />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/category/:id" element={<Category />}/>
          <Route path="/add_category" element={<AddCategory />} />
          <Route path="/upload" element={<Upload />} />
          <Route path="/search" element={<Search />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
