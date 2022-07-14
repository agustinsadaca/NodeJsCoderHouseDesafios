import "./App.css";
import React, { Fragment, useState, useCallback, useContext,useEffect} from "react";
import ListOfProducts from "./components/ListOfProducts/ListOfProducts";
import Cart from "./components/Cart/Cart";
import Modal from "./components/UI/Modal";
import Login from "./components/Login/Login";
import { UserContext } from "./components/context/UserContext";
import axios from "axios";
import {checkAuth} from './components/Login/checkAuth'
import { useNavigate } from "react-router-dom";

function App() {
  const [cartVisibility, setcartVisibility] = useState(false);
  const [logged, setLogged] = useState(false);
  const [userContext, setUserContext] = useContext(UserContext);
  let navigate = useNavigate()


  useEffect(() => {
    if(!checkAuth()){
      navigate("/login")
    }
 
  }, []);

  const fetchUserDetails = useCallback(() => {
    axios.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${userContext.token}`;
    axios.get("users/me").then(async (response) => {
      if (response.ok) {
        const data = await response.json();
        setUserContext((oldValues) => {
          return { ...oldValues, details: data };
        });
      } else {
        if (response.status === 401) {
          // Edge case: when the token has expired.
          // This could happen if the refreshToken calls have failed due to network error or
          // User has had the tab open from previous day and tries to click on the Fetch button
          window.location.reload();
        } else {
          setUserContext((oldValues) => {
            return { ...oldValues, details: null };
          });
        }
      }
    });
  }, [setUserContext, userContext.token]);

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
  const Islogged = () => {
    // const cookk = request.headers
    const res = axios
      .get(`http://localhost:8080/login`, {
        withCredentials: true,
        credentials: "same-origin",
      })
      .then((response) => {
        console.log(JSON.stringify(response, null, 2));
      });
  };

  return (
    <div className="App App-header">
      <div>
        <span>{userContext.token}</span>
        <button className="cart" onClick={allowCartVisibility}>
          Carrito
        </button>
        {cartVisible}
        <ListOfProducts className="App-header" />
      </div>
    </div>
  );
}

export default App;
