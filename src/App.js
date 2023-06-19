import "./App.css";
import { Route, Routes } from "react-router-dom";
import Signin from "./views/Signin/Signin";
import Users from "./components/Users/Users";
import Dash from "./Dash";
import Role from "./components/Role/Role";
import Items from "./components/Items/Items";
import Dashboard from "./views/Dashboard/Dashboard";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Signin />} />
        <Route path="/dashboard" element={<Dash />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboard/users" element={<Users />} />
          <Route path="/dashboard/roles" element={<Role />} />
          <Route path="/dashboard/items" element={<Items />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
