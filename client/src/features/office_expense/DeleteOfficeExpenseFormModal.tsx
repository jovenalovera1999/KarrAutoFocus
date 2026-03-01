"use client";

import Button from "@/components/ui/button/Button";
import Form from "@/components/ui/form/Form";
import { Modal } from "@/components/ui/modal";
import Spinner from "@/components/ui/spinner/Spinner";
import { useAlert } from "@/context/AlertContext";
import useApiMutation from "@/hooks/api/useApiMutation";
import { useFormat } from "@/hooks/useFormat";
import { OfficeExpenseColumns } from "@/interfaces/OfficeExpenseInterface";
import OfficeExpenseService from "@/services/OfficeExpenseService";
import { FormEvent, useEffect, useState } from "react";

interface DeleteOfficeExpenseFormModalProps {
  officeExpenseData: OfficeExpenseColumns | null;
  isOpen: boolean;
  onClose: () => void;
  refreshOfficeExpenses: () => void;
}

export default function DeleteOfficeExpenseFormModal({
  officeExpenseData,
  isOpen,
  onClose,
  refreshOfficeExpenses,
}: DeleteOfficeExpenseFormModalProps) {
  const { showAlert } = useAlert();
  const { handleDateFormat, handleNumberDecimalFormat } = useFormat();
  const { execute: executeDeleteOfficeExpense, loading: isDeleting } =
    useApiMutation();

  const [officeExpenseId, setOfficeExpenseId] = useState(0);
  const [incurrenceDate, setIncurrenceDate] = useState("");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");

  const handleDeleteOfficeExpense = (e: FormEvent) => {
    e.preventDefault();

    executeDeleteOfficeExpense({
      apiService: () =>
        OfficeExpenseService.deleteOfficeExpense(officeExpenseId),

      onSuccess: (data) => {
        showAlert({
          variant: "success",
          title: "Delete Success",
          message: data.message,
        });

        refreshOfficeExpenses();
        onClose();
      },
    });
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
        <Form onSubmit={handleDeleteOfficeExpense}>
          <div className="mb-7">
            <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
              Incurrence Date
            </p>
            <p className="text-sm font-medium text-gray-800 dark:text-white/90">
              {handleDateFormat(incurrenceDate)}
            </p>
          </div>
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
              className=" w-full bg-red-500 hover:bg-red-600"
              disabled={isDeleting}
            >
              {isDeleting ? (
                <>
                  <div className="flex gap-2">
                    <Spinner size="xs" />
                    Deleting Office Expense...
                  </div>
                </>
              ) : (
                "Delete Office Expense"
              )}
            </Button>
          </div>
        </Form>
      </Modal>
    </>
  );
}
