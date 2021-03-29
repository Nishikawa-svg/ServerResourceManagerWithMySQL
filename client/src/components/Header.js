import { useContext } from "react";
import { useHistory, Link } from "react-router-dom";
import { AuthenticationContext } from "../contexts/AuthenticationContext";

function Header() {
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
      {isAuth ? <button onClick={handleSignOut}>sign out</button> : null}

      <Link to="/">Header</Link>
      {user === null ? <div>no user</div> : <div>user : {user.username} </div>}

      <hr />
    </>
  );
}

export default Header;
