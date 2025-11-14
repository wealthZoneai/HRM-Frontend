import { BrowserRouter } from "react-router-dom";
import "./App.css";
import AppRouters from "./Router/AppRouters";

function App() {
  return (
    <div>
      <BrowserRouter>
      <AppRouters />
    </BrowserRouter>
    </div>
  );
}

export default App;
