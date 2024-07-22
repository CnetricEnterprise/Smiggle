import React from "react";
import { Audio, Blocks, Oval } from "react-loader-spinner";
import { Button, Skeleton } from "@mui/material";
const Loader = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Oval
        visible={true}
        height="80"
        width="80"
        color="#4fa94d"
        ariaLabel="oval-loading"
        wrapperStyle={{}}
        wrapperClass=""
      />
    </div>

    // <Skeleton
    //   animation="wave"
    //   variant="rectangular"
    //   width="100%"
    //   height="auto"
    // />
  );
};

export default Loader;
