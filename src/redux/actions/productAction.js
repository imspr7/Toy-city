import axios from "../../api";

//reduc for product
export const getAllProducts = () => async (dispatch) => {
  try {
    dispatch({ type: "GET_PRODUCTS_REQUEST" });

    const response = await axios.get("/product");
    dispatch({ type: "GET_PRODUCTS_SUCCESS", payload: response.data });
  } catch (error) {
    dispatch({ type: "GET_PRODUCTS_ERROR", payload: error });
  }
};

export const getProductById = (id) => async (dispatch) => {
  try {
    dispatch({ type: "GET_PRODUCT_REQUEST" });
    const response = await axios.get(`/product/${id}`);

    dispatch({ type: "GET_PRODUCT_SUCCESS", payload: response.data });
  } catch (error) {
    dispatch({ type: "GET_PRODUCT_ERROR", payload: error });
  }
};

export const getProductsByCategory = (category) => async (dispatch) => {
  try {
    dispatch({ type: "PRODUCT_CATEGORY_REQUEST" });
    const { data } = await axios.get(`/products/${category}`);

    dispatch({ type: "PRODUCT_CATEGORY_SUCCESS", payload: data });
  } catch (error) {
    dispatch({ type: "PRODUCT_CATEGORY_ERROR", payload: error });
  }
};
