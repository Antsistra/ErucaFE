import { useEffect, useState } from "react";
import UserLayout from "../Layouts/UserLayout";
import { jwtDecode } from "jwt-decode";
import useCheckUserRole from "@/hooks/useCheckUserRole";

const UserDashboard = () => {
  const isUser = useCheckUserRole();

  if (!isUser) {
    return null;
  }
  return (
    <div>
      <UserLayout />
    </div>
  );
};

export default UserDashboard;
