import { createContext, useState, useEffect, useContext } from "react";
import Axios from "axios";
import { ServerContext } from "./ServerContext";
export const UserContext = createContext();

export const UserProvider = (props) => {
  const { getServers } = useContext(ServerContext);
  useEffect(() => {
    getUsers();
  }, []);
  const [users, setUsers] = useState([]);
  const getUsers = () => {
    Axios.get("http://localhost:4000/get_users").then((response) => {
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
        getUsers();
      }
    );
  };
  const deleteUser = (uid) => {
    Axios.post("http://localhost:4000/delete_user", { uid }).then(
      (response) => {
        getUsers();
        getServers();
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
        deleteUser: deleteUser,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};
