"use client";

import Button from "@/components/ui/button/Button";
import Form from "@/components/ui/form/Form";
import Input from "@/components/ui/form/Input";
import Label from "@/components/ui/form/Label";
import Select from "@/components/ui/form/Select";
import { Modal } from "@/components/ui/modal";
import Spinner from "@/components/ui/spinner/Spinner";
import { useAlert } from "@/context/AlertContext";
import useApiMutation from "@/hooks/api/useApiMutation";
import useApiQuery from "@/hooks/api/useApiQuery";
import { BranchColumns } from "@/interfaces/BranchInterface";
import { RoleColumns } from "@/interfaces/RoleInterface";
import { UserColumns, UserFieldsErrors } from "@/interfaces/UserInterface";
import UserService from "@/services/UserService";
import { FormEvent, useEffect, useState } from "react";

interface UserReferences {
  branches: BranchColumns[];
  roles: RoleColumns[];
}

interface EditUserFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedUser: UserColumns | null;
  refreshUsers: () => void;
}

export default function EditUserFormModal({
  isOpen,
  onClose,
  selectedUser,
  refreshUsers,
}: EditUserFormModalProps) {
  const { showAlert } = useAlert();
  const { execute: executeUpdateUser, loading: isUpdating } = useApiMutation();

  const [userId, setUserId] = useState(0);
  const [firstName, setFirstName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [lastName, setLastName] = useState("");
  const [suffixName, setSuffixName] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [email, setEmail] = useState("");
  const [branchAssigned, setBranchAssigned] = useState("");
  const [role, setRole] = useState("");
  const [fieldErrors, setFieldErrors] = useState<UserFieldsErrors>({});

  const {
    data: userReferencesData,
    loading: isUserReferencesLoading,
    load: loadUserReferences,
  } = useApiQuery<UserReferences>({
    apiService: () => UserService.loadUserReferences(),
  });

  useEffect(() => {
    if (isOpen) {
      loadUserReferences();
    }
  }, [isOpen]);

  const branches = userReferencesData?.branches ?? [];
  const roles = userReferencesData?.roles ?? [];

  const handleUpdateUser = async (e: FormEvent) => {
    e.preventDefault();

    const payload = {
      first_name: firstName,
      middle_name: middleName,
      last_name: lastName,
      suffix_name: suffixName,
      birth_date: birthDate,
      contact_number: contactNumber,
      email: email,
      branch_assigned: branchAssigned,
      role: role,
    };

    executeUpdateUser({
      apiService: () => UserService.updateUser(userId, payload),

      onSuccess: (data) => {
        showAlert({
          variant: "success",
          title: "Update Success",
          message: data.message,
        });

        refreshUsers();
      },

      onValidationError: (errors) => {
        setFieldErrors(errors);
      },
    });
  };

  useEffect(() => {
    if (isOpen && selectedUser) {
      setUserId(selectedUser.user_id);
      setFirstName(selectedUser.first_name);
      setMiddleName(selectedUser.middle_name || "");
      setLastName(selectedUser.last_name);
      setSuffixName(selectedUser.suffix_name || "");
      setBirthDate(selectedUser.birth_date.split("T")[0]);
      setContactNumber(selectedUser.contact_number);
      setEmail(selectedUser.email || "");
      setBranchAssigned(selectedUser.branch.branch_id.toString());
      setRole(selectedUser.role.role_id.toString());
    }
  }, [isOpen, selectedUser]);

  useEffect(() => {
    if (!isOpen) {
      setUserId(0);
      setFirstName("");
      setMiddleName("");
      setLastName("");
      setSuffixName("");
      setBirthDate("");
      setContactNumber("");
      setEmail("");
      setBranchAssigned("");
      setRole("");
      setFieldErrors({});
    }
  }, [isOpen]);

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        className="max-w-150 p-5 lg:p-10"
      >
        {isUserReferencesLoading &&
          branches.length <= 0 &&
          roles.length <= 0 && (
            <div className="flex items-center justify-center">
              <Spinner size="xl" />
            </div>
          )}

        {selectedUser &&
          !isUserReferencesLoading &&
          branches.length > 0 &&
          roles.length > 0 && (
            <Form onSubmit={handleUpdateUser}>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="col-span-2 md:col-span-1">
                  <div className="mb-4">
                    <Label required>First Name</Label>
                    <Input
                      type="text"
                      name="first_name"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      autoFocus
                      errors={fieldErrors.first_name}
                    />
                  </div>
                  <div className="mb-4">
                    <Label>Middle Name</Label>
                    <Input
                      type="text"
                      name="middle_name"
                      value={middleName}
                      onChange={(e) => setMiddleName(e.target.value)}
                      errors={fieldErrors.middle_name}
                    />
                  </div>
                  <div className="mb-4">
                    <Label required>Last Name</Label>
                    <Input
                      type="text"
                      name="last_name"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      errors={fieldErrors.last_name}
                    />
                  </div>
                  <div className="mb-4">
                    <Label>Suffix Name</Label>
                    <Input
                      type="text"
                      name="suffix_name"
                      value={suffixName}
                      onChange={(e) => setSuffixName(e.target.value)}
                      errors={fieldErrors.suffix_name}
                    />
                  </div>
                  <div>
                    <Label required>Birth Date</Label>
                    <Input
                      type="date"
                      name="birth_date"
                      value={birthDate}
                      onChange={(e) => setBirthDate(e.target.value)}
                      errors={fieldErrors.birth_date}
                    />
                  </div>
                </div>
                <div className="col-span-2 md:col-span-1">
                  <div className="mb-4">
                    <Label required>Birth Date</Label>
                    <Input
                      type="date"
                      name="birth_date"
                      value={birthDate}
                      onChange={(e) => setBirthDate(e.target.value)}
                      errors={fieldErrors.birth_date}
                    />
                  </div>
                  <div className="mb-4">
                    <Label required>Contact Number</Label>
                    <Input
                      type="text"
                      name="contact_number"
                      value={contactNumber}
                      onChange={(e) => setContactNumber(e.target.value)}
                      errors={fieldErrors.contact_number}
                    />
                  </div>
                  <div className="mb-4">
                    <Label>Email</Label>
                    <Input
                      type="text"
                      name="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      errors={fieldErrors.email}
                    />
                  </div>
                  <div className="mb-4">
                    <Label required>Branch Assigned</Label>
                    <Select
                      name="branch_assigned"
                      value={branchAssigned}
                      onChange={(e) => setBranchAssigned(e.target.value)}
                      errors={fieldErrors.branch_assigned}
                    >
                      <option value="">Select Branch</option>
                      {branches.length <= 0 ? (
                        <option value="">No Branch Records</option>
                      ) : (
                        branches.map((branch) => (
                          <option
                            value={branch.branch_id}
                            key={branch.branch_id}
                          >
                            {branch.branch}
                          </option>
                        ))
                      )}
                    </Select>
                  </div>
                  <div>
                    <Label required>Role</Label>
                    <Select
                      name="role"
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                      errors={fieldErrors.role}
                    >
                      <option value="">Select Role</option>
                      {roles.length <= 0 ? (
                        <option value="">No Branch Records</option>
                      ) : (
                        roles.map((role) => (
                          <option value={role.role_id} key={role.role_id}>
                            {role.role}
                          </option>
                        ))
                      )}
                    </Select>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <Button type="submit" className="w-full" disabled={isUpdating}>
                  {isUpdating ? (
                    <>
                      <div className="flex gap-2">
                        <Spinner size="xs" />
                        Updating User...
                      </div>
                    </>
                  ) : (
                    "Update User"
                  )}
                </Button>
              </div>
            </Form>
          )}
      </Modal>
    </>
  );
}
