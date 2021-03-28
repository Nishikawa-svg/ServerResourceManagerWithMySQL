import { UserProvider } from "./UserContext";
import { ServerProvider } from "./ServerContext";
import { AuthenticationProvider } from "./AuthenticationContext";

const Providers = (props) => {
  return (
    <AuthenticationProvider>
      <UserProvider>
        <ServerProvider>{props.children}</ServerProvider>
      </UserProvider>
    </AuthenticationProvider>
  );
};

export default Providers;
