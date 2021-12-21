import React, { useState } from 'react'
import axios from 'axios'
import Input from "../UI/Input";
import classes from "./login.module.css";
import { Link } from "react-router-dom";


const Login = ( props) => {
  const [userData, setUserData] = useState({
    user:"",
    password:"",
  })
  const handleDataChange = (event) => {
    setUserData({...userData,[event.target.name]:event.target.value})
  }
  const sendLogin = (event) => {
    event.preventDefault()
    const res =  axios.post(`http://localhost:8080/login?username=${userData.user}&password=${userData.password}`
    )
  }
  console.log( window.location.href)
  return(<div>
    <form onSubmit={sendLogin}>
        <Input
          label="User"
          input={{
            id: "user" ,
            type: "text",
            className:"inputLogin",
            onChange: handleDataChange,
            
            name: "user",
          }}
        ></Input>
        <Input
          label="Password"
          input={{
            id: "password" ,
            type: "text",
            onChange: handleDataChange,
            
            
            name: "password",
          }}
        ></Input>
        <button className={classes.buttonLogin} onClick={props.onClose}>
            Entrar
        </button>
        <Link to="/registrarse" > Registrarse</Link>


    </form>

  </div>)
}
export default Login
