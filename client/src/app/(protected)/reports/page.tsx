"use client";

import ComponentCard from "@/components/common/ComponentCard";
import ReportPreview from "@/features/report/ReportPreview";
import useApiQuery from "@/hooks/api/useApiQuery";
import { PaymentColumns } from "@/interfaces/PaymentInterface";
import ReportService from "@/services/ReportService";
import { useEffect } from "react";

interface ReportsData {
  reports: PaymentColumns[];
}

export default function ReportsPage() {
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

  const reports = reportsData?.reports ?? [];

  return (
    <>
      <ComponentCard title="Payment Reports">
        <ReportPreview
          isReportsDataLoading={isReportsLoading}
          reportsData={reports}
        />
      </ComponentCard>
    </>
  );
}
