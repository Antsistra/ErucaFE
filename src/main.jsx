import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import LoginPage from "./components/Pages/LoginPage.jsx";
import LandingPage from "./components/Pages/Landing.jsx";

import CashierDashboard from "./components/Pages/CashierDashboard";
import AdminDashboard from "./components/Pages/AdminDashboard";
import AdminProduct from "./components/Pages/AdminProduct";
import Employe from "./components/Pages/Employe";
import UserDashboard from "./components/Pages/UserDashboard";
import DetailProduct from "./components/Pages/DetailProduct";

import Account from "./components/Pages/Account";
import ErrorPage from "./components/Pages/ErrorPage";
import ForgotPassword from "./components/Pages/ForgotPassword";

// Import ThemeProvider
import ThemeProvider from "./context/ThemeContext";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/",
    element: <LandingPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/cashier/dashboard",
    element: <CashierDashboard />,
  },
  {
    path: "/admin/dashboard",
    element: <AdminDashboard />,
  },
  {
    path: "/admin/dashboard/product",
    element: <AdminProduct />,
  },
  {
    path: "/admin/dashboard/employe",
    element: <Employe />,
  },
  {
    path: "/dashboard",
    element: <UserDashboard />,
  },
  {
    path: "/dashboard/product/:id",
    element: <DetailProduct />,
  },
  {
    path: "/dashboard/account-details",
    element: <Account />,
  },
  {
    path: "/forgot-password",
    element: <ForgotPassword />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider>
      <RouterProvider router={router} />
    </ThemeProvider>
  </React.StrictMode>
);
