// React Imports
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// Custom Imports
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import Home from "./views/Home";
import Blog from "./views/Blog";
import Login from "./views/Login";
import AddBlog from "./views/AddBlog";
import NotFound from "./views/NotFound";

function App() {
  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/blogs" element={<Blog />} />
          <Route path="/login" element={<Login />} />
          <Route path="/addBlog" element={<AddBlog />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </Router>
    </>
  );
}

export default App;
