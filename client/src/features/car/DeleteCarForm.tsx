"use client";

import ComponentCard from "@/components/common/ComponentCard";
import Badge from "@/components/ui/badge/Badge";
import Button from "@/components/ui/button/Button";
import GoBackButton from "@/components/ui/button/GoBackButton";
import Form from "@/components/ui/form/Form";
import Spinner from "@/components/ui/spinner/Spinner";
import { useAlert } from "@/context/AlertContext";
import { useFormat } from "@/hooks/useFormat";
import CarService from "@/services/CarService";
import { useParams, useRouter } from "next/navigation";
import { FormEvent, useCallback, useEffect, useState } from "react";

export default function DeleteCarForm() {
  const params = useParams();
  const carId = params.car_id as string;

  const { showAlert } = useAlert();
  const { handleNumberDecimalFormat, handleDateFormat } = useFormat();

  const router = useRouter();

  const [isGetting, setIsGetting] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);
  const [encodeDate, setEncodeDate] = useState("");
  const [yearModel, setYearModel] = useState("");
  const [make, setMake] = useState("");
  const [series, setSeries] = useState("");
  const [transmission, setTransmission] = useState("");
  const [color, setColor] = useState("");
  const [price, setPrice] = useState("");
  const [plateNumber, setPlateNumber] = useState("");
  const [motherFile, setMotherFile] = useState("");
  const [mvFileNumber, setMvFileNumber] = useState("");
  const [engineNumber, setEngineNumber] = useState("");
  const [chassisNumber, setChassisNumber] = useState("");
  const [engineCc, setEngineCc] = useState("");
  const [carStatus, setCarStatus] = useState("");
  const [originalOrCrReceived, setOriginalOrCrReceived] = useState("");
  const [encumbered, setEncumbered] = useState("");
  const [rodReceived, setRodReceived] = useState("");
  const [rodPaid, setRodPaid] = useState("");
  const [lastRegistered, setLastRegistered] = useState("");
  const [confirmationRequest, setConfirmationRequest] = useState("");
  const [confirmationReceived, setConfirmationReceived] = useState("");
  const [hpgClearance, setHpgClearance] = useState("");
  const [transferStatus, setTransferStatus] = useState("");
  const [firstOwner, setFirstOwner] = useState("");
  const [address, setAddress] = useState("");

  const handleGetCar = useCallback(
    async (carId: string | number) => {
      try {
        const { status, data } = await CarService.getCar(carId);

        if (status !== 200) {
          console.error(
            "Status error during get car at EditCarForm.tsx: ",
            status,
          );
          return;
        }

        console.log(data);

        setEncodeDate(data.car.encode_date);
        setYearModel(data.car.year_model);
        setMake(data.car.make.make);
        setSeries(data.car.series);
        setTransmission(data.car.transmission.transmission);
        setColor(data.car.color.color);
        setPrice(data.car.price);
        setPlateNumber(data.car.plate_number);
        setMotherFile(data.car.mother_file.mother_file);
        setMvFileNumber(data.car.mv_file_number);
        setEngineNumber(data.car.engine_number);
        setChassisNumber(data.car.chassis_number);
        setEngineCc(data.car.engine_cc.engine_cc);
        setCarStatus(data.car.car_status.car_status);
        setOriginalOrCrReceived(data.car.original_or_cr_received ?? "");
        setEncumbered(data.car.encumbered.encumbered ?? "");
        setRodReceived(data.car.rod_received ?? "");
        setRodPaid(data.car.rod_paid ?? "");
        setLastRegistered(data.car.last_registered ?? "");
        setConfirmationRequest(data.car.confirmation_request ?? "");
        setConfirmationReceived(data.car.confirmation_received ?? "");
        setHpgClearance(data.car.hpg_clearance ?? "");
        setTransferStatus(data.car.transfer_status.transfer_status);
        setFirstOwner(data.car.first_owner);
        setAddress(data.car.address);
      } catch (error: any) {
        console.error(
          "Server error during get car at EditCarForm.tsx: ",
          error,
        );
      } finally {
        setIsGetting(false);
      }
    },
    [carId],
  );

  useEffect(() => {
    if (carId) {
      handleGetCar(carId);
    }
  }, [carId]);

  const handleDeleteCar = async (e: FormEvent) => {
    try {
      e.preventDefault();
      setIsDeleting(true);

      const { status, data } = await CarService.deleteCar(carId);

      if (status !== 200) {
        console.error(
          "Status error during updating car at EditCarForm.tsx: ",
          status,
        );
        return;
      }

      showAlert({
        variant: "success",
        title: "Delete Success",
        message: data.message,
      });

      router.back();
    } catch (error: any) {
      if (error.response && error.response.status !== 422) {
        console.error(
          "Server error during updating car at EditCarForm.tsx: ",
          error,
        );
        return;
      }
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <>
      {isGetting && !carId && (
        <div className="flex items-center justify-center min-h-screen">
          <Spinner size="xl" />
        </div>
      )}

      {!isGetting && carId && (
        <>
          <GoBackButton />
          <h1 className="text-2xl font-medium text-gray-600 dark:text-white mb-4">
            Are you sure do you want to delete this car information?
          </h1>
          <Form onSubmit={handleDeleteCar}>
            <div className="flex flex-col gap-6 mb-4">
              <ComponentCard title="Car Details">
                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-2 md:col-span-1">
                    <div className="mb-7">
                      <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                        Encode Date
                      </p>
                      <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                        {handleDateFormat(encodeDate)}
                      </p>
                    </div>
                    <div className="mb-7">
                      <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                        Year Model
                      </p>
                      <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                        {yearModel}
                      </p>
                    </div>
                    <div className="mb-7">
                      <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                        Make
                      </p>
                      <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                        {make}
                      </p>
                    </div>
                    <div className="mb-7">
                      <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                        Series
                      </p>
                      <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                        {series}
                      </p>
                    </div>
                    <div className="mb-7">
                      <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                        Transmission
                      </p>
                      <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                        {transmission}
                      </p>
                    </div>
                    <div className="mb-7">
                      <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                        Color
                      </p>
                      <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                        {color}
                      </p>
                    </div>
                    <div className="mb-2 md:mb-0">
                      <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                        Price
                      </p>
                      <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                        {handleNumberDecimalFormat(price)}
                      </p>
                    </div>
                  </div>
                  <div className="col-span-2 md:col-span-1">
                    <div className="mb-7">
                      <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                        Plate Number
                      </p>
                      <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                        {plateNumber}
                      </p>
                    </div>
                    <div className="mb-7">
                      <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                        Mother File
                      </p>
                      <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                        {motherFile}
                      </p>
                    </div>
                    <div className="mb-7">
                      <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                        MV File Number
                      </p>
                      <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                        {mvFileNumber}
                      </p>
                    </div>
                    <div className="mb-7">
                      <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                        Engine Number
                      </p>
                      <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                        {engineNumber}
                      </p>
                    </div>
                    <div className="mb-7">
                      <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                        Chassis Number
                      </p>
                      <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                        {chassisNumber}
                      </p>
                    </div>
                    <div className="mb-7">
                      <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                        Engine CC
                      </p>
                      <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                        {engineCc}
                      </p>
                    </div>
                    <div>
                      <p className="mb-3 text-xs leading-normal text-gray-500 dark:text-gray-400">
                        Status
                      </p>
                      <p>
                        <Badge
                          size="sm"
                          color={`${carStatus === "Available" ? "success" : carStatus === "Reserved" ? "warning" : "info"}`}
                        >
                          {carStatus}
                        </Badge>
                      </p>
                    </div>
                  </div>
                </div>
              </ComponentCard>
              <ComponentCard title="Car Documentation">
                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-2 md:col-span-1">
                    <div className="mb-7">
                      <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                        Original OR/CR Received
                      </p>
                      <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                        {handleDateFormat(originalOrCrReceived) || "-"}
                      </p>
                    </div>
                    <div className="mb-7">
                      <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                        Encumbered
                      </p>
                      <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                        {encumbered || "-"}
                      </p>
                    </div>
                    <div className="mb-7">
                      <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                        ROD Received
                      </p>
                      <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                        {handleDateFormat(rodReceived) || "-"}
                      </p>
                    </div>
                    <div className="mb-7">
                      <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                        ROD Paid
                      </p>
                      <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                        {handleDateFormat(rodPaid) || "-"}
                      </p>
                    </div>
                    <div className="mb-3 md:mb-0">
                      <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                        Last Registered
                      </p>
                      <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                        {handleDateFormat(lastRegistered) || "-"}
                      </p>
                    </div>
                  </div>
                  <div className="col-span-2 md:col-span-1">
                    <div className="mb-7">
                      <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                        Confirmation Request
                      </p>
                      <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                        {handleDateFormat(confirmationRequest) || "-"}
                      </p>
                    </div>
                    <div className="mb-7">
                      <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                        Confirmation Received
                      </p>
                      <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                        {handleDateFormat(confirmationReceived) || "-"}
                      </p>
                    </div>
                    <div className="mb-7">
                      <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                        HPG Clearance
                      </p>
                      <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                        {handleDateFormat(hpgClearance) || "-"}
                      </p>
                    </div>
                    <div className="mb-7">
                      <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                        Transfer Status
                      </p>
                      <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                        {transferStatus || "-"}
                      </p>
                    </div>
                  </div>
                </div>
              </ComponentCard>
              <ComponentCard title="Previous Owner Information">
                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-2 md:col-span-1">
                    <div>
                      <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                        First Owner
                      </p>
                      <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                        {firstOwner || "-"}
                      </p>
                    </div>
                  </div>
                  <div className="col-span-2 md:col-span-1">
                    <div>
                      <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                        Address
                      </p>
                      <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                        {address || "-"}
                      </p>
                    </div>
                  </div>
                </div>
              </ComponentCard>
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
                      Deleting Car...
                    </div>
                  </>
                ) : (
                  "Delete Car"
                )}
              </Button>
            </div>
          </Form>
        </>
      )}
    </>
  );
}
