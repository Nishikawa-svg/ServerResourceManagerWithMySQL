import { useContext } from "react";
import { AuthenticationContext } from "../contexts/AuthenticationContext";
import { makeStyles, Paper, Grid } from "@material-ui/core";

const useStyles = makeStyles({
  headerPaper: {
    minHeight: 70,
    backgroundColor: "#00bfff",
    marginBottom: 30,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bolder",
    marginTop: 18,
    textAlign: "center",
  },
  signOutButton: {
    textTransform: "none",
    marginTop: 24,
    cursor: "pointer",
    color: "blue",
    "&:hover": {
      textDecoration: "underline",
    },
  },
});

function AdminHeader() {
  const classes = useStyles();
  const { adminSignOut } = useContext(AuthenticationContext);
  return (
    <>
      <Paper className={classes.headerPaper}>
        <Grid container justify="center">
          <Grid item xs={3}>
            <Grid container justify="center">
              <div onClick={adminSignOut} className={classes.signOutButton}>
                sign out
              </div>
            </Grid>
          </Grid>
          <Grid item xs={6}>
            <Grid container justify="center">
              <div className={classes.headerTitle}>Admin Page</div>
            </Grid>
          </Grid>
          <Grid item xs={3}></Grid>
        </Grid>
      </Paper>
    </>
  );
}

export default AdminHeader;
