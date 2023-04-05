import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Main from './pages/Main'
import Categories from "./pages/Categories";
import AddCategory from "./pages/AddCategory";
import Upload from "./pages/Upload"
import './App.css';
import Search from "./pages/Search";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/add_category" element={<AddCategory />} />
          <Route path="/upload" element={<Upload />} />
          <Route path="/search" element={<Search />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
