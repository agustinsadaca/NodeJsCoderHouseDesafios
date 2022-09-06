import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import SignUp from "./components/Login/SignUp";
import Login from "./components/Login/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { UserProvider } from "./components/context/UserContext";

ReactDOM.render(
  <BrowserRouter>
    <UserProvider>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="login" element={<Login />} />
        <Route />
        <Route path="/" element={<App />} />
        <Route path="registrarse" element={<SignUp />} />
        <Route />
      </Routes>
    </UserProvider>
  </BrowserRouter>,
  document.getElementById("root")
);

