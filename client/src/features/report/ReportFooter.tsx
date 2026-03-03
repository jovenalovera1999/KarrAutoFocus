import { TotalAmountByPaymentMethod } from "@/app/(protected)/reports/page";
import { useFormat } from "@/hooks/useFormat";

interface ReportFooterProps {
  totalAmountByPaymentMethod: TotalAmountByPaymentMethod[] | undefined;
  grandTotal: string | undefined;
}

export default function ReportFooter({
  totalAmountByPaymentMethod,
  grandTotal,
}: ReportFooterProps) {
  const { handleNumberDecimalFormat } = useFormat();
  return (
    <>
      <div className="flex flex-col items-end gap-2">
        {totalAmountByPaymentMethod?.map((item) => (
          <div
            key={item.payment_method_id}
            className="flex gap-2 text-theme-sm"
          >
            <span className="text-gray-500 dark:text-gray-400">
              {`${item.payment_method.payment_method} Amount`}
            </span>
            <span className="text-gray-900 dark:text-white/90">
              {handleNumberDecimalFormat(item.total_amount)}
            </span>
          </div>
        ))}
        <div className="border-t pt-2 font-semibold">
          <div className="flex gap-2">
            <span className="text-gray-500 dark:text-gray-400 text-theme-sm pt-1.5">
              Total Amount
            </span>
            <span className="text-gray-900 dark:text-white/90 text-theme-xl">
              {handleNumberDecimalFormat(grandTotal ?? 0)}
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
