import React, { useEffect } from "react";
import "./ProductCard.css";
import { useLocation, useNavigate } from "react-router-dom";

const ProductCard = ({ product, isSearched, length }) => {
  const {
    title,
    brand,
    imageUrl,
    price,
    discountedPrice,
    color,
    discountPersent,
  } = product;
  const navigate = useNavigate();
  // console.log("length", length);
  // const handleNavigate = () => {
  //   isSearched || length > 0
  //     ? navigate(`/product/${product?.handle}`)
  //     : navigate(`/product/${product?.node?.handle}`);
  // };

  const handleNavigate = () => {
    const handle =
      isSearched || length > 0 ? product?.handle : product?.node?.handle;
    navigate(`/product/${handle}`);
  };

  // useEffect(() => {}, [isSearched]);

  return (
    <div
      onClick={handleNavigate}
      className="productCard w-[15rem] border m-3 transition-all cursor-pointer "
    >
      <div className="h-[20rem]">
        <img
          className="h-full w-full object-cover object-left-top"
          src={product?.image || product?.node.featuredImage.url}
          alt=""
        />
      </div>
      <div className="textPart bg-white p-3 ">
        <div>
          <p className="font-bold opacity-60">{brand}</p>
          {/* <p className="">${product?.title || product?.node?.title}  </p> */}
          {console.log(isSearched, length)}

          {/* {!isSearched || length === 0



            ? `${product?.node?.title}`
            : `${product?.title} - ${product?.variant_title}`} */}
            {product?.node?.title || `${product?.title} - ${product?.variant_title}` }

          {/* {isSearched
            ? `${product?.title} - ${product?.variant_title}`
            : length === 0
            ? `${product?.node?.title}`
            : `${product?.title} - ${product?.variant_title}`} */}
            

          <p className="font-semibold opacity-50">{color}</p>
        </div>

        <div className="flex space-x-2 items-center">
          <p className="font-semibold">
            {" "}
            $
            {product?.price ||
              product?.node?.variants?.edges[0]?.node?.price?.amount}
          </p>
          {/* <p className="opacity-50 line-through">₹{product?.price}</p> */}
          {/* <p className="text-green-600 font-semibold">{10}% off</p> */}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
