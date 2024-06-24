import { useEffect, useState } from "react";
import AdminProductLayout from "../Layouts/AdminProductLayouts";
import useCheckAdminRole from "@/hooks/useCheckAdminRole";

const AdminProduct = () => {
  const isAdmin = useCheckAdminRole();

  if (!isAdmin) {
    return null;
  }

  return (
    <>
      <AdminProductLayout></AdminProductLayout>
    </>
  );
};
export default AdminProduct;
