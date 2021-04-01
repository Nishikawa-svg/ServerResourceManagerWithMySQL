import { UserProvider } from "./UserContext";
import { ServerProvider } from "./ServerContext";
import { AuthenticationProvider } from "./AuthenticationContext";

const Providers = (props) => {
  return (
    <AuthenticationProvider>
      <ServerProvider>
        <UserProvider>{props.children}</UserProvider>
      </ServerProvider>
    </AuthenticationProvider>
  );
};

export default Providers;
