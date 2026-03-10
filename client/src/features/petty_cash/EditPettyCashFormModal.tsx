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
  PettyCashColumns,
  PettyCashFieldsErrors,
} from "@/interfaces/PettyCashInterface";
import { PettyCashService } from "@/services/PettyCashService";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";

interface EditPettyCashFormModalProps {
  pettyCashData: PettyCashColumns | null;
  isOpen: boolean;
  onClose: () => void;
  refreshPettyCash: () => void;
}

export default function EditPettyCashFormModal({
  pettyCashData,
  isOpen,
  onClose,
  refreshPettyCash,
}: EditPettyCashFormModalProps) {
  const { showAlert } = useAlert();
  const { handleCommaInNumbersOnTypingFormat } = useFormat();
  const { execute: executeUpdatePettyCash, loading: isUpdating } =
    useApiMutation();

  const [pettyCashId, setPettyCashId] = useState(0);
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [fieldErrors, setFieldErrors] = useState<PettyCashFieldsErrors>({});

  const handleUpdatePettyCash = (e: FormEvent) => {
    e.preventDefault();

    const payload = {
      amount: amount,
      description: description,
    };

    executeUpdatePettyCash({
      apiService: () => PettyCashService.updatePettyCash(pettyCashId, payload),

      onSuccess: (data) => {
        showAlert({
          variant: "success",
          title: "Update Success",
          message: data.message,
        });

        setFieldErrors({});
        refreshPettyCash();
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
      setPettyCashId(pettyCashData?.petty_cash_id ?? 0);
      setAmount(pettyCashData?.amount ?? "");
      setDescription(pettyCashData?.description ?? "");
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) {
      setPettyCashId(0);
      setAmount("");
      setDescription("");
    }
  }, [isOpen]);

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <Form onSubmit={handleUpdatePettyCash}>
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
                    Updating Petty Cash...
                  </div>
                </>
              ) : (
                "Update Petty Cash"
              )}
            </Button>
          </div>
        </Form>
      </Modal>
    </>
  );
}
