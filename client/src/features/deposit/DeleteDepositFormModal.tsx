"use client";

import Button from "@/components/ui/button/Button";
import Form from "@/components/ui/form/Form";
import { Modal } from "@/components/ui/modal";
import Spinner from "@/components/ui/spinner/Spinner";
import { useAlert } from "@/context/AlertContext";
import useApiMutation from "@/hooks/api/useApiMutation";
import { useFormat } from "@/hooks/useFormat";
import { DepositColumns } from "@/interfaces/DepositInterface";
import DepositService from "@/services/DepositService";
import { FormEvent, useEffect, useState } from "react";

interface DeleteDepositFormModalProps {
  depositData: DepositColumns | null;
  isOpen: boolean;
  onClose: () => void;
  refreshDeposits: () => void;
}

export default function DeleteDepositFormModal({
  depositData,
  isOpen,
  onClose,
  refreshDeposits,
}: DeleteDepositFormModalProps) {
  const { showAlert } = useAlert();
  const { handleNumberDecimalFormat } = useFormat();
  const { execute: executeDeleteDeposit, loading: isDeleting } =
    useApiMutation();

  const [depositId, setDepositId] = useState(0);
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");

  const handleDeleteDeposit = (e: FormEvent) => {
    e.preventDefault();

    executeDeleteDeposit({
      apiService: () => DepositService.deleteDeposit(depositId),

      onSuccess: (data) => {
        showAlert({
          variant: "success",
          title: "Delete Success",
          message: data.message,
        });

        refreshDeposits();
        onClose();
      },
    });
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
        <Form onSubmit={handleDeleteDeposit}>
          <div className="mb-7">
            <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
              Amount
            </p>
            <p className="text-sm font-medium text-gray-800 dark:text-white/90">
              {handleNumberDecimalFormat(amount)}
            </p>
          </div>
          <div className="mb-7">
            <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
              Description
            </p>
            <p className="text-sm font-medium text-gray-800 dark:text-white/90">
              {description}
            </p>
          </div>
          <div className="flex items-center justify-center">
            <Button
              type="submit"
              className="w-full bg-red-500 hover:bg-red-600"
              disabled={isDeleting}
            >
              {isDeleting ? (
                <>
                  <div className="flex gap-2">
                    <Spinner size="xs" />
                    Deleting Deposit...
                  </div>
                </>
              ) : (
                "Delete Deposit"
              )}
            </Button>
          </div>
        </Form>
      </Modal>
    </>
  );
}
