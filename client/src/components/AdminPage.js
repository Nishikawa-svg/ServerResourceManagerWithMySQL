import { ServerContext } from "../contexts/ServerContext";
import { UserContext } from "../contexts/UserContext";
import { useContext, useState, useRef } from "react";
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
  DialogTitle,
  TextField,
  Paper,
  makeStyles,
  Checkbox,
} from "@material-ui/core";
import EditRoundedIcon from "@material-ui/icons/EditRounded";
import PersonAddRoundedIcon from "@material-ui/icons/PersonAddRounded";
import PostAddRoundedIcon from "@material-ui/icons/PostAddRounded";
import DeleteRoundedIcon from "@material-ui/icons/DeleteRounded";
import sha256 from "crypto-js/sha256";

const useStyles = makeStyles({
  tablePaper: {
    border: "solid 1px gray",
  },
  listTitle: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 12,
  },
  tableHeadRow: {
    backgroundColor: "#333333",
  },
  tableHeadCell: {
    color: "white",
  },
  editButton: {
    textTransform: "none",
    color: "#dddddd",
    "&:hover": {
      color: "#0000ff",
    },
  },
  deleteButton: {
    textTransform: "none",
    color: "#dddddd",
    "&:hover": {
      color: "#ff0000",
    },
  },
  addUserButton: {
    textTransform: "none",
  },
  addUserButtonIcon: {
    marginRight: 12,
  },
  addServerButton: {
    textTransform: "none",
  },
  addServerButtonIcon: {
    marginRight: 12,
  },

  addUserFormContainer: {
    width: 360,
    height: 460,
  },
  addUserFormTitle: {
    textAlign: "center",
  },
  addUserFormIcon: {
    width: 40,
    height: 40,
    marginBottom: 20,
  },
  addUserFormInputBox: {
    marginBottom: 20,
  },
  addUserFormCancelButton: {
    textTransform: "none",
    color: "red",
  },
  addUserFormAddButton: {
    textTransform: "none",
    color: "blue",
  },

  editUserFormContainer: {
    width: 360,
  },
  editUserFormTitle: {
    textAlign: "center",
  },
  editUserFormIcon: {
    width: 40,
    height: 40,
    marginBottom: 20,
  },
  editUserFormInputBox: {
    marginBottom: 20,
  },
  editUserFormCancelButton: {
    textTransform: "none",
    color: "red",
  },
  editUserFormUpdateButton: {
    textTransform: "none",
    color: "blue",
  },
  deleteUserDialogTitle: {
    textAlign: "center",
  },
  deleteUserDialogContent: {
    color: "red",
  },
  deleteUserCheckBoxContent: {
    marginTop: 10,
  },
  deleteUserCancelButton: {
    textTransform: "none",
    color: "red",
  },
  deleteUserDeleteButton: {
    textTransform: "none",
    color: "blue",
  },

  addServerFormContainer: {
    width: 360,
  },
  addServerFormTitle: {
    textAlign: "center",
  },
  addServerFormIcon: {
    width: 40,
    height: 40,
    marginBottom: 20,
  },
  addServerFormInputBox: {
    marginBottom: 20,
  },
  addServerFormCancelButton: {
    textTransform: "none",
    color: "red",
  },
  addServerFormAddButton: {
    textTransform: "none",
    color: "blue",
  },
  editServerFormContainer: {
    width: 360,
  },
  editServerFormTitle: {
    textAlign: "center",
  },
  editServerFormIcon: {
    width: 40,
    height: 40,
    marginBottom: 20,
  },
  editServerFormInputBox: {
    marginBottom: 20,
  },
  editServerFormCancelButton: {
    textTransform: "none",
    color: "red",
  },
  editServerFormUpdateButton: {
    textTransform: "none",
    color: "blue",
  },
  deleteServerDialogTitle: {
    textAlign: "center",
  },
  deleteServerDialogContent: {
    color: "red",
  },
  deleteServerCheckBoxContent: {
    marginTop: 10,
  },
  deleteServerCancelButton: {
    textTransform: "none",
    color: "red",
  },
  deleteServerDeleteButton: {
    textTransform: "none",
    color: "blue",
  },
});

