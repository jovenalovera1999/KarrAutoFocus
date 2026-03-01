import ComponentCard from "@/components/common/ComponentCard";
import Button from "@/components/ui/button/Button";
import Form from "@/components/ui/form/Form";
import Input from "@/components/ui/form/Input";
import Label from "@/components/ui/form/Label";
import { useAlert } from "@/context/AlertContext";
import useApiMutation from "@/hooks/api/useApiMutation";
import { useFormat } from "@/hooks/useFormat";
import { CarColumns } from "@/interfaces/CarInterface";
import { PaymentBreakdownFieldsErrors } from "@/interfaces/PaymentBreakdownInterface";
import PaymentBreakdownService from "@/services/PaymentBreakdownService";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";

interface PaymentBreakdownFormProps {
  carData: CarColumns | null;
  refreshCarData: () => void;
}

export default function PaymentBreakdownForm({
  carData,
  refreshCarData,
}: PaymentBreakdownFormProps) {
  const { showAlert } = useAlert();
  const { handleCommaInNumbersOnTypingFormat, handleNumberDecimalFormat } =
    useFormat();

  const { execute: executeStorePaymentBreakdown, loading: isStoring } =
    useApiMutation();
  const { execute: executeUpdatePaymentBreakdown, loading: isUpdating } =
    useApiMutation();

  const [carId, setCarId] = useState(0);
  const [buyerId, setBuyerId] = useState(0);
  const [paymentBreakdownId, setPaymentBreakdownId] = useState(0);
  const [downpayment, setDownpayment] = useState("");
  const [processingFee, setProcessingFee] = useState("");
  const [serviceFee, setServiceFee] = useState("");
  const [transfer, setTransfer] = useState("");
  const [finance, setFinance] = useState("");
  const [loanAmount, setLoanAmount] = useState("");
  const [term, setTerm] = useState("");
  const [fieldErrors, setFieldErrors] = useState<PaymentBreakdownFieldsErrors>(
    {},
  );

  const handleStorePaymentBreakdown = (e: FormEvent) => {
    e.preventDefault();

    const payload = {
      car: carId,
      buyer: buyerId,
      downpayment: downpayment,
      processing_fee: processingFee,
      service_fee: serviceFee,
      transfer: transfer,
      finance: finance,
      term: term,
    };

    executeStorePaymentBreakdown({
      apiService: () => PaymentBreakdownService.storePaymentBreakdown(payload),

      onSuccess: (data) => {
        showAlert({
          variant: "success",
          title: "Save Success",
          message: data.message,
        });

        setFieldErrors({});
        refreshCarData();
      },

      onValidationError: (errors) => {
        setFieldErrors(errors);
      },
    });
  };

  const handleUpdatePaymentBreakdown = (e: FormEvent) => {
    e.preventDefault();

    const payload = {
      downpayment: downpayment,
      processing_fee: processingFee,
      service_fee: serviceFee,
      transfer: transfer,
      finance: finance,
      term: term,
    };

    executeUpdatePaymentBreakdown({
      apiService: () =>
        PaymentBreakdownService.updatePaymentBreakdown(
          paymentBreakdownId,
          payload,
        ),

      onSuccess: (data) => {
        showAlert({
          variant: "success",
          title: "Update Success",
          message: data.message,
        });

        setFieldErrors({});
        refreshCarData();
      },

      onValidationError: (errors) => {
        setFieldErrors(errors);
      },
    });
  };

  const handleDownpaymentChange = (e: ChangeEvent<HTMLInputElement>) => {
    let rawValue = e.target.value.replace(/,/g, "");

    if (!/^\d*\.?\d*$/.test(rawValue)) {
      return;
    }

    setDownpayment(rawValue);
  };

  const handleProcessingFeeChange = (e: ChangeEvent<HTMLInputElement>) => {
    let rawValue = e.target.value.replace(/,/g, "");

    if (!/^\d*\.?\d*$/.test(rawValue)) {
      return;
    }

    setProcessingFee(rawValue);
  };

  const handleServiceFeeChange = (e: ChangeEvent<HTMLInputElement>) => {
    let rawValue = e.target.value.replace(/,/g, "");

    if (!/^\d*\.?\d*$/.test(rawValue)) {
      return;
    }

    setServiceFee(rawValue);
  };

  const handleTransferChange = (e: ChangeEvent<HTMLInputElement>) => {
    let rawValue = e.target.value.replace(/,/g, "");

    if (!/^\d*\.?\d*$/.test(rawValue)) {
      return;
    }

    setTransfer(rawValue);
  };

  useEffect(() => {
    setCarId(carData?.car_id ?? 0);
    setBuyerId(carData?.buyer?.buyer_id ?? 0);
    setPaymentBreakdownId(
      carData?.payment_breakdown?.payment_breakdown_id ?? 0,
    );
  }, [carData, carData?.buyer, carData?.payment_breakdown]);

  useEffect(() => {
    if (carData?.payment_breakdown) {
      const paymentBreakdown = carData.payment_breakdown;

      setDownpayment(paymentBreakdown.downpayment ?? "");
      setProcessingFee(paymentBreakdown.processing_fee ?? "");
      setServiceFee(paymentBreakdown.service_fee ?? "");
      setTransfer(paymentBreakdown.transfer ?? "");
      setFinance(paymentBreakdown.finance.finance ?? "");
      setTerm(paymentBreakdown.term.term ?? "");
    }
  }, [carData?.payment_breakdown]);

  useEffect(() => {
    if (!carData?.payment_breakdown) {
      setDownpayment("");
      setProcessingFee("");
      setServiceFee("");
      setTransfer("");
      setFinance("");
      setTerm("");
    }
  }, [carData?.payment_breakdown]);

  return (
    <>
      <ComponentCard title="Payment Breakdown">
        <Form
          onSubmit={
            paymentBreakdownId
              ? handleUpdatePaymentBreakdown
              : handleStorePaymentBreakdown
          }
        >
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="col-span-2 md:col-span-1">
              <div className="mb-4">
                <Label>Downpayment</Label>
                <Input
                  type="text"
                  name="downpayment"
                  value={handleCommaInNumbersOnTypingFormat(downpayment)}
                  onChange={handleDownpaymentChange}
                  errors={fieldErrors.downpayment}
                />
              </div>
              <div className="mb-4">
                <Label>Processing Fee</Label>
                <Input
                  type="text"
                  name="processing_fee"
                  value={handleCommaInNumbersOnTypingFormat(processingFee)}
                  onChange={handleProcessingFeeChange}
                  errors={fieldErrors.processing_fee}
                />
              </div>
              <div className="mb-4">
                <Label>Service Fee</Label>
                <Input
                  type="text"
                  name="service_fee"
                  value={handleCommaInNumbersOnTypingFormat(serviceFee)}
                  onChange={handleServiceFeeChange}
                  errors={fieldErrors.service_fee}
                />
              </div>
              <div>
                <Label>Transfer</Label>
                <Input
                  type="text"
                  name="transfer"
                  value={handleCommaInNumbersOnTypingFormat(transfer)}
                  onChange={handleTransferChange}
                  errors={fieldErrors.transfer}
                />
              </div>
            </div>
            <div className="col-span-2 md:col-span-1">
              <div className="mb-4">
                <Label required>Finance</Label>
                <Input
                  type="text"
                  name="finance"
                  value={finance}
                  onChange={(e) => setFinance(e.target.value)}
                  errors={fieldErrors.finance}
                />
              </div>
              <div className="mb-4">
                <Label>Loan Amount</Label>
                <Input
                  type="text"
                  name="loan_amount"
                  value={handleNumberDecimalFormat(
                    (
                      Number(carData?.buyer?.agreed_price) - Number(downpayment)
                    ).toString(),
                  )}
                  readOnly
                />
              </div>
              <div>
                <Label required>Term</Label>
                <Input
                  type="text"
                  name="term"
                  value={term}
                  onChange={(e) => setTerm(e.target.value)}
                  errors={fieldErrors.term}
                />
              </div>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <Button
              type="submit"
              className="w-full"
              disabled={isStoring || isUpdating}
            >
              {paymentBreakdownId
                ? isUpdating
                  ? "Updating Payment Breakdown..."
                  : "Update Payment Breakdown"
                : isStoring
                  ? "Saving Payment Breakdown..."
                  : "Save Payment Breakdown"}
            </Button>
          </div>
        </Form>
      </ComponentCard>
    </>
  );
}
