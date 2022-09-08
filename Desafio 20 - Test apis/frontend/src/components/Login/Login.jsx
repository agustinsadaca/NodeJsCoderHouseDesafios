import React, { useState, useContext } from "react";
import axios from "axios";
import Input from "../UI/Input";
import classes from "./login.module.css";
import { Navigate,useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import { UserContext } from "../context/UserContext";
import { LoggedContext } from "../context/LoggedContext";

const Login = (props) => {
  const [userData, setUserData] = useState({
    user: "",
    password: "",
  });
  const [dat, setDat] = useState("");
  const [isLogged, setIsLogged] = useState(false);
  const [userContext, setUserContext] = useContext(UserContext);
  let navigate = useNavigate();
console.log(isLogged);
  const handleDataChange = (event) => {
    setUserData({ ...userData, [event.target.name]: event.target.value });
  };
  const sendLogin = (event) => {
    event.preventDefault();
    axios.interceptors.response.use((response) => {
      return response;
    });
    const res = axios
      .get(`http://localhost:8080/login`, {
        username: userData.user,
      })
      .then(async (response) => {
        const cookies = new Cookies();
        const tesSeconds = new Date(new Date().getTime() + 10* 60 * 1000);
        cookies.set("cookieTest", 1, { maxAxe: 1000, expires: tesSeconds });
        setIsLogged(true)
      });
     
  };
  const cookies = new Cookies();
  const cookie = cookies.get("cookieTest")
  if(cookie == null & isLogged != false){
    setIsLogged(false)
  }
  
  if(isLogged){
    navigate("/", { state: userData.user })
  }
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
        <button className={classes.buttonLogin} onClick={sendLogin}>
          Entrar
        </button>
      </form>
    </div>
  );
};
export default Login;
