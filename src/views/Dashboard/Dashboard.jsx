import React from "react";
import { useNavigate } from "react-router-dom";
import { Cards } from "../../components/Cards/Cards";
import { PieChart } from "../../components/Charts/PieChart";
import { LineChart } from "../../components/Charts/LineChart";

const Dashboard = () => {
  const navigate = useNavigate();

  const handleSignout = () => {
    localStorage.removeItem("role");
    navigate("/e-commerce-application");
  };

  return (
    <div className="dashboard-container">
      <h1>Dashboard</h1>
      <Cards />
      <div style={{ display: "flex" }}>
        <div style={{ width: "100%", marginLeft: "10rem" }}>
          <LineChart />
        </div>
        <div style={{ width: "100%" }}>
          <PieChart />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
