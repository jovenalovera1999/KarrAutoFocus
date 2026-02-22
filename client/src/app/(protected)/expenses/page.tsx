"use client";

import ComponentCard from "@/components/common/ComponentCard";
import AddExpenseFormModal from "@/features/expense/AddExpenseFormModal";
import ExpensesTable from "@/features/expense/ExpensesTable";
import { useRefresh } from "@/hooks/useRefresh";
import { useState } from "react";

export default function ExpensesPage() {
  const { refresh, handleRefresh } = useRefresh();

  const [isAddExpenseFormModalOpen, setIsAddExpenseFormModalOpen] =
    useState(false);

  return (
    <>
      <AddExpenseFormModal
        isOpen={isAddExpenseFormModalOpen}
        onClose={() => setIsAddExpenseFormModalOpen(false)}
      />

      <ComponentCard title="List of Expenses">
        <ExpensesTable
          onAddExpense={() => setIsAddExpenseFormModalOpen(true)}
          refreshExpenses={refresh}
        />
      </ComponentCard>
    </>
  );
}
