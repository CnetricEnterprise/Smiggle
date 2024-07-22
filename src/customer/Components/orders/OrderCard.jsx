import { Box, Grid, Typography } from "@mui/material";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import AdjustIcon from "@mui/icons-material/Adjust";
import React from "react";
import { useNavigate } from "react-router-dom";
import StarIcon from "@mui/icons-material/Star";

const OrderCard = ({ item, order }) => {
  const navigate = useNavigate();

  const formatProcessedAt = (processedAt) => {
    const date = new Date(processedAt);
    const options = {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true, // for AM/PM format
    };
    return date.toLocaleString("en-GB", options); // 'en-GB' for dd/mm/yyyy format
  };
  console.log("items fsfs", order);
  return (
    <Box
      className="p-2 shadow-lg hover:shadow-2xl border  cursor-pointer "
      onClick={() => navigate(`/account/order/${order?.node.id}`)}
    >
      <Grid spacing={2} container sx={{ justifyContent: "space-between" }}>
        <Grid item xs={2}>
          {order.node.lineItems.edges.map((item, index) => (
            <div>
              <img
                className="w-[5rem] h-[5rem] object-contain object-top"
                // src={item?.node.variant.image.url}
                src={item.node.variant.image.url}
                alt=""
              />
              {/* <p className="mb-2">#{order?.node.orderNumber}</p> */}
              <div className="ml-5">
                {/* <p className="mb-2 whitespace-nowrap">{item?.node.title}</p> */}
                <p className="opacity-50 text-xs font-semibold space-x-5">
                  {/* <span>Color: {item?.node.variant.title}</span> */}
                </p>
              </div>
            </div>
          ))}
        </Grid>
        <Grid item xs={2}>
          <p className="mb-2">#{order?.node.orderNumber}</p>
        </Grid>
        <Grid item xs={2}>
          <p>${order.node.totalPriceV2.amount}</p>
        </Grid>

        <Grid item xs={3}>
          <p>{formatProcessedAt(order?.node.processedAt)}</p>
        </Grid>
        <Grid item xs={3}>
          <p>{order?.node.fulfillmentStatus}</p>
        </Grid>
        <Grid item xs={4}>
          <p className="space-y-2 font-semibold">
            {order?.node.fulfillmentStatus === "FULFILLED" ? (
              <>
                <AdjustIcon
                  sx={{ width: "15px", height: "15px" }}
                  className="text-green-600 p-0 mr-2 text-sm"
                />
                <span>Delivered </span>

                <p className="text-xs">Your Item Has Been Delivered</p>
              </>
            ) : (
              <>
                {/* <FiberManualRecordIcon
                  sx={{ width: "15px", height: "15px" }}
                  className="text-green-600 p-0 mr-2 text-sm"
                /> */}
              </>
            )}
          </p>
        </Grid>
        {/* {item.status === "Delivered" && (
          <div
            onClick={() => navigate(`/account/rate/{id}`)}
            className="flex items-center text-blue-600 cursor-pointer"
          >
            <StarIcon sx={{ fontSize: "2rem" }} className="px-2 text-5xl" />
            <span>Rate & Review Product</span>
          </div>
        )} */}
      </Grid>
    </Box>
  );
};

export default OrderCard;
