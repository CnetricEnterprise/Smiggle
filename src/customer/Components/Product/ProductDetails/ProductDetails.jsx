import React from "react";
import { useState } from "react";
import { RadioGroup } from "@headlessui/react";
import { useNavigate, useParams } from "react-router-dom";
import ProductReviewCard from "./ProductReviewCard";
import { Box, Button, Grid, LinearProgress, Rating } from "@mui/material";
import HomeProductCard from "../../Home/HomeProductCard";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { findProductById } from "../../../../Redux/Customers/Product/Action";
import { addItemToCart } from "../../../../Redux/Customers/Cart/Action";
import { getAllReviews } from "../../../../Redux/Customers/Review/Action";
import { lengha_page1 } from "../../../../Data/Women/LenghaCholi";
import { gounsPage1 } from "../../../../Data/Gouns/gouns";
import { receiveProducts, receiveProductsById } from "../../../../action";
import { AddItemToCartNew, getCartItems } from "../../../../action/cart";
import { grey } from "@mui/material/colors";
import ProductImage from "./ProductImage";
import toast, { Toaster } from "react-hot-toast";
import Loader from "../../Loader/Loader";

// const product = {
//   name: "Basic Tee 6-Pack",
//   price: "₹996",
//   href: "#",
//   breadcrumbs: [
//     { id: 1, name: "Men", href: "#" },
//     { id: 2, name: "Clothing", href: "#" },
//   ],
//   images: [
//     {
//       src: "https://tailwindui.com/img/ecommerce-images/product-page-02-secondary-product-shot.jpg",
//       alt: "Two each of gray, white, and black shirts laying flat.",
//     },
//     {
//       src: "https://tailwindui.com/img/ecommerce-images/product-page-02-tertiary-product-shot-01.jpg",
//       alt: "Model wearing plain black basic tee.",
//     },
//     {
//       src: "https://tailwindui.com/img/ecommerce-images/product-page-02-tertiary-product-shot-02.jpg",
//       alt: "Model wearing plain gray basic tee.",
//     },
//     {
//       src: "https://tailwindui.com/img/ecommerce-images/product-page-02-featured-product-shot.jpg",
//       alt: "Model wearing plain white basic tee.",
//     },
//   ],
//   colors: [
//     { name: "White", class: "bg-white", selectedClass: "ring-gray-400" },
//     { name: "Gray", class: "bg-gray-200", selectedClass: "ring-gray-400" },
//     { name: "Black", class: "bg-gray-900", selectedClass: "ring-gray-900" },
//   ],
//   sizes: [
//     { name: "S", inStock: true },
//     { name: "M", inStock: true },
//     { name: "L", inStock: true },
//   ],
//   description:
//     'The Basic Tee 6-Pack allows you to fully express your vibrant personality with three grayscale options. Feeling adventurous? Put on a heather gray tee. Want to be a trendsetter? Try our exclusive colorway: "Black". Need to add an extra pop of color to your outfit? Our white tee has you covered.',
//   highlights: [
//     "Hand cut and sewn locally",
//     "Dyed with our proprietary colors",
//     "Pre-washed & pre-shrunk",
//     "Ultra-soft 100% cotton",
//   ],
//   details:
//     "This item might be useful if you're preparing for one of these exams",
// };
const reviews = { href: "#", average: 4, totalCount: 117 };

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function ProductDetails() {
  // const [selectedSize, setSelectedSize] = useState();
  // const [activeImage, setActiveImage] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { customersProduct, review, cartItems } = useSelector((store) => store);
  const { productId } = useParams();
  // const jwt = localStorage.getItem("jwt");
  // console.log("param",productId,customersProduct.product)
  const [productDetails, setProductDetails] = useState({});
  const [activeId, setActiveId] = useState(null);

  // const handleSetActiveImage = (image) => {
  //   setActiveImage(image);
  // };

  const handleSubmit = (event) => {
    event.preventDefault();
    // const data = { id:productDetails.product?.variants[0]?.id, size: selectedSize.name };
    // dispatch(addItemToCart({ data, jwt }));
    // navigate("/cart");
    // dispatch(AddItemToCartNew(productDetails.product?.variants[0]?.id))
    if (!localStorage.getItem("accessToken")) {
      toast.error("You are not Logged In", {
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      });
    } else {
      AddItemToCartNew(productDetails?.variants?.edges?.[0]?.node?.id).then(
        (res) => {
          // console.log("this is add to cart response", res);
          // if (activeId !== null && res?.data?.cartLinesAdd?.cart?.id) {
          toast.success("Product Added to Cart", {
            style: {
              borderRadius: "10px",
              background: "#333",
              color: "#fff",
            },
          });
          // }
          // else {
          //   toast.error("Please Select Variant Color", {
          //     style: {
          //       borderRadius: "10px",
          //       background: "#333",
          //       color: "#fff",
          //     },
          //   });
          // }

          // var cart_id = res.data.cartLinesAdd.cart.id;

          dispatch(getCartItems(localStorage.getItem("cart_id")));
        }
      );
    }
  };

  useEffect(() => {
    // const data = { productId: productId, jwt };
    // dispatch(findProductById(data));
    // dispatch(getAllReviews(productId));
    // if (cartItems?.cartItems?.cart?.lines.length > 0) {
    // console.log("cartItems", localStorage.getItem("cart_id"));
    // if (
    //   cartItems?.cartItems?.data?.cart?.lines?.edges?.length > 0 &&
    //   localStorage.getItem("cart_id")
    // ) {
    dispatch(getCartItems(localStorage.getItem("cart_id")));
    // }
    // }
  }, []);

  useEffect(() => {
    receiveProductsById(productId).then((res) => {
      setLoading(false);
      // console.log("this is new details product page", res);
      setProductDetails(res.data.product);
    });
  }, [productId]);

  const [topProducts, setTopProducts] = useState([]);

  useEffect(() => {
    receiveProducts().then((data) => {
      setTopProducts(data.data.products.edges);
    });
  }, []);

  // console.log("reviews ", cartItems);

  const CheckCardItem = (ID) => {
    let checkcart = false;

    let Cart = cartItems?.cartItems?.data?.cart?.lines;
    console.log("cart", cartItems?.cartItems?.data);
    if (Cart && Cart?.edges > 0) {
      for (const cartItem of Cart?.edges) {
        if (cartItem.node.merchandise.id === ID) {
          checkcart = true;
        }
      }
    }
    return checkcart;
  };

  // useEffect(() => {

  // }, [cartItems?.cartItems?.cart?.lines.length]);
  const randomStartIndex = Math.floor(Math.random() * (topProducts.length - 4));

  // console.log("productDetails", productDetails);
  const [activeVariant, setActiveVariant] = useState(null);
  const [active, setActive] = useState(false);
  const [imageUrl, setImageUrl] = useState(
    productDetails?.variants?.edges?.[0]?.node?.image?.url
  );

  const [activeImageUrl, setActiveImageUrl] = useState();
  const handleVariantClick = (e, variantTitle, variantImg, id) => {
    e.preventDefault();
    setActiveVariant(variantTitle);
    setImageUrl(variantImg);
    setActiveId(id);
    setActive(true);
    console.log("imageUrl", activeImageUrl);
  };
  useEffect(() => {
    setActiveImageUrl(imageUrl);
  }, [imageUrl, activeId]);

  return (
    <div className="bg-white lg:px-20">
      {loading ? (
        <Loader />
      ) : (
        <div className="pt-6">
          <nav aria-label="Breadcrumb">
            <ol
              role="list"
              className="mx-auto flex max-w-2xl items-center space-x-2 px-4 sm:px-6 lg:max-w-7xl lg:px-8"
            >
              {/* {product.breadcrumbs.map((breadcrumb) => (
              <li key={breadcrumb.id}>
                <div className="flex items-center">
                  <a
                    href={"/"}
                    className="mr-2 text-sm font-medium text-gray-900"
                  >
                    {breadcrumb.name}
                  </a>
                  <svg
                    width={16}
                    height={20}
                    viewBox="0 0 16 20"
                    fill="currentColor"
                    aria-hidden="true"
                    className="h-5 w-4 text-gray-300"
                  >
                    <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
                  </svg>
                </div>
              </li>
            ))} */}
              <li className="text-sm">
                <a
                  href={"/"}
                  aria-current="page"
                  className="font-medium text-gray-500 hover:text-gray-600"
                >
                  <div className="flex items-center">
                    <a
                      href={"/"}
                      className="mr-2 text-sm font-medium text-gray-900"
                    >
                      Products
                    </a>
                    <svg
                      width={16}
                      height={20}
                      viewBox="0 0 16 20"
                      fill="currentColor"
                      aria-hidden="true"
                      className="h-5 w-4 text-gray-300"
                    >
                      <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
                    </svg>
                  </div>
                </a>
              </li>
              <li className="text-sm">
                <a
                  href={"#"}
                  aria-current="page"
                  className="font-medium text-gray-500 hover:text-gray-600"
                >
                  {/* {productDetails?.title} */}
                  {productDetails?.collections?.edges?.[0]?.node?.title}
                </a>
              </li>
            </ol>
          </nav>

          {/* product details */}
          <section className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-2 px-4 pt-10">
            {/* Image gallery */}
            <ProductImage
              productDetails={productDetails}
              activeImageUrl={activeImageUrl}
              active={active}
              setActive={setActive}
            />

            {/* Product info */}
            <div className="lg:col-span-1 mx-auto max-w-2xl px-4 pb-16 sm:px-6  lg:max-w-7xl  lg:px-8 lg:pb-24">
              <div className="lg:col-span-2">
                <h1 className="text-lg lg:text-3xl font-semibold tracking-tight text-gray-900  ">
                  {productDetails?.title}
                </h1>
                <h1 className="text-lg lg:text-xl tracking-tight text-gray-900 opacity-60 pt-1">
                  {/* {productDetails.description} */}
                </h1>
              </div>

              {/* Options */}
              <div className="mt-4 lg:row-span-3 lg:mt-0">
                <h2 className="sr-only">Product information</h2>
                <div className="flex space-x-5 items-center text-lg lg:text-xl tracking-tight text-gray-900 mt-6">
                  <p className="font-semibold">
                    $
                    {Number(
                      productDetails.variants?.edges?.[0]?.node.price.amount
                    ).toFixed(2)}
                  </p>
                  {/* <p className="opacity-50 line-through">
                  ₹{productDetails.product?.variants[0]?.price}
                </p>
                <p className="text-green-600 font-semibold">
                  {customersProduct.product?.discountPersent}% Off
                </p> */}
                </div>

                {/* Reviews */}
                <div className="mt-6">
                  <h3 className="sr-only">Reviews</h3>

                  <div className="flex items-center space-x-3">
                    <Rating
                      name="read-only"
                      value={4.6}
                      precision={0.5}
                      readOnly
                    />

                    <p className="opacity-60 text-sm">42807 Ratings</p>
                    <p
                      // className="ml-3 text-sm font-medium text-indigo-600 hover:text-indigo-500"
                      sx={{ color: grey[900] }}
                    >
                      {reviews.totalCount} reviews
                    </p>
                  </div>
                </div>

                <form className="mt-10" onSubmit={handleSubmit}>
                  <div className="mt-10">
                    <div className="flex items-center justify-between">
                      <h2 className="text-sm font-medium text-gray-900">
                        Colors
                      </h2>
                    </div>

                    {productDetails?.variants?.edges?.map((item) => (
                      <button
                        key={item.node.id}
                        className={`${
                          activeVariant === item.node.title
                            ? "bg-black text-white"
                            : "bg-white text-black hover:bg-gray-100"
                        } font-semibold py-2 px-4 border border-gray-400 rounded-full shadow mr-2 mt-2`}
                        onClick={(e) =>
                          handleVariantClick(
                            e,
                            item.node.title,
                            item.node.image.url,
                            item.node.id
                          )
                        }
                      >
                        {item.node.title}
                      </button>
                    ))}

                    {/* <RadioGroup
                    value={selectedSize}
                    onChange={setSelectedSize}
                    className="mt-4"
                  >
                    <RadioGroup.Label className="sr-only">
                      Choose a size
                    </RadioGroup.Label>
                    <div className="grid grid-cols-4 gap-4 sm:grid-cols-8 lg:grid-cols-10">
                      {productDetails?.variants?.edges?.map((item) => (
                        <RadioGroup.Option
                          key={item.node.id}
                          value={item.node.title}
                          // disabled={!size.inStock}
                          // className={({ active }) =>
                          //   classNames(
                          //     size.inStock
                          //       ? "cursor-pointer bg-white text-gray-900 shadow-sm"
                          //       : "cursor-not-allowed bg-gray-50 text-gray-200",
                          //     active ? "ring-1 ring-indigo-500" : "",
                          //     "group relative flex items-center justify-center rounded-md border py-1 px-1 text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none sm:flex-1 sm:py-6"
                          //   )
                          // }
                        >
                          {({ active, checked }) => (
                            <>
                              <RadioGroup.Label as="span">
                                {item.node.title}
                              </RadioGroup.Label>
                              {item.node.quantityAvailable ? (
                                <span
                                  className={classNames(
                                    active ? "border" : "border-2",
                                    checked
                                      ? "border-indigo-500"
                                      : "border-transparent",
                                    "pointer-events-none absolute -inset-px rounded-md"
                                  )}
                                  aria-hidden="true"
                                />
                              ) : (
                                <span
                                  aria-hidden="true"
                                  className="pointer-events-none absolute -inset-px rounded-md border-2 border-gray-200"
                                >
                                  <svg
                                    className="absolute inset-0 h-full w-full stroke-2 text-gray-200"
                                    viewBox="0 0 100 100"
                                    preserveAspectRatio="none"
                                    stroke="currentColor"
                                  >
                                    <line
                                      x1={0}
                                      y1={100}
                                      x2={100}
                                      y2={0}
                                      vectorEffect="non-scaling-stroke"
                                    />
                                  </svg>
                                </span>
                              )}
                            </>
                          )}
                        </RadioGroup.Option>
                      ))} */}
                    {/* </div>
                  </RadioGroup> */}
                  </div>
                  {!CheckCardItem(productDetails.id) ? (
                    <Button
                      variant="contained"
                      type="submit"
                      sx={{
                        padding: ".8rem 2rem",
                        marginTop: "2rem",
                        bgcolor: grey[900],
                      }}
                      // onClick={handleSubmit}
                    >
                      Add To Cart
                    </Button>
                  ) : (
                    <Button
                      variant="contained"
                      type="submit"
                      sx={{
                        padding: ".8rem 2rem",
                        marginTop: "2rem",
                        bgcolor: grey[900],
                      }}
                      onClick={() => {
                        navigate("/cart");
                      }}
                    >
                      View Cart
                    </Button>
                  )}
                  {/* <Button
                    variant="contained"
                    type="submit"
                    sx={{ padding: ".8rem 2rem", marginTop: "2rem" }}
                  >
                    Add To Cart
                  </Button> */}
                </form>
              </div>

              <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pb-16 lg:pr-8 lg:pt-6">
                {/* Description and details */}
                <div>
                  <h3 className="text-sm font-medium text-gray-900">
                    Description :
                  </h3>

                  <div className="space-y-6 py-2">
                    <p className="text-base text-gray-900">
                      {productDetails?.description}
                    </p>
                  </div>
                </div>

                <div className="mt-10">
                  {/* <h3 className="text-sm font-medium text-gray-900">
                    Highlights
                  </h3> */}

                  <div className="mt-4">
                    <ul
                      role="list"
                      className="list-disc space-y-2 pl-4 text-sm"
                    >
                      {/* {product.highlights.map((highlight) => (
                      <li key={highlight} className="text-gray-400">
                        <span className="text-gray-600">{highlight}</span>
                      </li>
                    ))} */}
                    </ul>
                  </div>
                </div>

                {/* <div className="mt-10">
                <h2 className="text-sm font-medium text-gray-900">Details</h2>

                <div className="mt-4 space-y-6">
                  <p className="text-sm text-gray-600">{product.details}</p>
                </div>
              </div> */}
              </div>
            </div>
          </section>

          {/* rating and review section */}
          <section className="">
            <h1 className="font-semibold text-lg pb-4">
              Recent Review & Ratings
            </h1>

            <div className="border p-5">
              <Grid container spacing={7}>
                <Grid item xs={7}>
                  <div className="space-y-5">
                    {/* {review.reviews?.map((item, i) => (
                    <ProductReviewCard item={item} />
                  ))} */}
                    <ProductReviewCard />
                  </div>
                </Grid>

                <Grid item xs={5}>
                  <h1 className="text-xl font-semibold pb-1">
                    Product Ratings
                  </h1>
                  <div className="flex items-center space-x-3 pb-10">
                    <Rating
                      name="read-only"
                      value={4.6}
                      precision={0.5}
                      readOnly
                    />

                    <p className="opacity-60">42807 Ratings</p>
                  </div>
                  <Box>
                    <Grid
                      container
                      justifyContent="center"
                      alignItems="center"
                      gap={2}
                    >
                      <Grid xs={2}>
                        <p className="p-0">Excellent</p>
                      </Grid>
                      <Grid xs={7}>
                        <LinearProgress
                          className=""
                          sx={{
                            bgcolor: "#d0d0d0",
                            borderRadius: 4,
                            height: 7,
                          }}
                          variant="determinate"
                          value={40}
                          color="success"
                        />
                      </Grid>
                      <Grid xs={2}>
                        <p className="opacity-50 p-2">19259</p>
                      </Grid>
                    </Grid>
                  </Box>
                  <Box>
                    <Grid
                      container
                      justifyContent="center"
                      alignItems="center"
                      gap={2}
                    >
                      <Grid xs={2}>
                        <p className="p-0">Very Good</p>
                      </Grid>
                      <Grid xs={7}>
                        <LinearProgress
                          className=""
                          sx={{
                            bgcolor: "#d0d0d0",
                            borderRadius: 4,
                            height: 7,
                          }}
                          variant="determinate"
                          value={30}
                          color="success"
                        />
                      </Grid>
                      <Grid xs={2}>
                        <p className="opacity-50 p-2">19259</p>
                      </Grid>
                    </Grid>
                  </Box>
                  <Box>
                    <Grid
                      container
                      justifyContent="center"
                      alignItems="center"
                      gap={2}
                    >
                      <Grid xs={2}>
                        <p className="p-0">Good</p>
                      </Grid>
                      <Grid xs={7}>
                        <LinearProgress
                          className="bg-[#885c0a]"
                          sx={{
                            bgcolor: "#d0d0d0",
                            borderRadius: 4,
                            height: 7,
                          }}
                          variant="determinate"
                          value={25}
                          color="orange"
                        />
                      </Grid>
                      <Grid xs={2}>
                        <p className="opacity-50 p-2">19259</p>
                      </Grid>
                    </Grid>
                  </Box>
                  <Box>
                    <Grid
                      container
                      justifyContent="center"
                      alignItems="center"
                      gap={2}
                    >
                      <Grid xs={2}>
                        <p className="p-0">Avarage</p>
                      </Grid>
                      <Grid xs={7}>
                        <LinearProgress
                          className=""
                          sx={{
                            bgcolor: "#d0d0d0",
                            borderRadius: 4,
                            height: 7,
                            "& .MuiLinearProgress-bar": {
                              bgcolor: "#885c0a",
                            },
                          }}
                          variant="determinate"
                          value={21}
                          color="success"
                        />
                      </Grid>
                      <Grid xs={2}>
                        <p className="opacity-50 p-2">19259</p>
                      </Grid>
                    </Grid>
                  </Box>
                  <Box>
                    <Grid
                      container
                      justifyContent="center"
                      alignItems="center"
                      gap={2}
                    >
                      <Grid xs={2}>
                        <p className="p-0">Poor</p>
                      </Grid>
                      <Grid xs={7}>
                        <LinearProgress
                          className=""
                          sx={{
                            bgcolor: "#d0d0d0",
                            borderRadius: 4,
                            height: 7,
                          }}
                          variant="determinate"
                          value={10}
                          color="error"
                        />
                      </Grid>
                      <Grid xs={2}>
                        <p className="opacity-50 p-2">19259</p>
                      </Grid>
                    </Grid>
                  </Box>
                </Grid>
              </Grid>
            </div>
          </section>
          {/* data={topProducts?.slice(10, 21)} */}
          {/* similer product */}
          <section className="pt-2 ">
            <h1 className="py-5 text-2xl font-bold text-center">
              Similar Products
            </h1>
            <div className="flex flex-wrap space-y-5 flex justify-center">
              {
                // Generate a random starting index

                // Slice the array based on the random starting index
                topProducts
                  ?.slice(randomStartIndex, randomStartIndex + 4)
                  .map((item) => (
                    <HomeProductCard key={item.id} product={item} />
                  ))
              }
            </div>
          </section>
        </div>
      )}

      <Toaster />
    </div>
  );
}
