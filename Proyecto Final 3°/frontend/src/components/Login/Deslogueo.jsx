import React, { useState } from "react";
import { render } from "react-dom";
import Input from "../UI/Input";
import classes from "./signup.module.css";
import axios from "axios";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";

const SignUp = (props) => {
  let navigate = useNavigate();
  let location = useLocation();
const desloguear = () => {
  navigate("/login")

}
setTimeout(desloguear, 2000);
  return (
    <main className="App App-header">
      <h1>Hasta luego!</h1>
    </main>
  );
};
export default SignUp;
