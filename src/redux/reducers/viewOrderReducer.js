const initialState = {
  order: null,
  loading: false,
};

//reducer for order view
export const viewOrderReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_ORDER_REQUEST":
      return { ...state, loading: true };
    case "GET_ORDER_SUCCESS":
      return { ...state, loading: false, order: action.payload };
    case "GET_ORDER_ERROR":
      return {
        ...state,
        loading: false,
        order: null,
        error: action.payload,
      };
    default:
      return state;
  }
};
