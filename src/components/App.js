import { useEffect, useState } from "react";
import { getPosts } from "../api";
import { Home, Login } from "../pages";
import { Loader, Navbar } from "./";
import { BrowserRouter, Routes, Route } from "react-router-dom";
const About = () => {
  return <h1>About</h1>;
};
const Contact = () => {
  return <h1>Contact</h1>;
};
function App() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchPosts = async () => {
      const response = await getPosts();
      if (response.success) {
        setPosts(response.data.posts);
      }
      setLoading(false);
    };
    fetchPosts();
  }, []);
  if (loading) {
    return <Loader />;
  }
  console.log(posts);
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />

        <Routes>
          <Route exact path="/" element={<Home posts={posts} />}></Route>
          <Route exact path="/about" element={<About />}></Route>
          <Route exact path="/contact" element={<Contact />}></Route>
          <Route exact path="/login" element={<Login />}></Route>
          <Route
            exact
            path="*"
            element={<h1>Error 404: Page Not Found</h1>}
          ></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
