import { useRef, useContext } from "react";
import { Grid, Paper, TextField, makeStyles, Button } from "@material-ui/core";
import LockIcon from "@material-ui/icons/Lock";
import { AuthenticationContext } from "../contexts/AuthenticationContext";

const useStyles = makeStyles({});

function AdminSignIn() {
  const classes = useStyles();
  const passwordRef = useRef();
  const { adminSignIn } = useContext(AuthenticationContext);
  const handleSignIn = () => {
    adminSignIn(passwordRef.current.value);
  };
  return (
    <>
      <div>Admin Sign In</div>
      <Grid container justify="center">
        <Paper className={classes.signInPaper}>
          <Grid container justify="center">
            <Grid item xs={10}>
              <Grid container direction="column">
                <Grid item>
                  <LockIcon color="secondary" className={classes.lockIcon} />
                </Grid>
                <Grid item>
                  <div className={classes.title}>Sign in</div>
                </Grid>
                <Grid container justify="flex-start">
                  <Grid item>Password</Grid>
                </Grid>
                <Grid item>
                  <TextField
                    className={classes.inputBox}
                    variant="outlined"
                    fullWidth
                    inputRef={passwordRef}
                  />
                </Grid>
                <Grid item>
                  <Button
                    className={classes.button}
                    fullWidth
                    variant="contained"
                    onClick={handleSignIn}
                  >
                    Sign in
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </>
  );
}

export default AdminSignIn;
