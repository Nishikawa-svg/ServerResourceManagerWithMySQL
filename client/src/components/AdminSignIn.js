import { useRef, useContext } from "react";
import { Grid, Paper, TextField, makeStyles, Button } from "@material-ui/core";
import SupervisedUserCircleIcon from "@material-ui/icons/SupervisedUserCircle";
import { AuthenticationContext } from "../contexts/AuthenticationContext";

const useStyles = makeStyles({
  signInPaper: {
    width: 360,
    textAlign: "center",
    border: "solid 1px",
    marginBottom: 30,
  },
  signInFormTitle: {
    fontSize: 24,
    margin: "8px 8px",
  },
  signInFormLockIcon: {
    width: 40,
    height: 40,
    marginTop: 20,
  },
  signInFormInputBox: {
    height: 40,
    marginBottom: 50,
  },
  signInFormButton: {
    height: 50,
    marginBottom: 10,
    backgroundColor: "#1870db",
    color: "white",
    textTransform: "none",
    "&:hover": {
      backgroundColor: "blue",
    },
  },
});

function AdminSignIn() {
  const classes = useStyles();
  const passwordRef = useRef();
  const { adminSignIn } = useContext(AuthenticationContext);
  const handleSignIn = () => {
    adminSignIn(passwordRef.current.value);
  };
  return (
    <>
      <Grid container justify="center">
        <Paper className={classes.signInPaper}>
          <Grid container justify="center">
            <Grid item xs={10}>
              <Grid container direction="column">
                <Grid item>
                  <SupervisedUserCircleIcon
                    color="secondary"
                    className={classes.signInFormLockIcon}
                  />
                </Grid>
                <Grid item>
                  <div className={classes.signInFormTitle}>Admin</div>
                </Grid>
                <Grid container justify="flex-start">
                  <Grid item>Password</Grid>
                </Grid>
                <Grid item>
                  <TextField
                    className={classes.signInFormInputBox}
                    variant="outlined"
                    type="password"
                    fullWidth
                    inputRef={passwordRef}
                  />
                </Grid>
                <Grid item>
                  <Button
                    className={classes.signInFormButton}
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
