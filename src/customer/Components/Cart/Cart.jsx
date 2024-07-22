import React, { useState, useEffect } from "react";
import CartItem from "./CartItem";
import { Badge, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getCart } from "../../../Redux/Customers/Cart/Action";
import {
  RemoveCartItemNew,
  getCartItems,
  updateCartQtyNEW,
  checkoutNew,
} from "../../../action/cart";
import { grey } from "@mui/material/colors";
import EmptyCart from "./EmptyCart";
import toast, { Toaster } from "react-hot-toast";

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const jwt = localStorage.getItem("jwt");
  const { cartItems } = useSelector((store) => store);
  const [amount, setAmount] = useState(0);

  useEffect(() => {
    if (cartItems?.cartItems?.data?.cart?.lines?.edges?.length > 0) {
      // Calculate total amount
      const totalAmount = cartItems.cartItems.data.cart.lines.edges.reduce(
        (acc, edge) => acc + parseFloat(edge.node.cost.totalAmount.amount),
        0
      );
      setAmount(totalAmount.toFixed(2)); // Round to 2 decimal places
    }
  }, [cartItems]);

  const handleRemoveItemFromCart = (e, id) => {
    e.preventDefault();
    RemoveCartItemNew(id).then((res) => {
      dispatch(getCartItems());
      if (res.data.cartLinesUpdate.cart.id) {
        toast.success(
          `You've changed QUANTITY to ${res.data.cartLinesUpdate.cart.totalQuantity} items`,
          {
            style: {
              borderRadius: "10px",
              background: "#333",
              color: "#fff",
            },
          }
        );
      }
    });
  };

  const handleUpdateCartPlus = (e, lineId, qty) => {
    e.preventDefault();
    updateCartQtyNEW(lineId, qty + 1).then((res) => {
      dispatch(getCartItems());
      // toast.success("Item added to cart");
    });
  };

  const handleUpdateCartMinus = (e, lineId, qty) => {
    e.preventDefault();
    if (qty !== 1) {
      updateCartQtyNEW(lineId, qty - 1).then((res) => {
        dispatch(getCartItems());
      });
    } else {
      handleRemoveItemFromCart(e, lineId);
    }
  };

  const handleCheckout = () => {
    checkoutNew().then((res) => {
      window.location.href = res.data.cart.checkoutUrl;
      dispatch(getCartItems());
      localStorage.removeItem("cart_id");
    });
  };

  useEffect(() => {
    dispatch(getCartItems());
  }, []);

  return (
    <div className="">
      {cartItems?.cartItems?.data?.cart?.lines?.edges?.length > 0 ? (
        <div className="lg:grid grid-cols-3 lg:px-16 relative">
          <div className="lg:col-span-2 lg:px-5 bg-white">
            <div className=" space-y-3">
              {cartItems?.cartItems?.data?.cart?.lines?.edges.map((item) => (
                <CartItem
                  key={item.node.id}
                  item={item}
                  showButton={true}
                  handleRemoveItemFromCart={handleRemoveItemFromCart}
                  handleUpdateCartPlus={handleUpdateCartPlus}
                  handleUpdateCartMinus={handleUpdateCartMinus}
                />
              ))}
            </div>
          </div>
          <div className="px-5 sticky top-0 h-[100vh] mt-5 lg:mt-0 ">
            <div className="border p-5 bg-white shadow-lg rounded-md">
              <p className="font-bold opacity-60 pb-4">PRICE DETAILS</p>
              <hr />

              <div className="space-y-3 font-semibold">
                <div className="flex justify-between pt-3 text-black ">
                  <span>
                    Price ({cartItems?.cartItems?.cart?.totalQuantity}/ item)
                  </span>
                  <span>{amount}</span>
                </div>
                <div className="flex justify-between">
                  <span>Discount</span>
                  <span className="text-green-700">$0</span>
                </div>
                <div className="flex justify-between">
                  <span>Delivery Charges</span>
                  <span className="text-green-700">Free</span>
                </div>
                <hr />
                <div className="flex justify-between font-bold text-lg">
                  <span>Total Amount</span>
                  <span className="text-green-700">${amount}</span>
                </div>
              </div>

              <Button
                // onClick={() => navigate("/checkout?step=2")}
                onClick={handleCheckout}
                variant="contained"
                type="submit"
                sx={{
                  padding: ".8rem 2rem",
                  marginTop: "2rem",
                  width: "100%",
                  bgcolor: grey[900],
                }}
              >
                Check Out
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <EmptyCart />
      )}
      <Toaster position="bottom-center" reverseOrder={false} />
    </div>
  );
};

export default Cart;
