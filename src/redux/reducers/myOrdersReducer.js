const initialState = {
  orders: [],
  loading: false,
};

//reducer for myorders
export const myOrdersReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_MY_ORDERS_REQUEST":
      return { ...state, loading: true };
    case "GET_MY_ORDERS_SUCCESS":
      return { ...state, loading: false, orders: action.payload };
    case "GET_MY_ORDERS_ERROR":
      return { ...state, loading: false, orders: [], error: action.payload };
    default:
      return state;
  }
};
