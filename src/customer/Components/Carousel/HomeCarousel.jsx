import React from "react";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import { homeCarouselData } from "./HomeCaroselData";
import { useNavigate } from "react-router-dom";

const handleDragStart = (e) => e.preventDefault();

const HomeCarousel = ({ images }) => {
  console.log("this is banners", images);
  const navigate = useNavigate();
  const item = images?.map((item, index) => (
    <img
      className="cursor-pointer"
      // onClick={() => navigate(item.path)}
      src={`${item.url}`}
      alt={`banner-${index + 1}`}
      onDragStart={handleDragStart}
      role="presentation"
      // style={{ height: 450, width: 1500 }}
      style={{
        // width: "100vw",
        objectFit: "contain",
        padding: "0 1rem",
        // height: "350px",
      }}
    />
  ));
  return (
    <AliceCarousel
      mouseTracking
      items={item}
      autoPlay
      infinite
      autoPlayInterval={3000}
      disableButtonsControls
    />
  );
};

export default HomeCarousel;
