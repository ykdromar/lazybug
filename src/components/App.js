// import { useEffect, useState } from "react";

import { Home, Login, Settings, Signup } from "../pages";
import { Navbar } from "./";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// import { useAuth } from "../hooks";
function App() {
  // const auth = useAuth();

  // if (auth.loading) {
  //   return <Loader />;
  // }
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />

        <Routes>
          <Route exact path="/" element={<Home />}></Route>
          <Route exact path="/login" element={<Login />}></Route>
          <Route exact path="/register" element={<Signup />}></Route>
          <Route exact path="/settings" element={<Settings />}></Route>

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
