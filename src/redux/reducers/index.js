import { combineReducers } from "redux";
import { userReducer } from "./userReducers";
import { productsReducer } from "./allProductsReducers";
import { productReducer } from "./productReducer";
import { categoryReducer } from "./categoryReducer";
import { myOrdersReducer } from "./myOrdersReducer";
import { viewOrderReducer } from "./viewOrderReducer";

//reducer store
export default combineReducers({
  user: userReducer,
  products: productsReducer,
  product: productReducer,
  category: categoryReducer,
  myOrders: myOrdersReducer,
  viewOrder: viewOrderReducer,
});
