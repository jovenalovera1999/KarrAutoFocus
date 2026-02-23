"use client";

import ComponentCard from "@/components/common/ComponentCard";
import Badge from "@/components/ui/badge/Badge";
import Button from "@/components/ui/button/Button";
import GoBackButton from "@/components/ui/button/GoBackButton";
import Input from "@/components/ui/form/Input";
import Label from "@/components/ui/form/Label";
import Spinner from "@/components/ui/spinner/Spinner";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useDebounce } from "@/hooks/useDebounce";
import { useFormat } from "@/hooks/useFormat";
import { UnitExpenseColumns } from "@/interfaces/UnitExpenseInterface";
import CarService from "@/services/CarService";
import { useParams } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";

interface ViewCarProps {
  onAddUnitExpense: (carId: string | number | null) => void;
  refreshUnitExpenses: boolean;
}

export default function ViewCar({
  onAddUnitExpense,
  refreshUnitExpenses,
}: ViewCarProps) {
  const params = useParams();
  const carId = params.car_id as string;

  const { handleNumberDecimalFormat, handleDateFormat, handleDateTimeFormat } =
    useFormat();

  const [isGetting, setIsGetting] = useState(true);
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
  const [buyer, setBuyer] = useState("");

  // For unit expenses
  const [isUnitExpensesLoading, setIsUnitExpensesLoading] = useState(false);
  const [isMoreUnitExpensesLoading, setIsMoreUnitExpensesLoading] =
    useState(false);
  const [unitExpenses, setUnitExpenses] = useState<UnitExpenseColumns[]>([]);
  const [lastPage, setLastPage] = useState<number | null>(null);
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");

  const debouncedDateFrom = useDebounce(dateFrom);
  const debouncedDateTo = useDebounce(dateTo);

  const tableRef = useRef<HTMLDivElement>(null);
  const pageRef = useRef(1);

  const handleGetCar = useCallback(
    async (
      carIdValue: string | number,
      loadPage: number,
      dateFromValue: string,
      dateToValue: string,
    ) => {
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
          carIdValue,
          loadPage,
          dateFromValue,
          dateToValue,
        );

        if (status !== 200) {
          console.error("Status error during get car at ViewCar.tsx: ", status);
          return;
        }

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
        setBuyer(data.car.buyer.buyer);

        setUnitExpenses((prev) =>
          loadPage === 1 ? data.unitExpenses : [...prev, ...data.unitExpenses],
        );
        setLastPage(data.lastPage);
      } catch (error: any) {
        console.error("Server error during get car at ViewCar.tsx: ", error);
      } finally {
        setIsGetting(false);

        loadPage === 1
          ? setIsUnitExpensesLoading(false)
          : setIsMoreUnitExpensesLoading(false);
      }
    },
    [carId, isUnitExpensesLoading, isMoreUnitExpensesLoading, lastPage],
  );

  useEffect(() => {
    if (carId) {
      pageRef.current = 1;
      setLastPage(null);
      setUnitExpenses([]);

      handleGetCar(carId, 1, debouncedDateFrom, debouncedDateTo);
    }
  }, [carId, refreshUnitExpenses, debouncedDateFrom, debouncedDateTo]);

  const handleScroll = useCallback(() => {
    if (
      !tableRef.current ||
      isUnitExpensesLoading ||
      isMoreUnitExpensesLoading ||
      (lastPage && pageRef.current >= lastPage)
    ) {
      return;
    }

    const { scrollTop, scrollHeight, clientHeight } = tableRef.current;

    if (scrollTop + clientHeight >= scrollHeight - 50) {
      const nextPage = pageRef.current + 1;
      pageRef.current = nextPage;
      handleGetCar(carId, nextPage, debouncedDateFrom, debouncedDateTo);
    }
  }, [
    isUnitExpensesLoading,
    isMoreUnitExpensesLoading,
    lastPage,
    handleGetCar,
  ]);

  const headers = ["No.", "Amount", "Description", "Date Created"];

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
                  <div className="mb-3 md:mb-0">
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
                  <div className="mb-3 md:mb-0">
                    <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                      First Owner
                    </p>
                    <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                      {firstOwner || "-"}
                    </p>
                  </div>
                </div>
                <div className="col-span-2 md:col-span-1">
                  <div className="mb-3 md:mb-0">
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
            <ComponentCard title="Payment Details">
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2 md:col-span-1">
                  <div className="mb-7">
                    <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                      Unit
                    </p>
                    <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                      {`${yearModel} ${make} ${series} ${transmission} ${color}`}
                    </p>
                  </div>
                  <div className="mb-3 md:mb-0">
                    <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                      Buyer
                    </p>
                    <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                      {buyer || "-"}
                    </p>
                  </div>
                </div>
                <div className="col-span-2 md:col-span-1">
                  <div className="mb-7">
                    <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                      Selling Price
                    </p>
                    <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                      {handleNumberDecimalFormat(price)}
                    </p>
                  </div>
                  <div className="mb-3 md:mb-0">
                    <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
                      Agreed Price
                    </p>
                    <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                      {"-"}
                    </p>
                  </div>
                </div>
              </div>
            </ComponentCard>
            <ComponentCard title="Summary of Expenses">
              <div className="mb-4 flex flex-col-reverse gap-4 md:flex-row md:items-end md:justify-between">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="w-full md:w-72">
                    <Label htmlFor="date_from">From</Label>
                    <Input
                      type="date"
                      name="date_from"
                      value={dateFrom}
                      onChange={(e) => setDateFrom(e.target.value)}
                      autoFocus
                    />
                  </div>
                  <div className="w-full md:w-72">
                    <Label htmlFor="date_to">To</Label>
                    <Input
                      type="date"
                      name="date_to"
                      value={dateTo}
                      onChange={(e) => setDateTo(e.target.value)}
                      autoFocus
                    />
                  </div>
                </div>
                <Button
                  type="button"
                  className="w-full md:w-auto"
                  onClick={() => onAddUnitExpense(carId)}
                >
                  Add Unit Expenses
                </Button>
              </div>
              <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/5 dark:bg-white/3">
                <div
                  ref={tableRef}
                  onScroll={handleScroll}
                  className="w-full max-h-[calc(100vh-20.5rem)] overflow-x-auto overflow-y-auto"
                >
                  <div className="w-full min-w-full">
                    <Table>
                      {/* Table Header */}
                      <TableHeader className="border-b border-gray-100 dark:border-white/5">
                        <TableRow>
                          {headers.map((header) => (
                            <TableCell
                              isHeader
                              className="bg-brand-100 dark:bg-brand-900 sticky top-0 px-5 py-3 font-medium text-brand-500 dark:text-brand-400 text-start text-theme-xs"
                              key={header}
                            >
                              {header}
                            </TableCell>
                          ))}
                        </TableRow>
                      </TableHeader>

                      {/* Table Body */}
                      <TableBody className="divide-y divide-gray-100 dark:divide-white/5">
                        {isUnitExpensesLoading && unitExpenses.length <= 0 && (
                          <TableRow>
                            <TableCell
                              className="px-4 py-3 text-gray-500 text-center text-theme-sm dark:text-gray-400"
                              colSpan={headers.length}
                            >
                              <div className="flex items-center justify-center">
                                <Spinner size="md" />
                              </div>
                            </TableCell>
                          </TableRow>
                        )}

                        {unitExpenses.map((unitExpense, index) => (
                          <TableRow
                            className="hover:bg-gray-100 dark:hover:bg-gray-800"
                            key={unitExpense.unit_expense_id}
                          >
                            <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                              {index + 1}
                            </TableCell>
                            <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                              {handleNumberDecimalFormat(unitExpense.amount)}
                            </TableCell>
                            <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                              {unitExpense.description}
                            </TableCell>
                            <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                              {handleDateTimeFormat(unitExpense.created_at)}
                            </TableCell>
                          </TableRow>
                        ))}

                        {isMoreUnitExpensesLoading && (
                          <TableRow>
                            <TableCell
                              className="px-4 py-3 text-gray-500 text-center text-theme-sm dark:text-gray-400"
                              colSpan={headers.length}
                            >
                              <div className="flex items-center justify-center">
                                <Spinner size="md" />
                              </div>
                            </TableCell>
                          </TableRow>
                        )}

                        {!isUnitExpensesLoading && unitExpenses.length <= 0 && (
                          <TableRow>
                            <TableCell
                              className="px-4 py-3 text-gray-500 text-center text-theme-sm dark:text-gray-400"
                              colSpan={headers.length}
                            >
                              No Record Found
                            </TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
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
