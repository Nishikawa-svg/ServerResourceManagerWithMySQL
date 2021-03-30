import { createContext, useState, useEffect } from "react";
import Axios from "axios";
export const UserContext = createContext();

export const UserProvider = (props) => {
  useEffect(() => {
    getUsers();
  }, []);
  const [users, setUsers] = useState([]);
  const getUsers = () => {
    Axios.get("http://localhost:4000/get_users").then((response) => {
      console.log(response.data);
      setUsers(response.data);
    });
  };
  const addUser = (newUser) => {
    Axios.post("http://localhost:4000/add_user", { newUser }).then(
      (response) => {
        getUsers();
      }
    );
  };
  const editUser = (uid, editUser) => {
    Axios.post("http://localhost:4000/edit_user", { uid, editUser }).then(
      (response) => {
        console.log(response);
        getUsers();
      }
    );
  };
  return (
    <UserContext.Provider
      value={{
        users: users,
        getUsers: getUsers,
        addUser: addUser,
        editUser: editUser,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};
