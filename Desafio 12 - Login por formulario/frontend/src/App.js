import "./App.css";
import React, { Fragment, useState, useContext, useEffect } from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import ListOfProducts from "./components/ListOfProducts/ListOfProducts";
import Cart from "./components/Cart/Cart";
import Modal from "./components/UI/Modal";
import Cookies from "universal-cookie";
import { LoggedContext } from "./components/context/LoggedContext";


function App() {
  let location = useLocation();
  let navigate = useNavigate();

  const [logged, setLogged] = useState(false);
  const [cartVisibility, setcartVisibility] = useState(false);
  const [loggedContext, setLoggedContext] = useContext(LoggedContext);
  const allowCartVisibility = (params) => {
    setcartVisibility(true);
  };
  const hideCart = (params) => {
    setcartVisibility(false);
  };
  const deleteCookie = (event) => {
    event.preventDefault()
    const cookies = new Cookies();
    cookies.remove("cookieTest")
    navigate("/deslogueo", { state: location.state })

  }
  useEffect(() => {
    
    const cookies = new Cookies();
    const cookie = cookies.get("cookieTest")
    console.log(cookie);
    if(cookie == null){
      navigate("/login")
    }
  
  }, [])
  
  
  return (
    <div className="App App-header">
      <div className="headerName">
        <h1 className="nombre">Bienvenido {location.state}</h1>
        <a  className="deslogueo"  onClick={deleteCookie}>Desloguearse</a>
      </div>
      <button className="cart" onClick={allowCartVisibility}>
        Carrito
      </button>
      {cartVisibility ? (
        <Modal onClose={hideCart}>
          <Cart></Cart>
        </Modal>
      ) : (
        Fragment
      )}
      <ListOfProducts className="App-header"></ListOfProducts>
    </div>
  );
}

export default App;
