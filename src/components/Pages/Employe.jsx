import EmployeLayout from "../Layouts/EmployeLayout";
import { Toaster } from "../ui/toaster";
import useCheckAdminRole from "@/hooks/useCheckAdminRole";

const Employe = () => {
  const isAdmin = useCheckAdminRole();

  if (!isAdmin) {
    return null;
  }

  return (
    <>
      <Toaster></Toaster>
      <EmployeLayout></EmployeLayout>
    </>
  );
};

export default Employe;
