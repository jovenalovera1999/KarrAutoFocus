import Button from "@/components/ui/button/Button";
import Form from "@/components/ui/form/Form";
import Input from "@/components/ui/form/Input";
import Label from "@/components/ui/form/Label";
import Select from "@/components/ui/form/Select";
import { Modal } from "@/components/ui/modal";
import Spinner from "@/components/ui/spinner/Spinner";
import { useAlert } from "@/context/AlertContext";
import { BranchColumns } from "@/interfaces/BranchInterface";
import { RoleColumns } from "@/interfaces/RoleInterface";
import { UserFieldsErrors } from "@/interfaces/UserInterface";
import UserService from "@/services/UserService";
import { FormEvent, useCallback, useEffect, useState } from "react";

interface CreateUserFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  refreshUsers: () => void;
}

export default function CreateUserFormModal({
  isOpen,
  onClose,
  refreshUsers,
}: CreateUserFormModalProps) {
  const { showAlert } = useAlert();

  const [isReferencesLoading, setIsReferencesLoading] = useState(true);
  const [branches, setBranches] = useState<BranchColumns[]>([]);
  const [roles, setRoles] = useState<RoleColumns[]>([]);

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

  const handleLoadUserReferences = useCallback(async () => {
    try {
      const { status, data } = await UserService.loadUserReferences();

      if (status !== 200) {
        console.error(
          "Status error during load user references at CreateUserFormModal.tsx: ",
          status,
        );
        return;
      }

      setBranches(data.branches);
      setRoles(data.roles);
    } catch (error: any) {
      console.error(
        "Server error during load user references at CreateUserFormModal.tsx: ",
        error,
      );
    } finally {
      setIsReferencesLoading(false);
    }
  }, []);

  useEffect(() => {
    if (isOpen) {
      handleLoadUserReferences();
    }
  }, [isOpen]);

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
        console.error(
          "Status error during store user at CreateUserFormModal.tsx: ",
          status,
        );
        return;
      }

      showAlert({
        variant: "success",
        title: "Success",
        message: data.message,
      });

      setFirstName("");
      setMiddleName("");
      setLastName("");
      setSuffixName("");
      setBirthDate("");
      setContactNumber("");
      setEmail("");
      setUsername("");
      setPassword("");
      setPasswordConfirmation("");
      setBranchAssigned("");
      setRole("");
      setFieldErrors({});

      refreshUsers();
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
        {isReferencesLoading && branches.length <= 0 && roles.length <= 0 && (
          <div className="flex items-center justify-center">
            <Spinner size="xl" />
          </div>
        )}

        {!isReferencesLoading && branches.length > 0 && roles.length > 0 && (
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
                <div>
                  <Label required>Contact Number</Label>
                  <Input
                    type="text"
                    name="contact_number"
                    value={contactNumber}
                    onChange={(e) => setContactNumber(e.target.value)}
                    errors={fieldErrors.contact_number}
                  />
                </div>
              </div>
              <div className="col-span-2 md:col-span-1">
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
                  <Label required>Username</Label>
                  <Input
                    type="text"
                    name="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    errors={fieldErrors.username}
                    min="6"
                    max="12"
                  />
                </div>
                <div className="mb-4">
                  <Label required>Password</Label>
                  <Input
                    type="password"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    errors={fieldErrors.password}
                    min="6"
                    max="15"
                  />
                </div>
                <div className="mb-4">
                  <Label required>Password Confirmation</Label>
                  <Input
                    type="password"
                    name="password_confirmation"
                    value={passwordConfirmation}
                    onChange={(e) => setPasswordConfirmation(e.target.value)}
                    errors={fieldErrors.password_confirmation}
                    min="6"
                    max="15"
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
                        <option value={branch.branch_id} key={branch.branch_id}>
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
              <Button type="submit" className="w-full" disabled={isStoring}>
                {isStoring ? (
                  <>
                    <div className="flex gap-2">
                      <Spinner size="xs" />
                      Creating User...
                    </div>
                  </>
                ) : (
                  "Create User"
                )}
              </Button>
            </div>
          </Form>
        )}
      </Modal>
    </>
  );
}
