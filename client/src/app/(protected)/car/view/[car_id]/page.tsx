"use client";

import AddUnitExpenseFormModal from "@/features/car/AddUnitExpenseFormModal";
import ViewCar from "@/features/car/ViewCar";
import { useRefresh } from "@/hooks/useRefresh";
import { useState } from "react";

export default function ViewCarPage() {
  const { refresh, handleRefresh } = useRefresh();

  const [selectedCarId, setSelectedCarId] = useState<string | number | null>(
    "",
  );
  const [isAddUnitExpenseFormModalOpen, setIsAddUnitExpenseFormModalOpen] =
    useState(false);

  const handleOpenAddUnitExpenseFormModal = (
    carIdSelected: string | number | null,
  ) => {
    setSelectedCarId(carIdSelected);
    setIsAddUnitExpenseFormModalOpen(true);
  };

  const handleCloseAddUnitExpenseFormModal = () => {
    setSelectedCarId("");
    setIsAddUnitExpenseFormModalOpen(false);
  };

  return (
    <>
      <AddUnitExpenseFormModal
        selectedCarId={selectedCarId}
        isOpen={isAddUnitExpenseFormModalOpen}
        onClose={handleCloseAddUnitExpenseFormModal}
        refreshUnitExpenses={handleRefresh}
      />

      <ViewCar
        onAddUnitExpense={handleOpenAddUnitExpenseFormModal}
        refreshUnitExpenses={refresh}
      />
    </>
  );
}
