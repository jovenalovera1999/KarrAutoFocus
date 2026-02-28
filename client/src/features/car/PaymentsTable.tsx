import ComponentCard from "@/components/common/ComponentCard";
import Button from "@/components/ui/button/Button";
import Spinner from "@/components/ui/spinner/Spinner";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useFormat } from "@/hooks/useFormat";
import { CarColumns } from "@/interfaces/CarInterface";
import { PaymentBreakdownColumns } from "@/interfaces/PaymentBreakdownInterface";
import { PaymentColumns } from "@/interfaces/PaymentInterface";

interface PaymentsTableProps {
  carData: CarColumns | null;
  payments: PaymentColumns[];
  isPaymentsLoading: boolean;
  onAddPayment: (
    selectedPaymentBreakdown: PaymentBreakdownColumns | null | undefined,
  ) => void;
}

export default function PaymentsTable({
  carData,
  payments,
  isPaymentsLoading,
  onAddPayment,
}: PaymentsTableProps) {
  const { handleNumberDecimalFormat, handleDateFormat, handleDateTimeFormat } =
    useFormat();

  const headers = [
    "No.",
    "Payment Type",
    "Amount",
    "Description",
    "Date Created",
  ];

  return (
    <>
      <ComponentCard title="Payments History">
        <div className="mb-4 flex md:items-end md:justify-end">
          <Button
            type="button"
            className="w-full md:w-auto"
            onClick={() => onAddPayment(carData?.payment_breakdown)}
          >
            Add Payment
          </Button>
        </div>
        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/5 dark:bg-white/3">
          <div className="w-full max-h-[calc(100vh-20.5rem)] overflow-x-auto overflow-y-auto">
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
                  {isPaymentsLoading && payments.length <= 0 && (
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

                  {payments.map((payment, index) => (
                    <TableRow
                      className="hover:bg-gray-100 dark:hover:bg-gray-800"
                      key={payment.payment_id}
                    >
                      <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                        {index + 1}
                      </TableCell>
                      <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                        {handleDateFormat(payment.payment_date)}
                      </TableCell>
                      <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                        {handleNumberDecimalFormat(payment.amount)}
                      </TableCell>
                      <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                        {payment.description}
                      </TableCell>
                      <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                        {handleDateTimeFormat(payment.created_at)}
                      </TableCell>
                    </TableRow>
                  ))}

                  {/* {isMoreUnitExpensesLoading && (
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
                  )} */}

                  {!isPaymentsLoading && payments.length <= 0 && (
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
      </ComponentCard>
    </>
  );
}
