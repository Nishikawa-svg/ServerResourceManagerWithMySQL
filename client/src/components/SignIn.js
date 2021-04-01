import { useEffect, useContext, useRef } from "react";
import { useHistory, Link } from "react-router-dom";
import { Grid, Paper, Button, TextField, makeStyles } from "@material-ui/core";
import LockIcon from "@material-ui/icons/Lock";
import { AuthenticationContext } from "../contexts/AuthenticationContext";
import { UserContext } from "../contexts/UserContext";

const useStyles = makeStyles({
  signInFormPaper: {
    width: 360,
    textAlign: "center",
    // backgroundColor: "bluviolet",
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
  adminLink: {
    textDecoration: "none",
    color: "blue",
    "&:hover": {
      textDecoration: "underline",
    },
  },
});

function SignIn() {
  const history = useHistory();
  const classes = useStyles();
  const { isAuth, setIsAuth, signIn } = useContext(AuthenticationContext);
  const usernameElement = useRef(null);
  const passwordElement = useRef(null);

  const handleSignIn = () => {
    signIn(usernameElement.current.value, passwordElement.current.value);
  };

  return (
    <>
      <Grid container justify="center">
        <Paper className={classes.signInFormPaper}>
          <Grid container justify="center">
            <Grid item xs={10}>
              <Grid container direction="column">
                <Grid item>
                  <LockIcon
                    color="secondary"
                    className={classes.signInFormLockIcon}
                  />
                </Grid>
                <Grid item>
                  <div className={classes.signInFormTitle}>Sign In</div>
                </Grid>
                <Grid container justify="flex-start">
                  <Grid item>Username</Grid>
                </Grid>
                <Grid item>
                  <TextField
                    className={classes.signInFormInputBox}
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
                    className={classes.signInFormInputBox}
                    variant="outlined"
                    fullWidth
                    inputRef={passwordElement}
                    type="password"
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
                <Grid container justify="flex-end">
                  <Grid item>
                    <Link to="/admin" className={classes.adminLink}>
                      Go to admin page
                    </Link>
                  </Grid>
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
