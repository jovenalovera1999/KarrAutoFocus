import Button from "@/components/ui/button/Button";
import Input from "@/components/ui/form/Input";
import Label from "@/components/ui/form/Label";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useFormat } from "@/hooks/useFormat";
import { useEffect, useRef, useState } from "react";
import { PencilIcon, TrashBinIcon } from "@/icons/index";
import Spinner from "@/components/ui/spinner/Spinner";
import { useDebounce } from "@/hooks/useDebounce";
import IconButton from "@/components/ui/button/IconButton";
import { OfficeExpenseColumns } from "@/interfaces/OfficeExpenseInterface";
import useApiInfiniteScrollQuery from "@/hooks/api/useApiInfiniteScrollQuery";
import OfficeExpenseService from "@/services/OfficeExpenseService";

interface OfficeExpensesTableProps {
  onAddExpense: () => void;
  refreshExpenses: boolean;
}

export default function OfficeExpensesTable({
  onAddExpense,
  refreshExpenses,
}: OfficeExpensesTableProps) {
  const { handleNumberDecimalFormat, handleDateFormat, handleDateTimeFormat } =
    useFormat();

  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");

  const debouncedDateFrom = useDebounce(dateFrom);
  const debouncedDateTo = useDebounce(dateTo);

  const tableRef = useRef<HTMLDivElement>(null);

  const {
    items: officeExpenses,
    load: loadOfficeExpenses,
    handleScroll,
    isLoading: isOfficeExpensesLoading,
    isLoadingMore: isMoreOfficeExpensesLoading,
    reset: resetExpensesTable,
  } = useApiInfiniteScrollQuery<OfficeExpenseColumns>({
    apiService: (page) =>
      OfficeExpenseService.loadOfficeExpenses(
        page,
        debouncedDateFrom,
        debouncedDateTo,
      ),
  });

  const onScroll = () => {
    handleScroll(tableRef.current);
  };

  useEffect(() => {
    resetExpensesTable();
    loadOfficeExpenses(1);
  }, [refreshExpenses]);

  const headers = [
    "No.",
    "Incurrence Date",
    "Amount",
    "Description",
    "Date Added",
    "Actions",
  ];

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
              autoFocus
            />
          </div>
          <div className="w-full md:w-72">
            <Label htmlFor="date_to">To</Label>
            <Input
              type="date"
              name="date_to"
              value={dateTo}
              onChange={(e) => setDateTo(e.target.value)}
              autoFocus
            />
          </div>
        </div>
        <Button
          type="button"
          className="w-full md:w-auto"
          onClick={onAddExpense}
        >
          Add Expenses
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
                      className="bg-brand-100 dark:bg-brand-900 sticky top-0 px-5 py-3 font-medium text-brand-500 dark:text-brand-400 text-start text-theme-xs"
                      key={header}
                    >
                      {header}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHeader>

              {/* Table Body */}
              <TableBody className="divide-y divide-gray-100 dark:divide-white/5">
                {isOfficeExpensesLoading && officeExpenses.length <= 0 && (
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

                {officeExpenses.map((officeExpense, index) => (
                  <TableRow
                    className="hover:bg-gray-100 dark:hover:bg-gray-800"
                    key={officeExpense.expense_id}
                  >
                    <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                      {index + 1}
                    </TableCell>
                    <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                      {handleDateFormat(officeExpense.incurrence_date)}
                    </TableCell>
                    <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                      {handleNumberDecimalFormat(officeExpense.amount)}
                    </TableCell>
                    <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                      {officeExpense.description}
                    </TableCell>
                    <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                      {handleDateTimeFormat(officeExpense.created_at)}
                    </TableCell>
                    <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                      <div className="flex gap-2">
                        <IconButton
                          type="button"
                          size="icon"
                          variant="ghost"
                          className="hover:text-blue-600"
                          //   onClick={() => onEditUser(user)}
                        >
                          <PencilIcon />
                        </IconButton>
                        <IconButton
                          type="button"
                          size="icon"
                          variant="ghost"
                          className="hover:text-red-600"
                          //   onClick={() => onDeleteUser(user)}
                        >
                          <TrashBinIcon />
                        </IconButton>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}

                {isMoreOfficeExpensesLoading && (
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

                {!isOfficeExpensesLoading && officeExpenses.length <= 0 && (
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
