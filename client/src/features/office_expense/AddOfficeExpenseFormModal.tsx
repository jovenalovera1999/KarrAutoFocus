import Button from "@/components/ui/button/Button";
import Form from "@/components/ui/form/Form";
import Input from "@/components/ui/form/Input";
import Label from "@/components/ui/form/Label";
import TextArea from "@/components/ui/form/TextArea";
import { Modal } from "@/components/ui/modal";
import Spinner from "@/components/ui/spinner/Spinner";
import { useAlert } from "@/context/AlertContext";
import useApiMutation from "@/hooks/api/useApiMutation";
import { useFormat } from "@/hooks/useFormat";
import { OfficeExpenseFieldsErrors } from "@/interfaces/OfficeExpenseInterface";
import OfficeExpenseService from "@/services/OfficeExpenseService";
import { ChangeEvent, FormEvent, useState } from "react";

interface AddOfficeExpenseFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  refreshOfficeExpenses: () => void;
}

export default function AddOfficeExpenseFormModal({
  isOpen,
  onClose,
  refreshOfficeExpenses,
}: AddOfficeExpenseFormModalProps) {
  const { execute: executeStoreOfficeExpense, loading: isStoring } =
    useApiMutation();
  const { showAlert } = useAlert();
  const { handleCommaInNumbersOnTypingFormat } = useFormat();

  const [incurrenceDate, setIncurrenceDate] = useState("");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [fieldErrors, setFieldErrors] = useState<OfficeExpenseFieldsErrors>({});

  const handleStoreOfficeExpense = (e: FormEvent) => {
    e.preventDefault();

    const payload = {
      incurrence_date: incurrenceDate,
      amount: amount,
      description: description,
    };

    executeStoreOfficeExpense({
      apiService: () => OfficeExpenseService.storeOfficeExpense(payload),

      onSuccess: (data) => {
        showAlert({
          variant: "success",
          title: "Success",
          message: data.message,
        });

        setIncurrenceDate("");
        setAmount("");
        setDescription("");
        setFieldErrors({});

        refreshOfficeExpenses();
      },

      onValidationError: (errors) => {
        setFieldErrors(errors);
      },
    });
  };

  const handleAmountChange = (e: ChangeEvent<HTMLInputElement>) => {
    let rawValue = e.target.value.replace(/,/g, "");

    if (!/^\d*\.?\d*$/.test(rawValue)) {
      return;
    }

    setAmount(rawValue);
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <Form onSubmit={handleStoreOfficeExpense}>
          <div className="mb-4">
            <Label required>Incurrence Date</Label>
            <Input
              type="date"
              name="incurrence_date"
              value={incurrenceDate}
              onChange={(e) => setIncurrenceDate(e.target.value)}
              errors={fieldErrors.incurrence_date}
              autoFocus
            />
          </div>
          <div className="mb-4">
            <Label required>Amount</Label>
            <Input
              type="text"
              name="amount"
              value={handleCommaInNumbersOnTypingFormat(amount)}
              onChange={handleAmountChange}
              errors={fieldErrors.amount}
            />
          </div>
          <div className="mb-4">
            <Label required>Description</Label>
            <TextArea
              name="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              errors={fieldErrors.description}
            />
          </div>
          <div className="flex items-center justify-center">
            <Button type="submit" className=" w-full" disabled={isStoring}>
              {isStoring ? (
                <>
                  <div className="flex gap-2">
                    <Spinner size="xs" />
                    Saving Office Expense...
                  </div>
                </>
              ) : (
                "Save Office Expense"
              )}
            </Button>
          </div>
        </Form>
      </Modal>
    </>
  );
}
