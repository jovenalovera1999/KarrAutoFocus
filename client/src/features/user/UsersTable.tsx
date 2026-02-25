import Button from "@/components/ui/button/Button";
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
import { UserColumns } from "@/interfaces/UserInterface";
import UserService from "@/services/UserService";
import { useEffect, useRef, useState } from "react";
import { PencilIcon, TrashBinIcon } from "@/icons/index";
import Spinner from "@/components/ui/spinner/Spinner";
import { useDebounce } from "@/hooks/useDebounce";
import IconButton from "@/components/ui/button/IconButton";
import Badge from "@/components/ui/badge/Badge";
import useApiInfiniteScrollQuery from "@/hooks/api/useApiInfiniteScrollQuery";

interface UsersTableProps {
  onCreateUser: () => void;
  onEditUser: (selectedUser: UserColumns | null) => void;
  onDeleteUser: (selectedUser: UserColumns | null) => void;
  refreshUsers: boolean;
}

export default function UsersTable({
  onCreateUser,
  onEditUser,
  onDeleteUser,
  refreshUsers,
}: UsersTableProps) {
  const { handleFullNameFormat, handleDateFormat, handleDateTimeFormat } =
    useFormat();

  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search);

  const tableRef = useRef<HTMLDivElement>(null);

  const {
    items: users,
    load: loadUsers,
    handleScroll,
    isLoading: isLoadingUsers,
    isLoadingMore: isLoadingMoreUsers,
    reset: resetUsersTable,
  } = useApiInfiniteScrollQuery<UserColumns>({
    apiService: (page) => UserService.loadUsers(page, debouncedSearch),
  });

  const onScroll = () => {
    handleScroll(tableRef.current);
  };

  useEffect(() => {
    resetUsersTable();
    loadUsers(1);
  }, [refreshUsers, debouncedSearch]);

  const headers = [
    "No.",
    "Employee's Name",
    "Birth Date",
    "Branch Assigned",
    "Role",
    "Date Created",
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
        <Button
          type="button"
          className="w-full md:w-auto"
          onClick={onCreateUser}
        >
          Create User
        </Button>
      </div>
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/5 dark:bg-white/3">
        <div
          ref={tableRef}
          onScroll={onScroll}
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
                {isLoadingUsers && users.length <= 0 && (
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

                {users.map((user, index) => (
                  <TableRow
                    className="hover:bg-gray-100 dark:hover:bg-gray-800"
                    key={user.user_id}
                  >
                    <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                      {index + 1}
                    </TableCell>
                    <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400 whitespace-nowrap">
                      <p>{handleFullNameFormat(user)}</p>
                      <p className="text-xs">{user.contact_number}</p>
                      <p className="text-xs">{user.email}</p>
                    </TableCell>
                    <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                      {handleDateFormat(user.birth_date)}
                    </TableCell>
                    <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                      {user.branch.branch}
                    </TableCell>
                    <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                      <Badge
                        size="sm"
                        color={`${user.role.role.toLowerCase() === "admin" ? "error" : user.role.role.toLowerCase() === "manager" ? "success" : "info"}`}
                      >
                        {user.role.role}
                      </Badge>
                    </TableCell>
                    <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                      {handleDateTimeFormat(user.created_at)}
                    </TableCell>
                    <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                      <div className="flex gap-2">
                        <IconButton
                          type="button"
                          size="icon"
                          variant="ghost"
                          className="hover:text-blue-600"
                          onClick={() => onEditUser(user)}
                        >
                          <PencilIcon />
                        </IconButton>
                        <IconButton
                          type="button"
                          size="icon"
                          variant="ghost"
                          className="hover:text-red-600"
                          onClick={() => onDeleteUser(user)}
                        >
                          <TrashBinIcon />
                        </IconButton>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}

                {isLoadingMoreUsers && (
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

                {!isLoadingUsers && users.length <= 0 && (
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
