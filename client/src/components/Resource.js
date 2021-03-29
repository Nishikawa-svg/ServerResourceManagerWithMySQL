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
  DialogContentText,
  DialogTitle,
  TextField,
  Checkbox,
} from "@material-ui/core";

function Resource() {
  const { users } = useContext(UserContext);
  const { servers } = useContext(ServerContext);
  const { user } = useContext(AuthenticationContext);
  console.log(user);
  return (
    <>
      <Link to="/">go to home</Link>
      <div>Resource</div>
      {servers &&
        servers.map((server) => (
          <div key={server.server_id}>
            <div>{server.server_address}</div>
            <Grid container justify="center">
              <Grid item xs={10}>
                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>core number</TableCell>
                        <TableCell>user</TableCell>
                        <TableCell>start time</TableCell>
                        <TableCell>end time</TableCell>
                        <TableCell></TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {user &&
                        server.use_status.map((core, index) => (
                          <TableRow key={index}>
                            <TableCell>core{index + 1}</TableCell>
                            <TableCell>
                              {core.uid === null ? "no user" : core.uid}
                            </TableCell>
                            <TableCell>
                              {core.start === null ? "" : core.start}
                            </TableCell>
                            <TableCell>
                              {core.end === null ? "" : core.end}
                            </TableCell>
                            <TableCell>
                              {core.uid === null ? (
                                <RegisterCoreDialog
                                  uid={user.uid}
                                  serverId={server.server_id}
                                  coreIndex={index}
                                />
                              ) : null}
                              {core.uid === user.uid ? (
                                <ClearCoreDialog />
                              ) : null}
                              {core.uid !== null && core.uid !== core.uid ? (
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
          </div>
        ))}
    </>
  );
}

const RegisterCoreDialog = ({ uid, serverId, coreIndex }) => {
  const { registCore } = useContext(ServerContext);
  const [open, setOpen] = useState(false);
  const [checked, setChecked] = useState(false);
  const [endTime, setEndTime] = useState();
  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setChecked(false);
    setEndTime();
    setOpen(true);
  };
  const handleRegist = () => {
    setOpen(false);
    alert(endTime);
    let registInfo = {
      uid: uid,
      server_id: serverId,
      core_index: coreIndex,
      isUndecided: false,
      end: null,
    };
    if (checked) {
      registInfo.isUndecided = true;
    } else {
      registInfo.end = endTime;
    }
    registCore(registInfo);
  };
  return (
    <>
      <Button onClick={handleOpen}>Use</Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>core registration</DialogTitle>
        <DialogContent>
          {checked ? (
            <div>undecided</div>
          ) : (
            <TextField
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              type="datetime-local"
              label="end time"
              InputLabelProps={{ shrink: true }}
            />
          )}
          <br />
          or
          <br />
          <label>
            undecided
            <Checkbox
              checked={checked}
              onChange={(e) => setChecked(e.target.checked)}
            />
          </label>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>cancel</Button>
          <Button onClick={handleRegist}>regist</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

const ClearCoreDialog = () => {
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };
  return (
    <>
      <Button onClick={handleOpen}>Use</Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>fulfilled</DialogTitle>
        <DialogContent></DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>cancel</Button>
          <Button onClick={handleClose}>fulfilled</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

const UsedCoreDialog = () => {
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };
  return (
    <>
      <Button onClick={handleOpen}>Use</Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>used core</DialogTitle>
        <DialogContent></DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>OK</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Resource;
