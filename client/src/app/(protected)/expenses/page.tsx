"use client";

import ComponentCard from "@/components/common/ComponentCard";
import AddOfficeExpenseFormModal from "@/features/office_expense/AddOfficeExpenseFormModal";
import EditOfficeExpenseFormModal from "@/features/office_expense/EditOfficeExpenseFormModal";
import ExpensesTable from "@/features/office_expense/ExpensesTable";
import { useRefresh } from "@/hooks/useRefresh";
import { OfficeExpenseColumns } from "@/interfaces/OfficeExpenseInterface";
import { useState } from "react";

export default function ExpensesPage() {
  const { refresh, handleRefresh } = useRefresh();

  const [officeExpenseData, setOfficeExpenseData] =
    useState<OfficeExpenseColumns | null>(null);
  const [isAddExpenseFormModalOpen, setIsAddExpenseFormModalOpen] =
    useState(false);
  const [isEditExpenseFormModalOpen, setIsEditExpenseFormModalOpen] =
    useState(false);

  const handleOpenEditExpenseFormModal = (
    officeExpenseData: OfficeExpenseColumns,
  ) => {
    setOfficeExpenseData(officeExpenseData);
    setIsEditExpenseFormModalOpen(true);
  };

  const handleCloseEditExpenseFormModal = () => {
    setOfficeExpenseData(null);
    setIsEditExpenseFormModalOpen(false);
  };

  return (
    <>
      <AddOfficeExpenseFormModal
        isOpen={isAddExpenseFormModalOpen}
        onClose={() => setIsAddExpenseFormModalOpen(false)}
        refreshOfficeExpenses={handleRefresh}
      />

      <EditOfficeExpenseFormModal
        officeExpenseData={officeExpenseData}
        isOpen={isEditExpenseFormModalOpen}
        onClose={handleCloseEditExpenseFormModal}
        refreshOfficeExpenses={handleRefresh}
      />

      <ComponentCard title="List of Expenses">
        <ExpensesTable
          onAddOfficeExpense={() => setIsAddExpenseFormModalOpen(true)}
          onEditOfficeExpense={handleOpenEditExpenseFormModal}
          refreshExpenses={refresh}
        />
      </ComponentCard>
    </>
  );
}
