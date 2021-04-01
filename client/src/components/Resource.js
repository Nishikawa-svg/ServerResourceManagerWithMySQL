import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";
import { ServerContext } from "../contexts/ServerContext";
import { AuthenticationContext } from "../contexts/AuthenticationContext";
import {
  Grid,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Checkbox,
  makeStyles,
  Paper,
} from "@material-ui/core";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import BlockIcon from "@material-ui/icons/Block";
import RadioButtonUncheckedIcon from "@material-ui/icons/RadioButtonUnchecked";
import DoneIcon from "@material-ui/icons/Done";
import io from "socket.io-client";
let socket;

const useStyles = makeStyles({
  backToHomeLink: {
    textDecoration: "none",
    color: "blue",
  },
  pageTitle: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  serverTablePaper: {
    border: "solid 1px gray",
  },
  serverTableTitle: {
    textAlign: "center",
    fontSize: 30,
    fontWeight: "bolder",
    marginTop: 40,
  },
  serverTableHeadRow: {
    backgroundColor: "#333333",
  },
  serverTableHeadCell: {
    color: "white",
    fontSize: 16,
  },
  serverTableBodyRowUse: {
    backgroundColor: "white",
  },
  serverTableBodyRowComplete: {
    backgroundColor: "yellow",
  },
  serverTableBodyRowUsed: {
    backgroundColor: "gray",
  },
  serverUseButton: {
    textTransform: "none",
  },
  serverUseButtonIcon: {
    marginLeft: 5,
    marginRight: -5,
  },
  serverCompleteButton: {
    textTransform: "none",
  },
  serverCompleteButtonIcon: {
    marginLeft: 5,
    marginRight: -5,
  },
  serverUsedButton: {
    textTransform: "none",
  },
  serverUsedButtonIcon: {
    marginLeft: 5,
    marginRight: -5,
  },

  reservationDialogTitle: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
  },
  reservationDialogContent: {
    textAlign: "center",
  },
  reservationDialogCancelButton: {
    textTransform: "none",
    color: "red",
  },
  reservationDialogReserveButton: {
    textTransform: "none",
    color: "blue",
  },

  completeDialogTitle: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
  },
  completeDialogCancelButton: {
    textTransform: "none",
    color: "red",
  },
  completeDialogCompleteButton: {
    textTransform: "none",
    color: "blue",
  },

  usedDialogOKButton: {
    textTransform: "none",
    color: "blue",
  },
});

function Resource() {
  const classes = useStyles();
  useEffect(() => {
    socket = io("http://localhost:4000");
    socket.on("new_servers", (newServers) => {
      console.log(newServers);
      getServers();
      getUsers();
    });
    return () => {
      socket.disconnect();
    };
  }, []);
  const { users, getUsers } = useContext(UserContext);
  const { servers, getServers } = useContext(ServerContext);
  const { user } = useContext(AuthenticationContext);

  const registCore = (registInfo) => {
    socket.emit("regist_core", { registInfo });
  };

  const completeCore = (completeInfo) => {
    socket.emit("complete_core", { completeInfo });
  };

  const getUserName = (uid) => {
    const index = users.findIndex((user) => user.uid === uid);
    if (index !== -1 && users) return users[index].username;
  };

  const getLocalDateTime = (datetime) => {
    const localDatetime = new Date(datetime).toLocaleString();
    return localDatetime;
  };

  return (
    <>
      <Link to="/" className={classes.backToHomeLink}>
        <Grid container>
          <Grid item>
            <ArrowBackIcon className={classes.backToHomeLinkIcon} />
          </Grid>
          <Grid item>back to home</Grid>
        </Grid>
      </Link>
      <div className={classes.pageTitle}>Resource List</div>
      {servers &&
        servers.map((server) => (
          <div key={server.server_id}>
            <div className={classes.serverTableTitle}>
              {server.server_address}
            </div>
            <Grid container justify="center">
              <Grid item xs={10}>
                <Paper className={classes.serverTablePaper}>
                  <Grid container justify="center">
                    <Grid item xs={12}>
                      <TableContainer>
                        <Table className={classes.serverTableRoot}>
                          <TableHead>
                            <TableRow className={classes.serverTableHeadRow}>
                              <TableCell
                                className={classes.serverTableHeadCell}
                                align="center"
                              >
                                core
                              </TableCell>
                              <TableCell
                                className={classes.serverTableHeadCell}
                                align="center"
                              >
                                user
                              </TableCell>
                              <TableCell
                                className={classes.serverTableHeadCell}
                                align="center"
                              >
                                start time
                              </TableCell>
                              <TableCell
                                className={classes.serverTableHeadCell}
                                align="center"
                              >
                                end time
                              </TableCell>
                              <TableCell
                                className={classes.serverTableHeadCell}
                                align="center"
                              >
                                status
                              </TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {user &&
                              server.use_status.map((core, index) => (
                                <TableRow
                                  key={index}
                                  className={
                                    core.uid === null
                                      ? classes.serverTableBodyRowUse
                                      : core.uid === user.uid
                                      ? classes.serverTableBodyRowComplete
                                      : classes.serverTableBodyRowUsed
                                  }
                                >
                                  <TableCell
                                    className={classes.serverTableBodyCell}
                                    align="center"
                                  >
                                    core{index + 1}
                                  </TableCell>
                                  <TableCell
                                    className={classes.serverTableBodyCell}
                                    align="center"
                                  >
                                    {core.uid === null
                                      ? ""
                                      : getUserName(core.uid)}
                                  </TableCell>
                                  <TableCell
                                    className={classes.serverTableBodyCell}
                                    align="center"
                                  >
                                    {core.start === null
                                      ? ""
                                      : getLocalDateTime(core.start)}
                                  </TableCell>
                                  <TableCell
                                    className={classes.serverTableBodyCell}
                                    align="center"
                                  >
                                    {core.end === null
                                      ? ""
                                      : getLocalDateTime(core.end)}
                                    {core.end === null && core.uid !== null
                                      ? "undecided"
                                      : null}
                                  </TableCell>
                                  <TableCell
                                    className={classes.serverTableBodyCell}
                                    align="center"
                                  >
                                    {core.uid === null ? (
                                      <ReserveCoreDialog
                                        uid={user.uid}
                                        serverId={server.server_id}
                                        coreIndex={index}
                                        registCore={registCore}
                                      />
                                    ) : null}
                                    {core.uid === user.uid ? (
                                      <CompleteCoreDialog
                                        uid={user.uid}
                                        serverId={server.server_id}
                                        coreIndex={index}
                                        completeCore={completeCore}
                                      />
                                    ) : null}
                                    {core.uid !== null &&
                                    core.uid !== user.uid ? (
                                      <UsedCoreDialog />
                                    ) : null}
                                  </TableCell>
                                </TableRow>
                              ))}
                          </TableBody>
                        </Table>
                      </TableContainer>
                    </Grid>
                  </Grid>
                </Paper>
              </Grid>
            </Grid>
          </div>
        ))}
      <br />
      <br />
      <br />
    </>
  );
}