function AdminPage() {
  const classes = useStyles();
  const { servers } = useContext(ServerContext);
  const { users } = useContext(UserContext);

  return (
    <>
      <div className={classes.listTitle}>User List</div>
      <Grid container justify="center">
        <Grid item xs={10}>
          <Paper className={classes.tablePaper}>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow className={classes.tableHeadRow}>
                    <TableCell align="center" className={classes.tableHeadCell}>
                      id
                    </TableCell>
                    <TableCell align="center" className={classes.tableHeadCell}>
                      username
                    </TableCell>
                    <TableCell align="center" className={classes.tableHeadCell}>
                      grade
                    </TableCell>
                    <TableCell
                      align="center"
                      className={classes.tableHeadCell}
                    ></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {users &&
                    users.map((user) => (
                      <TableRow key={user.uid}>
                        <TableCell align="center">{user.uid}</TableCell>
                        <TableCell align="center">{user.username}</TableCell>
                        <TableCell align="center">{user.grade}</TableCell>
                        <TableCell align="center">
                          <EditUserDialog
                            uid={user.uid}
                            username={user.username}
                            grade={user.grade}
                          />
                          <DeleteUserDialog
                            uid={user.uid}
                            username={user.username}
                          />
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>
      </Grid>
      <br />
      <AddUserDialog />

      <br />
      <br />
      <hr />
      <br />
      <div className={classes.listTitle}>Server List</div>
      <Grid container justify="center">
        <Grid item xs={10}>
          <Paper className={classes.tablePaper}>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow className={classes.tableHeadRow}>
                    <TableCell align="center" className={classes.tableHeadCell}>
                      id
                    </TableCell>
                    <TableCell align="center" className={classes.tableHeadCell}>
                      address
                    </TableCell>
                    <TableCell align="center" className={classes.tableHeadCell}>
                      cores
                    </TableCell>
                    <TableCell
                      align="center"
                      className={classes.tableHeadRow}
                    ></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {servers &&
                    servers.map((server) => (
                      <TableRow key={server.server_id}>
                        <TableCell align="center">{server.server_id}</TableCell>
                        <TableCell align="center">
                          {server.server_address}
                        </TableCell>
                        <TableCell align="center">{server.max_cores}</TableCell>
                        <TableCell align="center">
                          <EditServerDialog
                            serverId={server.server_id}
                            address={server.server_address}
                            maxCores={server.max_cores}
                          />
                          <DeleteServerDialog
                            serverId={server.server_id}
                            address={server.server_address}
                          />
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>
      </Grid>
      <br />
      <AddServerDialog />
    </>
  );
}

const AddUserDialog = () => {
  const classes = useStyles();
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
    let newUser = {
      username: usernameEl.current.value.trim(),
      grade: gradeEl.current.value.trim(),
    };
    users.forEach((user) => {
      if (newUser.username === user.username) userDuplicated = true;
    });
    if (userDuplicated) {
      alert(
        `Error : Username ${newUser.username} is already existed. Please change username.`
      );
    } else if (newUser.username === "") {
      alert("Error : Enter username");
    } else if (passwordEl.current.value !== confirmPasswordEl.current.value) {
      alert("Error : Not same password.");
    } else {
      newUser.hashedPassword = sha256(passwordEl.current.value).toString();
      addUser(newUser);
      setOpen(false);
    }
  };
  return (
    <>
      <Grid container justify="center">
        <Button
          onClick={handleOpen}
          className={classes.addUserButton}
          variant="contained"
          color="secondary"
        >
          <PersonAddRoundedIcon className={classes.addUserButtonIcon} />
          <div>Add User</div>
        </Button>
      </Grid>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle className={classes.addUserFormTitle}>
          Add New User
        </DialogTitle>
        <DialogContent className={classes.addUserFormContainer}>
          <Grid container justify="center">
            <Grid item xs={10}>
              <Grid container direction="column">
                <Grid item>
                  <Grid container justify="center">
                    <PersonAddRoundedIcon
                      className={classes.addUserFormIcon}
                      color="secondary"
                    />
                  </Grid>
                </Grid>
                <Grid item>
                  <div>Username</div>
                </Grid>
                <Grid item>
                  <TextField
                    className={classes.addUserFormInputBox}
                    inputRef={usernameEl}
                    fullWidth
                    variant="outlined"
                  />
                </Grid>
                <Grid item>
                  <div>grade</div>
                  <TextField
                    className={classes.addUserFormInputBox}
                    inputRef={gradeEl}
                    fullWidth
                    variant="outlined"
                  />
                </Grid>
                <Grid item>
                  <div>password</div>
                  <TextField
                    className={classes.addUserFormInputBox}
                    inputRef={passwordEl}
                    fullWidth
                    type="password"
                    variant="outlined"
                  />
                </Grid>
                <Grid item>
                  <div>confirm password</div>
                  <TextField
                    className={classes.addUserFormInputBox}
                    inputRef={confirmPasswordEl}
                    fullWidth
                    type="password"
                    variant="outlined"
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Grid container justify="space-around">
            <Button
              onClick={handleClose}
              className={classes.addUserFormCancelButton}
            >
              Cancel
            </Button>

            <Button
              onClick={handleAddUser}
              className={classes.addUserFormAddButton}
            >
              Add
            </Button>
          </Grid>
        </DialogActions>
      </Dialog>
    </>
  );
};

const EditUserDialog = ({ uid, username, grade }) => {
  const classes = useStyles();
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
    let editedUser = edited;
    editedUser.username = editedUser.username.trim();
    editedUser.grade = editedUser.grade.trim();
    users.forEach((user) => {
      if (user.uid !== uid && user.username === editedUser.username) {
        userDuplicated = true;
      }
    });
    if (editedUser.username === "") {
      alert("Please enter username");
    } else if (userDuplicated) {
      alert(
        `Username ${editedUser.username} is already exist. Please change username`
      );
    } else {
      editUser(uid, editedUser);
      setOpen(false);
    }
  };
  return (
    <>
      <Button onClick={handleOpen} className={classes.editButton}>
        <EditRoundedIcon className={classes.editButtonIcon} />
        <div className={classes.editButtonContent}>Edit</div>
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle className={classes.editUserFormTitle}>
          Edit User
        </DialogTitle>
        <DialogContent className={classes.editUserFormContainer}>
          <Grid container justify="center">
            <Grid item xs={10}>
              <Grid container direction="column">
                <Grid item>
                  <Grid container justify="center">
                    <EditRoundedIcon
                      color="primary"
                      className={classes.editUserFormIcon}
                    />
                  </Grid>
                </Grid>
                <Grid item>
                  <div>username</div>
                  <TextField
                    className={classes.editUserFormInputBox}
                    value={edited.username}
                    fullWidth
                    onChange={(e) =>
                      setEdited({ ...edited, username: e.target.value })
                    }
                    variant="outlined"
                  />
                </Grid>
                <Grid item>
                  <div>grade</div>
                  <TextField
                    className={classes.editUserFormInputBox}
                    value={edited.grade}
                    fullWidth
                    onChange={(e) =>
                      setEdited({ ...edited, grade: e.target.value })
                    }
                    variant="outlined"
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Grid container justify="space-around">
            <Button
              onClick={handleClose}
              className={classes.editUserFormCancelButton}
            >
              Cancel
            </Button>

            <Button
              onClick={handleEditUser}
              className={classes.editUserFormUpdateButton}
            >
              Update
            </Button>
          </Grid>
        </DialogActions>
      </Dialog>
    </>
  );
};

const DeleteUserDialog = ({ uid, username }) => {
  const classes = useStyles();
  const { deleteUser } = useContext(UserContext);
  const [open, setOpen] = useState(false);
  const [checked, setChecked] = useState(false);
  const handleOpen = () => {
    setChecked(false);
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleDeleteUser = () => {
    deleteUser(uid);
    setOpen(false);
  };
  return (
    <>
      <Button className={classes.deleteButton} onClick={handleOpen}>
        <DeleteRoundedIcon />
        <div>Delete</div>
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle className={classes.deleteUserDialogTitle}>
          Delete User
        </DialogTitle>
        <DialogContent>
          <div className={classes.deleteUserDialogContent}>
            Are you sure to delete {username}?
          </div>
          <Grid container justify="center">
            <Grid item>
              <Checkbox onClick={(e) => setChecked(e.target.checked)} />
            </Grid>
            <Grid item>
              <div className={classes.deleteUserCheckBoxContent}>
                It's correct.
              </div>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Grid container justify="space-around">
            <Button
              className={classes.deleteUserCancelButton}
              onClick={handleClose}
            >
              Cancel
            </Button>
            <Button
              className={classes.deleteUserDeleteButton}
              onClick={handleDeleteUser}
              disabled={!checked}
            >
              Delete
            </Button>
          </Grid>
        </DialogActions>
      </Dialog>
    </>
  );
};

const AddServerDialog = () => {
  const classes = useStyles();
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
      server_address: serverAddressEl.current.value.trim(),
      max_cores: Number(maxCoresEl.current.value),
    };
    console.log(newServer);
    if (newServer.server_address.length === 0) {
      alert("Error : Pease enter the server address");
    } else if (newServer.max_cores !== parseInt(newServer.max_cores, 10)) {
      alert("Error : Max cores must be an integer between 1 and 16");
    } else if (newServer.max_cores <= 0) {
      alert("Error : Max cores must be an integer between 1 and 16");
    } else if (newServer.max_cores > 16) {
      alert("Error : Max cores must be an integer between 1 and 16");
    } else {
      addServer(newServer);
      setOpen(false);
    }
  };
  return (
    <>
      <Grid container justify="center">
        <Button
          onClick={handleOpen}
          className={classes.addServerButton}
          variant="contained"
          color="secondary"
        >
          <PostAddRoundedIcon className={classes.addServerButtonIcon} />
          <div>Add Server</div>
        </Button>
      </Grid>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle className={classes.addServerFormTitle}>
          Add Server
        </DialogTitle>
        <DialogContent className={classes.addServerFormContainer}>
          <Grid container justify="center">
            <Grid item xs={10}>
              <Grid container direction="column">
                <Grid item>
                  <Grid container justify="center">
                    <PostAddRoundedIcon
                      className={classes.addServerFormIcon}
                      color="secondary"
                    />
                  </Grid>
                </Grid>
                <Grid item>
                  <div>server address</div>
                  <TextField
                    inputRef={serverAddressEl}
                    className={classes.addServerFormInputBox}
                    fullWidth
                    variant="outlined"
                  />
                </Grid>
                <Grid item>
                  <div>max cores</div>
                  <TextField
                    inputRef={maxCoresEl}
                    className={classes.addServerFormInputBox}
                    variant="outlined"
                    fullWidth
                    type="number"
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Grid container justify="space-around">
            <Button
              onClick={handleClose}
              className={classes.addServerFormCancelButton}
            >
              Cancel
            </Button>
            <Button
              onClick={handleAddServer}
              className={classes.addServerFormAddButton}
            >
              add
            </Button>
          </Grid>
        </DialogActions>
      </Dialog>
    </>
  );
};

const EditServerDialog = ({ serverId, address, maxCores }) => {
  const classes = useStyles();
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
      <Button onClick={handleOpen} className={classes.editButton}>
        <EditRoundedIcon />
        <div>Edit</div>
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle className={classes.editServerFormTitle}>
          Edit Server Dialog
        </DialogTitle>
        <DialogContent className={classes.editServerFormContainer}>
          <Grid container justify="center">
            <Grid item xs={10}>
              <Grid container direction="column">
                <Grid item>
                  <Grid container justify="center">
                    <EditRoundedIcon
                      color="primary"
                      className={classes.editServerFormIcon}
                    />
                  </Grid>
                </Grid>
                <Grid item>
                  <div>Server Address</div>
                  <TextField
                    value={edited.server_address}
                    onChange={(e) =>
                      setEdited({ ...edited, server_address: e.target.value })
                    }
                    fullWidth
                    variant="outlined"
                    className={classes.editServerFormInputBox}
                  />
                </Grid>
                <Grid item>
                  <div>max ores</div>
                  <TextField
                    value={edited.max_cores}
                    onChange={(e) =>
                      setEdited({ ...edited, max_cores: e.target.value })
                    }
                    fullWidth
                    variant="outlined"
                    className={classes.editServerFormInputBox}
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Grid container justify="space-around">
            <Button
              onClick={handleClose}
              className={classes.editServerFormCancelButton}
            >
              Cancel
            </Button>
            <Button
              onClick={handleEditServer}
              className={classes.editServerFormUpdateButton}
            >
              Update
            </Button>
          </Grid>
        </DialogActions>
      </Dialog>
    </>
  );
};

const DeleteServerDialog = ({ serverId, address }) => {
  const classes = useStyles();
  const { deleteServer } = useContext(ServerContext);
  const [open, setOpen] = useState(false);
  const [checked, setChecked] = useState(false);
  const handleOpen = () => {
    setChecked(false);
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleDeleteServer = () => {
    deleteServer(serverId);
    setOpen(false);
  };
  return (
    <>
      <Button className={classes.deleteButton} onClick={handleOpen}>
        <DeleteRoundedIcon />
        <div>Delete</div>
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle className={classes.deleteServerDialogTitle}>
          Delete Server
        </DialogTitle>
        <DialogContent>
          <div className={classes.deleteServerDialogContent}>
            Are you sure to delete {address}
          </div>
          <Grid container justify="center">
            <Grid item>
              <Checkbox onClick={(e) => setChecked(e.target.checked)} />
            </Grid>
            <Grid item>
              <div className={classes.deleteServerCheckBoxContent}>
                It's correct.
              </div>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Grid container justify="space-around">
            <Button
              className={classes.deleteServerCancelButton}
              onClick={handleClose}
            >
              Cancel
            </Button>
            <Button
              className={classes.deleteServerDeleteButton}
              onClick={handleDeleteServer}
              disabled={!checked}
            >
              Delete
            </Button>
          </Grid>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default AdminPage;
