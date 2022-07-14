import React, { useState, useContext } from "react";
import axios from "axios";
import Input from "../UI/Input";
import classes from "./login.module.css";
import { Link } from "react-router-dom";
import Cookies from "universal-cookie";
import  {UserContext} from "../context/UserContext.js";

const Login = (props) => {
  const [userData, setUserData] = useState({
    user: "",
    password: "",
  });
  const [dat, setDat] = useState("");
  const ctx = useContext(UserContext);

  const handleDataChange = (event) => {
    setUserData({ ...userData, [event.target.name]: event.target.value });
  };
  const sendLogin = (event) => {
    event.preventDefault();
    // axios.interceptors.response.use((response) => {
    //   console.log("Response:", JSON.stringify(response, null, 2));
    //   return response;
    // });
    const res = axios
      .post(
        `http://localhost:8080/user/login`,JSON.stringify(
        {
          username: userData.user,
          password: userData.password,
        }),
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
            'Access-Control-Allow-Origin': 'http://localhost:8080',
          }
        }
      )
      .then(async (response) => {
        if (!response.ok) {
          if (response.status === 400) {
            console.log("Please fill all the fields correctly!");
          } else if (response.status === 401) {
            console.log("Invalid email and password combination.");
          } else {
            const data = await response;
            setDat(response.data.token);
            ctx.setToken(()=>response.data.token)
           
          }
        }
      });

    // window.open(`http://localhost:8080/login?username=${userData.user}&password=${userData.password}`,"_self")
  };
  return (
    <div className="App App-header">
      <form onSubmit={sendLogin}>
        <Input
          label="User"
          input={{
            id: "user",
            type: "text",
            className: "inputLogin",
            onChange: handleDataChange,
            name: "user",
          }}
        ></Input>
        <Input
          label="Password"
          input={{
            id: "password",
            type: "text",
            onChange: handleDataChange,
            name: "password",
          }}
        ></Input>
        <button className={classes.buttonLogin} onClick={props.onClose}>
          Entrar
        </button>
        <Link to="/registrarse"> Registrarse</Link>
      </form>
    </div>
  );
};
export default Login;
