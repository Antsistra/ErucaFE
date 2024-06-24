import { Button } from "@headlessui/react";
import Sidebar from "../Fragments/Sidebar";
import TableDemo from "../Fragments/TransactionTable";
import RegisterDialog from "../Fragments/RegisterDialog";
import FireDialog from "../Fragments/FireDialog";
import EmployeTable from "../Fragments/EmployeTable";

const EmployeLayout = () => {
  return (
    <>
      <Sidebar>
        <div className="flex flex-row gap-x-4 mb-4 mt-4">
          <RegisterDialog></RegisterDialog>
          <FireDialog></FireDialog>
        </div>
        <h1 className="text-xl font-bold">
          Daftar Pegawai
        </h1>
        <EmployeTable></EmployeTable>
      </Sidebar>
    </>
  );
};

export default EmployeLayout;
