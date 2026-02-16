"use client";

import ComponentCard from "@/components/common/ComponentCard";
import CreateUserFormModal from "@/features/user/CreateUserFormModal";
import DeleteUserFormModal from "@/features/user/DeleteUserFormModal";
import EditUserFormModal from "@/features/user/EditUserFormModal";
import UsersTable from "@/features/user/UsersTable";
import { useRefresh } from "@/hooks/useRefresh";
import { UserColumns } from "@/interfaces/UserInterface";
import { useState } from "react";

export default function ManageUsersPage() {
  const { refresh, handleRefresh } = useRefresh();

  const [selectedUser, setSelectedUser] = useState<UserColumns | null>(null);
  const [isCreateUserFormModalOpen, setIsCreateUserFormModalOpen] =
    useState(false);
  const [isEditUserFormModalOpen, setIsEditUserFormModalOpen] = useState(false);
  const [isDeleteUserFormModalOpen, setIsDeleteUserFormModalOpen] =
    useState(false);

  const handleOpenEditUserFormModal = (userSelected: UserColumns | null) => {
    setSelectedUser(userSelected);
    setIsEditUserFormModalOpen(true);
  };

  const handleCloseEditUserFormModal = () => {
    setSelectedUser(null);
    setIsEditUserFormModalOpen(false);
  };

  const handleOpenDeleteUserFormModal = (userSelected: UserColumns | null) => {
    setSelectedUser(userSelected);
    setIsDeleteUserFormModalOpen(true);
  };

  const handleCloseDeleteUserFormModal = () => {
    setSelectedUser(null);
    setIsDeleteUserFormModalOpen(false);
  };

  return (
    <>
      <CreateUserFormModal
        isOpen={isCreateUserFormModalOpen}
        onClose={() => setIsCreateUserFormModalOpen(false)}
        refreshUsers={handleRefresh}
      />

      <EditUserFormModal
        isOpen={isEditUserFormModalOpen}
        onClose={handleCloseEditUserFormModal}
        selectedUser={selectedUser}
        refreshUsers={handleRefresh}
      />

      <DeleteUserFormModal
        isOpen={isDeleteUserFormModalOpen}
        onClose={handleCloseDeleteUserFormModal}
        selectedUser={selectedUser}
        refreshUsers={handleRefresh}
      />

      <ComponentCard title="List of Users">
        <UsersTable
          onCreateUser={() => setIsCreateUserFormModalOpen(true)}
          onEditUser={handleOpenEditUserFormModal}
          onDeleteUser={handleOpenDeleteUserFormModal}
          refreshUsers={refresh}
        />
      </ComponentCard>
    </>
  );
}
