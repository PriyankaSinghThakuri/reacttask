import "./App.css";
import { Route, Routes } from "react-router-dom";
import Signin from "./views/Signin/Signin";
import Users from "./views/Users/Users";
import Dash from "./Dash";
import Role from "./views/Role/Role";
import Items from "./views/Items/Items";
import Dashboard from "./views/Dashboard/Dashboard";
import { Sales } from "./views/Sales/Sales";
import routes from "./routes";
import Home from "./views/Home/Home";

function App() {
  // Get the user's role from local storage or authentication context
  const userRole = localStorage.getItem("role");
  return (
    <div className="App">
      <Routes>
        {/* //public routes */}
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<Signin />} />
        {/* //protected routes */}
        <Route path="/dashboard" element={<Dash />}>
          {/* <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboard/users" element={<Users />} />
          <Route path="/dashboard/roles" element={<Role />} />
          <Route path="/dashboard/items" element={<Items />} />
          <Route path="/dashboard/sales" element={<Sales />} /> */}
          {routes.map(
            (route, index) =>
              // Render routes conditionally based on the user's role
              route.role.includes(userRole) && (
                <Route
                  key={index}
                  path={route.path}
                  element={<route.component />}
                />
              )
          )}
        </Route>

        {/* Redirect to a default route if the user doesn't have access */}
        <Route path="*" element={<Signin />} />
      </Routes>
    </div>
  );
}

export default App;
