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
import { useCallback, useEffect, useRef, useState } from "react";
import { PencilIcon, TrashBinIcon } from "@/icons/index";
import Spinner from "@/components/ui/spinner/Spinner";
import { useDebounce } from "@/hooks/useDebounce";
import IconButton from "@/components/ui/button/IconButton";
import { ExpenseColumns } from "@/interfaces/ExpenseInterface";
import ExpenseService from "@/services/ExpenseService";

interface ExpensesTableProps {
  onAddExpense: () => void;
  refreshExpenses: boolean;
}

export default function ExpensesTable({
  onAddExpense,
  refreshExpenses,
}: ExpensesTableProps) {
  const { handleNumberDecimalFormat, handleDateFormat } = useFormat();

  const [isExpensesLoading, setIsExpensesLoading] = useState(false);
  const [isMoreExpensesLoading, setIsMoreExpensesLoading] = useState(false);
  const [expenses, setExpenses] = useState<ExpenseColumns[]>([]);
  const [lastPage, setLastPage] = useState<number | null>(null);
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");

  const debouncedDateFrom = useDebounce(dateFrom);
  const debouncedDateTo = useDebounce(dateTo);

  const tableRef = useRef<HTMLDivElement>(null);
  const pageRef = useRef(1);

  const handleLoadExpenses = useCallback(
    async (loadPage: number, dateFromValue: string, dateToValue: string) => {
      try {
        if (
          (loadPage === 1 && isExpensesLoading) ||
          (loadPage > 1 && isMoreExpensesLoading) ||
          (lastPage !== null && loadPage > lastPage)
        ) {
          return;
        }

        loadPage === 1
          ? setIsExpensesLoading(true)
          : setIsMoreExpensesLoading(true);

        const { status, data } = await ExpenseService.loadExpenses(
          loadPage,
          dateFromValue,
          dateToValue,
        );

        if (status !== 200) {
          console.error(
            "Status error during load expenses at ExpensesTable.tsx: ",
            status,
          );
          return;
        }

        setExpenses((prev) =>
          loadPage === 1 ? data.expenses : [...prev, ...data.expenses],
        );
        setLastPage(data.lastPage);
      } catch (error: any) {
        console.error(
          "Server error during load expenses at ExpensesTable.tsx: ",
          error,
        );
      } finally {
        loadPage === 1
          ? setIsExpensesLoading(false)
          : setIsMoreExpensesLoading(false);
      }
    },
    [isExpensesLoading, isMoreExpensesLoading, lastPage],
  );

  useEffect(() => {
    pageRef.current = 1;
    setLastPage(null);
    setExpenses([]);

    handleLoadExpenses(1, debouncedDateFrom, debouncedDateTo);
  }, [refreshExpenses, debouncedDateFrom, debouncedDateTo]);

  const handleScroll = useCallback(() => {
    if (
      !tableRef.current ||
      isExpensesLoading ||
      isMoreExpensesLoading ||
      (lastPage && pageRef.current >= lastPage)
    ) {
      return;
    }

    const { scrollTop, scrollHeight, clientHeight } = tableRef.current;

    if (scrollTop + clientHeight >= scrollHeight - 50) {
      const nextPage = pageRef.current + 1;
      pageRef.current = nextPage;
      handleLoadExpenses(nextPage, debouncedDateFrom, debouncedDateTo);
    }
  }, [isExpensesLoading, isMoreExpensesLoading, lastPage, handleLoadExpenses]);

  const headers = [
    "No.",
    "Incurrence Date",
    "Amount",
    "Description",
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
          onScroll={handleScroll}
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
                {isExpensesLoading && expenses.length <= 0 && (
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

                {expenses.map((expense, index) => (
                  <TableRow
                    className="hover:bg-gray-100 dark:hover:bg-gray-800"
                    key={expense.expense_id}
                  >
                    <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                      {index + 1}
                    </TableCell>
                    <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                      {handleDateFormat(expense.incurrence_date)}
                    </TableCell>
                    <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                      {handleNumberDecimalFormat(expense.amount)}
                    </TableCell>
                    <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                      {expense.description}
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

                {isMoreExpensesLoading && (
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

                {!isExpensesLoading && expenses.length <= 0 && (
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
