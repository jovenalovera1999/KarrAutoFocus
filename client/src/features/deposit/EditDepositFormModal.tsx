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
import {
  DepositColumns,
  DepositFieldsErrors,
} from "@/interfaces/DepositInterface";
import DepositService from "@/services/DepositService";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";

interface EditDepositFormModalProps {
  depositData: DepositColumns | null;
  isOpen: boolean;
  onClose: () => void;
  refreshDeposits: () => void;
}

export default function EditDepositFormModal({
  depositData,
  isOpen,
  onClose,
  refreshDeposits,
}: EditDepositFormModalProps) {
  const { showAlert } = useAlert();
  const { handleCommaInNumbersOnTypingFormat } = useFormat();
  const { execute: executeUpdateDeposit, loading: isUpdating } =
    useApiMutation();

  const [depositId, setDepositId] = useState(0);
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [fieldErrors, setFieldErrors] = useState<DepositFieldsErrors>({});

  const handleUpdateDeposit = (e: FormEvent) => {
    e.preventDefault();

    const payload = {
      amount: amount,
      description: description,
    };

    executeUpdateDeposit({
      apiService: () => DepositService.updateDeposit(depositId, payload),

      onSuccess: (data) => {
        showAlert({
          variant: "success",
          title: "Update Success",
          message: data.message,
        });

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

  useEffect(() => {
    if (isOpen) {
      setDepositId(depositData?.deposit_id ?? 0);
      setAmount(depositData?.amount ?? "");
      setDescription(depositData?.description ?? "");
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) {
      setDepositId(0);
      setAmount("");
      setDescription("");
    }
  }, [isOpen]);

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <Form onSubmit={handleUpdateDeposit}>
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
            <Button type="submit" className=" w-full" disabled={isUpdating}>
              {isUpdating ? (
                <>
                  <div className="flex gap-2">
                    <Spinner size="xs" />
                    Updating Deposit...
                  </div>
                </>
              ) : (
                "Update Deposit"
              )}
            </Button>
          </div>
        </Form>
      </Modal>
    </>
  );
}
