import Router from "~/router";
import { Header } from "./components/Header";
import { RegistrationProvider } from "~/contexts/RegistrationContext";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <RegistrationProvider>
      <Header>
        <h1>Caju Front Teste</h1>
      </Header>
      <Router />
      <ToastContainer />
    </RegistrationProvider>
  );
}

export default App;
