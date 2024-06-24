import ProductContent from "../Fragments/ProductContent";
import Sidebar from "../Fragments/Sidebar";
import { Toaster } from "../ui/toaster";

const AdminProductLayout = () => {
  return (
    <div>
      <Toaster></Toaster>
      <Sidebar>
        <ProductContent></ProductContent>
      </Sidebar>
    </div>
  );
};

export default AdminProductLayout;
