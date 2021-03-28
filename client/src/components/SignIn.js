import { useEffect, useContext, useRef } from "react";
import { useHistory, Link } from "react-router-dom";
import { Grid, Paper, Button, TextField, makeStyles } from "@material-ui/core";
import LockIcon from "@material-ui/icons/Lock";
import { AuthenticationContext } from "../contexts/AuthenticationContext";
import { UserContext } from "../contexts/UserContext";

const useStyles = makeStyles({});

function SignIn() {
  const history = useHistory();
  const classes = useStyles();
  const { isAuth, setIsAuth, signIn } = useContext(AuthenticationContext);
  const { user, setUser } = useContext(UserContext);
  const usernameElement = useRef(null);
  const passwordElement = useRef(null);

  const handleSignIn = () => {
    signIn(usernameElement.current.value, passwordElement.current.value);
  };

  return (
    <>
      <div>sign in</div>
      <Grid container justify="center">
        <Paper className={classes.signInPaper}>
          <Grid item xs={10}>
            <Grid container direction="column">
              <Grid item>
                <LockIcon color="secondary" className={classes.lockIcon} />
              </Grid>
              <Grid item>
                <div className={classes.title}>Sign In</div>
              </Grid>
              <Grid container justify="flex-start">
                <Grid item>Username</Grid>
              </Grid>
              <Grid item>
                <TextField
                  className={classes.inputBox}
                  variant="outlined"
                  fullWidth
                  inputRef={usernameElement}
                />
              </Grid>
              <Grid container justify="flex-start">
                <Grid item>Password</Grid>
              </Grid>
              <Grid item>
                <TextField
                  className={classes.inputBox}
                  variant="outlined"
                  fullWidth
                  inputRef={passwordElement}
                  type="password"
                />
              </Grid>
              <Grid item>
                <Button
                  className={classes.signInButton}
                  fullWidth
                  variant="contained"
                  onClick={handleSignIn}
                >
                  Sign in
                </Button>
              </Grid>
              <Grid container justify="flex-end">
                <Grid item>
                  <Link to="/admin">go to admin page</Link>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </>
  );
}

export default SignIn;
