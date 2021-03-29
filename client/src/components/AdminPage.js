import { ServerContext } from "../contexts/ServerContext";
import { UserContext } from "../contexts/UserContext";
import { useContext, useEffect, useState, useRef } from "react";
import {
  TableContainer,
  Table,
  TableHead,
  TableCell,
  TableRow,
  TableBody,
  Grid,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from "@material-ui/core";

function AdminPage() {
  const { getServers, servers } = useContext(ServerContext);
  const { getUsers, users } = useContext(UserContext);

  return (
    <>
      <div>here is admin page</div>
      <br />
      <hr />
      <div>userList</div>
      <Grid container justify="center">
        <Grid item xs={10}>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>user_id</TableCell>
                  <TableCell>username</TableCell>
                  <TableCell>grade</TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users &&
                  users.map((user) => (
                    <TableRow key={user.uid}>
                      <TableCell>{user.uid}</TableCell>
                      <TableCell>{user.username}</TableCell>
                      <TableCell>{user.grade}</TableCell>
                      <TableCell>
                        <EditUserDialog
                          uid={user.uid}
                          username={user.username}
                          grade={user.grade}
                        />
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
      <br />
      <AddUserDialog />

      <br />
      <hr />
      <div>serverList</div>
      <Grid container justify="center">
        <Grid item xs={10}>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>server_id</TableCell>
                  <TableCell>server_address</TableCell>
                  <TableCell>max_cores</TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {servers &&
                  servers.map((server) => (
                    <TableRow key={server.server_id}>
                      <TableCell>{server.server_id}</TableCell>
                      <TableCell>{server.server_address}</TableCell>
                      <TableCell>{server.max_cores}</TableCell>
                      <TableCell>
                        <EditServerDialog
                          serverId={server.server_id}
                          address={server.server_address}
                          maxCores={server.max_cores}
                        />
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
      <br />
      <AddServerDialog />
    </>
  );
}

const AddUserDialog = () => {
  const { addUser, users } = useContext(UserContext);
  const [open, setOpen] = useState(false);
  const usernameEl = useRef();
  const gradeEl = useRef();
  const passwordEl = useRef();
  const confirmPasswordEl = useRef();
  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };
  const handleAddUser = () => {
    let userDuplicated = false;
    users.map((user) => {
      if (usernameEl.current.value === user.username) userDuplicated = true;
    });
    if (userDuplicated) {
      alert(
        `Username ${usernameEl.current.value} is already existed. Please change username.`
      );
    } else if (passwordEl.current.value !== confirmPasswordEl.current.value) {
      alert("not same password");
    } else {
      const newUser = {
        username: usernameEl.current.value,
        grade: gradeEl.current.value,
        password: passwordEl.current.value,
      };
      addUser(newUser);
      setOpen(false);
    }
  };
  return (
    <>
      <Button onClick={handleOpen}>add User</Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>add new user</DialogTitle>
        <DialogContent>
          <div>username</div>
          <TextField inputRef={usernameEl} />
          <div>grade</div>
          <TextField inputRef={gradeEl} />
          <div>password</div>
          <TextField inputRef={passwordEl} />
          <div>confirm password</div>
          <TextField inputRef={confirmPasswordEl} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>cancel</Button>
          <Button onClick={handleAddUser}>add</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

const EditUserDialog = ({ uid, username, grade }) => {
  const { editUser, users } = useContext(UserContext);
  const [edited, setEdited] = useState({ username: username, grade: grade });
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };
  const handleEditUser = () => {
    let userDuplicated = false;
    users.map((user) => {
      if (user.uid !== uid && user.username === edited.username) {
        userDuplicated = true;
      }
    });
    if (userDuplicated) {
      alert(
        `Username ${edited.username} is already exist. Please change username`
      );
    } else {
      editUser(uid, edited);
      setOpen(false);
    }
  };
  return (
    <>
      <Button onClick={handleOpen}>Edit</Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>edit user dialog</DialogTitle>
        <DialogContent>
          <div>username</div>
          <TextField
            value={edited.username}
            onChange={(e) => setEdited({ ...edited, username: e.target.value })}
          />
          <div>grade</div>
          <TextField
            value={edited.grade}
            onChange={(e) => setEdited({ ...edited, grade: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>cancel</Button>
          <Button onClick={handleEditUser}>add</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

const AddServerDialog = () => {
  const { addServer } = useContext(ServerContext);
  const [open, setOpen] = useState(false);
  const serverAddressEl = useRef();
  const maxCoresEl = useRef();
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleAddServer = () => {
    const newServer = {
      server_address: serverAddressEl.current.value,
      max_cores: maxCoresEl.current.value,
    };
    addServer(newServer);
    setOpen(false);
  };
  return (
    <>
      <Button onClick={handleOpen}>add server</Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>add server</DialogTitle>
        <DialogContent>
          <div>server address</div>
          <TextField inputRef={serverAddressEl} />
          <div>max cores</div>
          <TextField inputRef={maxCoresEl} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>cancel</Button>
          <Button onClick={handleAddServer}>add </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

const EditServerDialog = ({ serverId, address, maxCores }) => {
  const { editServer } = useContext(ServerContext);
  const [edited, setEdited] = useState({
    server_address: address,
    max_cores: maxCores,
  });
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };
  const handleEditServer = () => {
    editServer(serverId, edited);
    setOpen(false);
  };
  return (
    <>
      <Button onClick={handleOpen}>Edit</Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>edit server dialog</DialogTitle>
        <DialogContent>
          <div>Server Address</div>
          <TextField
            value={edited.server_address}
            onChange={(e) =>
              setEdited({ ...edited, server_address: e.target.value })
            }
          />
          <div>max ores</div>
          <TextField
            value={edited.max_cores}
            onChange={(e) =>
              setEdited({ ...edited, max_cores: e.target.value })
            }
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>cancel</Button>
          <Button onClick={handleEditServer}>edit</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default AdminPage;
