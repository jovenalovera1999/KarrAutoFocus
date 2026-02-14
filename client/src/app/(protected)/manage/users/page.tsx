"use client";

import ComponentCard from "@/components/common/ComponentCard";
import CreateUserFormModal from "@/features/user/CreateUserFormModal";
import UsersTable from "@/features/user/UsersTable";
import { useState } from "react";

export default function ManageUserPage() {
  const [isCreateUserFormModalOpen, setIsCreateUserFormModalOpen] =
    useState(false);

  return (
    <>
      <CreateUserFormModal
        isOpen={isCreateUserFormModalOpen}
        onClose={() => setIsCreateUserFormModalOpen(false)}
      />

      <ComponentCard title="List of Users">
        <UsersTable onCreateUser={() => setIsCreateUserFormModalOpen(true)} />
      </ComponentCard>
    </>
  );
}
