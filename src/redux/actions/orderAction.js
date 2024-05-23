import axios from "../../api";

//redux for order
export const placeOrder = (data) => async (dispatch) => {
  try {
    dispatch({ type: "PLACE_ORDER_REQUEST" });
    const { userId, productId, totalPrice, address, country, cartId } = data;
    const response = await axios.post("/orders", {
      userId,
      productId,
      address,
      country,
      totalPrice,
      cartId,
    });

    return true;
  } catch (error) {
    console.log(error);
  }
};

export const getMyOrders = (id) => async (dispatch) => {
  try {
    dispatch({ type: "GET_MY_ORDERS_REQUEST" });
    const { data } = await axios.get(`/users/${id}/orders`);

    dispatch({ type: "GET_MY_ORDERS_SUCCESS", payload: data.orders });
    return false;
  } catch (error) {
    console.log(error);
  }
};

export const getOrderById = (id) => async (dispatch) => {
  try {
    dispatch({ type: "GET_ORDER_REQUEST" });
    const response = await axios.get(`/orders/${id}`);

    dispatch({ type: "GET_ORDER_SUCCESS", payload: response.data });
  } catch (error) {
    dispatch({ type: "GET_ORDER_ERROR", payload: error });
  }
};
