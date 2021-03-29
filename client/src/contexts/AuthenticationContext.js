import Axios from "axios";
import { createContext, useState, useEffect } from "react";
export const AuthenticationContext = createContext();

export const AuthenticationProvider = (props) => {
  useEffect(() => {
    const storageId = localStorage.getItem("srm_auth_id");
    if (storageId !== null) {
      Axios.post("http://localhost:4000/auto_sign_in", { storageId }).then(
        (response) => {
          const { valid, userInfo } = response.data;
          if (valid) {
            setUser(userInfo);
          } else {
            localStorage.removeItem("srm_auth_id");
          }
        }
      );
    }
  }, []);
  const auth = () => {
    if (localStorage.getItem("srm_auth_id")) return true;
    else return false;
  };
  const signOut = () => {
    localStorage.removeItem("srm_auth_id");
    setIsAuth(false);
    setUser(null);
  };

  const signIn = (username, password) => {
    Axios.post("http://localhost:4000/sign_in", {
      username,
      password,
    }).then((response) => {
      console.log(response.data);
      const { msg, valid, userInfo } = response.data;
      if (valid) {
        localStorage.setItem("srm_auth_id", userInfo.uid);
        setIsAuth(true);
        setUser(userInfo);
      } else {
        alert(msg);
      }
    });
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
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);

  return (
    <AuthenticationContext.Provider
      value={{
        isAuth: isAuth,
        setIsAuth: setIsAuth,
        user: user,
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
