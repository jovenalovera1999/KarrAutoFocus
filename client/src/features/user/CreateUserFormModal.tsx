import ComponentCard from "@/components/common/ComponentCard";
import Button from "@/components/ui/button/Button";
import Form from "@/components/ui/form/Form";
import Input from "@/components/ui/form/Input";
import Label from "@/components/ui/form/Label";
import Select from "@/components/ui/form/Select";
import { Modal } from "@/components/ui/modal";
import { useAlert } from "@/context/AlertContext";
import { UserFieldsErrors } from "@/interfaces/UserInterface";
import UserService from "@/services/UserService";
import { FormEvent, useState } from "react";

interface CreateUserFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  //   onUserCreated: (
  //     status: "success" | "warning" | "failed" | "others",
  //     message: string,
  //   ) => void;
}

export default function CreateUserFormModal({
  isOpen,
  onClose,
  //   onUserCreated,
}: CreateUserFormModalProps) {
  const { showAlert } = useAlert();

  const [isReferencesLoading, setIsReferencesLoading] = useState("");
  const [isStoring, setIsStoring] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [lastName, setLastName] = useState("");
  const [suffixName, setSuffixName] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [branchAssigned, setBranchAssigned] = useState("");
  const [role, setRole] = useState("");
  const [fieldErrors, setFieldErrors] = useState<UserFieldsErrors>({});

  const handleStoreUser = async (e: FormEvent) => {
    try {
      e.preventDefault();
      setIsStoring(true);

      const payload = {
        first_name: firstName,
        middle_name: middleName,
        last_name: lastName,
        suffix_name: suffixName,
        birth_date: birthDate,
        contact_number: contactNumber,
        email: email,
        username: username,
        password: password,
        password_confirmation: passwordConfirmation,
        branch_assigned: branchAssigned,
        role: role,
      };

      const { status, data } = await UserService.storeUser(payload);

      if (status !== 200) {
        showAlert({
          variant: "success",
          title: "Alert Testing",
          message: "Testing alert for the first time see if it works and great",
        });
        console.error(
          "Status error during store user at CreateUserFormModal.tsx: ",
          status,
        );
        return;
      }
    } catch (error: any) {
      if (error.response && error.response.status !== 422) {
        console.error(
          "Server error during store user at CreateUserFormModal.tsx: ",
          error,
        );
      }

      setFieldErrors(error.response.data.errors);
    } finally {
      setIsStoring(false);
    }
  };

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        className="max-w-150 p-5 lg:p-10"
      >
        <Form onSubmit={handleStoreUser}>
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
                <Input type="text" name="middle_name" />
              </div>
              <div className="mb-4">
                <Label required>Last Name</Label>
                <Input type="text" name="last_name" />
              </div>
              <div className="mb-4">
                <Label>Suffix Name</Label>
                <Input type="text" name="suffix_name" />
              </div>
              <div className="mb-4">
                <Label required>Birth Date</Label>
                <Input type="date" name="birth_date" />
              </div>
              <div>
                <Label required>Contact Number</Label>
                <Input type="text" name="contact_number" />
              </div>
            </div>
            <div className="col-span-2 md:col-span-1">
              <div className="mb-4">
                <Label>Email</Label>
                <Input type="text" name="email" />
              </div>
              <div className="mb-4">
                <Label required>Username</Label>
                <Input type="text" name="username" />
              </div>
              <div className="mb-4">
                <Label required>Password</Label>
                <Input type="password" name="password" />
              </div>
              <div className="mb-4">
                <Label required>Password Confirmation</Label>
                <Input type="password" name="password_confirmation" />
              </div>
              <div className="mb-4">
                <Label required>Branch Assigned</Label>
                <Select name="branch_assigned">
                  <option value="">Select Branch Assigned</option>
                </Select>
              </div>
              <div>
                <Label required>Role</Label>
                <Select name="role">
                  <option value="">Select Role</option>
                </Select>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <Button type="submit" className="w-full" disabled={isStoring}>
              {isStoring ? "Creating User..." : "Create User"}
            </Button>
          </div>
        </Form>
      </Modal>
    </>
  );
}
