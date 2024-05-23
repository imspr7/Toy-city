const initialState = {
  products: [],
  loading: false,
};

//all products reducer
export const productsReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_PRODUCTS_REQUEST":
      return { ...state, loading: true };
    case "GET_PRODUCTS_SUCCESS":
      return { ...state, loading: false, products: action.payload };
    case "GET_PRODUCTS_ERROR":
      return { ...state, loading: false, products: [], error: action.payload };
    default:
      return state;
  }
};
