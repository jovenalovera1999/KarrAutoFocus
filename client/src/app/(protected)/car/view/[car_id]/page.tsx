"use client";

import GoBackButton from "@/components/ui/button/GoBackButton";
import Spinner from "@/components/ui/spinner/Spinner";
import Tab from "@/components/ui/tab/Tab";
import AddPaymentFormModal from "@/features/car/AddPaymentFormModal";
import AddUnitExpenseFormModal from "@/features/car/AddUnitExpenseFormModal";
import BuyerInformation from "@/features/car/BuyerInformationForm";
import PaymentBreakdownForm from "@/features/car/PaymentBreakdownForm";
import PaymentDetails from "@/features/car/PaymentDetails";
import PaymentsTable from "@/features/car/PaymentsTable";
import PaymentSummary from "@/features/car/PaymentSummary";
import SummarOfExpenses from "@/features/car/SummaryOfExpenses";
import ViewCar from "@/features/car/ViewCar";
import { useDebounce } from "@/hooks/useDebounce";
import { useRefresh } from "@/hooks/useRefresh";
import { CarColumns } from "@/interfaces/CarInterface";
import { PaymentBreakdownColumns } from "@/interfaces/PaymentBreakdownInterface";
import { PaymentColumns } from "@/interfaces/PaymentInterface";
import { UnitExpenseColumns } from "@/interfaces/UnitExpenseInterface";
import CarService from "@/services/CarService";
import { useParams } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";

export default function ViewCarPage() {
  const params = useParams();
  const carId = params.car_id as string;

  const { refresh, handleRefresh } = useRefresh();

  // ============================
  // SHARED STATES
  // ============================

  const [isCarDataLoading, setIsCarDataLoading] = useState(true);

  const [carData, setCarData] = useState<CarColumns | null>(null);

  const [unitExpenses, setUnitExpenses] = useState<UnitExpenseColumns[]>([]);
  const [isUnitExpensesLoading, setIsUnitExpensesLoading] = useState(false);
  const [isMoreUnitExpensesLoading, setIsMoreUnitExpensesLoading] =
    useState(false);

  const [lastPage, setLastPage] = useState<number | null>(null);

  const pageRef = useRef(1);

  // States for table payments
  const [totalPaymentAmount, setTotalPaymentAmount] = useState(0);
  const [payments, setPayments] = useState<PaymentColumns[]>([]);
  const [isPaymentsLoading, setIsPaymentsLoading] = useState(false);

  // ============================
  // STATES AND FUNCTIONS FOR MODAL
  // ============================

  const [selectedCarId, setSelectedCarId] = useState<string | number | null>(
    "",
  );
  const [selectedPaymentBreakdown, setSelectedPaymentBreakdown] = useState<
    PaymentBreakdownColumns | null | undefined
  >(null);

  // Unit expense states and functionality
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

  // Payment states and functionality
  const [isAddPaymentFormModalOpen, setIsAddPaymentFormModalOpen] =
    useState(false);

  const handleOpenAddPaymentFormModal = (
    paymentBreakdownSelected: PaymentBreakdownColumns | null | undefined,
  ) => {
    setSelectedPaymentBreakdown(paymentBreakdownSelected);
    setIsAddPaymentFormModalOpen(true);
  };

  const handleCloseAddPaymentFormModal = () => {
    setSelectedPaymentBreakdown(null);
    setIsAddPaymentFormModalOpen(false);
  };

  // ============================
  // SINGLE API FUNCTION
  // ============================

  const handleGetCar = useCallback(
    async (loadPage: number) => {
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

        setIsPaymentsLoading(true);

        const { status, data } = await CarService.getCar(carId, loadPage);

        if (status !== 200) {
          console.error(
            "Status error during get car data at CarViewPage.tsx: ",
            status,
          );
          return;
        }

        setCarData(data.car);

        // Summary of unit expenses
        setUnitExpenses((prev) =>
          loadPage === 1 ? data.unitExpenses : [...prev, ...data.unitExpenses],
        );
        setLastPage(data.lastPage);

        // Payments
        setTotalPaymentAmount(data.totalPaymentAmount ?? 0);
        setPayments(data.payments);
      } catch (error) {
        console.error(
          "Status error during get car data at CarViewPage.tsx: ",
          error,
        );
      } finally {
        setIsCarDataLoading(false);

        loadPage === 1
          ? setIsUnitExpensesLoading(false)
          : setIsMoreUnitExpensesLoading(false);

        setIsPaymentsLoading(false);
      }
    },
    [carId, isUnitExpensesLoading, isMoreUnitExpensesLoading, lastPage],
  );

  useEffect(() => {
    if (!carId) return;

    pageRef.current = 1;
    setUnitExpenses([]);
    setLastPage(null);

    handleGetCar(1);
  }, [carId, refresh]);

  return (
    <>
      {isCarDataLoading && !carId && (
        <div className="flex items-center justify-center min-h-screen">
          <Spinner size="xl" />
        </div>
      )}

      {!isCarDataLoading && carId && (
        <>
          <AddUnitExpenseFormModal
            selectedCarId={selectedCarId}
            isOpen={isAddUnitExpenseFormModalOpen}
            onClose={handleCloseAddUnitExpenseFormModal}
            refreshUnitExpenses={handleRefresh}
          />

          <AddPaymentFormModal
            carData={carData}
            buyerData={carData?.buyer}
            paymentBreakdownData={selectedPaymentBreakdown}
            isOpen={isAddPaymentFormModalOpen}
            onClose={handleCloseAddPaymentFormModal}
            refreshPayments={handleRefresh}
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

                  {carData?.buyer && (
                    <Tab.Trigger value="payment_details">
                      Payment Details
                    </Tab.Trigger>
                  )}
                </>
              )}
            </Tab.List>

            <Tab.Content value="car_information">
              <ViewCar carData={carData} isCarDataLoading={isCarDataLoading} />
            </Tab.Content>

            <Tab.Content value="summary_of_expenses">
              <SummarOfExpenses
                carData={carData}
                unitExpenses={unitExpenses}
                isUnitExpensesLoading={isUnitExpensesLoading}
                isMoreUnitExpensesLoading={isMoreUnitExpensesLoading}
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
                  <BuyerInformation
                    carData={carData}
                    refreshCarData={handleRefresh}
                  />
                </Tab.Content>
                {carData?.buyer && (
                  <Tab.Content value="payment_details">
                    <div className="flex flex-col gap-4">
                      <PaymentDetails carData={carData} />
                      <PaymentBreakdownForm
                        carData={carData}
                        refreshCarData={handleRefresh}
                      />
                      <div className="grid grid-cols-3 gap-4">
                        <div className="col-span-3 md:col-span-2">
                          <PaymentsTable
                            carData={carData}
                            payments={payments}
                            isPaymentsLoading={isPaymentsLoading}
                            onAddPayment={handleOpenAddPaymentFormModal}
                          />
                        </div>
                        <div className="col-span-3 md:col-span-1">
                          <PaymentSummary
                            carData={carData}
                            paymentBreakdownData={carData?.payment_breakdown}
                            totalPaymentAmount={totalPaymentAmount}
                          />
                        </div>
                      </div>
                    </div>
                  </Tab.Content>
                )}
              </>
            )}
          </Tab>
        </>
      )}
    </>
  );
}
