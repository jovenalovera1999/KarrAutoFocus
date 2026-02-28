"use client";

import ComponentCard from "@/components/common/ComponentCard";
import Badge from "@/components/ui/badge/Badge";
import { useFormat } from "@/hooks/useFormat";
import { CarColumns } from "@/interfaces/CarInterface";

interface ViewCarProps {
  carData: CarColumns | null;
  isCarDataLoading: boolean;
}

export default function ViewCar({ carData, isCarDataLoading }: ViewCarProps) {
  const { handleDateFormat, handleNumberDecimalFormat } = useFormat();

  return (
    <>
      {!isCarDataLoading && carData?.car_id && (
        <>
          <div className="flex flex-col gap-6 mb-4">
            <ComponentCard title="Car Details">
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2 md:col-span-1">
                  <div className="mb-7">
                    <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                      Encode Date
                    </p>
                    <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                      {handleDateFormat(carData?.encode_date)}
                    </p>
                  </div>
                  <div className="mb-7">
                    <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                      Year Model
                    </p>
                    <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                      {carData?.year_model}
                    </p>
                  </div>
                  <div className="mb-7">
                    <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                      Make
                    </p>
                    <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                      {carData?.make.make}
                    </p>
                  </div>
                  <div className="mb-7">
                    <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                      Series
                    </p>
                    <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                      {carData?.series}
                    </p>
                  </div>
                  <div className="mb-7">
                    <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                      Transmission
                    </p>
                    <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                      {carData?.transmission.transmission}
                    </p>
                  </div>
                  <div className="mb-7">
                    <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                      Color
                    </p>
                    <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                      {carData?.color.color}
                    </p>
                  </div>
                  <div className="mb-2 md:mb-0">
                    <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                      Price
                    </p>
                    <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                      {handleNumberDecimalFormat(carData?.price)}
                    </p>
                  </div>
                </div>
                <div className="col-span-2 md:col-span-1">
                  <div className="mb-7">
                    <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                      Plate Number
                    </p>
                    <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                      {carData?.plate_number}
                    </p>
                  </div>
                  <div className="mb-7">
                    <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                      Mother File
                    </p>
                    <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                      {carData?.mother_file.mother_file}
                    </p>
                  </div>
                  <div className="mb-7">
                    <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                      MV File Number
                    </p>
                    <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                      {carData?.mv_file_number}
                    </p>
                  </div>
                  <div className="mb-7">
                    <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                      Engine Number
                    </p>
                    <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                      {carData?.engine_number}
                    </p>
                  </div>
                  <div className="mb-7">
                    <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                      Chassis Number
                    </p>
                    <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                      {carData?.chassis_number}
                    </p>
                  </div>
                  <div className="mb-7">
                    <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                      Engine CC
                    </p>
                    <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                      {carData?.engine_cc.engine_cc}
                    </p>
                  </div>
                  <div>
                    <p className="mb-3 text-xs leading-normal text-gray-500 dark:text-gray-400">
                      Status
                    </p>
                    <p>
                      <Badge
                        size="sm"
                        color={`${carData?.car_status.car_status.toLowerCase() === "available" ? "success" : carData?.car_status.car_status.toLowerCase() === "reserved" ? "warning" : "info"}`}
                      >
                        {carData?.car_status.car_status}
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
                      {handleDateFormat(
                        carData?.original_or_cr_received || "-",
                      ) || "-"}
                    </p>
                  </div>
                  <div className="mb-7">
                    <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                      Encumbered
                    </p>
                    <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                      {carData?.encumbered?.encumbered || "-"}
                    </p>
                  </div>
                  <div className="mb-7">
                    <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                      ROD Received
                    </p>
                    <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                      {handleDateFormat(carData?.rod_received || "-") || "-"}
                    </p>
                  </div>
                  <div className="mb-7">
                    <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                      ROD Paid
                    </p>
                    <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                      {handleDateFormat(carData?.rod_paid || "-") || "-"}
                    </p>
                  </div>
                  <div className="mb-3 md:mb-0">
                    <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                      Last Registered
                    </p>
                    <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                      {handleDateFormat(carData?.last_registered || "-") || "-"}
                    </p>
                  </div>
                </div>
                <div className="col-span-2 md:col-span-1">
                  <div className="mb-7">
                    <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                      Confirmation Request
                    </p>
                    <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                      {handleDateFormat(carData?.confirmation_request || "-") ||
                        "-"}
                    </p>
                  </div>
                  <div className="mb-7">
                    <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                      Confirmation Received
                    </p>
                    <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                      {handleDateFormat(
                        carData?.confirmation_received || "-",
                      ) || "-"}
                    </p>
                  </div>
                  <div className="mb-7">
                    <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                      HPG Clearance
                    </p>
                    <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                      {handleDateFormat(carData?.hpg_clearance || "-") || "-"}
                    </p>
                  </div>
                  <div className="mb-3 md:mb-0">
                    <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                      Transfer Status
                    </p>
                    <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                      {carData?.transfer_status.transfer_status || "-"}
                    </p>
                  </div>
                </div>
              </div>
            </ComponentCard>
            <ComponentCard title="Previous Owner Information">
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2 md:col-span-1">
                  <div className="mb-3 md:mb-0">
                    <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                      First Owner
                    </p>
                    <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                      {carData?.first_owner || "-"}
                    </p>
                  </div>
                </div>
                <div className="col-span-2 md:col-span-1">
                  <div className="mb-3 md:mb-0">
                    <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                      Address
                    </p>
                    <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                      {carData?.address || "-"}
                    </p>
                  </div>
                </div>
              </div>
            </ComponentCard>
          </div>
        </>
      )}
    </>
  );
}
