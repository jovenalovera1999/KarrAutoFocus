import ComponentCard from "@/components/common/ComponentCard";
import Button from "@/components/ui/button/Button";
import Form from "@/components/ui/form/Form";
import Input from "@/components/ui/form/Input";
import Label from "@/components/ui/form/Label";
import useApiMutation from "@/hooks/api/useApiMutation";
import { useFormat } from "@/hooks/useFormat";
import { CarColumns } from "@/interfaces/CarInterface";
import { ChangeEvent, useState } from "react";

interface PaymentBreakdownFormProps {
  carData: CarColumns | null;
}

export default function PaymentBreakdownForm({
  carData,
}: PaymentBreakdownFormProps) {
  const { handleCommaInNumbersOnTypingFormat, handleNumberDecimalFormat } =
    useFormat();

  const { execute: storePaymentBreakdown, loading: isStoring } =
    useApiMutation();
  const { execute: updatePaymentBreakdown, loading: isUpdating } =
    useApiMutation();

  const [downpayment, setDownpayment] = useState("");
  const [processingFee, setProcessingFee] = useState("");
  const [serviceFee, setServiceFee] = useState("");
  const [transfer, setTransfer] = useState("");
  const [finance, setFinance] = useState("");
  const [loanAmount, setLoanAmount] = useState("");
  const [term, setTerm] = useState("");

  const handleDownpaymentChange = (e: ChangeEvent<HTMLInputElement>) => {
    let rawValue = e.target.value.replace(/,/g, "");

    if (!/^\d*\.?\d*$/.test(rawValue)) {
      return;
    }

    setDownpayment(rawValue);
  };

  return (
    <>
      <ComponentCard title="Buyer Information">
        <Form>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="col-span-2 md:col-span-1">
              <div className="mb-4">
                <Label>Downpayment</Label>
                <Input
                  type="text"
                  name="downpayment"
                  value={handleCommaInNumbersOnTypingFormat(downpayment)}
                  onChange={handleDownpaymentChange}
                  autoFocus
                />
              </div>
              <div className="mb-4">
                <Label>Processing Fee</Label>
                <Input
                  type="text"
                  name="processing_fee"
                  value={processingFee}
                  onChange={(e) => setProcessingFee(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <Label>Service Fee</Label>
                <Input
                  type="text"
                  name="service_fee"
                  value={serviceFee}
                  onChange={(e) => setServiceFee(e.target.value)}
                />
              </div>
              <div>
                <Label>Transfer</Label>
                <Input
                  type="text"
                  name="transfer"
                  value={transfer}
                  onChange={(e) => setTransfer(e.target.value)}
                />
              </div>
            </div>
            <div className="col-span-2 md:col-span-1">
              <div className="mb-4">
                <Label>Finance</Label>
                <Input
                  type="text"
                  name="finance"
                  value={finance}
                  onChange={(e) => setFinance(e.target.value)}
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
                />
              </div>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <Button type="submit" className="w-full">
              Save Payment Breakdown
            </Button>
          </div>
        </Form>
      </ComponentCard>
    </>
  );
}
