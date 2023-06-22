import "./App.css";
import { Route, Routes } from "react-router-dom";
import Signin from "./views/Signin/Signin";
import Dash from "./Dash";
import routes from "./routes";
import Home from "./views/Home/Home";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  // Get the user's role from local storage or authentication context
  const userRole = localStorage.getItem("role");
  return (
    <div className="App">
      <ToastContainer />
      <Routes>
        {/* //public routes */}
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<Signin />} />
        {/* //protected routes */}
        <Route path="/dashboard" element={<Dash />}>
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
