import React from "react";
import { Home, Login, Settings, Signup, UserProfile } from "../pages";
import { Loader, Navbar } from "./";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "../hooks";
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
          <Route
            exact
            path="/login"
            element={auth.user ? <Navigate replace to="/" /> : <Login />}
          ></Route>
          <Route
            exact
            path="/register"
            element={auth.user ? <Navigate replace to="/" /> : <Signup />}
          ></Route>
          <Route
            exact
            path="/settings"
            element={
              auth.user ? <Settings /> : <Navigate replace to="/login" />
            }
          ></Route>
          <Route
            exact
            path="/user/:userId"
            element={
              auth.user ? <UserProfile /> : <Navigate replace to="/login" />
            }
          ></Route>

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
