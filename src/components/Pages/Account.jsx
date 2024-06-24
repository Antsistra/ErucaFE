import useCheckUserRole from "@/hooks/useCheckUserRole";
import DashboardNav from "../Fragments/DashboardNav";
import { Input } from "../ui/input";
import AccountDetailsLayout from "../Layouts/AccountDetailsLayout";
import { Toaster } from "../ui/toaster";

const Account = () => {
  const isUser = useCheckUserRole();

  if (!isUser) {
    return null;
  }

  return (
    <>
      <Toaster></Toaster>
      <div>
        <DashboardNav>
          <div className="flex  ">
            <AccountDetailsLayout></AccountDetailsLayout>
          </div>
        </DashboardNav>
      </div>
    </>
  );
};

export default Account;
