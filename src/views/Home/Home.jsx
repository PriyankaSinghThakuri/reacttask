import React from "react";
import NavBar from "../../components/NavBar/NavBar";
import MegaDeal from "../../components/MegaDeal/MegaDeal";
import "./Home.css";

const Home = () => {
  return (
    <>
      <div className="home-container">
        <NavBar />
        <div className="megadeal-images">
          <MegaDeal />
        </div>
        <div className="banner-images">
          <img
            src={
              process.env.PUBLIC_URL + "/assets/offer_banner1.jpg"
            }
            alt="Responsiveimage"
            className="offer_banner"
          />
        </div>
        <div className="flash-sale">
          <div className="sale-title">24 HOUR FLASH SALE</div>
          <div className="flashsale-cards">
            <div className="Days">
              <div className="days-card">00</div>
              <div className="card-title">Days</div>
            </div>
            <div className="Hours">
              <div className="hours-card">17</div>
              <div className="card-title">Hours</div>
            </div>
            <div className="Minutes">
              <div className="minutes-card">57</div>
              <div className="card-title">Minutes</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
