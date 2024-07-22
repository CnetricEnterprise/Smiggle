import { Box, Button, Grid, Typography } from "@mui/material";
import React, { useState } from "react";
import OrderTraker from "./OrderTraker";
import StarIcon from "@mui/icons-material/Star";
import { useLocation, useNavigate, useParams } from "react-router-dom";
// import AddressCard from "../adreess/AdreessCard";
import { deepPurple } from "@mui/material/colors";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getOrderById } from "../../../Redux/Customers/Order/Action";
import BackdropComponent from "../BackDrop/Backdrop";
import { ordersById } from "../../../action";
import AddressCard from "../adreess/AdreessCard";

const OrderDetails = () => {
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");
  // const { orderId } = useParams();
  const { order } = useSelector((store) => store);

  const [linesData, setLinesData] = useState();

  const location = useLocation();
  const urlParams = new URLSearchParams(location.search);
  // Extract orderId from the URL pathname
  const orderId = location.pathname.split("/").pop();
  // Extract key from the query parameters
  const key = urlParams.get("key");

  console.log("order", linesData);
  const orderIdURL = `gid://shopify/Order/${orderId}?key=${key}`;
  useEffect(() => {
    // dispatch(getOrderById(orderId));
    ordersById(orderIdURL).then((res) => {
      console.log("this is order detials page1", res.data);
      setLinesData(res.data.node);
    });
  }, []);

  const navigate = useNavigate();
  return (
    <>
      {linesData && (
        <div className=" px-2 lg:px-36 space-y-7 ">
          <Grid container className="p-3 shadow-lg">
            <Grid xs={12}>
              <p className="font-bold text-lg py-2">Shipping Address</p>
            </Grid>
            <Grid item xs={6}>
              <AddressCard address={linesData?.shippingAddress.formatted} />
            </Grid>
          </Grid>
          <Box className="p-5 shadow-lg border rounded-md">
            <Grid
              container
              sx={{ justifyContent: "space-between", alignItems: "center" }}
            >
              <Grid item xs={9}>
                <OrderTraker
                  activeStep={
                    linesData.fulfillmentStatus === "UNFULFILLED"
                      ? 1
                      : linesData.fulfillmentStatus === "UNFULFILLED"
                      ? 2
                      : linesData.fulfillmentStatus === "UNFULFILLED"
                      ? 3
                      : 5
                  }
                />
              </Grid>
              <Grid item>
                {linesData.fulfillmentStatus === "FULFILLED" && (
                  <Button sx={{ color: "" }} color="error" variant="text">
                    RETURN
                  </Button>
                )}

                {linesData.fulfillmentStatus !== "FULFILLED" && (
                  <Button sx={{ color: deepPurple[500] }} variant="text">
                    cancel order
                  </Button>
                )}
              </Grid>
            </Grid>
          </Box>

          <Grid container className="space-y-5">
            {linesData &&
              linesData?.lineItems.edges?.length > 0 &&
              linesData?.lineItems.edges.map((item) => (
                <Grid
                  container
                  item
                  className="shadow-xl rounded-md p-5 border"
                  sx={{ alignItems: "center", justifyContent: "space-between" }}
                >
                  <Grid item xs={6}>
                    {" "}
                    <div className="flex  items-center ">
                      <img
                        className="w-[5rem] h-[5rem] object-contain object-top"
                        src={item.node.variant.image.url}
                        alt=""
                      />
                      <div className="ml-5 space-y-2">
                        <p className="">{item.node.title}</p>
                        {/* <p className="opacity-50 text-xs font-semibold space-x-5">
                    <span>Color: pink</span> <span>Size: {item.size}</span>
                  </p> */}
                        <p>Quantity: {item.node.quantity}</p>
                        <p>${item.node.variant.priceV2.amount} </p>
                      </div>
                    </div>
                  </Grid>
                  <Grid item>
                    {
                      <Box
                        sx={{ color: deepPurple[500] }}
                        onClick={() =>
                          navigate(`/account/rate/${item.product._id}`)
                        }
                        className="flex items-center cursor-pointer"
                      >
                        <StarIcon
                          sx={{ fontSize: "2rem" }}
                          className="px-2 text-5xl"
                        />
                        <span>Rate & Review Product</span>
                      </Box>
                    }
                  </Grid>
                </Grid>
              ))}
          </Grid>
        </div>
      )}
      <BackdropComponent open={false} />
    </>
  );
};
// sx={{width:"10px",height:"10px"}}
export default OrderDetails;
