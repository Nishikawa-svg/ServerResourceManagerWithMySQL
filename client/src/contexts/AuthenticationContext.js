import { createContext, useState, useEffect } from "react";
export const AuthenticationContext = createContext();

export const AuthenticationProvider = (props) => {
  const auth = () => {
    if (localStorage.getItem("srm_auth_id")) return true;
    else return false;
  };
  const signOut = () => {
    localStorage.removeItem("srm_auth_id");
    setIsAuth(false);
  };

  const signIn = (username, password) => {
    if (username === "one" && password === "pass") {
      localStorage.setItem("srm_auth_id", 1);
      setIsAuth(true);
    }
  };

  const adminSignIn = (password) => {
    if (password === "password") {
      setIsAdmin(true);
    }
  };

  const adminSignOut = () => {
    setIsAdmin(false);
  };
  const [isAuth, setIsAuth] = useState(auth());
  const [isAdmin, setIsAdmin] = useState(false);

  return (
    <AuthenticationContext.Provider
      value={{
        isAuth: isAuth,
        setIsAuth: setIsAuth,
        isAdmin: isAdmin,
        setIsAdmin: setIsAdmin,
        signOut: signOut,
        signIn: signIn,
        adminSignIn: adminSignIn,
        adminSignOut: adminSignOut,
      }}
    >
      {props.children}
    </AuthenticationContext.Provider>
  );
};
