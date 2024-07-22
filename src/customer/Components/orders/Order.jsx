import { Box, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import OrderCard from "./OrderCard";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import { useDispatch, useSelector } from "react-redux";
import { getOrderHistory } from "../../../Redux/Customers/Order/Action";
import BackdropComponent from "../BackDrop/Backdrop";
import { getCustomerInfo } from "../../../action/cart/index";
import OrderDetails from "./OrderDetails";
import Loader from "../Loader/Loader";

const orderStatus = [
  { label: "On The Way", value: "onTheWay" },
  { label: "Delivered", value: "delevered" },
  { label: "Cancelled", value: "cancelled" },
  { label: "Returned", value: "returned" },
];

const Order = () => {
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");
  const { order, newOrder } = useSelector((store) => store);
  const [info, setInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // dispatch(getOrderHistory({ jwt }));
  }, [jwt]);
  useEffect(() => {
    getCustomerInfo()
      .then((res) => {
        setInfo(res);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching customer info:", error);
      });
  }, []);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <Box className="px-10">
          <Grid
            container
            spacing={0}
            sx={{ justifyContent: "space-between", flexDirection: "column" }}
          >
            <Grid item xs={12}>
              <Box className="space-y-5 ">
                <h1 className="text-4xl font-bold tracking-tight text-gray-900">
                  Order History
                </h1>
                {info?.data?.customer?.orders?.edges?.length > 0 &&
                  info?.data?.customer?.orders?.edges.map((order) => {
                    // return order?.node?.lineItems?.edges.map((item, index) => (
                    // <OrderCard item={item} order={order} key={index} />;
                    return <OrderCard order={order} />;

                    // ));
                  })}
              </Box>
            </Grid>
          </Grid>
          <OrderDetails />

          <BackdropComponent open={false} />
        </Box>
      )}
    </>
  );
};

export default Order;
