import ComponentCard from "@/components/common/ComponentCard";
import SoldUnitsTable from "@/features/car/SoldUnitsTable";

export default function CarSoldUnitsPage() {
  return (
    <>
      <ComponentCard title="List of Sold Units">
        <SoldUnitsTable />
      </ComponentCard>
    </>
  );
}
