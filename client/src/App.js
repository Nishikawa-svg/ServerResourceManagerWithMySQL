import { useContext } from "react";
import {
  AuthenticationContext,
  AuthenticationProvider,
} from "./contexts/AuthenticationContext";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  Switch,
} from "react-router-dom";
import Providers from "./contexts/Context";
import SignIn from "./components/SignIn";
import Header from "./components/Header";
import Home from "./components/Home";
import Resource from "./components/Resource";
import AdminPage from "./components/AdminPage";
import AdminSignIn from "./components/AdminSignIn";
import AdminHeader from "./components/AdminHeader";

function App() {
  return (
    <>
      <Providers>
        <Router>
          <AdminRoute />
          <PrivateRoute />
        </Router>
      </Providers>
    </>
  );
}

const PrivateRoute = () => {
  const { isAuth } = useContext(AuthenticationContext);
  return (
    <>
      {isAuth ? (
        <>
          <Route component={Home} path="/" exact />

          <Route component={Resource} path="/resource" exact />
        </>
      ) : (
        <Route component={SignIn} path="/" exact />
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
          <AdminHeader />
          <Route path="/admin" component={AdminPage} />
        </>
      ) : (
        <>
          <Header />
          <Route path="/admin" component={AdminSignIn} />
        </>
      )}
    </>
  );
};
export default App;
