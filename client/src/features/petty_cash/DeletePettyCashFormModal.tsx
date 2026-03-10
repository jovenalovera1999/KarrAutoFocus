"use client";

import Button from "@/components/ui/button/Button";
import Form from "@/components/ui/form/Form";
import { Modal } from "@/components/ui/modal";
import Spinner from "@/components/ui/spinner/Spinner";
import { useAlert } from "@/context/AlertContext";
import useApiMutation from "@/hooks/api/useApiMutation";
import { useFormat } from "@/hooks/useFormat";
import { PettyCashColumns } from "@/interfaces/PettyCashInterface";
import { PettyCashService } from "@/services/PettyCashService";
import { FormEvent, useEffect, useState } from "react";

interface DeletePettyCashFormModalProps {
  pettyCashData: PettyCashColumns | null;
  isOpen: boolean;
  onClose: () => void;
  refreshPettyCash: () => void;
}

export default function DeletePettyCashFormModal({
  pettyCashData,
  isOpen,
  onClose,
  refreshPettyCash,
}: DeletePettyCashFormModalProps) {
  const { showAlert } = useAlert();
  const { handleNumberDecimalFormat } = useFormat();
  const { execute: executeDeletePettyCash, loading: isDeleting } =
    useApiMutation();

  const [pettyCashId, setPettyCashId] = useState(0);
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");

  const handleUpdatePettyCash = (e: FormEvent) => {
    e.preventDefault();

    executeDeletePettyCash({
      apiService: () => PettyCashService.deletePettyCash(pettyCashId),

      onSuccess: (data) => {
        showAlert({
          variant: "success",
          title: "Delete Success",
          message: data.message,
        });

        refreshPettyCash();
        onClose();
      },
    });
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
                    Deleting Petty Cash...
                  </div>
                </>
              ) : (
                "Delete Petty Cash"
              )}
            </Button>
          </div>
        </Form>
      </Modal>
    </>
  );
}
