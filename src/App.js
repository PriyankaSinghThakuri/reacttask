import "./App.css";
import { Route, Routes } from "react-router-dom";
import Signin from "./views/Signin/Signin";
import Dashboard from "./views/Dashboard/Dashboard";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Signin />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </div>
  );
}

export default App;
