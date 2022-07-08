import React, { useState } from "react";

const LoggedContext = React.createContext([{}, () => {}]);

let initialState = false;

const LoggedProvider = (props) => {
  const [state, setState] = useState(initialState);

  return (
    <LoggedContext.Provider value={[state, setState]}>
      {props.children}
    </LoggedContext.Provider>
  );
};

export { LoggedContext, LoggedProvider };
