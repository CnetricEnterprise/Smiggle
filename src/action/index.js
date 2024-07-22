// import { get } from "../api/APIController";

import { get } from "../api/config/APIController";
// import { useDispatch, useSelector } from "react-redux";
import { getCartItems } from "./cart";

export const receiveProducts = () => {
  return new Promise((resolve, reject) => {
    get("products")
      .then((response) => {
        if (response.status === 200) {
          // let data = response.data;

          // dispatch({
          //   type: "ACTUAL_PRODUCTS",
          //   products: data.products,
          // });
          resolve(response.data);
          // console.log("this is product response", response);
        }
      })
      .catch((error) => {
        reject(error);
      })
      .finally();
  });
};

export const algoliaSearchProducts = () => {
  return new Promise((resolve, reject) => {
    get("products2")
      .then((response) => {
        if (response.status === 200) {
          // let data = response.data;

          // dispatch({
          //   type: "ACTUAL_PRODUCTS",
          //   products: data.products,
          // });
          resolve(response.data);
          // console.log("this is product response", response);
        }
      })
      .catch((error) => {
        reject(error);
      })
      .finally();
  });
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

export const receiveProductsById = (id) => {
  console.log("this is id", id, "this is url", "products/" + id);
  let url = `products/${id}`;
  return new Promise((resolve, reject) => {
    get(url)
      .then((response) => {
        if (response.status === 200) {
          // let data = response.data;

          // dispatch({
          //   type: "ACTUAL_PRODUCTS",
          //   products: data.products,
          // });
          resolve(response.data);
          // console.log("this is product details response", response);
        }
      })
      .catch((error) => {
        reject(error);
      })
      .finally();
  });
};

export const ordersById = (id) => {
  let url = `order?orderId=${id}`;
  return new Promise((resolve, reject) => {
    get(url)
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

export const receiveProductsSearch = (search) => {
  return new Promise((resolve, reject) => {
    get(`search?query=${search}`)
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

export const receiveGetContent = () => {
  return new Promise((resolve, reject) => {
    get("getContent")
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
