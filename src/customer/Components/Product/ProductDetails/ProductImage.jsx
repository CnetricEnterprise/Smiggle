import React, { useEffect, useState } from "react";
import "./ProductImage.css";
function ProductImage({ productDetails, activeImageUrl, active, setActive }) {
  const [activeImage, setActiveImage] = useState(
    // productDetails?.featuredImage?.url
    activeImageUrl
  );

  const handleSetActiveImage = (image) => {
    setActiveImage(image);
    setActive(false);
  };

  useEffect(() => {
    setActiveImage(productDetails?.featuredImage?.url);
  }, [productDetails]);

  return (
    <div className="flex flex-col items-center">
      <div className="overflow-hidden rounded-lg max-w-[30rem] max-h-[35rem]">
        <img
          src={active ? activeImageUrl : activeImage}
          alt={productDetails?.featuredImage?.url}
          className="h-full w-full object-cover object-center"
        />
      </div>
      <div className="flex flex-wrap space-x-5 justify-center">
        {productDetails?.images?.edges?.map((image) => (
          <div
            key={image.node.id} // Add a unique key
            onClick={() => handleSetActiveImage(image.node.url)}
            className="aspect-h-2 aspect-w-3 overflow-hidden rounded-lg max-w-[5rem] max-h-[5rem] mt-4 product-image"
            // style={{
            //   boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
            //   transition: "box-shadow 0.3s ease",
            // }}
            onMouseEnter={() => setActiveImage(image.node.url)}
            onMouseLeave={() =>
              setActiveImage(productDetails?.featuredImage?.url)
            }
          >
            <img
              src={image.node.url}
              alt={image.node.url}
              className="h-full w-full object-cover object-center"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductImage;
