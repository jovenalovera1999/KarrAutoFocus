"use client";

import ComponentCard from "@/components/common/ComponentCard";
import AddPettyCashFormModal from "@/features/petty_cash/AddPettyCashFormModal";
import DeletePettyCashFormModal from "@/features/petty_cash/DeletePettyCashFormModal";
import EditPettyCashFormModal from "@/features/petty_cash/EditPettyCashFormModal";
import PettyCashTable from "@/features/petty_cash/PettyCashTable";
import { useRefresh } from "@/hooks/useRefresh";
import { PettyCashColumns } from "@/interfaces/PettyCashInterface";
import { useState } from "react";

export default function PettyCashPage() {
  const { refresh, handleRefresh } = useRefresh();

  const [pettyCashData, setPettyCashData] = useState<PettyCashColumns | null>(
    null,
  );
  const [isAddPettyCashFormModalOpen, setIsAddPettyCashFormModalOpen] =
    useState(false);
  const [isEditPettyCashFormModalOpen, setIsEditPettyCashFormModalOpen] =
    useState(false);
  const [isDeletePettyCashFormModalOpen, setIsDeletePettyCashFormModalOpen] =
    useState(false);

  const handleOpenEditPettyCashFormModal = (
    pettyCashData: PettyCashColumns | null,
  ) => {
    setPettyCashData(pettyCashData);
    setIsEditPettyCashFormModalOpen(true);
  };

  const handleCloseEditPettyCashFormModal = () => {
    setPettyCashData(null);
    setIsEditPettyCashFormModalOpen(false);
  };

  const handleOpenDeletePettyCashFormModal = (
    pettyCashData: PettyCashColumns | null,
  ) => {
    setPettyCashData(pettyCashData);
    setIsDeletePettyCashFormModalOpen(true);
  };

  const handleCloseDeletePettyCashFormModal = () => {
    setPettyCashData(null);
    setIsDeletePettyCashFormModalOpen(false);
  };

  return (
    <>
      <AddPettyCashFormModal
        isOpen={isAddPettyCashFormModalOpen}
        onClose={() => setIsAddPettyCashFormModalOpen(false)}
        refreshPettyCash={handleRefresh}
      />

      <EditPettyCashFormModal
        pettyCashData={pettyCashData}
        isOpen={isEditPettyCashFormModalOpen}
        onClose={handleCloseEditPettyCashFormModal}
        refreshPettyCash={handleRefresh}
      />

      <DeletePettyCashFormModal
        pettyCashData={pettyCashData}
        isOpen={isDeletePettyCashFormModalOpen}
        onClose={handleCloseDeletePettyCashFormModal}
        refreshPettyCash={handleRefresh}
      />

      <ComponentCard title="List of Petty Cash">
        <PettyCashTable
          onAddPettyCash={() => setIsAddPettyCashFormModalOpen(true)}
          onEditPettyCash={handleOpenEditPettyCashFormModal}
          onDeletePettyCash={handleOpenDeletePettyCashFormModal}
          refreshPettyCash={refresh}
        />
      </ComponentCard>
    </>
  );
}
