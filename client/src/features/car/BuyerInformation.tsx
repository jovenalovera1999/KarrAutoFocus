import ComponentCard from "@/components/common/ComponentCard";
import Button from "@/components/ui/button/Button";
import Form from "@/components/ui/form/Form";
import Input from "@/components/ui/form/Input";
import Label from "@/components/ui/form/Label";
import Spinner from "@/components/ui/spinner/Spinner";
import { useAlert } from "@/context/AlertContext";
import { useFormat } from "@/hooks/useFormat";
import { BuyerColumns, BuyerFieldsErrors } from "@/interfaces/BuyerInterface";
import BuyerService from "@/services/BuyerService";
import { ChangeEvent, FormEvent, useState } from "react";

interface BuyerInformationProps {
  buyerData: BuyerColumns | null;
}

export default function BuyerInformation({ buyerData }: BuyerInformationProps) {
  const { showAlert } = useAlert();
  const { handleCommaInNumbersOnTypingFormat } = useFormat();

  const [isStoring, setIsStoring] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [buyer, setBuyer] = useState("");
  const [address, setAddress] = useState("");
  const [agreedPrice, setAgreedPrice] = useState("");
  const [dateReserved, setDateReserved] = useState("");
  const [agent, setAgent] = useState("");
  const [fieldErrors, setFieldErrors] = useState<BuyerFieldsErrors>({});

  const handleStoreBuyer = async (e: FormEvent) => {
    try {
      e.preventDefault();
      setIsStoring(true);

      const payload = {
        buyer: buyer,
        address: address,
        agreed_price: agreedPrice,
        date_reserved: dateReserved,
        agent: agent,
      };

      const { status, data } = await BuyerService.storeBuyer(payload);

      if (status !== 200) {
        console.error(
          "Status error during store buyer at BuyerInformation.tsx: ",
          status,
        );
        return;
      }

      showAlert({
        variant: "success",
        title: "Saved Success",
        message: data.message,
      });

      setFieldErrors({});
    } catch (error: any) {
      if (error.response && error.response.status !== 422) {
        console.error(
          "Server error during store buyer at BuyerInformation.tsx: ",
          error,
        );
        return;
      }

      setFieldErrors(error.response.data.errors);
    } finally {
      setIsStoring(false);
    }
  };

  const handleAgreedPriceChange = (e: ChangeEvent<HTMLInputElement>) => {
    let rawValue = e.target.value.replace(/,/g, "");

    if (!/^\d*\.?\d*$/.test(rawValue)) {
      return;
    }

    setAgreedPrice(rawValue);
  };

  return (
    <>
      <ComponentCard title="Buyer Information">
        <Form onSubmit={handleStoreBuyer}>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="col-span-2 md:col-span-1">
              <div className="mb-4">
                <Label required>Buyer</Label>
                <Input
                  type="text"
                  name="buyer"
                  value={buyer}
                  onChange={(e) => setBuyer(e.target.value)}
                  errors={fieldErrors.buyer}
                  autoFocus
                />
              </div>
              <div className="mb-4">
                <Label required>Address</Label>
                <Input
                  type="text"
                  name="address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  errors={fieldErrors.address}
                />
              </div>
              <div>
                <Label>Agreed Price</Label>
                <Input
                  type="text"
                  name="agreed_price"
                  value={handleCommaInNumbersOnTypingFormat(agreedPrice)}
                  onChange={handleAgreedPriceChange}
                  errors={fieldErrors.agreed_price}
                />
              </div>
            </div>
            <div className="col-span-2 md:col-span-1">
              <div className="mb-4">
                <Label>Date Reserved</Label>
                <Input
                  type="date"
                  name="date_reserved"
                  value={dateReserved}
                  onChange={(e) => setDateReserved(e.target.value)}
                  errors={fieldErrors.date_reserved}
                />
              </div>
              <div>
                <Label required>Agent</Label>
                <Input
                  type="text"
                  name="agent"
                  value={agent}
                  onChange={(e) => setAgent(e.target.value)}
                  errors={fieldErrors.agent}
                />
              </div>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <Button type="submit" className="w-full" disabled={isStoring}>
              {isStoring ? (
                <>
                  <div className="flex gap-2">
                    <Spinner size="xs" />
                    Saving Buyer Information...
                  </div>
                </>
              ) : (
                "Save Buyer Information"
              )}
            </Button>
          </div>
        </Form>
      </ComponentCard>
    </>
  );
}
