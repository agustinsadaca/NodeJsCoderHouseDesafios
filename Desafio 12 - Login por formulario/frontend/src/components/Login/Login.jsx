import React, { useState, useContext } from "react";
import axios from "axios";
import Input from "../UI/Input";
import classes from "./login.module.css";
import { Link } from "react-router-dom";
import Cookies from "universal-cookie";
import { UserContext } from "../context/UserContext";

const Login = (props) => {
  const [userData, setUserData] = useState({
    user: "",
    password: "",
  });
  const [dat, setDat] = useState("");
  const [userContext, setUserContext] = useContext(UserContext);

  const handleDataChange = (event) => {
    setUserData({ ...userData, [event.target.name]: event.target.value });
  };
  const sendLogin = (event) => {
    event.preventDefault();
    axios.interceptors.response.use((response) => {
      console.log("Response:", JSON.stringify(response, null, 2));
      return response;
    });
    const res = axios
      .get(`http://localhost:8080/login`, {
        username: userData.user,
  
      })
      .then(async (response) => {
        const cookies = new Cookies();
        const tesSeconds = new Date(new Date().getTime() + 10 * 1000);
        cookies.set("cookieTest",1,{maxAxe:1000,expires:tesSeconds})

      });

    // window.open(`http://localhost:8080/login?username=${userData.user}&password=${userData.password}`,"_self")
  };
  console.log(window.location.href);
  return (
    <div className="App App-header">
      <form onSubmit={sendLogin}>
        <Input
          label="Ingrese su nombre"
          input={{
            id: "user",
            type: "text",
            className: "inputLogin",
            onChange: handleDataChange,
            name: "user",
          }}
        ></Input>
       
        <button className={classes.buttonLogin} onClick={props.onClose}>
          Entrar
        </button>
      </form>
    </div>
  );
};
export default Login;
