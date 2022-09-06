import React, {
  useContext,
  useState,
} from 'react';

import axios from 'axios';
import {
  Link,
  useLocation,
  useNavigate,
} from 'react-router-dom';

import { UserContext } from '../context/UserContext.js';
import Input from '../UI/Input';
import classes from './login.module.css';

const Login = (props) => {
  // localStorage.setItem("admin",false)
  const [userData, setUserData] = useState({
    user: "",
    password: "",
  });
  let location = useLocation();
  let navigate = useNavigate();

  const [dat, setDat] = useState("");
  const [userContext, setUserContext] = useContext(UserContext);

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
        `http://localhost:8080/user/login`,
        JSON.stringify({
          username: userData.user,
          password: userData.password,
        }),
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "http://localhost:8080",
          },
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
            localStorage.setItem("admin",response.data.admin)
            setDat(response.data.token);
            setUserContext((oldValues) => {
              return { ...oldValues, token: response.data.token };
            });
            const storedUserLoggedInInformation = localStorage.setItem(
              "token",
              response.data.token
            );
              console.log(response);
            navigate("/",{ state: userData.user });
          }
        }
      });
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
