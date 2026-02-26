"use client";

import GoBackButton from "@/components/ui/button/GoBackButton";
import Spinner from "@/components/ui/spinner/Spinner";
import Tab from "@/components/ui/tab/Tab";
import AddUnitExpenseFormModal from "@/features/car/AddUnitExpenseFormModal";
import BuyerInformation from "@/features/car/BuyerInformationForm";
import PaymentBreakdownForm from "@/features/car/PaymentBreakdownForm";
import PaymentDetails from "@/features/car/PaymentDetails";
import SummarOfExpenses from "@/features/car/SummaryOfExpenses";
import ViewCar from "@/features/car/ViewCar";
import { useDebounce } from "@/hooks/useDebounce";
import { useRefresh } from "@/hooks/useRefresh";
import { CarColumns } from "@/interfaces/CarInterface";
import { UnitExpenseColumns } from "@/interfaces/UnitExpenseInterface";
import CarService from "@/services/CarService";
import { useParams } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";

export default function ViewCarPage() {
  const params = useParams();
  const carId = params.car_id as string;

  const { refresh, handleRefresh } = useRefresh();

  const [selectedCarId, setSelectedCarId] = useState<string | number | null>(
    "",
  );

  const [isAddUnitExpenseFormModalOpen, setIsAddUnitExpenseFormModalOpen] =
    useState(false);

  const handleOpenAddUnitExpenseFormModal = (
    carIdSelected: string | number | null,
  ) => {
    setSelectedCarId(carIdSelected);
    setIsAddUnitExpenseFormModalOpen(true);
  };

  const handleCloseAddUnitExpenseFormModal = () => {
    setSelectedCarId("");
    setIsAddUnitExpenseFormModalOpen(false);
  };

  // ============================
  // SHARED STATES
  // ============================

  const [isLoadingCarData, setIsLoadingCarData] = useState(true);

  const [carData, setCarData] = useState<CarColumns | null>(null);

  const [unitExpenses, setUnitExpenses] = useState<UnitExpenseColumns[]>([]);
  const [isUnitExpensesLoading, setIsUnitExpensesLoading] = useState(false);
  const [isMoreUnitExpensesLoading, setIsMoreUnitExpensesLoading] =
    useState(false);

  const [lastPage, setLastPage] = useState<number | null>(null);

  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");

  const debouncedDateFrom = useDebounce(dateFrom);
  const debouncedDateTo = useDebounce(dateTo);

  const pageRef = useRef(1);

  // ============================
  // SINGLE API FUNCTION
  // ============================

  const handleGetCar = useCallback(
    async (loadPage: number, dateFromValue: string, dateToValue: string) => {
      if (!carId) return;

      try {
        if (
          (loadPage === 1 && isUnitExpensesLoading) ||
          (loadPage > 1 && isMoreUnitExpensesLoading) ||
          (lastPage !== null && loadPage > lastPage)
        ) {
          return;
        }

        loadPage === 1
          ? setIsUnitExpensesLoading(true)
          : setIsMoreUnitExpensesLoading(true);

        const { status, data } = await CarService.getCar(
          carId,
          loadPage,
          dateFromValue,
          dateToValue,
        );

        if (status !== 200) {
          console.error(
            "Status error during get car data at CarViewPage.tsx: ",
            status,
          );
          return;
        }

        setCarData(data.car);

        setUnitExpenses((prev) =>
          loadPage === 1 ? data.unitExpenses : [...prev, ...data.unitExpenses],
        );

        setLastPage(data.lastPage);
      } catch (error) {
        console.error(
          "Status error during get car data at CarViewPage.tsx: ",
          error,
        );
      } finally {
        setIsLoadingCarData(false);
        loadPage === 1
          ? setIsUnitExpensesLoading(false)
          : setIsMoreUnitExpensesLoading(false);
      }
    },
    [carId, isUnitExpensesLoading, isMoreUnitExpensesLoading, lastPage],
  );

  useEffect(() => {
    if (!carId) return;

    pageRef.current = 1;
    setUnitExpenses([]);
    setLastPage(null);

    handleGetCar(1, debouncedDateFrom, debouncedDateTo);
  }, [carId, refresh, debouncedDateFrom, debouncedDateTo]);

  return (
    <>
      {isLoadingCarData && !carId && (
        <div className="flex items-center justify-center min-h-screen">
          <Spinner size="xl" />
        </div>
      )}

      {!isLoadingCarData && carId && (
        <>
          <AddUnitExpenseFormModal
            selectedCarId={selectedCarId}
            isOpen={isAddUnitExpenseFormModalOpen}
            onClose={handleCloseAddUnitExpenseFormModal}
            refreshUnitExpenses={handleRefresh}
          />

          <GoBackButton />

          <Tab defaultValue="car_information">
            <Tab.List>
              <Tab.Trigger value="car_information">Car Information</Tab.Trigger>
              <Tab.Trigger value="summary_of_expenses">
                Summary of Expenses
              </Tab.Trigger>
              {carData?.car_status.car_status.toLowerCase() !== "available" && (
                <>
                  <Tab.Trigger value="buyer_information">
                    Buyer Information
                  </Tab.Trigger>

                  <Tab.Trigger value="payment_details">
                    Payment Details
                  </Tab.Trigger>
                </>
              )}
            </Tab.List>

            <Tab.Content value="car_information">
              <ViewCar carData={carData} isLoadingCarData={isLoadingCarData} />
            </Tab.Content>

            <Tab.Content value="summary_of_expenses">
              <SummarOfExpenses
                carData={carData}
                unitExpenses={unitExpenses}
                isUnitExpensesLoading={isUnitExpensesLoading}
                isMoreUnitExpensesLoading={isMoreUnitExpensesLoading}
                dateFrom={dateFrom}
                dateTo={dateTo}
                setDateFrom={setDateFrom}
                setDateTo={setDateTo}
                onAddUnitExpense={() =>
                  handleOpenAddUnitExpenseFormModal(carId)
                }
                pageRef={pageRef}
                lastPage={lastPage}
                handleGetCar={handleGetCar}
              />
            </Tab.Content>

            {carData?.car_status.car_status.toLowerCase() !== "available" && (
              <>
                <Tab.Content value="buyer_information">
                  <BuyerInformation carData={carData} />
                </Tab.Content>

                <Tab.Content value="payment_details">
                  <div className="flex flex-col gap-4">
                    <PaymentDetails carData={carData} />
                    <PaymentBreakdownForm carData={carData} />
                  </div>
                </Tab.Content>
              </>
            )}
          </Tab>
        </>
      )}
    </>
  );
}
