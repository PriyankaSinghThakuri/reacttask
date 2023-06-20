import React from "react";
import "../css/sb-admin-2.min.css";
import { itemsdata } from "../../models/ItemsData";

export const Cards = () => {
  //get popular item by comparing totalSale
  const popularItem = itemsdata.reduce((prevItem, currentItem) => {
    return prevItem.totalSale > currentItem.totalSale ? prevItem : currentItem;
  });
  console.log(popularItem);

  //get todayitemsold by adding all the todaySale
  const totalItemSold = itemsdata.reduce((prevItem, currentItem) => {
    return prevItem + currentItem.totalSale;
  }, 0);
  console.log("todayItemSold", totalItemSold);

  // Get today's item sold and its earnings
  const todayItemsSold = itemsdata.filter((item) => item.todaySale > 0);
  const todayEarnings = todayItemsSold.reduce((prevItem, currentItem) => {
    return prevItem + currentItem.price * currentItem.todaySale;
  }, 0);
  console.log("todayEarnings", todayEarnings);

  return (
    <div className="container">
      <div style={{ display: "flex" }}>
        <div className="col-md-4 mb-4 mr-5">
          <div className="card border-left-primary shadow h-100 py-2">
            <div className="card-body">
              {/* Card 1 content here */}
              <div className="row no-gutters align-items-center">
                <div className="col mr-2">
                  <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">
                    Total Items Sold (All)
                  </div>
                  <div className="h5 mb-0 font-weight-bold text-gray-800">
                    {totalItemSold}
                  </div>
                </div>
                <div className="col-auto">
                  <i className="fas fa-cart-plus fa-2x text-gray-300"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-4 mb-4 mr-5">
          <div className="card border-left-success shadow h-100 py-2">
            <div className="card-body">
              {/* Card 2 content here */}
              <div className="row no-gutters align-items-center">
                <div className="col mr-2">
                  <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">
                    Earnings (Today)
                  </div>
                  <div className="h5 mb-0 font-weight-bold text-gray-800">
                    NRS {todayEarnings}
                  </div>
                </div>
                <div className="col-auto">
                  <i className="fas fa-dollar-sign fa-2x text-gray-300"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-4 mb-4 mr-5">
          <div className="card border-left-info shadow h-100 py-2">
            <div className="card-body">
              {/* Card 3 content here */}
              <div className="row no-gutters align-items-center">
                <div className="col mr-2">
                  <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">
                    Most Popur Item (Month Wise)
                  </div>
                  <div className="h5 mb-0 font-weight-bold text-gray-800">
                    {popularItem.name}
                  </div>
                </div>
                <div className="col-auto">
                  <i className="fas fa-star fa-2x text-gray-300"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
