import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import "./App.css";
import "./styles/toast.css";
import AppRouters from "./Router/AppRouters";

function App() {
  return (
    <div>
      <BrowserRouter>
        <AppRouters />
      </BrowserRouter>
      <ToastContainer />
    </div>
  );
}

export default App;
