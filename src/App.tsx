import Router from "~/router";
import { Header } from "./components/Header";
import { RegistrationProvider } from "~/contexts/RegistrationContext";

function App() {
  return (
    <RegistrationProvider>
      <Header>
        <h1>Caju Front Teste</h1>
      </Header>
      <Router />
    </RegistrationProvider>
  );
}

export default App;
