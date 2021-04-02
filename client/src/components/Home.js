import { Link } from "react-router-dom";
import { makeStyles, Button, Grid } from "@material-ui/core";

const useStyles = makeStyles({
  link: {
    textDecoration: "none",
    textAlign: "center",
  },
  linkButton: {
    textTransform: "none",
    marginBottom: 40,
  },
  messageTitle: {
    marginTop: 40,
    textAlign: "center",
    fontSize: 24,
  },
  messageContent: {
    textAlign: "center",
  },
});

function Home() {
  const classes = useStyles();

  return (
    <>
      <Grid container justify="center">
        <Link to="/resource" className={classes.link}>
          <Button
            variant="contained"
            color="secondary"
            className={classes.linkButton}
          >
            Go to resource page
          </Button>
        </Link>
      </Grid>
      <hr />
      <div className={classes.messageTitle}>messages from admin</div>
      <div className={classes.messageContent}>
        <div>no messages</div>
      </div>
    </>
  );
}
export default Home;
