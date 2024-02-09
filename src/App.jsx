import React from "react";
import "./App.css";
import Register from "./components/Register/Register";
import { Routes, Route } from "react-router-dom";
import Login from "./components/Login/Login";
import Logo from "./components/Logo/Logo";
import Messanger from "./components/Messanger/Messanger";

const App = () => {
  return (
    <div className="app-wrapper flex flex-center">
      <Routes>
        <Route
          path="/register"
          element={
            <>
              <Logo />
              <Register />
            </>
          }
        />
        <Route
          path="/login"
          element={
            <>
              <Logo />
              <Login />
            </>
          }
        />
        <Route path="/messanger" element={<Messanger />} />
      </Routes>
    </div>
  );
};

export default App;
