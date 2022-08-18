import "./App.css";
import React, { Fragment, useState, useContext, useEffect } from "react";
import ListOfProducts from "./components/ListOfProducts/ListOfProducts";
import Cart from "./components/Cart/Cart";
import Modal from "./components/UI/Modal";
import Login from "./components/Login/Login";
import { UserContext } from "./components/context/UserContext";
import axios from "axios";
import CheckAuth from "./components/Login/CheckAuth";
import { useNavigate, useLocation } from "react-router-dom";

function App() {
  const [cartVisibility, setcartVisibility] = useState(false);
  const [logged, setLogged] = useState(false);
  const [userContext, setUserContext] = useContext(UserContext);
  let navigate = useNavigate();
  let location = useLocation();


  const allowCartVisibility = (params) => {
    setcartVisibility(true);
  };
  const hideCart = (params) => {
    setcartVisibility(false);
  };
  const cartVisible = () => {
    if (cartVisibility) {
      return (
        <Modal onClose={hideCart}>
          <Cart />
        </Modal>
      );
    } else {
      return Fragment;
    }
  };
  const deleteToken = () => {
    const storedUserLoggedInInformation = localStorage.setItem('token',"" );
    navigate("/login")
  }

  return (
    <CheckAuth>
      <div className="App App-header">
        <div className="headerName">
          <h1 className="nombre">Bienvenido {location.state}</h1>
          <a className="deslogueo" onClick={deleteToken}>
            Desloguearse
          </a>
        </div>
        <div>
          <button className="cart" onClick={allowCartVisibility}>
            Carrito
          </button>
          {cartVisible}
          <ListOfProducts className="App-header" />
        </div>
      </div>
    </CheckAuth>
  );
}

export default App;
