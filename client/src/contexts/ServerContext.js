import Axios from "axios";
import { createContext, useState, useEffect } from "react";

export const ServerContext = createContext();

export const ServerProvider = (props) => {
  const [servers, setServers] = useState([]);
  useEffect(() => {
    getServers();
  }, []);
  const getServers = () => {
    Axios.get("http://localhost:4000/get_servers").then((response) => {
      console.log(response.data);
      setServers(response.data);
    });
  };
  const addServer = (newServer) => {
    Axios.post("http://localhost:4000/add_server", { newServer }).then(
      (response) => {
        console.log(response.data);
        getServers();
      }
    );
  };
  const editServer = (serverId, editServer) => {
    Axios.post("http://localhost:4000/edit_server", {
      serverId,
      editServer,
    }).then((response) => {
      console.log(response.data);
      getServers();
    });
  };
  const registCore = (registInfo) => {
    console.log(registInfo);
    // Axios.post("http://localhost:4000/regist_core", { registInfo }).then(
    //   (response) => {
    //     console.log(response);
    //   }
    // );
  };
  return (
    <ServerContext.Provider
      value={{
        getServers: getServers,
        servers: servers,
        addServer: addServer,
        editServer: editServer,
        registCore: registCore,
      }}
    >
      {props.children}
    </ServerContext.Provider>
  );
};
