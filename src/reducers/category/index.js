// Define action types
const FETCH_PRODUCTS_REQUEST = "FETCH_PRODUCTS_REQUEST";
const FETCH_PRODUCTS_SUCCESS = "FETCH_PRODUCTS_SUCCESS";
const FETCH_PRODUCTS_FAILURE = "FETCH_PRODUCTS_FAILURE";

// Initial state
const initialState = {
  loading: false,
  products: [],
  error: null,
};

// Reducer function
const productsByCategoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PRODUCTS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FETCH_PRODUCTS_SUCCESS:
      return {
        ...state,
        loading: false,
        products: action.payload,
        error: null,
      };
    case FETCH_PRODUCTS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default productsByCategoryReducer;
