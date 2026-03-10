"use client";

import Button from "@/components/ui/button/Button";
import IconButton from "@/components/ui/button/IconButton";
import Input from "@/components/ui/form/Input";
import Label from "@/components/ui/form/Label";
import Spinner from "@/components/ui/spinner/Spinner";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import useApiInfiniteScrollQuery from "@/hooks/api/useApiInfiniteScrollQuery";
import { useDebounce } from "@/hooks/useDebounce";
import { useFormat } from "@/hooks/useFormat";
import { PencilIcon, TrashBinIcon } from "@/icons";
import { DepositColumns } from "@/interfaces/DepositInterface";
import DepositService from "@/services/DepositService";
import { useEffect, useRef, useState } from "react";

interface DepositsTableProps {
  onAddDeposit: () => void;
  onEditDeposit: (depositData: DepositColumns) => void;
  onDeleteDeposit: (depositData: DepositColumns) => void;
  refreshDeposits: boolean;
}

export default function DepositsTable({
  onAddDeposit,
  onEditDeposit,
  onDeleteDeposit,
  refreshDeposits,
}: DepositsTableProps) {
  const { handleDateTimeFormat, handleNumberDecimalFormat } = useFormat();

  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");

  const debouncedDateFrom = useDebounce(dateFrom);
  const debouncedDateTo = useDebounce(dateTo);

  const tableRef = useRef<HTMLDivElement>(null);

  const {
    items: depositsData,
    load: loadDeposits,
    handleScroll,
    isLoading: isDepositsLoading,
    isLoadingMore: isDepositsLoadingMore,
    reset: resetDepositsTable,
  } = useApiInfiniteScrollQuery<DepositColumns>({
    apiService: (page) =>
      DepositService.loadDeposits(page, debouncedDateFrom, debouncedDateTo),
  });

  const onScroll = () => {
    handleScroll(tableRef.current);
  };

  useEffect(() => {
    resetDepositsTable();
    loadDeposits(1);
  }, [refreshDeposits, debouncedDateFrom, debouncedDateTo]);

  const headers = ["No.", "Amount", "Description", "Date Created", "Actions"];

  return (
    <>
      <div className="mb-4 flex flex-col-reverse gap-4 md:flex-row md:items-end md:justify-between">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="w-full md:w-72">
            <Label htmlFor="date_from">From</Label>
            <Input
              type="date"
              name="date_from"
              value={dateFrom}
              onChange={(e) => setDateFrom(e.target.value)}
            />
          </div>
          <div className="w-full md:w-72">
            <Label htmlFor="date_to">To</Label>
            <Input
              type="date"
              name="date_to"
              value={dateTo}
              onChange={(e) => setDateTo(e.target.value)}
            />
          </div>
        </div>
        <Button
          type="button"
          className="w-full md:w-auto"
          size="sm"
          onClick={onAddDeposit}
        >
          Add Petty Cash
        </Button>
      </div>
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/5 dark:bg-white/3">
        <div
          ref={tableRef}
          onScroll={onScroll}
          className="w-full max-h-[calc(100vh-20.5rem)] overflow-x-auto overflow-y-auto"
        >
          <div className="w-full min-w-full">
            <Table>
              {/* Table Header */}
              <TableHeader className="border-b border-gray-100 dark:border-white/5">
                <TableRow>
                  {headers.map((header) => (
                    <TableCell
                      isHeader
                      className="bg-brand-100 dark:bg-brand-900 sticky top-0 px-5 py-3 font-medium text-brand-500 dark:text-brand-400 text-start text-theme-xs whitespace-nowrap"
                      key={header}
                    >
                      {header}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHeader>

              {/* Table Body */}
              <TableBody className="divide-y divide-gray-100 dark:divide-white/5">
                {isDepositsLoading && depositsData.length <= 0 && (
                  <TableRow>
                    <TableCell
                      className="px-4 py-3 text-gray-500 text-center text-theme-sm dark:text-gray-400"
                      colSpan={headers.length}
                    >
                      <div className="flex items-center justify-center">
                        <Spinner size="md" />
                      </div>
                    </TableCell>
                  </TableRow>
                )}

                {depositsData.map((depositData, index) => (
                  <TableRow
                    className="hover:bg-gray-100 dark:hover:bg-gray-800"
                    key={depositData.deposit_id}
                  >
                    <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400 whitespace-nowrap">
                      {index + 1}
                    </TableCell>
                    <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400 whitespace-nowrap">
                      {handleNumberDecimalFormat(depositData.amount)}
                    </TableCell>
                    <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400 whitespace-nowrap">
                      {depositData.description}
                    </TableCell>
                    <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400 whitespace-nowrap">
                      {handleDateTimeFormat(depositData.created_at)}
                    </TableCell>
                    <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400 whitespace-nowrap">
                      <div className="flex gap-2">
                        <IconButton
                          type="button"
                          size="icon"
                          variant="ghost"
                          className="hover:text-blue-600"
                          onClick={() => onEditDeposit(depositData)}
                        >
                          <PencilIcon />
                        </IconButton>
                        <IconButton
                          type="button"
                          size="icon"
                          variant="ghost"
                          className="hover:text-red-600"
                          onClick={() => onDeleteDeposit(depositData)}
                        >
                          <TrashBinIcon />
                        </IconButton>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}

                {isDepositsLoadingMore && (
                  <TableRow>
                    <TableCell
                      className="px-4 py-3 text-gray-500 text-center text-theme-sm dark:text-gray-400"
                      colSpan={headers.length}
                    >
                      <div className="flex items-center justify-center">
                        <Spinner size="md" />
                      </div>
                    </TableCell>
                  </TableRow>
                )}

                {!isDepositsLoading && depositsData.length <= 0 && (
                  <TableRow>
                    <TableCell
                      className="px-4 py-3 text-gray-500 text-center text-theme-sm dark:text-gray-400"
                      colSpan={headers.length}
                    >
                      No Record Found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </>
  );
}
