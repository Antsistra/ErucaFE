import { useEffect, useState } from "react";
import CashierLayout from "../Layouts/CashierLayout";
import { Toaster } from "../ui/toaster";
import { jwtDecode } from "jwt-decode";

const CashierDashboard = () => {
  const [token, setToken] = useState(
    localStorage.getItem("token")
  );
  const [role, setRole] = useState("");

  useEffect(() => {
    if (token) {
      const decoded = jwtDecode(token);
      setRole(decoded.Role);
    } else {
      window.location.href = "/login";
    }
  }, [token]);

  useEffect(() => {
    if (role && role !== "Cashier") {
      window.location.href = "/login";
    }
  }, [role]);

  if (role !== "Cashier") {
    return null;
  }
  return (
    <>
      <Toaster></Toaster>
      <CashierLayout></CashierLayout>
    </>
  );
};

export default CashierDashboard;
