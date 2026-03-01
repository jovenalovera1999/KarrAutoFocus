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
import {
  OfficeExpenseColumns,
  OfficeExpenseFieldsErrors,
} from "@/interfaces/OfficeExpenseInterface";
import OfficeExpenseService from "@/services/OfficeExpenseService";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";

interface EditOfficeExpenseFormModalProps {
  officeExpenseData: OfficeExpenseColumns | null;
  isOpen: boolean;
  onClose: () => void;
  refreshOfficeExpenses: () => void;
}

export default function EditOfficeExpenseFormModal({
  officeExpenseData,
  isOpen,
  onClose,
  refreshOfficeExpenses,
}: EditOfficeExpenseFormModalProps) {
  const { execute: executeUpdateOfficeExpense, loading: isUpdating } =
    useApiMutation();
  const { showAlert } = useAlert();
  const { handleCommaInNumbersOnTypingFormat } = useFormat();

  const [officeExpenseId, setOfficeExpenseId] = useState(0);
  const [incurrenceDate, setIncurrenceDate] = useState("");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [fieldErrors, setFieldErrors] = useState<OfficeExpenseFieldsErrors>({});

  const handleUpdateOfficeExpense = (e: FormEvent) => {
    e.preventDefault();

    const payload = {
      incurrence_date: incurrenceDate,
      amount: amount,
      description: description,
    };

    executeUpdateOfficeExpense({
      apiService: () =>
        OfficeExpenseService.updateOfficeExpense(officeExpenseId, payload),

      onSuccess: (data) => {
        showAlert({
          variant: "success",
          title: "Update Success",
          message: data.message,
        });

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

  useEffect(() => {
    if (isOpen) {
      setOfficeExpenseId(officeExpenseData?.office_expense_id ?? 0);
      setIncurrenceDate(officeExpenseData?.incurrence_date ?? "");
      setAmount(officeExpenseData?.amount ?? "");
      setDescription(officeExpenseData?.description ?? "");
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) {
      setOfficeExpenseId(0);
      setIncurrenceDate("");
      setAmount("");
      setDescription("");
    }
  }, [isOpen]);

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <Form onSubmit={handleUpdateOfficeExpense}>
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
            <Button type="submit" className=" w-full" disabled={isUpdating}>
              {isUpdating ? (
                <>
                  <div className="flex gap-2">
                    <Spinner size="xs" />
                    Updating Office Expense...
                  </div>
                </>
              ) : (
                "Update Office Expense"
              )}
            </Button>
          </div>
        </Form>
      </Modal>
    </>
  );
}
