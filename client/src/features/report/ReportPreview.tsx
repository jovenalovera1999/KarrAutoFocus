import Spinner from "@/components/ui/spinner/Spinner";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import useApiQuery from "@/hooks/api/useApiQuery";
import { useFormat } from "@/hooks/useFormat";
import { CarColumns } from "@/interfaces/CarInterface";
import { PaymentColumns } from "@/interfaces/PaymentInterface";

interface ReportsData {
  reports: PaymentColumns[];
}

interface ReportPreviewProps {
  isReportsDataLoading: boolean;
  reportsData: PaymentColumns[];
}

export default function ReportPreview({
  isReportsDataLoading,
  reportsData,
}: ReportPreviewProps) {
  const { handleDateFormat, handleNumberDecimalFormat } = useFormat();

  const headers = [
    "No.",
    "Date",
    "Payment Method",
    "Amount",
    "Description",
    "Buyer",
  ];

  const handleUnitDescription = (carData: CarColumns) => {
    return `${carData.year_model} ${carData.make.make} ${carData.series} ${carData.transmission.transmission} ${carData.color.color}`;
  };

  return (
    <>
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/5 dark:bg-white/3">
        <div className="w-full overflow-x-auto overflow-y-auto">
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
                {isReportsDataLoading && reportsData.length <= 0 && (
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

                {reportsData.map((report, index) => {
                  return (
                    <TableRow
                      className="hover:bg-gray-100 dark:hover:bg-gray-800"
                      key={report.payment_id}
                    >
                      <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                        {index + 1}
                      </TableCell>

                      {/* Date */}
                      <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                        {report?.payment_date
                          ? handleDateFormat(report.payment_date)
                          : "-"}
                      </TableCell>

                      {/* Payment Method */}
                      <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                        {report?.payment_method.payment_method
                          ? report.payment_method.payment_method
                          : "-"}
                      </TableCell>

                      {/* Amount */}
                      <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                        {report?.amount
                          ? handleNumberDecimalFormat(report.amount)
                          : "-"}
                      </TableCell>

                      {/* Description */}
                      <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                        {handleUnitDescription(report.car)}
                      </TableCell>

                      {/* Buyer */}
                      <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                        {report.buyer?.buyer ? report.buyer.buyer : "-"}
                      </TableCell>
                    </TableRow>
                  );
                })}

                {!isReportsDataLoading && reportsData.length <= 0 && (
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
