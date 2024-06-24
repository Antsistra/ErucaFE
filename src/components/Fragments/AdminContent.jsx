import React, { useEffect, useState } from "react";
import DefaultCard from "./DefaultCard";
import TransactionTable from "./TransactionTable";
import { axiosInstance } from "@/lib/axios";
import SalesChart from "./SalesChart";
import QuantityChart from "./QuantityChart";

const AdminContent = () => {
  const [income, setIncome] = useState(0);
  const [totalSales, setTotalSales] = useState(0);
  const [hotProduct, setHotProduct] = useState("");
  const [hotSales, setHotSales] = useState(0);
  const [salesData, setSalesData] = useState([]);
  const [quantityData, setQuantityData] = useState([]);
  const [chartType, setChartType] = useState("daily");

  useEffect(() => {
    axiosInstance.get("/wallet").then((res) => {
      setIncome(res.data[0].income);
      setTotalSales(res.data[0].totalSales);
    });
  }, []);

  useEffect(() => {
    axiosInstance
      .get("/transaction/hot-product")
      .then((res) => {
        setHotProduct(res.data.name);
        setHotSales(res.data.totalQuantity);
      });
  }, []);

  useEffect(() => {
    axiosInstance
      .get(`/transaction/sales-data?type=${chartType}`)
      .then((res) => {
        setSalesData(res.data);
      });
  }, [chartType]);

  useEffect(() => {
    axiosInstance
      .get(`/transaction/quantity-data?type=${chartType}`)
      .then((res) => {
        setQuantityData(res.data);
      });
  }, [chartType]);

  return (
    <>
      <div className="text-2xl font-bold md:p-0 mt-4">
        <div className="lg:flex lg:flex-row lg:gap-x-8 justify-center items-center lg:items-start lg:justify-start mt-4 lg:mt-0 flex flex-col gap-y-4">
          <DefaultCard
            title={"Pendapatan"}
            content={`Rp ${new Intl.NumberFormat(
              "id-ID"
            ).format(income)}`}></DefaultCard>
          <DefaultCard
            title={"Total Penjualan"}
            content={`${totalSales} pcs`}></DefaultCard>
          <DefaultCard
            title={"Produk Terlaris "}
            content={`${hotProduct} (${hotSales}) pcs`}></DefaultCard>
        </div>
        <div className="flex lg:flex-row flex-col">
          <div className="lg:w-1/2">
            <SalesChart
              salesData={salesData}
              chartType={chartType}
              setChartType={setChartType}
            />
          </div>
          <div className="lg:w-1/2">
            <QuantityChart
              quantityData={quantityData}
              chartType={chartType}
              setChartType={setChartType}
            />
          </div>
        </div>
        <div className="mt-14 pb-12 ">
          <h1 className="mb-4">Detail Transaksi</h1>
          <TransactionTable></TransactionTable>
        </div>
      </div>
    </>
  );
};

export default AdminContent;
