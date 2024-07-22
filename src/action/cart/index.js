// import { get } from "../api/APIController";

import { getOrdersSuccess } from "../../Redux/Admin/Orders/ActionCreator";
import store from "../../Redux/Store";
import { deleteCall, get, post, putCall } from "../../api/config/APIController";

export const getCartItems = (x) => {
  let storedCartId = localStorage.getItem("cart_id");
  let cartId = JSON.parse(storedCartId)?.cartId;

  let url = `cart?cartId=${cartId}`;
  console.log("this is url", url);
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      get(url)
        .then((response) => {
          if (response.status === 200) {
            // console.log("this is new cart response", response.data);
            dispatch({
              type: "GET_CART_ITEMS",
              cartItems: response?.data,
            });
            resolve(response.data);
          }
        })
        .catch((error) => {
          dispatch({
            type: "GET_CART_ITEMS",
            cartItems: {},
          });
          reject(error);
        })
        .finally();
    });
  };
};

// public addToCart = (data: any) => {
//   return new Promise((resolve: any, reject: any) => {
//     this.instance
//       .post(API.ADD_TO_CART + "/" + Cart.getCartId(), data)
//       .then((response) => {
//         if (response.status == 200) {
//           let message = response.data.msg ?? "";
//           let cartItems: any = LocalStorageService.getCartItems();

//           if (cartItems) {
//             cartItems.push(data.data.id);
//           } else {
//             cartItems = [data.data.id];
//           }

//           LocalStorageService.setCartItems(cartItems);
//           useCartStore.setState({
//             count: cartItems.length,
//             cartItems: cartItems,
//           });
//           resolve(response);
//         } else {
//           let message = response.data.msg ?? "";
//           Toast.showError(message);
//           reject(response);
//         }
//       })
//       .catch((error) => {
//         console.log("Error", error);
//         Toast.showError(
//           JSON.parse(error.response.request.response).msg.detail
//         );
//         reject(error);
//       });
//   });
// };

export const getCustomerInfo = () => {
  return new Promise((resolve, reject) => {
    get("customer")
      .then((response) => {
        if (response.status === 200) {
          resolve(response.data);
        } else {
          reject(new Error("Failed to fetch customer info"));
        }
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const getCutomerOrdersNew = () => {
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      get("orders")
        .then((response) => {
          if (response.status === 200) {
            // console.log("this getCutomerOrdersNew", response.data);
            dispatch({
              type: "GET_ORDER_HISTORY_NEW",
              order: response?.data,
            });
            resolve(response.data);
          }
        })
        .catch((error) => {
          reject(error);
        })
        .finally();
    });
  };
};

export const AddItemToCartNew = (id) => {
  let data = {
    productVariantId: id,
    quantity: 1,
  };
  // localStorage.setItem("cart_id", null);
  let storedCartId = localStorage.getItem("cart_id");
  return new Promise((resolve, reject) => {
    if (!storedCartId) {
      post("createCart", data)
        .then((response) => {
          if (response.status === 200) {
            let cartId = response?.data?.data?.cartCreate?.cart?.id;
            localStorage.setItem(
              "cart_id",
              JSON.stringify({
                cartId: cartId,
              })
            );
            // Once cart is created, proceed to addToCart
            addToCart(id, cartId, resolve, reject);
          }
        })
        .catch((error) => {
          reject(error);
        });
    } else {
      let cartId = JSON.parse(storedCartId).cartId;
      // If cart already exists, directly call addToCart
      addToCart(id, cartId, resolve, reject);
    }
  });
};

function addToCart(id, cartId, resolve, reject) {
  let newData = {
    cartId: cartId,
    productVariantId: id,
    quantity: 1,
  };

  post("addToCart", newData)
    .then((secondResponse) => {
      if (secondResponse.status === 200) {
        store.dispatch({
          type: "GET_ORDER_HISTORY_NEW",
          order: secondResponse.data,
        });
        resolve(secondResponse.data);
      }
    })
    .catch((error) => {
      reject(error);
    });
}

export const RemoveCartItemNew = (id) => {
  let storedCartId = localStorage.getItem("cart_id");
  let cartId = JSON.parse(storedCartId)?.cartId;
  let data = {
    cartId: cartId,
    lineIds: [id],
  };
  console.log("this is data", data);
  // let data = {
  //   productVariantId: id,
  //   quantity: 1,
  // };
  // return (dispatch) => {
  return new Promise((resolve, reject) => {
    deleteCall("cart", data)
      .then((response) => {
        if (response.status === 200) {
          // console.log("this getCutomerOrdersNew", response.data);
          // dispatch({
          //   type: "GET_ORDER_HISTORY_NEW",
          //   order: response?.data,
          // });
          resolve(response.data);
        }
      })
      .catch((error) => {
        reject(error);
      })
      .finally();
  });
};
// };

export const updateCartQtyNEW = (id, qty) => {
  // let params = {
  //   lineId: id,
  //   quantity: qty,
  // };

  let storedCartId = localStorage.getItem("cart_id");
  let cartId = JSON.parse(storedCartId)?.cartId;
  let params = {
    cartId: cartId,
    lineId: id,
    quantity: qty,
  };

  return new Promise((resolve, reject) => {
    putCall(`cart`, params)
      .then((response) => {
        if (response.status == 200) {
          // store.dispatch({
          //   type: "GET_CART_ITEMS",
          //   items: response?.data,
          // });
          resolve(response?.data);
        } else {
          return false;
        }
      })
      .catch((error) => {
        return false;
      })
      .finally();
  });
};

export const placeOrder = async (data) => {
  return new Promise((resolve, reject) => {
    return post("checkout", data)
      .then((res) => {
        getCartItems();
        resolve(res);
        // getCustomerLoginCart();
      })
      .catch((error) => {
        reject(false);
        console.log(error);
      })
      .finally();
  });
};

export const checkoutNew = () => {
  let storedCartId = localStorage.getItem("cart_id");
  let cartId = JSON.parse(storedCartId)?.cartId;
  let url = `checkout?cartId=${cartId}`;

  return new Promise((resolve, reject) => {
    post(url)
      .then((response) => {
        if (response.status === 200) {
          resolve(response.data);
        }
      })
      .catch((error) => {
        reject(error);
      })
      .finally();
  });
};

export const getAllCategories = () => {
  return new Promise((resolve, reject) => {
    get("categories")
      .then((response) => {
        if (response.status === 200) {
          resolve(response.data);
        }
      })
      .catch((error) => {
        reject(error);
      })
      .finally();
  });
};

export const getProductsByCategory = (handle) => {
  return new Promise((resolve, reject) => {
    get(`categories/${handle}/products`)
      .then((response) => {
        if (response.status === 200) {
          resolve(response.data);
        }
      })
      .catch((error) => {
        reject(error);
      })
      .finally();
  });
};
