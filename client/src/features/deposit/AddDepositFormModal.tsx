"use client";

import Button from "@/components/ui/button/Button";
import Form from "@/components/ui/form/Form";
import Input from "@/components/ui/form/Input";
import Label from "@/components/ui/form/Label";
import { Modal } from "@/components/ui/modal";
import Spinner from "@/components/ui/spinner/Spinner";
import { useAlert } from "@/context/AlertContext";
import useApiMutation from "@/hooks/api/useApiMutation";
import { useFormat } from "@/hooks/useFormat";
import { DepositFieldsErrors } from "@/interfaces/DepositInterface";
import DepositService from "@/services/DepositService";
import { ChangeEvent, FormEvent, useState } from "react";

interface AddDepositFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  refreshDeposits: () => void;
}

export default function AddDepositFormModal({
  isOpen,
  onClose,
  refreshDeposits,
}: AddDepositFormModalProps) {
  const { showAlert } = useAlert();
  const { handleCommaInNumbersOnTypingFormat } = useFormat();
  const { execute: executeStoreDeposit, loading: isStoring } = useApiMutation();

  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [fieldErrors, setFieldErrors] = useState<DepositFieldsErrors>({});

  const handleStoreDeposit = (e: FormEvent) => {
    e.preventDefault();

    const payload = {
      amount: amount,
      description: description,
    };

    executeStoreDeposit({
      apiService: () => DepositService.storeDeposit(payload),

      onSuccess: (data) => {
        showAlert({
          variant: "success",
          title: "Save Success",
          message: data.message,
        });

        setAmount("");
        setDescription("");
        setFieldErrors({});

        refreshDeposits();
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
        <Form onSubmit={handleStoreDeposit}>
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
            <Input
              type="text"
              name="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              errors={fieldErrors.description}
            />
          </div>
          <div className="flex items-center justify-center">
            <Button type="submit" className="w-full" disabled={isStoring}>
              {isStoring ? (
                <>
                  <div className="flex gap-2">
                    <Spinner size="xs" />
                    Saving Deposit...
                  </div>
                </>
              ) : (
                "Save Deposit"
              )}
            </Button>
          </div>
        </Form>
      </Modal>
    </>
  );
}
