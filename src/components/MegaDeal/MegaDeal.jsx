import Carousel from "react-bootstrap/Carousel";
import "./MegaDeal.css";

const MegaDeal = () => {
  return (
    <Carousel fade className="megadeal-container">
      <Carousel.Item>
        <img
          src={process.env.PUBLIC_URL + "/assets/top_images/megadeal_img1.png"}
          alt="Responsiveimage"
          className="megadeal_img1"
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          src={process.env.PUBLIC_URL + "/assets/top_images/megadeal_img2.png"}
          alt="Responsiveimage"
          className="megadeal_img2"
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          src={process.env.PUBLIC_URL + "/assets/top_images/megadeal_img3.png"}
          alt="Responsiveimage"
          className="megadeal_img3"
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          src={process.env.PUBLIC_URL + "/assets/top_images/megadeal_img4.png"}
          alt="Responsiveimage"
          className="megadeal_img4"
        />
      </Carousel.Item>
    </Carousel>
  );
};

export default MegaDeal;
