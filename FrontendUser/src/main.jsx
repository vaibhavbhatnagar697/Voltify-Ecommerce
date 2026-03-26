import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import Register from "./Auth/Register.jsx";
import MailVerification from "./Auth/MailVerification.jsx";
import Login from "./Auth/Login.jsx";
import ForgotPass from "./Auth/ForgotPass.jsx";
import ResetPass from "./Auth/ResetPass.jsx";
import ProductPage from "./Product/ProductPage.jsx";
import Cart from "./Cart/Cart.jsx";
import "react-toastify/dist/ReactToastify.css";
import ProductDetails from "./Product/ProductDetails.jsx";
import Order from "./Order/Order.jsx";
import Profile from "./Profile/Profile.jsx";
import OrderDetails from "./Order/OrderDetails.jsx";
import Success from "./Misc/Success.jsx";
import Cancel from "./Misc/Cancel.jsx";
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Navigate to="/register" />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "mail-verification",
        element: <MailVerification />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "forgot-password",
        element: <ForgotPass />,
      },
      {
        path: "reset-password",
        element: <ResetPass />,
      },
      {
        path: "products",
        element: <ProductPage />,
      },
      {
        path: "view-cart",
        element: <Cart />,
      },

      {
        path: "product-details",
        element: <ProductDetails />,
      },
      {
        path: "Orders",
        element: <Order />,
      },
      {
        path: "profile",
        element: <Profile />,
      },
      {
        path: "order-details",
        element: <OrderDetails />,
      },
      {
        path: "success",
        element: <Success />,
      },
      {
        path: "cancel",
        element: <Cancel />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
