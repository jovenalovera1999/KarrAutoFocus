import Button from "@/components/ui/button/Button";
import Form from "@/components/ui/form/Form";
import Input from "@/components/ui/form/Input";
import Label from "@/components/ui/form/Label";
import TextArea from "@/components/ui/form/TextArea";
import { Modal } from "@/components/ui/modal";
import Spinner from "@/components/ui/spinner/Spinner";
import { useAlert } from "@/context/AlertContext";
import { useFormat } from "@/hooks/useFormat";
import { ExpenseFieldsErrors } from "@/interfaces/ExpenseInterface";
import ExpenseService from "@/services/ExpenseService";
import { ChangeEvent, FormEvent, useState } from "react";

interface AddExpenseFormModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AddExpenseFormModal({
  isOpen,
  onClose,
}: AddExpenseFormModalProps) {
  const { showAlert } = useAlert();
  const { handleCommaInNumbersOnTypingFormat } = useFormat();

  const [isStoring, setIsStoring] = useState(false);
  const [incurrenceDate, setIncurrenceDate] = useState("");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [fieldErrors, setFieldErrors] = useState<ExpenseFieldsErrors>({});

  const handleStoreExpense = async (e: FormEvent) => {
    try {
      e.preventDefault();
      setIsStoring(true);

      const payload = {
        incurrence_date: incurrenceDate,
        amount: amount,
        description: description,
      };

      const { status, data } = await ExpenseService.storeExpense(payload);

      if (status !== 200) {
        console.error(
          "Status error during store expense at AddExpenseFormModal.tsx: ",
          status,
        );
        return;
      }

      showAlert({
        variant: "success",
        title: "Added Success",
        message: data.message,
      });

      setIncurrenceDate("");
      setAmount("");
      setDescription("");
      setFieldErrors({});
    } catch (error: any) {
      if (error.response && error.response.status !== 422) {
        console.error(
          "Server error during store expense at AddExpenseFormModal.tsx: ",
          error,
        );
        return;
      }

      setFieldErrors(error.response.data.errors);
    } finally {
      setIsStoring(false);
    }
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
        <Form onSubmit={handleStoreExpense}>
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
                    Saving Expense...
                  </div>
                </>
              ) : (
                "Save Expense"
              )}
            </Button>
          </div>
        </Form>
      </Modal>
    </>
  );
}
