const initialState = {
  product: null,
  loading: false,
};

//reducer for product
export const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_PRODUCT_REQUEST":
      return { ...state, loading: true };
    case "GET_PRODUCT_SUCCESS":
      return { ...state, loading: false, product: action.payload };
    case "GET_PRODUCT_ERROR":
      return {
        ...state,
        loading: false,
        product: null,
        error: action.payload,
      };
    default:
      return state;
  }
};
