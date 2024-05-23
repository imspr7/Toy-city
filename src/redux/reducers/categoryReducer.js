const initialState = {
  products: [],
  loading: false,
};

//reducer category
export const categoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case "PRODUCT_CATEGORY_REQUEST":
      return { ...state, loading: true };
    case "PRODUCT_CATEGORY_SUCCESS":
      return { ...state, loading: false, products: action.payload };
    case "PRODUCT_CATEGORY_ERROR":
      return { ...state, loading: false, products: [], error: action.payload };
    default:
      return state;
  }
};
