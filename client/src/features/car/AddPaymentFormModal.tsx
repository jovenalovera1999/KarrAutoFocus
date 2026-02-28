import Button from "@/components/ui/button/Button";
import Form from "@/components/ui/form/Form";
import Input from "@/components/ui/form/Input";
import Label from "@/components/ui/form/Label";
import Select from "@/components/ui/form/Select";
import TextArea from "@/components/ui/form/TextArea";
import { Modal } from "@/components/ui/modal";
import Spinner from "@/components/ui/spinner/Spinner";
import { useAlert } from "@/context/AlertContext";
import useApiMutation from "@/hooks/api/useApiMutation";
import useApiQuery from "@/hooks/api/useApiQuery";
import { useFormat } from "@/hooks/useFormat";
import { BuyerColumns } from "@/interfaces/BuyerInterface";
import { CarColumns } from "@/interfaces/CarInterface";
import { PaymentBreakdownColumns } from "@/interfaces/PaymentBreakdownInterface";
import { PaymentFieldsErrors } from "@/interfaces/PaymentInterface";
import PaymentMethodService from "@/services/PaymentMethodService";
import PaymentService from "@/services/PaymentService";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";

interface PaymentReferences {
  paymentMethods: PaymentMethodColumns[];
}

interface AddPaymentFormModalProps {
  carData: CarColumns | null;
  buyerData: BuyerColumns | null | undefined;
  paymentBreakdownData: PaymentBreakdownColumns | null | undefined;
  isOpen: boolean;
  onClose: () => void;
  refreshPayments: () => void;
}

export default function AddPaymentFormModal({
  carData,
  buyerData,
  paymentBreakdownData,
  isOpen,
  onClose,
  refreshPayments,
}: AddPaymentFormModalProps) {
  const { showAlert } = useAlert();
  const { handleCommaInNumbersOnTypingFormat } = useFormat();
  const { execute: executeStorePayment, loading: isStoring } = useApiMutation();

  const [carId, setCarId] = useState(0);
  const [buyerId, setBuyerId] = useState(0);
  const [paymentBreakdownId, setPaymentBreakdownId] = useState(0);
  const [paymentDate, setPaymentDate] = useState("");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [fieldErrors, setFieldErrors] = useState<PaymentFieldsErrors>({});

  const {
    data: paymentReferencesData,
    load: loadPaymentMethods,
    loading: isPaymentMethodsLoading,
  } = useApiQuery<PaymentReferences>({
    apiService: () => PaymentMethodService.loadPaymentMethods(),
  });

  useEffect(() => {
    if ((isOpen && carData) || buyerData || paymentBreakdownData) {
      setCarId(carData?.car_id ?? 0);
      setBuyerId(buyerData?.buyer_id ?? 0);
      setPaymentBreakdownId(paymentBreakdownData?.payment_breakdown_id ?? 0);
      loadPaymentMethods();
    }
  }, [isOpen, carData, buyerData, paymentBreakdownData]);

  const paymentMethods = paymentReferencesData?.paymentMethods ?? [];

  const handleStorePayment = (e: FormEvent) => {
    e.preventDefault();

    const payload = {
      payment_date: paymentDate,
      amount: amount,
      description: description,
      payment_method: paymentMethod,
    };

    executeStorePayment({
      apiService: () =>
        PaymentService.storePayment(
          payload,
          carId,
          buyerId,
          paymentBreakdownId,
        ),

      onSuccess: (data) => {
        showAlert({
          variant: "success",
          title: "Save Success",
          message: data.message,
        });

        setPaymentDate("");
        setAmount("");
        setDescription("");
        setPaymentMethod("");
        setFieldErrors({});
        refreshPayments();
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
        {isPaymentMethodsLoading && paymentMethods.length <= 0 && (
          <>
            <div className="flex items-center justify-center">
              <Spinner size="xl" />
            </div>
          </>
        )}

        {!isPaymentMethodsLoading && paymentMethods.length > 0 && (
          <Form onSubmit={handleStorePayment}>
            <div className="mb-4">
              <Label required>Payment Date</Label>
              <Input
                type="date"
                name="payment_date"
                value={paymentDate}
                onChange={(e) => setPaymentDate(e.target.value)}
                errors={fieldErrors.payment_date}
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
            <div className="mb-4">
              <Label required>Payment Method</Label>
              <Select
                name="payment_method"
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
                errors={fieldErrors.payment_method}
              >
                <option value="">Select Payment Method</option>
                {paymentMethods.map((paymentMethod) => (
                  <option
                    value={paymentMethod.payment_method_id}
                    key={paymentMethod.payment_method_id}
                  >
                    {paymentMethod.payment_method}
                  </option>
                ))}
              </Select>
            </div>
            <div className="flex items-center justify-center">
              <Button type="submit" className=" w-full" disabled={isStoring}>
                {isStoring ? (
                  <>
                    <div className="flex gap-2">
                      <Spinner size="xs" />
                      Saving Payment...
                    </div>
                  </>
                ) : (
                  "Save Payment"
                )}
              </Button>
            </div>
          </Form>
        )}
      </Modal>
    </>
  );
}
