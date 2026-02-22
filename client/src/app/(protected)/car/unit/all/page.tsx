"use client";

import ComponentCard from "@/components/common/ComponentCard";
import AllUnitsTable from "@/features/car/AllUnitsTable";

export default function CarAllUnitsPage() {
  return (
    <>
      <ComponentCard title="List of All Units">
        <AllUnitsTable />
      </ComponentCard>
    </>
  );
}
