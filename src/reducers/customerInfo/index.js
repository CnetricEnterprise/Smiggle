const initialState = {};
const CUSTOMERInfoReducerNew = (state = initialState, action) => {
  switch (action.type) {
    case "GET_CUSTOMER_INFO":
      return {
        ...state,
        newUserInfo: action.user,
      };

    default:
      return state;
  }
};
export default CUSTOMERInfoReducerNew;
