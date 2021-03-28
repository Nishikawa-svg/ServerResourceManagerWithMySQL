import { useContext } from "react";
import { AuthenticationContext } from "../contexts/AuthenticationContext";
function AdminHeader() {
  const { adminSignOut } = useContext(AuthenticationContext);
  return (
    <>
      <div>admin page</div>
      <button onClick={adminSignOut}>sign out</button>
      <hr />
    </>
  );
}

export default AdminHeader;
