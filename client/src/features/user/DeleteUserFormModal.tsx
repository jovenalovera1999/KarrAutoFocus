import Button from "@/components/ui/button/Button";
import Form from "@/components/ui/form/Form";
import Input from "@/components/ui/form/Input";
import Label from "@/components/ui/form/Label";
import { Modal } from "@/components/ui/modal";
import Spinner from "@/components/ui/spinner/Spinner";
import { useAlert } from "@/context/AlertContext";
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

  const [isDestroying, setIsDestroying] = useState(false);
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
    try {
      e.preventDefault();
      setIsDestroying(true);

      const { status, data } = await UserService.deleteUser(userId);

      if (status !== 200) {
        console.error(
          "Status error during destroy user at DeleteUserFormModal.tsx: ",
          status,
        );
        return;
      }

      showAlert({
        variant: "success",
        title: "Success",
        message: data.message,
      });

      refreshUsers();
    } catch (error: any) {
      console.error(
        "Server error during destroy at DeleteUserFormModal.tsx: ",
        error,
      );
    } finally {
      setIsDestroying(false);
    }
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
              <div className="mb-4">
                <Label required>First Name</Label>
                <Input
                  type="text"
                  name="first_name"
                  value={firstName}
                  readOnly
                />
              </div>
              <div className="mb-4">
                <Label>Middle Name</Label>
                <Input
                  type="text"
                  name="middle_name"
                  value={middleName}
                  readOnly
                />
              </div>
              <div className="mb-4">
                <Label required>Last Name</Label>
                <Input type="text" name="last_name" value={lastName} readOnly />
              </div>
              <div className="mb-4">
                <Label>Suffix Name</Label>
                <Input
                  type="text"
                  name="suffix_name"
                  value={suffixName}
                  readOnly
                />
              </div>
              <div>
                <Label required>Birth Date</Label>
                <Input
                  type="date"
                  name="birth_date"
                  value={birthDate}
                  readOnly
                />
              </div>
            </div>
            <div className="col-span-2 md:col-span-1">
              <div className="mb-4">
                <Label required>Contact Number</Label>
                <Input
                  type="text"
                  name="contact_number"
                  value={contactNumber}
                  readOnly
                />
              </div>
              <div className="mb-4">
                <Label>Email</Label>
                <Input type="text" name="email" value={email} readOnly />
              </div>
              <div className="mb-4">
                <Label required>Branch Assigned</Label>
                <Input
                  type="text"
                  name="branch_assigned"
                  value={branchAssigned}
                  readOnly
                />
              </div>
              <div>
                <Label required>Role</Label>
                <Input type="text" name="role" value={role} readOnly />
              </div>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <Button
              type="submit"
              className="w-full bg-red-500 hover:bg-red-600 disabled:bg-red-300"
              disabled={isDestroying}
            >
              {isDestroying ? (
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
