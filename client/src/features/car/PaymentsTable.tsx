// import ComponentCard from "@/components/common/ComponentCard";
// import Button from "@/components/ui/button/Button";
// import Input from "@/components/ui/form/Input";
// import Label from "@/components/ui/form/Label";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
// import { useState } from "react";

// export default function PaymentsTable() {
//   const [dateFrom, setDateFrom] = useState("");
//   const [dateTo, setDateTo] = useState("");

//   const headers = ["No.", "Payment Type", "Amount", "Description"];

//   return (
//     <>
//       <ComponentCard title="Payments History">
//         <div className="mb-4 flex flex-col-reverse gap-4 md:flex-row md:items-end md:justify-between">
//           <div className="flex flex-col md:flex-row gap-4">
//             <div className="w-full md:w-72">
//               <Label htmlFor="date_from">From</Label>
//               <Input
//                 type="date"
//                 name="date_from"
//                 value={dateFrom}
//                 onChange={(e) => setDateFrom(e.target.value)}
//               />
//             </div>
//             <div className="w-full md:w-72">
//               <Label htmlFor="date_to">To</Label>
//               <Input
//                 type="date"
//                 name="date_to"
//                 value={dateTo}
//                 onChange={(e) => setDateTo(e.target.value)}
//               />
//             </div>
//           </div>
//           <Button
//             type="button"
//             className="w-full md:w-auto"
//             // onClick={onAddUnitExpense}
//           >
//             Add Payment
//           </Button>
//         </div>
//         <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/5 dark:bg-white/3">
//           <div className="w-full max-h-[calc(100vh-20.5rem)] overflow-x-auto overflow-y-auto">
//             <div className="w-full min-w-full">
//               <Table>
//                 {/* Table Header */}
//                 <TableHeader className="border-b border-gray-100 dark:border-white/5">
//                   <TableRow>
//                     {headers.map((header) => (
//                       <TableCell
//                         isHeader
//                         className="bg-brand-100 dark:bg-brand-900 sticky top-0 px-5 py-3 font-medium text-brand-500 dark:text-brand-400 text-start text-theme-xs"
//                         key={header}
//                       >
//                         {header}
//                       </TableCell>
//                     ))}
//                   </TableRow>
//                 </TableHeader>

//                 {/* Table Body */}
//                 <TableBody className="divide-y divide-gray-100 dark:divide-white/5">
//                   {isUnitExpensesLoading && unitExpenses.length <= 0 && (
//                     <TableRow>
//                       <TableCell
//                         className="px-4 py-3 text-gray-500 text-center text-theme-sm dark:text-gray-400"
//                         colSpan={headers.length}
//                       >
//                         <div className="flex items-center justify-center">
//                           <Spinner size="md" />
//                         </div>
//                       </TableCell>
//                     </TableRow>
//                   )}

//                   {unitExpenses.map((unitExpense, index) => (
//                     <TableRow
//                       className="hover:bg-gray-100 dark:hover:bg-gray-800"
//                       key={unitExpense.unit_expense_id}
//                     >
//                       <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
//                         {index + 1}
//                       </TableCell>
//                       <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
//                         {handleNumberDecimalFormat(unitExpense.amount)}
//                       </TableCell>
//                       <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
//                         {unitExpense.description}
//                       </TableCell>
//                       <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
//                         {handleDateTimeFormat(unitExpense.created_at)}
//                       </TableCell>
//                     </TableRow>
//                   ))}

//                   {isMoreUnitExpensesLoading && (
//                     <TableRow>
//                       <TableCell
//                         className="px-4 py-3 text-gray-500 text-center text-theme-sm dark:text-gray-400"
//                         colSpan={headers.length}
//                       >
//                         <div className="flex items-center justify-center">
//                           <Spinner size="md" />
//                         </div>
//                       </TableCell>
//                     </TableRow>
//                   )}

//                   {!isUnitExpensesLoading && unitExpenses.length <= 0 && (
//                     <TableRow>
//                       <TableCell
//                         className="px-4 py-3 text-gray-500 text-center text-theme-sm dark:text-gray-400"
//                         colSpan={headers.length}
//                       >
//                         No Record Found
//                       </TableCell>
//                     </TableRow>
//                   )}
//                 </TableBody>
//               </Table>
//             </div>
//           </div>
//         </div>
//       </ComponentCard>
//     </>
//   );
// }
