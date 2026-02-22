"use client";

import ComponentCard from "@/components/common/ComponentCard";
import Button from "@/components/ui/button/Button";
import GoBackButton from "@/components/ui/button/GoBackButton";
import Form from "@/components/ui/form/Form";
import Input from "@/components/ui/form/Input";
import Label from "@/components/ui/form/Label";
import Select from "@/components/ui/form/Select";
import Spinner from "@/components/ui/spinner/Spinner";
import { useAlert } from "@/context/AlertContext";
import { useFormat } from "@/hooks/useFormat";
import { CarFieldsErrors } from "@/interfaces/CarInterface";
import { CarStatusColumns } from "@/interfaces/CarStatusInterface";
import { MakeColumns } from "@/interfaces/MakeInterface";
import { TransmissionColumns } from "@/interfaces/TransmissionInterface";
import CarService from "@/services/CarService";
import { useParams } from "next/navigation";
import {
  ChangeEvent,
  FormEvent,
  useCallback,
  useEffect,
  useState,
} from "react";

export default function EditCarForm() {
  const params = useParams();
  const carId = params.car_id as string;

  const { showAlert } = useAlert();
  const { handleCommaInNumbersOnTypingFormat } = useFormat();

  const [isGetting, setIsGetting] = useState(true);
  const [isReferencesLoading, setIsReferencesLoading] = useState(true);
  const [makes, setMakes] = useState<MakeColumns[]>([]);
  const [transmissions, setTransmissions] = useState<TransmissionColumns[]>([]);
  const [carStatuss, setCarStatuss] = useState<CarStatusColumns[]>([]);

  const [isUpdating, setIsUpdating] = useState(false);
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
  const [fieldErrors, setFieldErrors] = useState<CarFieldsErrors>({});

  const handleLoadCarReferences = useCallback(async () => {
    try {
      const { status, data } = await CarService.loadCarReferences();

      if (status !== 200) {
        console.error(
          "Status error during load car references at EditCarForm.tsx: ",
          status,
        );
        return;
      }

      setMakes(data.makes);
      setTransmissions(data.transmissions);
      setCarStatuss(data.carStatus);
    } catch (error: any) {
      console.error(
        "Server error during load car references at EditCarForm.tsx: ",
        error,
      );
    } finally {
      setIsReferencesLoading(false);
    }
  }, []);

  useEffect(() => {
    handleLoadCarReferences();
  }, []);

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
        setMake(data.car.make.make_id);
        setSeries(data.car.series);
        setTransmission(data.car.transmission.transmission_id);
        setColor(data.car.color.color);
        setPrice(data.car.price);
        setPlateNumber(data.car.plate_number);
        setMotherFile(data.car.mother_file.mother_file);
        setMvFileNumber(data.car.mv_file_number);
        setEngineNumber(data.car.engine_number);
        setChassisNumber(data.car.chassis_number);
        setEngineCc(data.car.engine_cc.engine_cc);
        setCarStatus(data.car.car_status.car_status_id);
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
        setFieldErrors({});
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

  const handleUpdateCar = async (e: FormEvent) => {
    try {
      e.preventDefault();
      setIsUpdating(true);

      const payload = {
        encode_date: encodeDate,
        year_model: yearModel,
        make: make,
        series: series,
        transmission: transmission,
        color: color,
        price: price,
        plate_number: plateNumber,
        mother_file: motherFile,
        mv_file_number: mvFileNumber,
        engine_number: engineNumber,
        chassis_number: chassisNumber,
        engine_cc: engineCc,
        status: carStatus,
        original_or_cr_received: originalOrCrReceived,
        encumbered: encumbered,
        rod_received: rodReceived,
        rod_paid: rodPaid,
        last_registered: lastRegistered,
        confirmation_request: confirmationRequest,
        confirmation_received: confirmationReceived,
        hpg_clearance: hpgClearance,
        transfer_status: transferStatus,
        first_owner: firstOwner,
        address: address,
      };

      const { status, data } = await CarService.updateCar(carId, payload);

      if (status !== 200) {
        console.error(
          "Status error during updating car at EditCarForm.tsx: ",
          status,
        );
        return;
      }

      showAlert({
        variant: "success",
        title: "Update Success",
        message: data.message,
      });
    } catch (error: any) {
      if (error.response && error.response.status !== 422) {
        console.error(
          "Server error during updating car at EditCarForm.tsx: ",
          error,
        );
        return;
      }

      setFieldErrors(error.response.data.errors);
    } finally {
      setIsUpdating(false);
    }
  };

  const handlePriceChange = (e: ChangeEvent<HTMLInputElement>) => {
    let rawValue = e.target.value.replace(/,/g, "");

    if (!/^\d*\.?\d*$/.test(rawValue)) {
      return;
    }

    setPrice(rawValue);
  };

  return (
    <>
      {isReferencesLoading &&
        isGetting &&
        !carId &&
        makes.length <= 0 &&
        transmissions.length <= 0 &&
        carStatuss.length <= 0 && (
          <div className="flex items-center justify-center min-h-screen">
            <Spinner size="xl" />
          </div>
        )}

      {!isReferencesLoading &&
        !isGetting &&
        carId &&
        makes.length > 0 &&
        transmissions.length > 0 &&
        carStatuss.length > 0 && (
          <>
            <GoBackButton />
            <Form onSubmit={handleUpdateCar}>
              <div className="flex flex-col gap-6 mb-4">
                <ComponentCard title="Car Details">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="col-span-2 md:col-span-1">
                      <div className="mb-4">
                        <Label required>Encode Date</Label>
                        <Input
                          type="date"
                          name="encode_date"
                          value={encodeDate}
                          onChange={(e) => setEncodeDate(e.target.value)}
                          errors={fieldErrors.encode_date}
                          autoFocus
                        />
                      </div>
                      <div className="mb-4">
                        <Label required>Year Model</Label>
                        <Input
                          type="text"
                          name="year_model"
                          value={yearModel}
                          onChange={(e) => setYearModel(e.target.value)}
                          errors={fieldErrors.year_model}
                        />
                      </div>
                      <div className="mb-4">
                        <Label required>Make</Label>
                        <Select
                          name="make"
                          value={make}
                          onChange={(e) => setMake(e.target.value)}
                          errors={fieldErrors.make}
                        >
                          <option value="">Select Make</option>
                          {makes.map((make) => (
                            <option value={make.make_id} key={make.make_id}>
                              {make.make}
                            </option>
                          ))}
                        </Select>
                      </div>
                      <div className="mb-4">
                        <Label required>Series</Label>
                        <Input
                          type="text"
                          name="series"
                          value={series}
                          onChange={(e) => setSeries(e.target.value)}
                          errors={fieldErrors.series}
                        />
                      </div>
                      <div className="mb-4">
                        <Label required>Transmission</Label>
                        <Select
                          name="transmission"
                          value={transmission}
                          onChange={(e) => setTransmission(e.target.value)}
                          errors={fieldErrors.transmission}
                        >
                          <option value="">Select Transmission</option>
                          {transmissions.map((transmission) => (
                            <option
                              value={transmission.transmission_id}
                              key={transmission.transmission_id}
                            >
                              {transmission.transmission}
                            </option>
                          ))}
                        </Select>
                      </div>
                      <div className="mb-4">
                        <Label required>Color</Label>
                        <Input
                          type="text"
                          name="color"
                          value={color}
                          onChange={(e) => setColor(e.target.value)}
                          errors={fieldErrors.color}
                        />
                      </div>
                      <div>
                        <Label required>Price</Label>
                        <Input
                          type="text"
                          name="price"
                          value={handleCommaInNumbersOnTypingFormat(
                            price.toString(),
                          )}
                          onChange={handlePriceChange}
                          errors={fieldErrors.price}
                        />
                      </div>
                    </div>
                    <div className="col-span-2 md:col-span-1">
                      <div className="mb-4">
                        <Label required>Plate Number</Label>
                        <Input
                          type="text"
                          name="plate_number"
                          value={plateNumber}
                          onChange={(e) => setPlateNumber(e.target.value)}
                          errors={fieldErrors.plate_number}
                        />
                      </div>
                      <div className="mb-4">
                        <Label required>Mother File</Label>
                        <Input
                          type="text"
                          name="mother_file"
                          value={motherFile}
                          onChange={(e) => setMotherFile(e.target.value)}
                          errors={fieldErrors.mother_file}
                        />
                      </div>
                      <div className="mb-4">
                        <Label required>MV File Number</Label>
                        <Input
                          type="text"
                          name="mv_file_number"
                          value={mvFileNumber}
                          onChange={(e) => setMvFileNumber(e.target.value)}
                          errors={fieldErrors.mv_file_number}
                        />
                      </div>
                      <div className="mb-4">
                        <Label required>Engine Number</Label>
                        <Input
                          type="text"
                          name="engine_number"
                          value={engineNumber}
                          onChange={(e) => setEngineNumber(e.target.value)}
                          errors={fieldErrors.engine_number}
                        />
                      </div>
                      <div className="mb-4">
                        <Label required>Chassis Number</Label>
                        <Input
                          type="text"
                          name="chassis_number"
                          value={chassisNumber}
                          onChange={(e) => setChassisNumber(e.target.value)}
                          errors={fieldErrors.chassis_number}
                        />
                      </div>
                      <div className="mb-4">
                        <Label required>Engine CC</Label>
                        <Input
                          type="text"
                          name="engine_cc"
                          value={engineCc}
                          onChange={(e) => setEngineCc(e.target.value)}
                          errors={fieldErrors.engine_cc}
                        />
                      </div>
                      <div>
                        <Label required>Status</Label>
                        <Select
                          name="car_status"
                          value={carStatus}
                          onChange={(e) => setCarStatus(e.target.value)}
                          errors={fieldErrors.status}
                        >
                          <option value="">Select Status</option>
                          {carStatuss.map((carStatus) => (
                            <option
                              value={carStatus.car_status_id}
                              key={carStatus.car_status_id}
                            >
                              {carStatus.car_status}
                            </option>
                          ))}
                        </Select>
                      </div>
                    </div>
                  </div>
                </ComponentCard>
                <ComponentCard title="Car Documentation">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="col-span-2 md:col-span-1">
                      <div className="mb-4">
                        <Label>Original OR/CR Received</Label>
                        <Input
                          type="date"
                          name="original_or_cr_received"
                          value={originalOrCrReceived}
                          onChange={(e) =>
                            setOriginalOrCrReceived(e.target.value)
                          }
                          errors={fieldErrors.original_or_cr_received}
                        />
                      </div>
                      <div className="mb-4">
                        <Label>Encumbered</Label>
                        <Input
                          type="text"
                          name="encumbered"
                          value={encumbered}
                          onChange={(e) => setEncumbered(e.target.value)}
                          errors={fieldErrors.encumbered}
                        />
                      </div>
                      <div className="mb-4">
                        <Label>ROD Received</Label>
                        <Input
                          type="date"
                          name="rod_received"
                          value={rodReceived}
                          onChange={(e) => setRodReceived(e.target.value)}
                          errors={fieldErrors.rod_received}
                        />
                      </div>
                      <div className="mb-4">
                        <Label>ROD Paid</Label>
                        <Input
                          type="date"
                          name="rod_paid"
                          value={rodPaid}
                          onChange={(e) => setRodPaid(e.target.value)}
                          errors={fieldErrors.rod_paid}
                        />
                      </div>
                      <div>
                        <Label>Last Registered</Label>
                        <Input
                          type="date"
                          name="last_registered"
                          value={lastRegistered}
                          onChange={(e) => setLastRegistered(e.target.value)}
                          errors={fieldErrors.last_registered}
                        />
                      </div>
                    </div>
                    <div className="col-span-2 md:col-span-1">
                      <div className="mb-4">
                        <Label>Confirmation Request</Label>
                        <Input
                          type="date"
                          name="confirmation_request"
                          value={confirmationRequest}
                          onChange={(e) =>
                            setConfirmationRequest(e.target.value)
                          }
                          errors={fieldErrors.confirmation_request}
                        />
                      </div>
                      <div className="mb-4">
                        <Label>Confirmation Received</Label>
                        <Input
                          type="date"
                          name="confirmation_received"
                          value={confirmationReceived}
                          onChange={(e) =>
                            setConfirmationReceived(e.target.value)
                          }
                          errors={fieldErrors.confirmation_received}
                        />
                      </div>
                      <div className="mb-4">
                        <Label>HPG Clearance</Label>
                        <Input
                          type="date"
                          name="hpg_clearance"
                          value={hpgClearance}
                          onChange={(e) => setHpgClearance(e.target.value)}
                          errors={fieldErrors.hpg_clearnance}
                        />
                      </div>
                      <div className="mb-4">
                        <Label>Transfer Status</Label>
                        <Input
                          type="text"
                          name="transfer_status"
                          value={transferStatus}
                          onChange={(e) => setTransferStatus(e.target.value)}
                          errors={fieldErrors.transfer_status}
                        />
                      </div>
                    </div>
                  </div>
                </ComponentCard>
                <ComponentCard title="Previous Owner Information">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="col-span-2 md:col-span-1">
                      <div>
                        <Label>First Owner</Label>
                        <Input
                          type="text"
                          name="first_owner"
                          value={firstOwner}
                          onChange={(e) => setFirstOwner(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="col-span-2 md:col-span-1">
                      <div>
                        <Label>Address</Label>
                        <Input
                          type="text"
                          name="address"
                          value={address}
                          onChange={(e) => setAddress(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                </ComponentCard>
              </div>
              <div className="flex items-center justify-center">
                <Button type="submit" className="w-full" disabled={isUpdating}>
                  {isUpdating ? (
                    <>
                      <div className="flex gap-2">
                        <Spinner size="xs" />
                        Updating Car...
                      </div>
                    </>
                  ) : (
                    "Update Car"
                  )}
                </Button>
              </div>
            </Form>
          </>
        )}
    </>
  );
}
