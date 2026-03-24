import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";

import User_list from "./Users/User_list.jsx";
import Add_products from "./Products/Add_products.jsx";
import Products_list from "./Products/Products_list.jsx";
import Edit_products from "./Products/Edit_products.jsx";
import "react-toastify/dist/ReactToastify.css";
import AdminLogin from "./Auth/AdminLogin.jsx";
import AdminRegister from "./Auth/AdminRegister.jsx";
import "./index.css";
import OrderStatus from "./Orders/OrderStatus.jsx";
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Navigate to="/Admin-register" />,
      },
      {
        path: "Admin-register",
        element: <AdminRegister />,
      },

      {
        path: "user-list",
        element: <User_list />,
      },
      {
        path: "add-products",
        element: <Add_products />,
      },
      {
        path: "products-list",
        element: <Products_list />,
      },
      {
        path: "edit-product",
        element: <Edit_products />,
      },

      {
        path: "Admin-login",
        element: <AdminLogin />,
      },
      {
        path: "order-status",
        element: <OrderStatus />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
