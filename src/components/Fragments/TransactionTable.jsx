import React, { useEffect, useState } from "react";
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
import { format, isSameDay } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const itemsPerPage = 5;

const TransactionTable = () => {
  const [transactions, setTransactions] = useState([]);
  const [filteredTransactions, setFilteredTransactions] =
    useState([]);
  const [date, setDate] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    axiosInstance.get("/transaction").then((res) => {
      // Sort transactions by date in descending order
      const sortedTransactions = res.data.sort(
        (a, b) =>
          new Date(b.createdAt) - new Date(a.createdAt)
      );
      setTransactions(sortedTransactions);
    });
  }, []);

  useEffect(() => {
    if (date) {
      setFilteredTransactions(
        transactions.filter((transaction) =>
          isSameDay(new Date(transaction.createdAt), date)
        )
      );
    } else {
      setFilteredTransactions(transactions);
    }
    setCurrentPage(1); // Reset to the first page when date changes
  }, [date, transactions]);

  const handleNextPage = () => {
    if (
      currentPage * itemsPerPage <
      filteredTransactions.length
    ) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentTransactions = filteredTransactions.slice(
    startIndex,
    endIndex
  );

  const totalPages = Math.ceil(
    filteredTransactions.length / itemsPerPage
  );

  return (
    <>
      <div className="flex flex-row justify-end">
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={"outline"}
              className={cn(
                "w-[280px] justify-start text-left font-normal",
                !date && "text-muted-foreground"
              )}>
              <CalendarIcon className="mr-2 h-4 w-4" />
              {date ? (
                format(date, "PPP")
              ) : (
                <span>Pick a date</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              initialFocus
            />
          </PopoverContent>
        </Popover>
      </div>
      <Table>
        <TableCaption>
          A list of your recent invoices.
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead className="w-[100px]">
              Quantity
            </TableHead>
            <TableHead>Total Price</TableHead>
            <TableHead className="text-right">
              Date
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {currentTransactions.map((transaction) => (
            <TableRow key={transaction.id}>
              <TableCell className="font-medium">
                {transaction.name}
              </TableCell>
              <TableCell>{`${transaction.qty} Pcs`}</TableCell>
              <TableCell>{`Rp ${new Intl.NumberFormat(
                "id-ID"
              ).format(
                transaction.totalPrice
              )}`}</TableCell>
              <TableCell className="text-right">
                {new Intl.DateTimeFormat("en-GB", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                }).format(new Date(transaction.createdAt))}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="flex justify-between items-center mt-4">
        <button
          className="px-2 py-2 bg-blue-500 text-white rounded text-sm hover:bg-blue-600 disabled:opacity-50"
          onClick={handlePreviousPage}
          disabled={currentPage === 1}>
          Previous
        </button>
        <span className="text-gray-700 text-sm mr-8">
          Page {currentPage} of {totalPages}
        </span>
        <button
          className="px-2 py-2 text-sm bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
          onClick={handleNextPage}
          disabled={
            currentPage * itemsPerPage >=
            filteredTransactions.length
          }>
          Next
        </button>
      </div>
      <div className="flex justify-center mt-2 text-sm">
        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index}
            className={`mx-1 px-3 py-1 rounded ${
              currentPage === index + 1
                ? "bg-blue-600 text-white"
                : "bg-gray-300 text-gray-700 hover:bg-gray-400"
            }`}
            onClick={() => setCurrentPage(index + 1)}>
            {index + 1}
          </button>
        ))}
      </div>
    </>
  );
};

export default TransactionTable;
