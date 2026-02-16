"use client";

import ComponentCard from "@/components/common/ComponentCard";
import Button from "@/components/ui/button/Button";
import Input from "@/components/ui/form/Input";
import Label from "@/components/ui/form/Label";
import Select from "@/components/ui/form/Select";
import Spinner from "@/components/ui/spinner/Spinner";
import { CarStatusColumns } from "@/interfaces/CarStatusInterface";
import { MakeColumns } from "@/interfaces/MakeInterface";
import { TransmissionColumns } from "@/interfaces/TransmissionInterface";
import CarService from "@/services/CarService";
import { useCallback, useEffect, useState } from "react";

export default function AddCarForm() {
  const [isReferencesLoading, setIsReferencesLoading] = useState(true);
  const [makes, setMakes] = useState<MakeColumns[]>([]);
  const [transmissions, setTransmissions] = useState<TransmissionColumns[]>([]);
  const [carStatuss, setCarStatuss] = useState<CarStatusColumns[]>([]);

  const handleLoadCarReferences = useCallback(async () => {
    try {
      const { status, data } = await CarService.loadCarReferences();

      if (status !== 200) {
        console.error(
          "Status error during load car references at AddCarForm.tsx: ",
          status,
        );
        return;
      }

      setMakes(data.makes);
      setTransmissions(data.transmissions);
      setCarStatuss(data.carStatus);
    } catch (error: any) {
      console.error(
        "Server error during load car references at AddCarForm.tsx: ",
        error,
      );
    } finally {
      setIsReferencesLoading(false);
    }
  }, []);

  useEffect(() => {
    handleLoadCarReferences();
  }, []);

  return (
    <>
      {isReferencesLoading &&
        makes.length <= 0 &&
        transmissions.length <= 0 &&
        carStatuss.length <= 0 && (
          <div className="flex items-center justify-center min-h-screen">
            <Spinner size="xl" />
          </div>
        )}

      {!isReferencesLoading &&
        makes.length > 0 &&
        transmissions.length > 0 &&
        carStatuss.length > 0 && (
          <>
            <div className="flex flex-col gap-6 mb-4">
              <ComponentCard title="Car Details">
                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-2 md:col-span-1">
                    <div className="mb-4">
                      <Label required>Encode Date</Label>
                      <Input type="date" name="encode_date" />
                    </div>
                    <div className="mb-4">
                      <Label required>Year Model</Label>
                      <Input type="text" name="year_model" />
                    </div>
                    <div className="mb-4">
                      <Label required>Make</Label>
                      <Select name="make">
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
                      <Input type="text" name="series" />
                    </div>
                    <div className="mb-4">
                      <Label required>Transmission</Label>
                      <Select name="transmission">
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
                      <Input type="text" name="color" />
                    </div>
                    <div>
                      <Label required>Price</Label>
                      <Input type="text" name="price" />
                    </div>
                  </div>
                  <div className="col-span-2 md:col-span-1">
                    <div className="mb-4">
                      <Label required>Plate Number</Label>
                      <Input type="text" name="plate_number" />
                    </div>
                    <div className="mb-4">
                      <Label required>Mother File</Label>
                      <Input type="text" name="mother_file" />
                    </div>
                    <div className="mb-4">
                      <Label required>MV File Number</Label>
                      <Input type="text" name="mv_file_number" />
                    </div>
                    <div className="mb-4">
                      <Label required>Engine Number</Label>
                      <Input type="text" name="engine_number" />
                    </div>
                    <div className="mb-4">
                      <Label required>Chassis Number</Label>
                      <Input type="text" name="chassis_number" />
                    </div>
                    <div className="mb-4">
                      <Label required>Engine CC</Label>
                      <Input type="text" name="engine_cc" />
                    </div>
                    <div>
                      <Label required>Status</Label>
                      <Select name="status">
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
                      <Input type="date" name="original_or_cr_received" />
                    </div>
                    <div className="mb-4">
                      <Label>Encumbered</Label>
                      <Input type="text" name="encumbered" />
                    </div>
                    <div className="mb-4">
                      <Label>ROD Received</Label>
                      <Input type="date" name="rod_received" />
                    </div>
                    <div className="mb-4">
                      <Label>ROD Paid</Label>
                      <Input type="date" name="rod_paid" />
                    </div>
                    <div>
                      <Label>Last Registered</Label>
                      <Input type="date" name="last_registered" />
                    </div>
                  </div>
                  <div className="col-span-2 md:col-span-1">
                    <div className="mb-4">
                      <Label>Confirmation Request</Label>
                      <Input type="date" name="confirmation_request" />
                    </div>
                    <div className="mb-4">
                      <Label>Confirmation Received</Label>
                      <Input type="date" name="confirmation_received" />
                    </div>
                    <div className="mb-4">
                      <Label>HPG Clearance</Label>
                      <Input type="date" name="hpg_clearance" />
                    </div>
                    <div className="mb-4">
                      <Label>Transfer Status</Label>
                      <Input type="text" name="transfer_status" />
                    </div>
                  </div>
                </div>
              </ComponentCard>
              <ComponentCard title="Previous Owner Information">
                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-2 md:col-span-1">
                    <div>
                      <Label>First Owner</Label>
                      <Input type="text" name="first_owner" />
                    </div>
                  </div>
                  <div className="col-span-2 md:col-span-1">
                    <div>
                      <Label>Address</Label>
                      <Input type="text" name="address" />
                    </div>
                  </div>
                </div>
              </ComponentCard>
            </div>
            <div className="flex items-center justify-center">
              <Button type="submit" className="w-full">
                Save Car
              </Button>
            </div>
          </>
        )}
    </>
  );
}
