"use client";

import ComponentCard from "@/components/common/ComponentCard";
import AddDepositFormModal from "@/features/deposit/AddDepositFormModal";
import DeleteDepositFormModal from "@/features/deposit/DeleteDepositFormModal";
import DepositsTable from "@/features/deposit/DepositsTable";
import EditDepositFormModal from "@/features/deposit/EditDepositFormModal";
import { useRefresh } from "@/hooks/useRefresh";
import { DepositColumns } from "@/interfaces/DepositInterface";
import { useState } from "react";

export default function DepositsPage() {
  const { refresh, handleRefresh } = useRefresh();

  const [depositData, setDepositData] = useState<DepositColumns | null>(null);
  const [isAddDepositFormModalOpen, setIsAddDepositFormModalOpen] =
    useState(false);
  const [isEditDepositFormModalOpen, setIsEditDepositFormModalOpen] =
    useState(false);
  const [isDeleteDepositFormModalOpen, setIsDeleteDepositFormModalOpen] =
    useState(false);

  const handleOpenEditDepositFormModal = (depositData: DepositColumns) => {
    setDepositData(depositData);
    setIsEditDepositFormModalOpen(true);
  };

  const handleCloseEditDepositFormModal = () => {
    setDepositData(null);
    setIsEditDepositFormModalOpen(false);
  };

  const handleOpenDeleteDepositFormModal = (depositData: DepositColumns) => {
    setDepositData(depositData);
    setIsDeleteDepositFormModalOpen(true);
  };

  const handleCloseDeleteDepositFormModal = () => {
    setDepositData(null);
    setIsDeleteDepositFormModalOpen(false);
  };

  return (
    <>
      <AddDepositFormModal
        isOpen={isAddDepositFormModalOpen}
        onClose={() => setIsAddDepositFormModalOpen(false)}
        refreshDeposits={handleRefresh}
      />

      <EditDepositFormModal
        depositData={depositData}
        isOpen={isEditDepositFormModalOpen}
        onClose={handleCloseEditDepositFormModal}
        refreshDeposits={handleRefresh}
      />

      <DeleteDepositFormModal
        depositData={depositData}
        isOpen={isDeleteDepositFormModalOpen}
        onClose={handleCloseDeleteDepositFormModal}
        refreshDeposits={handleRefresh}
      />

      <ComponentCard title="List of Deposits">
        <DepositsTable
          onAddDeposit={() => setIsAddDepositFormModalOpen(true)}
          onEditDeposit={handleOpenEditDepositFormModal}
          onDeleteDeposit={handleOpenDeleteDepositFormModal}
          refreshDeposits={refresh}
        />
      </ComponentCard>
    </>
  );
}
