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
      setServers(response.data);
    });
  };
  const addServer = (newServer) => {
    Axios.post("http://localhost:4000/add_server", { newServer }).then(
      (response) => {
        getServers();
      }
    );
  };
  const editServer = (serverId, editServer) => {
    Axios.post("http://localhost:4000/edit_server", {
      serverId,
      editServer,
    }).then((response) => {
      getServers();
    });
  };
  const deleteServer = (serverId) => {
    Axios.post("http://localhost:4000/delete_server", { serverId }).then(
      (response) => {
        getServers();
      }
    );
  };
  return (
    <ServerContext.Provider
      value={{
        getServers: getServers,
        servers: servers,
        addServer: addServer,
        editServer: editServer,
        deleteServer: deleteServer,
      }}
    >
      {props.children}
    </ServerContext.Provider>
  );
};
