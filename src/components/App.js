import { useEffect, useState } from "react";

import { Home, Login } from "../pages";
import { Loader, Navbar } from "./";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useAuth } from "../hooks";
const About = () => {
  return <h1>About</h1>;
};
const Contact = () => {
  return <h1>Contact</h1>;
};
function App() {
  const auth = useAuth();

  if (auth.loading) {
    return <Loader />;
  }
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />

        <Routes>
          <Route exact path="/" element={<Home />}></Route>
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
