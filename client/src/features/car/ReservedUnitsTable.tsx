"use client";

import Input from "@/components/ui/form/Input";
import Label from "@/components/ui/form/Label";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useFormat } from "@/hooks/useFormat";
import { useCallback, useEffect, useRef, useState } from "react";
import { EyeIcon, PencilIcon, TrashBinIcon } from "@/icons/index";
import Spinner from "@/components/ui/spinner/Spinner";
import { useDebounce } from "@/hooks/useDebounce";
import { CarColumns } from "@/interfaces/CarInterface";
import CarService from "@/services/CarService";
import Link from "next/link";

export default function ReservedUnitsTable() {
  const { handleNumberDecimalFormat } = useFormat();

  const [isReservedUnitsLoading, setIsReservedUnitsLoading] = useState(false);
  const [isMoreReservedUnitsLoading, setIsMoreReservedUnitsLoading] =
    useState(false);
  const [reservedUnits, setReservedUnits] = useState<CarColumns[]>([]);
  const [lastPage, setLastPage] = useState<number | null>(null);
  const [search, setSearch] = useState("");

  const debouncedSearch = useDebounce(search);

  const tableRef = useRef<HTMLDivElement>(null);
  const pageRef = useRef(1);

  const handleLoadUsers = useCallback(
    async (loadPage: number, searchValue: string) => {
      try {
        if (
          (loadPage === 1 && isReservedUnitsLoading) ||
          (loadPage > 1 && isMoreReservedUnitsLoading) ||
          (lastPage !== null && loadPage > lastPage)
        ) {
          return;
        }

        loadPage === 1
          ? setIsReservedUnitsLoading(true)
          : setIsMoreReservedUnitsLoading(true);

        const { status, data } = await CarService.loadReservedUnits(
          loadPage,
          searchValue,
        );

        if (status !== 200) {
          console.error(
            "Status error during load cars reserved units at ReservedUnitsTable.tsx: ",
            status,
          );
          return;
        }

        setReservedUnits((prev) =>
          loadPage === 1 ? data.cars : [...prev, ...data.cars],
        );
        setLastPage(data.lastPage);
      } catch (error: any) {
        console.error(
          "Server error during load cars reserved units at ReservedUnitsTable.tsx: ",
          error,
        );
      } finally {
        loadPage === 1
          ? setIsReservedUnitsLoading(false)
          : setIsMoreReservedUnitsLoading(false);
      }
    },
    [isReservedUnitsLoading, isMoreReservedUnitsLoading, lastPage],
  );

  useEffect(() => {
    pageRef.current = 1;
    setLastPage(null);
    setReservedUnits([]);

    handleLoadUsers(1, debouncedSearch);
  }, [debouncedSearch]);

  const handleScroll = useCallback(() => {
    if (
      !tableRef.current ||
      isReservedUnitsLoading ||
      isMoreReservedUnitsLoading ||
      (lastPage && pageRef.current >= lastPage)
    ) {
      return;
    }

    const { scrollTop, scrollHeight, clientHeight } = tableRef.current;

    if (scrollTop + clientHeight >= scrollHeight - 50) {
      const nextPage = pageRef.current + 1;
      pageRef.current = nextPage;
      handleLoadUsers(nextPage, debouncedSearch);
    }
  }, [
    isReservedUnitsLoading,
    isMoreReservedUnitsLoading,
    lastPage,
    handleLoadUsers,
  ]);

  const headers = [
    "No.",
    "Description",
    "Selling Price",
    "Original OR/CR Received",
    "Actions",
  ];

  return (
    <>
      <div className="mb-4 flex flex-col-reverse gap-4 md:flex-row md:items-end md:justify-between">
        <div className="w-full md:w-72">
          <Label htmlFor="search">Search</Label>
          <Input
            type="text"
            name="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            autoFocus
          />
        </div>
      </div>
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/5 dark:bg-white/3">
        <div
          ref={tableRef}
          onScroll={handleScroll}
          // className={`relative sm:max-w-[calc(100vw-4rem)] ${isExpanded || isHovered ? "lg:max-w-[calc(100vw-24.5rem)]" : "lg:max-w-[calc(100vw-12rem)]"} max-h-[calc(100vh-18.5rem)] md:max-h-[calc(100vh-20.5rem)] overflow-x-auto overflow-y-auto`}
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
                      className="bg-brand-100 dark:bg-brand-900 sticky top-0 px-5 py-3 font-medium text-brand-500 dark:text-brand-400 text-start text-theme-xs whitespace-nowrap"
                      key={header}
                    >
                      {header}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHeader>

              {/* Table Body */}
              <TableBody className="divide-y divide-gray-100 dark:divide-white/5">
                {isReservedUnitsLoading && reservedUnits.length <= 0 && (
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

                {reservedUnits.map((unit, index) => (
                  <TableRow
                    className="hover:bg-gray-100 dark:hover:bg-gray-800"
                    key={unit.car_id}
                  >
                    <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400 whitespace-nowrap">
                      {index + 1}
                    </TableCell>
                    <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400 min-w-96">
                      <p className="text-sm">{unit.year_model}</p>
                      <p className="text-xs">Plate No.: {unit.plate_number}</p>
                      <p className="text-xs">
                        MV File Number: {unit.mv_file_number}
                      </p>
                    </TableCell>
                    <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400 whitespace-nowrap">
                      {handleNumberDecimalFormat(unit.price)}
                    </TableCell>
                    <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400 whitespace-nowrap">
                      {unit.original_or_cr_received ?? "-"}
                    </TableCell>
                    <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400 whitespace-nowrap">
                      <div className="flex gap-2">
                        <Link
                          href={`/car/view/${unit.car_id}`}
                          className="text-gray-600 hover:text-blue-600"
                        >
                          <EyeIcon />
                        </Link>
                        <Link
                          href={`/car/edit/${unit.car_id}`}
                          className="text-gray-600 hover:text-yellow-500"
                        >
                          <PencilIcon />
                        </Link>
                        <Link
                          href={`/car/delete/${unit.car_id}`}
                          className="text-gray-600 hover:text-red-600"
                        >
                          <TrashBinIcon />
                        </Link>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}

                {isMoreReservedUnitsLoading && (
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

                {!isReservedUnitsLoading && reservedUnits.length <= 0 && (
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
    </>
  );
}
