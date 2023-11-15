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
import UpdateBlog from "./views/AddBlog/components/UpdateBlog";

function App() {
  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/blogs" element={<Blog />} />
          <Route path="/addBlog" element={<AddBlog />} />
          <Route path="/blogs/:id" element={<UpdateBlog />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </Router>
    </>
  );
}

export default App;
