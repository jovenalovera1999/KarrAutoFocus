import ComponentCard from "@/components/common/ComponentCard";
import { useFormat } from "@/hooks/useFormat";
import { CarColumns } from "@/interfaces/CarInterface";
import { PaymentBreakdownColumns } from "@/interfaces/PaymentBreakdownInterface";

interface PaymentSummaryProps {
  carData: CarColumns | null;
  paymentBreakdownData: PaymentBreakdownColumns | null | undefined;
  //   paymentData: PaymentColumns;
  totalPaymentAmount: number;
}

export default function PaymentSummary({
  paymentBreakdownData,
  //   paymentData,
  totalPaymentAmount,
}: PaymentSummaryProps) {
  const { handleNumberDecimalFormat } = useFormat();

  const downpayment = Number(paymentBreakdownData?.downpayment || 0);
  const processFee = Number(paymentBreakdownData?.processing_fee || 0);
  const serviceFee = Number(paymentBreakdownData?.service_fee || 0);
  const transfer = Number(paymentBreakdownData?.transfer || 0);

  const totalPaid =
    downpayment + processFee + serviceFee + transfer + totalPaymentAmount;

  return (
    <>
      <div className="flex flex-col gap-4">
        <ComponentCard title="Payment Details">
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2 md:col-span-1">
              <div className="mb-7">
                <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                  Total Cash Out
                </p>
                <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                  {handleNumberDecimalFormat(downpayment)}
                </p>
              </div>
              <div className="mb-3 md:mb-0">
                <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                  Total Paid
                </p>
                <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                  {handleNumberDecimalFormat(totalPaid)}
                </p>
              </div>
            </div>
          </div>
        </ComponentCard>
      </div>
    </>
  );
}
