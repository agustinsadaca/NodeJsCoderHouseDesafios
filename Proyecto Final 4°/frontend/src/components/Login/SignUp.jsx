import React, { useState } from 'react';
import { render } from 'react-dom';
import Input from "../UI/Input";
import classes from "./signup.module.css";
import axios from 'axios'
import { Link, Navigate } from "react-router-dom";



const SignUp = (props) => {

  const [isSignedUp, setIsSignedUp] = useState(false)
  const [userData, setUserData] = useState({
    user:"",
    password:"",
    firstName:"",
    lastName:"",
    email:""
    
  })
  const handleDataChange = (event) => {
    setUserData({...userData,[event.target.name]:event.target.value})
  }
  const sendRegistro = (event) => {
    event.preventDefault()
    console.log(userData);
    const res =  axios.post(`http://localhost:8080/signup?username=${userData.user}&password=${userData.password}`,{
    "email":userData.email,
    "firstName":userData.firstName,
    "lastName":userData.lastName
    }).then(response=>{
      response.status==204 ? setIsSignedUp(true) :setIsSignedUp(false) 
    })

  }
  
  return(
    <main className= "App App-header">
      <form onSubmit={sendRegistro}>
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
            id: "Password" ,
            type: "text",
            onChange: handleDataChange,
            name: "password",
          }}
        ></Input>
        <Input
          label="First Name"
          input={{
            id: "FirstName" ,
            type: "text",
            onChange: handleDataChange,
            
            name: "firstName",
          }}
        ></Input>
        <Input
          label="Last Name"
          input={{
            id: "LastName" ,
            type: "text",
            onChange: handleDataChange,
            
            name: "lastName",
          }}
        ></Input>
        <Input
          label="Email"
          input={{
            id: "Email" ,
            type: "text",
            onChange: handleDataChange,
            
            name: "email",
          }}
        ></Input>
        <button className={classes.buttonLogin} >
            Sign up
        </button>


    </form>
        {isSignedUp ? <Navigate to="/" /> : <div/> }
    </main>
  )
}
export default SignUp