import Axios from "axios";
import { createContext, useState, useEffect } from "react";
import sha256 from "crypto-js/sha256";

export const AuthenticationContext = createContext();

export const AuthenticationProvider = (props) => {
  useEffect(() => {
    const storageId = localStorage.getItem("srm_auth_id");
    if (storageId !== null) {
      Axios.post("http://localhost:4000/auto_sign_in", { storageId }).then(
        (response) => {
          const { authentication, userInfo } = response.data;
          if (authentication) {
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
    console.log("successfully signed out");
  };

  const signIn = (username, password) => {
    const hashedPassword = sha256(password).toString();
    Axios.post("http://localhost:4000/sign_in", {
      username,
      hashedPassword,
    }).then((response) => {
      console.log(response.data.msg);
      const { msg, authentication, userInfo } = response.data;
      if (authentication) {
        localStorage.setItem("srm_auth_id", userInfo.uid);
        setIsAuth(true);
        setUser(userInfo);
      } else {
        alert(msg);
      }
    });
  };

  const adminSignIn = (password) => {
    const hashedPassword = sha256(password).toString();
    Axios.post("http://localhost:4000/admin_sign_in", { hashedPassword }).then(
      (response) => {
        if (response.data.authentication) {
          setIsAdmin(true);
        } else {
          alert("Sign in failed");
        }
      }
    );
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
