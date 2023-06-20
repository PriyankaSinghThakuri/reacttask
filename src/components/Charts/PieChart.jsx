import React, { useEffect } from "react";
import Chart from "chart.js";
import "./Chart.css";
import { itemsdata } from "../../models/ItemsData";

export const PieChart = () => {
  // Filter items with todaySale greater than 0
  const todayItemsSold = itemsdata.filter((item) => item.todaySale > 0);
  const backgroundColors = ["#4e73df", "#1cc88a", "#36b9cc"]; // Example colors, modify as desired
  useEffect(() => {
    // Prepare data for the chart
    const labels = todayItemsSold.map((item) => item.name);
    const data = todayItemsSold.map((item) => item.todaySale);

    const hoverBackgroundColors = ["#2e59d9", "#17a673", "#2c9faf"]; // Example hover colors, modify as desired

    // Initialize Chart.js
    const ctx = document.getElementById("myPieChart").getContext("2d");
    new Chart(ctx, {
      type: "pie",
      data: {
        labels: labels,
        datasets: [
          {
            data: data,
            backgroundColor: backgroundColors,
            hoverBackgroundColor: hoverBackgroundColors,
            borderWidth: 0,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
      },
    });
  }, []);

  return (
    <div className="container">
      {/* Pie Chart */}
      <div className="col-xl-10 col-lg-5">
        <div className="card shadow mb-4">
          {/* Card Header - Dropdown */}
          <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
            <h6 className="m-0 font-weight-bold text-primary">
              Items Sold Today
            </h6>
          </div>
          {/* Card Body */}
          <div className="card-body">
            <div className="chart-pie pt-4 pb-2">
              <canvas id="myPieChart"></canvas>
            </div>
            <div className="mt-4 text-center small">
              {/* Render item names dynamically */}
              {todayItemsSold.map((item, index) => (
                <span key={index} className="mr-2">
                  <i
                    className={`fas fa-circle text-primary`}
                    style={{ color: backgroundColors[index] }}
                  ></i>{" "}
                  {item.name}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
