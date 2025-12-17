import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import "./App.css";
import "./styles/toast.css";
import AppRouters from "./Router/AppRouters";
import ScrollToTop from "./components/ScrollToTop";

function App() {
  return (
    <div>
      <BrowserRouter>
        <ScrollToTop />
        <AppRouters />
      </BrowserRouter>
      <ToastContainer />
    </div>
  );
}

export default App;
