import { createContext } from "react";

export const ServerContext = createContext();

export const ServerProvider = (props) => {
  return (
    <ServerContext.Provider value={{}}>{props.children}</ServerContext.Provider>
  );
};
