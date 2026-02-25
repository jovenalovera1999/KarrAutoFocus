import Button from "@/components/ui/button/Button";
import Form from "@/components/ui/form/Form";
import Input from "@/components/ui/form/Input";
import Label from "@/components/ui/form/Label";
import { Modal } from "@/components/ui/modal";
import Spinner from "@/components/ui/spinner/Spinner";
import { useAlert } from "@/context/AlertContext";
import useApiMutation from "@/hooks/api/useApiMutation";
import { useFormat } from "@/hooks/useFormat";
import { UserColumns } from "@/interfaces/UserInterface";
import UserService from "@/services/UserService";
import { FormEvent, useEffect, useState } from "react";

interface DeleteUserFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedUser: UserColumns | null;
  refreshUsers: () => void;
}

export default function DeleteUserFormModal({
  isOpen,
  onClose,
  selectedUser,
  refreshUsers,
}: DeleteUserFormModalProps) {
  const { showAlert } = useAlert();
  const { handleDateFormat } = useFormat();
  const { execute: executeUserDelete, loading: isDeleting } = useApiMutation();

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

  const handleDestroyUser = async (e: FormEvent) => {
    e.preventDefault();

    executeUserDelete({
      apiService: () => UserService.deleteUser(userId),

      onSuccess: (data) => {
        showAlert({
          variant: "success",
          title: "Delete Success",
          message: data.message,
        });

        onClose();
        refreshUsers();
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
      setBranchAssigned(selectedUser.branch.branch);
      setRole(selectedUser.role.role);
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
    }
  }, [isOpen]);

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        className="max-w-150 p-5 lg:p-10"
      >
        <Form onSubmit={handleDestroyUser}>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="col-span-2 md:col-span-1">
              <div className="mb-7">
                <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                  First Name
                </p>
                <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                  {firstName}
                </p>
              </div>
              <div className="mb-7">
                <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                  Middle Name
                </p>
                <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                  {middleName}
                </p>
              </div>
              <div className="mb-7">
                <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                  Last Name
                </p>
                <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                  {lastName}
                </p>
              </div>
              <div className="mb-7">
                <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                  Suffix Name
                </p>
                <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                  {suffixName}
                </p>
              </div>
              <div>
                <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                  Birth Date
                </p>
                <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                  {handleDateFormat(birthDate)}
                </p>
              </div>
            </div>
            <div className="col-span-2 md:col-span-1">
              <div className="mb-7">
                <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                  Contact Number
                </p>
                <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                  {contactNumber}
                </p>
              </div>
              <div className="mb-7">
                <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                  Email
                </p>
                <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                  {email}
                </p>
              </div>
              <div className="mb-7">
                <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                  Branch Assigned
                </p>
                <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                  {branchAssigned}
                </p>
              </div>
              <div>
                <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                  Role
                </p>
                <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                  {role}
                </p>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <Button
              type="submit"
              className="w-full bg-red-500 hover:bg-red-600 disabled:bg-red-300"
              disabled={isDeleting}
            >
              {isDeleting ? (
                <>
                  <div className="flex gap-2">
                    <Spinner size="xs" />
                    Deleting User...
                  </div>
                </>
              ) : (
                "Delete User"
              )}
            </Button>
          </div>
        </Form>
      </Modal>
    </>
  );
}