const ReserveCoreDialog = ({ uid, serverId, coreIndex, registCore }) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [checked, setChecked] = useState(false);
  const [endTime, setEndTime] = useState(null);
  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setChecked(false);
    setEndTime();
    setOpen(true);
  };
  const handleReserve = () => {
    let registInfo = {
      uid: uid,
      server_id: serverId,
      core_index: coreIndex,
      isUndecided: false,
      end: null,
    };
    if (checked) {
      registInfo.isUndecided = true;
      registCore(registInfo);
      setOpen(false);
    } else {
      registInfo.end = endTime;
      if (endTime) {
        registCore(registInfo);
        setOpen(false);
      } else {
        alert("please select end time or undecided");
      }
    }
  };
  return (
    <>
      <Button
        onClick={handleOpen}
        variant="contained"
        color="secondary"
        className={classes.serverUseButton}
      >
        available
        <RadioButtonUncheckedIcon className={classes.serverUseButtonIcon} />
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
          <div className={classes.reservationDialogTitle}>
            Server Reservation
          </div>
        </DialogTitle>
        <DialogContent className={classes.reservationDialogContent}>
          <div>Please select end time</div>
          <br />
          {checked ? null : (
            <>
              <TextField
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                type="datetime-local"
                label="end time"
                InputLabelProps={{ shrink: true }}
                variant="outlined"
              />
              <br />
              <br />
              or <br />
              <br />
            </>
          )}
          <label>
            <Checkbox
              checked={checked}
              onChange={(e) => setChecked(e.target.checked)}
            />
            Undecided
          </label>
        </DialogContent>
        <DialogActions>
          <Grid container justify="space-around">
            <Button
              onClick={handleClose}
              className={classes.reservationDialogCancelButton}
            >
              Cancel
            </Button>
            <Button
              onClick={handleReserve}
              className={classes.reservationDialogReserveButton}
              disabled={!(endTime || checked)}
            >
              Reserve
            </Button>
          </Grid>
        </DialogActions>
      </Dialog>
    </>
  );
};

const CompleteCoreDialog = ({ uid, serverId, coreIndex, completeCore }) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };
  const handleComplete = () => {
    let completeInfo = {
      uid: uid,
      server_id: serverId,
      core_index: coreIndex,
    };
    completeCore(completeInfo);
    setOpen(false);
  };
  return (
    <>
      <Button
        onClick={handleOpen}
        className={classes.serverCompleteButton}
        variant="contained"
        color="primary"
      >
        complete
        <DoneIcon className={classes.serverCompleteButtonIcon} />
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
          <div className={classes.completeDialogTitle}>Complete</div>
        </DialogTitle>
        <DialogContent>Are you sure to complete using cores?</DialogContent>
        <DialogActions>
          <Grid container justify="space-around">
            <Button
              onClick={handleClose}
              className={classes.completeDialogCancelButton}
            >
              Cancel
            </Button>
            <Button
              onClick={handleComplete}
              className={classes.completeDialogCompleteButton}
            >
              Complete
            </Button>
          </Grid>
        </DialogActions>
      </Dialog>
    </>
  );
};

const UsedCoreDialog = () => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };
  return (
    <>
      <Button onClick={handleOpen} className={classes.serverUsedButton}>
        used
        <BlockIcon className={classes.serverUsedButtonIcon} />
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>This core is used</DialogTitle>
        <DialogContent></DialogContent>
        <DialogActions>
          <Grid container justify="center">
            <Button
              onClick={handleClose}
              className={classes.usedDialogOKButton}
            >
              OK
            </Button>
          </Grid>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Resource;
