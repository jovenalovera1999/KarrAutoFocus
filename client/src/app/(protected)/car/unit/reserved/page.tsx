import ComponentCard from "@/components/common/ComponentCard";
import ReservedUnitsTable from "@/features/car/ReservedUnitsTable";

export default function CarReservedUnitsPage() {
  return (
    <>
      <ComponentCard title="List of Reserved Units">
        <ReservedUnitsTable />
      </ComponentCard>
    </>
  );
}
