import { useContext } from "react";
import { useHistory, Link } from "react-router-dom";
import { makeStyles, Paper, Grid, Button } from "@material-ui/core";
import AccountCircle from "@material-ui/icons/AccountCircle";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { AuthenticationContext } from "../contexts/AuthenticationContext";

const useStyles = makeStyles({
  headerPaper: {
    minHeight: 70,
    backgroundColor: "#00bfff",
    marginBottom: 30,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bolder",
    textDecoration: "none",
    color: "#",
    marginTop: 18,
    textAlign: "center",
  },
  iconButton: {
    marginTop: 17,
    textTransform: "none",
  },
  icon: {
    marginRight: 5,
  },
  exitIcon: {
    marginTop: 16,
  },
});

function Header() {
  const classes = useStyles();
  const { isAuth, setIsAuth, signOut, user } = useContext(
    AuthenticationContext
  );
  const history = useHistory();
  const handleSignOut = () => {
    signOut();
    history.push("/");
  };
  return (
    <>
      <Paper className={classes.headerPaper}>
        <Grid container justify="center">
          <Grid item xs={3}>
            {isAuth ? <button onClick={handleSignOut}>sign out</button> : null}
          </Grid>

          <Grid item xs={6}>
            <Grid container justify="center">
              <Link to="/" className={classes.headerTitle}>
                Server Resource Manager
              </Link>
            </Grid>
          </Grid>
          <Grid item xs={3}>
            <Grid container justify="center">
              {user === null ? null : (
                <>
                  <Button
                    className={classes.iconButton}
                    variant="contained"
                    color="primary"
                  >
                    <AccountCircle className={classes.icon} />
                    <div>{user.username} </div>
                  </Button>

                  <Button
                    className={classes.exitIcon}
                    onClick={handleSignOut}
                    color="inherit"
                  >
                    <ExitToAppIcon />
                  </Button>
                </>
              )}
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </>
  );
}

export default Header;
