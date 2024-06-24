import CardDetail from "../ui/cardDetail";
import { Input } from "../ui/input";
import Promo from "./Promo";

import UserProduct from "./UserProduct";

const DashboardContent = () => {
  return (
    <>
      <div className="mt-4 lg:pl-48 lg:pr-48">
        <UserProduct></UserProduct>
      </div>
    </>
  );
};

export default DashboardContent;
