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
import { PettyCashFieldsErrors } from "@/interfaces/PettyCashInterface";
import { PettyCashService } from "@/services/PettyCashService";
import { ChangeEvent, FormEvent, useState } from "react";

interface AddPettyCashFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  refreshPettyCash: () => void;
}

export default function AddPettyCashFormModal({
  isOpen,
  onClose,
  refreshPettyCash,
}: AddPettyCashFormModalProps) {
  const { showAlert } = useAlert();
  const { handleCommaInNumbersOnTypingFormat } = useFormat();
  const { execute: executeStorePettyCash, loading: isStoring } =
    useApiMutation();

  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [fieldErrors, setFieldErrors] = useState<PettyCashFieldsErrors>({});

  const handleStorePettyCash = (e: FormEvent) => {
    e.preventDefault();

    const payload = {
      amount: amount,
      description: description,
    };

    executeStorePettyCash({
      apiService: () => PettyCashService.storePettyCash(payload),

      onSuccess: (data) => {
        showAlert({
          variant: "success",
          title: "Save Success",
          message: data.message,
        });

        setAmount("");
        setDescription("");
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

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <Form onSubmit={handleStorePettyCash}>
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
                    Saving Petty Cash...
                  </div>
                </>
              ) : (
                "Save Petty Cash"
              )}
            </Button>
          </div>
        </Form>
      </Modal>
    </>
  );
}
