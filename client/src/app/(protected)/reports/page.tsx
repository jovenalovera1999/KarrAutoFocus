"use client";

import ComponentCard from "@/components/common/ComponentCard";
import Button from "@/components/ui/button/Button";
import ReportFooter from "@/features/report/ReportFooter";
import ReportPreview from "@/features/report/ReportPreview";
import useApiQuery from "@/hooks/api/useApiQuery";
import { useFormat } from "@/hooks/useFormat";
import { PrinterIcon } from "@/icons";
import { PaymentColumns } from "@/interfaces/PaymentInterface";
import ReportService from "@/services/ReportService";
import { useEffect, useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";

export interface TotalAmountByPaymentMethod {
  payment_method_id: number;
  payment_method: {
    payment_method: string;
  };
  total_amount: string;
}

interface ReportsData {
  reports: PaymentColumns[];
  totalAmountByPaymentMethod: TotalAmountByPaymentMethod[];
  grandTotal: string;
}

export default function ReportsPage() {
  const { handleDateTimeFormat } = useFormat();
  const [currentDateTime, setCurrentDateTime] = useState<Date>(new Date());
  const printRef = useRef<HTMLDivElement>(null);

  const {
    load: loadReports,
    data: reportsData,
    loading: isReportsLoading,
  } = useApiQuery<ReportsData>({
    apiService: () => ReportService.loadReports(),
  });

  useEffect(() => {
    loadReports();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const reports = reportsData?.reports ?? [];

  const handlePrint = useReactToPrint({
    contentRef: printRef,
    documentTitle: "Payment Reports",
  });

  return (
    <>
      <div ref={printRef} className="print-area">
        <ComponentCard title="Payment Reports">
          <ReportPreview
            isReportsDataLoading={isReportsLoading}
            reportsData={reports}
          />
          <div className="flex items-center justify-between">
            <div>
              <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                Printed by:
              </p>
              <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                Dela Cruz, Juan
              </p>
              <p className="text-xs font-medium text-gray-800 dark:text-white/90">
                {handleDateTimeFormat(currentDateTime.toISOString())}
              </p>
            </div>
            <ReportFooter
              totalAmountByPaymentMethod={
                reportsData?.totalAmountByPaymentMethod
              }
              grandTotal={reportsData?.grandTotal}
            />
          </div>
          <div className="border-t border-gray-200 pt-4 flex items-end justify-end no-print">
            <Button type="button" onClick={handlePrint}>
              Print
            </Button>
          </div>
        </ComponentCard>
      </div>
    </>
  );
}
