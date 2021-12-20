import React from 'react'
import axios from 'axios'
import Input from "../UI/Input";
import classes from "./login.module.css";


const login = ( props) => {
  const sendLogin = (params) => {
    
  }
  console.log( window.location.href)
  return(<div>
    <form onSubmit={sendLogin}>
        <Input
          label="Usuario"
          input={{
            id: "usuario" ,
            type: "text",
            className:"inputLogin",
            
            name: "usuario",
          }}
        ></Input>
        <Input
          label="Contraseña"
          input={{
            id: "Contraseña" ,
            type: "text",
            
            
            name: "Contraseña",
          }}
        ></Input>
        <button className={classes.buttonLogin} onClick={props.onClose}>
            Entrar
        </button>
        <a href={"/registrarse"} className={classes.registro}>Registrarse</a>


    </form>

  </div>)
}
export default login
