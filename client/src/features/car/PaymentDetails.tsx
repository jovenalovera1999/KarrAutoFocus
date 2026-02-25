"use client";

import ComponentCard from "@/components/common/ComponentCard";
import { useFormat } from "@/hooks/useFormat";
import { CarColumns } from "@/interfaces/CarInterface";

interface PaymentDetailsProps {
  carData: CarColumns | null;
}

export default function PaymentDetails({ carData }: PaymentDetailsProps) {
  const { handleNumberDecimalFormat } = useFormat();

  return (
    <>
      <div className="flex flex-col gap-4">
        <ComponentCard title="Payment Details">
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2 md:col-span-1">
              <div className="mb-7">
                <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                  Unit
                </p>
                <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                  {`${carData?.year_model} ${carData?.make.make} ${carData?.series} ${carData?.transmission.transmission} ${carData?.color.color}`}
                </p>
              </div>
              <div className="mb-3 md:mb-0">
                <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                  Buyer
                </p>
                <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                  {carData?.buyer?.buyer ?? "-"}
                </p>
              </div>
            </div>
            <div className="col-span-2 md:col-span-1">
              <div className="mb-7">
                <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                  Selling Price
                </p>
                <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                  {handleNumberDecimalFormat(carData?.price ?? "-") ?? "-"}
                </p>
              </div>
              <div className="mb-3 md:mb-0">
                <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                  Agreed Price
                </p>
                <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                  {handleNumberDecimalFormat(
                    carData?.buyer?.agreed_price ?? "",
                  ) ?? "-"}
                </p>
              </div>
            </div>
          </div>
        </ComponentCard>
      </div>
    </>
  );
}
