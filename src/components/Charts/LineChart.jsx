import React, { useEffect } from "react";
import Chart from "chart.js";
import { itemsdata } from "../../models/ItemsData";

export const LineChart = () => {
  useEffect(() => {
    // Initialize Chart.js
    const ctx = document.getElementById("myAreaChart").getContext("2d");
    new Chart(ctx, {
      type: "line",
      data: {
        labels: [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
          "August",
          "September",
          "October",
          "November",
          "December",
        ],
        datasets: [
          {
            label: "Earnings",
            data: [
              500, 1000, 750, 1250, 800, 1500, 1000, 2000, 1500, 1750, 1250,
              1750,
            ],
            borderColor: "rgba(78, 115, 223, 1)",
            fill: false,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          x: {
            display: true,
          },
          y: {
            display: true,
            suggestedMin: 0,
            suggestedMax: 2000,
          },
        },
      },
    });
  }, []);

  return (
    <div className="container">
      {/* Area Chart */}
      <div className="col-xl-12 col-lg-7">
        <div className="card shadow mb-4">
          {/* Card Header - Dropdown */}
          <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
            <h6 className="m-0 font-weight-bold text-primary">
              Earnings Overview
            </h6>
          </div>
          {/* Card Body */}
          <div className="card-body">
            <div className="chart-area" style={{ height: "320px" }}>
              <canvas id="myAreaChart"></canvas>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
