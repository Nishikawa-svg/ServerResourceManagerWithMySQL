import { createContext, useState } from "react";
export const UserContext = createContext();

export const UserProvider = (props) => {
  const [user, setUser] = useState();
  return (
    <UserContext.Provider
      value={{
        user: user,
        setUser: setUser,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};
