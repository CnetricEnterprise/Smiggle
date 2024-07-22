import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const HomeProductCard = ({ product }) => {
  const navigate = useNavigate();
  const [hovered, setHovered] = useState(false);
  console.log("product", product);
  // Function to truncate the title with dots if it's too long
  const truncateTitle = (title, maxLength) => {
    if (title?.length > maxLength) {
      return title.substring(0, maxLength) + "...";
    } else {
      return title;
    }
  };

  const styles = {
    transitionClass:
      "transition-all duration-300 ease-in-out transform hover:scale-105",
  };

  return (
    <div
      onClick={() => navigate(`/product/${product?.node?.handle}`)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="cursor-pointer flex flex-col items-center bg-white rounded-lg shadow-lg overflow-hidden w-[15rem] mx-3 m-3 "
    >
      <div className="h-[13rem] w-[10rem]">
        <img
          className={`object-cover object-top w-full h-full ${
            hovered ? styles.transitionClass : ""
          }`}
          src={
            hovered
              ? product?.node?.images?.edges[1]?.node?.url
              : product?.images?.[0]?.url || product?.node?.featuredImage?.url
          }
          alt={product?.title}
        />
      </div>

      <div className="p-5" style={{ height: 118, marginBottom: 5 }}>
        <h3 className="text-lg font-medium text-gray-900">
          {truncateTitle(product?.brand || product?.node?.title, 20)}{" "}
          {/* Adjust the maxLength as needed */}
        </h3>
        <p className="mt-2 text-sm text-gray-500">
          ${product?.node?.variants?.edges[0].node.price.amount}
        </p>
      </div>
    </div>
  );
};

export default HomeProductCard;
