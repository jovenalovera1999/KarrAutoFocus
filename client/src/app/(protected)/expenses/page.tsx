"use client";

import ComponentCard from "@/components/common/ComponentCard";
import AddOfficeExpenseFormModal from "@/features/office_expense/AddOfficeExpenseFormModal";
import DeleteOfficeExpenseFormModal from "@/features/office_expense/DeleteOfficeExpenseFormModal";
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
  const [isDeleteExpenseFormModalOpen, setIsDeleteExpenseFormModalOpen] =
    useState(false);

  const handleOpenEditOfficeExpenseFormModal = (
    officeExpenseData: OfficeExpenseColumns,
  ) => {
    setOfficeExpenseData(officeExpenseData);
    setIsEditExpenseFormModalOpen(true);
  };

  const handleCloseEditOfficeExpenseFormModal = () => {
    setOfficeExpenseData(null);
    setIsEditExpenseFormModalOpen(false);
  };

  const handleOpenDeleteOfficeExpenseFormModal = (
    officeExpenseData: OfficeExpenseColumns,
  ) => {
    setOfficeExpenseData(officeExpenseData);
    setIsDeleteExpenseFormModalOpen(true);
  };

  const handleCloseDeleteOfficeExpenseFormModal = () => {
    setOfficeExpenseData(null);
    setIsDeleteExpenseFormModalOpen(false);
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
        onClose={handleCloseEditOfficeExpenseFormModal}
        refreshOfficeExpenses={handleRefresh}
      />

      <DeleteOfficeExpenseFormModal
        officeExpenseData={officeExpenseData}
        isOpen={isDeleteExpenseFormModalOpen}
        onClose={handleCloseDeleteOfficeExpenseFormModal}
        refreshOfficeExpenses={handleRefresh}
      />

      <ComponentCard title="List of Expenses">
        <ExpensesTable
          onAddOfficeExpense={() => setIsAddExpenseFormModalOpen(true)}
          onEditOfficeExpense={handleOpenEditOfficeExpenseFormModal}
          onDeleteOfficeExpense={handleOpenDeleteOfficeExpenseFormModal}
          refreshExpenses={refresh}
        />
      </ComponentCard>
    </>
  );
}
