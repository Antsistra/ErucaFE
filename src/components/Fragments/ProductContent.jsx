import { Button } from "@headlessui/react";
import TableDemo from "./TransactionTable";
import AddStockButton from "./AddStockBtn";
import AddProductBtn from "./AddProductBtn";
import StockTable from "./StockTable";
import DeleteProductBtn from "./DeleteProductBtn";
import { Toaster } from "../ui/toaster";

const ProductContent = () => {
  return (
    <>
      <Toaster></Toaster>
      <div className="flex  flex-col  gap-y-4 md:flex-row justify-end gap-x-4 mb-4 mt-4">
        <DeleteProductBtn></DeleteProductBtn>
        <AddProductBtn></AddProductBtn>
        <AddStockButton></AddStockButton>
      </div>
      <div>
        <h1 className="text-xl font-bold mb-8">
          Detail Stock Product
        </h1>
        <StockTable></StockTable>
      </div>
    </>
  );
};

export default ProductContent;
