import React from "react";
import { Button } from "@mui/material";
import { useDispatch } from "react-redux";
import {
  removeCartItem,
  updateCartItem,
} from "../../../Redux/Customers/Cart/Action";
import { IconButton } from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import {
  RemoveCartItemNew,
  getCartItems,
  handleRemoveItemFromCart,
} from "../../../action/cart";
import { grey } from "@mui/material/colors";

const CartItem = ({
  item,
  showButton,
  handleRemoveItemFromCart,
  handleUpdateCartMinus,
  handleUpdateCartPlus,
}) => {
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");
  // const { cartItems } = useSelector((store) => store);

  // const handleRemoveItemFromCart = () => {

  //   RemoveCartItemNew(item.id).then((res)=>{
  //     dispatch(getCartItems());

  //   })
  // };
  const handleUpdateCartItem = (num) => {
    const data = {
      data: { quantity: item.quantity + num },
      cartItemId: item?._id,
      jwt,
    };
    // console.log("update data ", data);
    dispatch(updateCartItem(data));
  };

  return (
    <div className="p-5 shadow-lg border rounded-md">
      <div className="flex items-center">
        <div className="w-[5rem] h-[5rem] lg:w-[9rem] lg:h-[9rem] ">
          <img
            className="w-full h-full object-contain object-top"
            src={item?.node.merchandise.image.url}
            alt=""
          />
        </div>
        <div className="ml-5 space-y-1">
          <p className="font-semibold">
            {item?.node?.merchandise?.product?.title}
          </p>
          <p className="opacity-70">Color: {item?.node.merchandise.title}</p>
          {/* <p className="opacity-70 mt-2">Seller: {item?.product?.brand}</p> */}
          <div className="flex space-x-2 items-center pt-3">
            <p className="opacity-50 line-through">
              {/* ₹{item?.node.merchandise.priceV2.amount * 100} */}
            </p>
            <p className="font-semibold text-lg">
              $
              {(
                item?.node.merchandise.priceV2.amount * item?.node.quantity
              ).toFixed(2)}
            </p>
            {/* <p className="text-green-600 font-semibold">10% off</p> */}
          </div>
        </div>
      </div>
      {showButton && (
        <div className="lg:flex items-center lg:space-x-10 pt-4">
          <div className="flex items-center space-x-2 ">
            <IconButton
              onClick={(e) =>
                handleUpdateCartMinus(e, item?.node?.id, item?.node?.quantity)
              }
              disabled={item?.node.quantity <= 1}
              color="primary"
              aria-label="add an alarm"
            >
              <RemoveCircleOutlineIcon />
            </IconButton>

            <span className="py-1 px-7 border rounded-sm">
              {item?.node.quantity}
            </span>
            <IconButton
              onClick={(e) =>
                handleUpdateCartPlus(e, item?.node?.id, item?.node?.quantity)
              }
              color="primary"
              aria-label="add an alarm"
            >
              <AddCircleOutlineIcon />
            </IconButton>
          </div>
          <div className="flex text-sm lg:text-base mt-5 lg:mt-0">
            <Button
              onClick={(e) => handleRemoveItemFromCart(e, item.node.id)}
              variant="contained"
              sx={{ bgcolor: grey[900] }}
            >
              Remove{" "}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartItem;
