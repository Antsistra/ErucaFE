import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";

const useCheckUserRole = () => {
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
    if (role && role !== "User") {
      window.location.href = "/login";
    }
  }, [role]);

  return role === "User";
};

export default useCheckUserRole;
