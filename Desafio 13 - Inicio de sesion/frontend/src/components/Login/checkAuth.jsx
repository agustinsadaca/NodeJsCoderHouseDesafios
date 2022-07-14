import Cookies from "universal-cookie";
import axios from "axios";
import React, { useContext } from "react";
import { UserContext } from "../context/UserContext";

function useCustomUserHook() {
  const [userContext, setUserContext] = useContext(UserContext);
  return userContext;
}
export const checkAuth = () => {
  const custom = useCustomUserHook;
  console.log(custom);
  const res = axios
    .get(`http://localhost:8080/user/me`, {
      headers: {
        Authorization: `Bearer `,
      },
    })
    .then((response) => {
      console.log(response);
    });
};
