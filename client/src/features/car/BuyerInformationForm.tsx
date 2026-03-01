import ComponentCard from "@/components/common/ComponentCard";
import Button from "@/components/ui/button/Button";
import Form from "@/components/ui/form/Form";
import Input from "@/components/ui/form/Input";
import Label from "@/components/ui/form/Label";
import Spinner from "@/components/ui/spinner/Spinner";
import { useAlert } from "@/context/AlertContext";
import useApiMutation from "@/hooks/api/useApiMutation";
import { useFormat } from "@/hooks/useFormat";
import { BuyerFieldsErrors } from "@/interfaces/BuyerInterface";
import { CarColumns } from "@/interfaces/CarInterface";
import BuyerService from "@/services/BuyerService";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";

interface BuyerInformationFormProps {
  carData: CarColumns | null;
  refreshCarData: () => void;
}

export default function BuyerInformationForm({
  carData,
  refreshCarData,
}: BuyerInformationFormProps) {
  const { showAlert } = useAlert();
  const { handleCommaInNumbersOnTypingFormat } = useFormat();

  const { execute: executeStoreBuyer, loading: isStoring } = useApiMutation();
  const { execute: executeUpdateBuyer, loading: isUpdating } = useApiMutation();

  const [carId, setCarId] = useState(0);
  const [buyerId, setBuyerId] = useState(0);
  const [buyer, setBuyer] = useState("");
  const [address, setAddress] = useState("");
  const [agreedPrice, setAgreedPrice] = useState("");
  const [dateReserved, setDateReserved] = useState("");
  const [agent, setAgent] = useState("");
  const [fieldErrors, setFieldErrors] = useState<BuyerFieldsErrors>({});

  const handleStoreBuyer = (e: FormEvent) => {
    e.preventDefault();

    const payload = {
      buyer: buyer,
      address: address,
      agreed_price: agreedPrice,
      date_reserved: dateReserved,
      agent: agent,
    };

    executeStoreBuyer({
      apiService: () => BuyerService.storeBuyer(payload, carId),

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

  const handleUpdateBuyer = (e: FormEvent) => {
    e.preventDefault();

    const payload = {
      buyer: buyer,
      address: address,
      agreed_price: agreedPrice,
      date_reserved: dateReserved,
      agent: agent,
    };

    executeUpdateBuyer({
      apiService: () => BuyerService.updateBuyer(buyerId, payload),

      onSuccess: (data) => {
        showAlert({
          variant: "success",
          title: "Update Success",
          message: data.message,
        });

        refreshCarData();
      },

      onValidationError: (errors) => {
        setFieldErrors(errors);
      },
    });
  };

  useEffect(() => {
    setCarId(carData?.car_id ?? 0);

    if (carData?.buyer) {
      setBuyerId(carData.buyer.buyer_id);
      setBuyer(carData?.buyer.buyer);
      setAddress(carData?.buyer.address);
      setAgreedPrice(carData?.buyer.agreed_price ?? "");
      setDateReserved(carData?.buyer.date_reserved ?? "");
      setAgent(carData?.buyer.agent.agent);
    }
  }, [carData?.buyer]);

  useEffect(() => {
    if (!carData?.buyer) {
      setBuyerId(0);
      setBuyer("");
      setAddress("");
      setAgreedPrice("");
      setDateReserved("");
      setAgent("");
    }
  }, [carData?.buyer]);

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
        <Form onSubmit={buyerId ? handleUpdateBuyer : handleStoreBuyer}>
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
                  value={handleCommaInNumbersOnTypingFormat(
                    agreedPrice?.toString(),
                  )}
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
                    {buyerId
                      ? "Updating Buyer Information"
                      : "Saving Buyer Information"}
                  </div>
                </>
              ) : (
                <>
                  {buyerId
                    ? "Update Buyer Information"
                    : "Save Buyer Information"}
                </>
              )}
            </Button>
          </div>
        </Form>
      </ComponentCard>
    </>
  );
}
