import React, { useState } from "react";

// const UserContext = React.createContext([{}, () => {}]);
export const UserContext = React.createContext({token:"", setToken:()=>{}});

let initialState = "";

const UserProvider = (props) => {
  const [userRefreshToken, setUserRefreshToken] = useState(initialState);

  return (
    <UserContext.Provider value={{token:userRefreshToken, setToken: setUserRefreshToken}}>
      {props.children}
    </UserContext.Provider>
  );
};


