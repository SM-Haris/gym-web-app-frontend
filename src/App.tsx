import { useRoutes } from "react-router-dom";
import routes from "./routes";
import LayoutView from "./layout";
import { AuthContextProvider } from "./context/AuthContext";

function App(): JSX.Element {
  const routing = useRoutes(routes);

  return (
    <AuthContextProvider>
      <LayoutView>{routing}</LayoutView>
    </AuthContextProvider>
  );
}

export default App;
