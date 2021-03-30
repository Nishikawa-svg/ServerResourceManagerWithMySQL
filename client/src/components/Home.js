import { Link } from "react-router-dom";
import { makeStyles, Button, Grid } from "@material-ui/core";

const useStyles = makeStyles({
  link: {
    textDecoration: "none",
    textAlign: "center",
  },
  linkButton: {
    textTransform: "none",
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
    </>
  );
}
export default Home;
