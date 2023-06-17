import React from "react";
import "bootstrap/dist/js/bootstrap.min.js";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Dashboard.css";
import Sidebar from "../../components/Sidebar/Sidebar";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  const handleSignout = () => {
    localStorage.removeItem("role");
    navigate("/e-commerce-application");
  };
  return (
    <div className="dashboard-container">
      <div className="top-container">
        <h1 className="dashboard-title">Welcome</h1>
        <button onClick={handleSignout} className="signout-btn">
          Sign Out
        </button>
      </div>

      <Sidebar />
    </div>
  );
};

export default Dashboard;
