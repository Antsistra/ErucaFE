import { jwtDecode } from "jwt-decode";
import { useEffect } from "react";

const useRedirectBasedOnRole = (token) => {
  useEffect(() => {
    if (token) {
      const { Role } = jwtDecode(token);

      switch (Role) {
        case "User":
          window.location.href = "/dashboard";
          break;
        case "Admin":
          window.location.href = "/admin/dashboard";
          break;
        case "Cashier":
          window.location.href = "/cashier/dashboard";
          break;
        default:
          break;
      }
    }
  }, [token]);
};

export default useRedirectBasedOnRole;
