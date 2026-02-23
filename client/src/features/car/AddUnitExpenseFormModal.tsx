import Button from "@/components/ui/button/Button";
import Form from "@/components/ui/form/Form";
import Input from "@/components/ui/form/Input";
import Label from "@/components/ui/form/Label";
import TextArea from "@/components/ui/form/TextArea";
import { Modal } from "@/components/ui/modal";
import Spinner from "@/components/ui/spinner/Spinner";
import { useAlert } from "@/context/AlertContext";
import { useFormat } from "@/hooks/useFormat";
import { UnitExpenseFieldsErrors } from "@/interfaces/UnitExpenseInterface";
import UnitExpenseService from "@/services/UnitExpenseSerivce";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";

interface AddUnitExpenseFormModalProps {
  selectedCarId: string | number | null;
  isOpen: boolean;
  onClose: () => void;
  refreshUnitExpenses: () => void;
}

export default function AddUnitExpenseFormModal({
  selectedCarId,
  isOpen,
  onClose,
  refreshUnitExpenses,
}: AddUnitExpenseFormModalProps) {
  const { showAlert } = useAlert();
  const { handleCommaInNumbersOnTypingFormat } = useFormat();

  const [isStoring, setIsStoring] = useState(false);
  const [carId, setCarId] = useState<string | number | null>("");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [fieldErrors, setFieldErrors] = useState<UnitExpenseFieldsErrors>({});

  const handleStoreOfficeExpense = async (e: FormEvent) => {
    try {
      e.preventDefault();
      setIsStoring(true);

      const payload = {
        car_id: carId,
        amount: amount,
        description: description,
      };

      const { status, data } =
        await UnitExpenseService.storeUnitExpense(payload);

      if (status !== 200) {
        console.error(
          "Status error during store expense at AddUnitExpenseFormModal.tsx: ",
          status,
        );
        return;
      }

      showAlert({
        variant: "success",
        title: "Added Success",
        message: data.message,
      });

      setAmount("");
      setDescription("");
      setFieldErrors({});

      refreshUnitExpenses();
    } catch (error: any) {
      if (error.response && error.response.status !== 422) {
        console.error(
          "Server error during store expense at AddUnitExpenseFormModal.tsx: ",
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

  useEffect(() => {
    if (isOpen) {
      setCarId(selectedCarId);
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) {
      setCarId("");
    }
  }, [isOpen]);

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <Form onSubmit={handleStoreOfficeExpense}>
          <div className="mb-4">
            <Label required>Amount</Label>
            <Input
              type="text"
              name="amount"
              value={handleCommaInNumbersOnTypingFormat(amount)}
              onChange={handleAmountChange}
              errors={fieldErrors.amount}
              autoFocus
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
                    Saving Unit Expense...
                  </div>
                </>
              ) : (
                "Save Unit Expense"
              )}
            </Button>
          </div>
        </Form>
      </Modal>
    </>
  );
}
