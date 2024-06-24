import AdminContent from "../Fragments/AdminContent";
import AdminLayout from "../Layouts/AdminLayout";
import useCheckAdminRole from "../../hooks/useCheckAdminRole";

const AdminDashboard = () => {
  const isAdmin = useCheckAdminRole();

  if (!isAdmin) {
    return null;
  }

  return (
    <div>
      <AdminLayout />
    </div>
  );
};

export default AdminDashboard;
