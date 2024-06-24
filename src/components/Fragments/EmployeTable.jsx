import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TableFooter,
} from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useEffect, useState } from "react";
import { axiosInstance } from "@/lib/axios";

const EmployeTable = () => {
  const [employe, setEmploye] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    axiosInstance.get("/auth/employe").then((res) => {
      setEmploye(res.data);
    });
  }, []);

  // Calculate the data to be displayed on the current page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = employe.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  // Calculate the total number of pages
  const totalPages = Math.ceil(
    employe.length / itemsPerPage
  );

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <>
      <Table>
        <TableCaption>
          This is All Your Employe
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="">Name</TableHead>
            <TableHead className="hidden md:table-cell">
              Email
            </TableHead>
            <TableHead className="text-right">
              Role
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {currentItems.map((employe) => (
            <TableRow key={employe.id}>
              <TableCell className="font-medium">
                {employe.name}
              </TableCell>

              <TableCell className="hidden md:table-cell">
                {employe.email}
              </TableCell>
              <TableCell className="text-right">
                {employe.role}
              </TableCell>
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
                handlePageChange(
                  currentPage > 1 ? currentPage - 1 : 1
                )
              }
            />
          </PaginationItem>
          {Array.from(
            { length: totalPages },
            (_, index) => (
              <PaginationItem key={index}>
                <PaginationLink
                  href="#"
                  onClick={() =>
                    handlePageChange(index + 1)
                  }>
                  {index + 1}
                </PaginationLink>
              </PaginationItem>
            )
          )}
          <PaginationItem>
            <PaginationNext
              href="#"
              onClick={() =>
                handlePageChange(
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

export default EmployeTable;
