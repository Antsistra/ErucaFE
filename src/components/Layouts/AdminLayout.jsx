import AdminContent from "../Fragments/AdminContent";
import DefaultCard from "../Fragments/DefaultCard";
import Sidebar from "../Fragments/Sidebar";

const AdminLayout = () => {
  return (
    <>
      <Sidebar>
        <AdminContent></AdminContent>
      </Sidebar>
    </>
  );
};

export default AdminLayout;
