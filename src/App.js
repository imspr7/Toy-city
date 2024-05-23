import "./styles/App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";
import { io } from "socket.io-client";
import { useDispatch, useSelector } from "react-redux";
import { addNotification } from "./redux/actions/userAction";

const Navigation = lazy(() => import("./components/Navigation.js"));
const Home = lazy(() => import("./pages/Home.js"));
const Signup = lazy(() => import("./pages/Signup.js"));
const Login = lazy(() => import("./pages/Login.js"));
const AddProduct = lazy(() => import("./pages/AddProduct.js"));
const ProductPage = lazy(() => import("./pages/ProductPage.js"));
const AllProductPage = lazy(() => import("./pages/AllProductPage.js"));
const Cart = lazy(() => import("./pages/Cart.js"));
const MyOrders = lazy(() => import("./pages/MyOrders.js"));
const AdminDashboard = lazy(() => import("./pages/AdminDashBoard.js"));
const EditProduct = lazy(() => import("./pages/EditProduct.js"));
const ViewOrder = lazy(() => import("./pages/ViewOrder.js"));
const NotFound = lazy(() => import("./pages/404/NotFound.js"));

//App component
function App() {

  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  useEffect(() => {
    const socket = io("ws:kid-city-backend.vercel.app");
    socket.off("notification").on("notification", (msgObj, user_id) => {
      if (user_id === user._id) {
        dispatch(addNotification(msgObj));
      }
    });

    socket.off("new-order").on("new-order", (msgObj) => {
      if (user.isAdmin) {
        dispatch(addNotification(msgObj));
      }
    });
  
  }, [dispatch]);
  return (
    <div className="App">
      <BrowserRouter>
        <Navigation />
        <ToastContainer />
        <Suspense fallback={<div>Page is Loading...</div>}>
          <Routes>
            <Route index element={<Home />} />
            <Route path="login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/product/:id" element={<ProductPage />} />
            <Route path="/products/:category" element={<AllProductPage />} />
            <Route path="/404" element={<NotFound />} />
            <Route path="*" element={<Navigate replace to="/404" />} />
            {!user?.isAdmin && (
              <>
                <Route path="/cart" element={<Cart />} />
                <Route path="/orders/:id" element={<MyOrders />} />
              </>
            )}
            {user?.isAdmin && (
              <>
                <Route path="/add-product" element={<AddProduct />} />
                <Route path="/product/edit/:id" element={<EditProduct />} />
                <Route path="/admin" element={<AdminDashboard />} />
                <Route path="/viewOrder/:id" element={<ViewOrder />} />
              </>
            )}
          </Routes>
        </Suspense>
      </BrowserRouter>
    </div>
  );
}

export default App;
