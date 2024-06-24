import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { axiosInstance } from "@/lib/axios";
import { useEffect, useState } from "react";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

const StockTable = () => {
  const [product, setProduct] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    axiosInstance.get("/detailLiquid/stock").then((res) => {
      setProduct(res.data);
    });
  }, []);

  const getStatus = (stock) => {
    if (stock > 15) return "Banyak";
    if (stock > 0 && stock <= 15) return "Sedikit";
    if (stock === 0) return "Need Restock";
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = product.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const totalPages = Math.ceil(
    product.length / itemsPerPage
  );

  const handleClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <>
      <Table>
        <TableCaption>A list of Stock </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">
              Stock
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {currentItems.map((product) => (
            <TableRow key={product.id}>
              <TableCell>{product.name}</TableCell>
              <TableCell>
                {getStatus(product.stock)}
              </TableCell>
              <TableCell className="text-right">{`${product.stock} Pcs`}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              href="#"
              onClick={() =>
                handleClick(
                  currentPage > 1 ? currentPage - 1 : 1
                )
              }
            />
          </PaginationItem>
          {[...Array(totalPages)].map((_, index) => (
            <PaginationItem key={index}>
              <PaginationLink
                href="#"
                onClick={() => handleClick(index + 1)}>
                {index + 1}
              </PaginationLink>
            </PaginationItem>
          ))}
          <PaginationItem>
            <PaginationNext
              href="#"
              onClick={() =>
                handleClick(
                  currentPage < totalPages
                    ? currentPage + 1
                    : totalPages
                )
              }
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </>
  );
};

export default StockTable;
