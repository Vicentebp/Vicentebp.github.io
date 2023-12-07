import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter } from "react-router-dom";
import AuthProvider from "./contexts/AuthContext";
import { ToastContainer } from "react-toastify";

import RoutesApp from "./routes";
import { FolderProvider } from "./contexts/FolderContext";

function App() {
  return (
    <BrowserRouter className="App">
      <AuthProvider>
        <FolderProvider>
          <ToastContainer autoClose={3000} />
          <RoutesApp />
        </FolderProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
