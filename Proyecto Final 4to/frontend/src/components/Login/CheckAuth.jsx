import React, {
  useContext,
  useEffect,
} from 'react';

import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import { UserContext } from '../context/UserContext';

const CheckAuth = (props) => {
  const [userContext, setUserContext] = useContext(UserContext);
  let navigate = useNavigate();
  useEffect(() => {
    const storedUserLoggedInInformation = localStorage.getItem('token');

      const res = axios
        .get(`http://localhost:8080/user/me`, {
          headers: {
            Authorization: `Bearer ${storedUserLoggedInInformation}`,
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "http://localhost:8080",
          },
          withCredentials: true,
        })
        .then((response) => {
          if (response.status === 200) {
            console.log("Usuario logueado");
          } else {
            if (response.status === 401) {
              navigate("/login");
            } else {
              setUserContext((oldValues) => {
                return { ...oldValues, details: null };
              });
            }
          }
        }).catch((error)=>{
          console.log(error);
          localStorage.setItem("admin",false)
          console.log(navigate("/login"))
        });
  

    return false;
  }, []);

  return <React.Fragment>{props.children}</React.Fragment>;
};

export default CheckAuth;
