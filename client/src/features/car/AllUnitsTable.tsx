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
import { PencilIcon, TrashBinIcon } from "@/icons/index";
import ButtonIcon from "@/components/ui/button/ButtonIcon";
import Spinner from "@/components/ui/spinner/Spinner";
import { useDebounce } from "@/hooks/useDebounce";
import { CarColumns } from "@/interfaces/CarInterface";
import CarService from "@/services/CarService";

export default function AllUnitsTable() {
  const { handleDateFormat, handleNumberDecimalFormat } = useFormat();

  const [isAllUnitsLoading, setIsAllUnitsLoading] = useState(false);
  const [isMoreAllUnitsLoading, setIsMoreAllUnitsLoading] = useState(false);
  const [allUnits, setAllUnits] = useState<CarColumns[]>([]);
  const [lastPage, setLastPage] = useState<number | null>(null);
  const [search, setSearch] = useState("");

  const debouncedSearch = useDebounce(search);

  const tableRef = useRef<HTMLDivElement>(null);
  const pageRef = useRef(1);

  const handleLoadUsers = useCallback(
    async (loadPage: number, searchValue: string) => {
      try {
        if (
          (loadPage === 1 && isAllUnitsLoading) ||
          (loadPage > 1 && isMoreAllUnitsLoading) ||
          (lastPage !== null && loadPage > lastPage)
        ) {
          return;
        }

        loadPage === 1
          ? setIsAllUnitsLoading(true)
          : setIsMoreAllUnitsLoading(true);

        const { status, data } = await CarService.loadAllUnits(
          loadPage,
          searchValue,
        );

        if (status !== 200) {
          console.error(
            "Status error during load cars all units at AllUnitsTable.tsx: ",
            status,
          );
          return;
        }

        setAllUnits((prev) =>
          loadPage === 1 ? data.cars : [...prev, ...data.cars],
        );
        setLastPage(data.lastPage);
      } catch (error: any) {
        console.error(
          "Server error during load cars all units at AllUnitsTable.tsx: ",
          error,
        );
      } finally {
        loadPage === 1
          ? setIsAllUnitsLoading(false)
          : setIsMoreAllUnitsLoading(false);
      }
    },
    [isAllUnitsLoading, isMoreAllUnitsLoading, lastPage],
  );

  useEffect(() => {
    pageRef.current = 1;
    setLastPage(null);
    setAllUnits([]);

    handleLoadUsers(1, debouncedSearch);
  }, [debouncedSearch]);

  const handleScroll = useCallback(() => {
    if (
      !tableRef.current ||
      isAllUnitsLoading ||
      isMoreAllUnitsLoading ||
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
  }, [isAllUnitsLoading, isMoreAllUnitsLoading, lastPage, handleLoadUsers]);

  const headers = [
    "No.",
    "Encode Date",
    "Description",
    "Selling Price",
    "Plate No.",
    "Mother File",
    "MV File No.",
    "Original OR/CR Received",
    "Encumbered",
    "Confirmation Received",
    "1st Owner",
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
          className="relative max-w-[151vh]  max-h-[calc(100vh-13.5rem)] overflow-x-auto overflow-y-auto"
        >
          <div className="w-full min-w-full">
            <Table>
              {/* Table Header */}
              <TableHeader className="border-b border-gray-100 dark:border-white/5">
                <TableRow>
                  {headers.map((header) => (
                    <TableCell
                      isHeader
                      className="bg-white dark:bg-gray-900 sticky top-0 px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400 whitespace-nowrap"
                      key={header}
                    >
                      {header}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHeader>

              {/* Table Body */}
              <TableBody className="divide-y divide-gray-100 dark:divide-white/5">
                {isAllUnitsLoading && allUnits.length <= 0 && (
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

                {allUnits.map((unit, index) => (
                  <TableRow
                    className="hover:bg-gray-100 dark:hover:bg-gray-800"
                    key={unit.car_id}
                  >
                    <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400 whitespace-nowrap">
                      {index + 1}
                    </TableCell>
                    <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400 whitespace-nowrap">
                      {handleDateFormat(unit.encode_date)}
                    </TableCell>
                    <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400 whitespace-nowrap">
                      {unit.year_model}
                    </TableCell>
                    <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400 whitespace-nowrap">
                      {handleNumberDecimalFormat(unit.price)}
                    </TableCell>
                    <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400 whitespace-nowrap">
                      {unit.plate_number}
                    </TableCell>
                    <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400 whitespace-nowrap">
                      {unit.mother_file.mother_file}
                    </TableCell>
                    <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400 whitespace-nowrap">
                      {unit.mv_file_number}
                    </TableCell>
                    <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400 whitespace-nowrap">
                      {unit.original_or_cr_received ?? "-"}
                    </TableCell>
                    <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400 whitespace-nowrap">
                      {unit.encumbered?.encumbered ?? "-"}
                    </TableCell>
                    <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400 whitespace-nowrap">
                      {handleDateFormat(unit.confirmation_received ?? "") ||
                        "-"}
                    </TableCell>
                    <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400 whitespace-nowrap">
                      {unit.first_owner}
                    </TableCell>
                    <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400 whitespace-nowrap">
                      <div className="flex gap-2">
                        <ButtonIcon
                          type="button"
                          size="icon"
                          variant="ghost"
                          className="hover:text-blue-600"
                        >
                          <PencilIcon />
                        </ButtonIcon>
                        <ButtonIcon
                          type="button"
                          size="icon"
                          variant="ghost"
                          className="hover:text-red-600"
                        >
                          <TrashBinIcon />
                        </ButtonIcon>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}

                {isMoreAllUnitsLoading && (
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

                {!isAllUnitsLoading && allUnits.length <= 0 && (
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
