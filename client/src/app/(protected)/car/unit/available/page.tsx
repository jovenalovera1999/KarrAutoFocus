"use client";

import ComponentCard from "@/components/common/ComponentCard";
import AvaiableUnitsTable from "@/features/car/AvailbleUnitsTable";

export default function AvailableUnitsPage() {
  return (
    <>
      <ComponentCard title="List of Available Units">
        <AvaiableUnitsTable />
      </ComponentCard>
    </>
  );
}
