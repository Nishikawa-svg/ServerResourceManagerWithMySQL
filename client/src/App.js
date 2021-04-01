import { useContext } from "react";
import { AuthenticationContext } from "./contexts/AuthenticationContext";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { makeStyles } from "@material-ui/core";
import Providers from "./contexts/Context";
import SignIn from "./components/SignIn";
import Header from "./components/Header";
import Home from "./components/Home";
import Resource from "./components/Resource";
import AdminPage from "./components/AdminPage";
import AdminSignIn from "./components/AdminSignIn";
import AdminHeader from "./components/AdminHeader";

const useStyles = makeStyles({
  mainPage: {
    padding: "10px 10px 10px 10px",
  },
});

function App() {
  const classes = useStyles();
  return (
    <>
      <Providers>
        <Router>
          <Headers />
          <div className={classes.mainPage}>
            <AdminRoute />
            <PrivateRoute />
          </div>
        </Router>
      </Providers>
    </>
  );
}

const Headers = () => {
  const { isAdmin } = useContext(AuthenticationContext);
  return <>{isAdmin ? <AdminHeader /> : <Header />}</>;
};

const PrivateRoute = () => {
  const { isAuth } = useContext(AuthenticationContext);
  return (
    <>
      {isAuth ? (
        <>
          <Route path="/" component={Home} exact />

          <Route path="/resource" component={Resource} exact />
        </>
      ) : (
        <Route path="/" component={SignIn} exact />
      )}
    </>
  );
};

const AdminRoute = () => {
  const { isAdmin } = useContext(AuthenticationContext);
  return (
    <>
      {isAdmin ? (
        <>
          <Route path="/admin" component={AdminPage} />
        </>
      ) : (
        <>
          <Route path="/admin" component={AdminSignIn} />
        </>
      )}
    </>
  );
};
export default App;
