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
import { useCallback, useEffect, useRef, useState } from "react";
import { PencilIcon, TrashBinIcon } from "@/icons/index";
import ButtonIcon from "@/components/ui/button/ButtonIcon";
import Spinner from "@/components/ui/spinner/Spinner";
import { useDebounce } from "@/hooks/useDebounce";

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
  const { handleFullNameFormat, handleDateFormat } = useFormat();

  const [isUsersLoading, setIsUsersLoading] = useState(false);
  const [isMoreUsersLoading, setIsMoreUsersLoading] = useState(false);
  const [users, setUsers] = useState<UserColumns[]>([]);
  const [lastPage, setLastPage] = useState<number | null>(null);
  const [search, setSearch] = useState("");

  const debouncedSearch = useDebounce(search);

  const tableRef = useRef<HTMLDivElement>(null);
  const pageRef = useRef(1);

  const handleLoadUsers = useCallback(
    async (loadPage: number, searchValue: string) => {
      try {
        if (
          (loadPage === 1 && isUsersLoading) ||
          (loadPage > 1 && isMoreUsersLoading) ||
          (lastPage !== null && loadPage > lastPage)
        ) {
          return;
        }

        loadPage === 1 ? setIsUsersLoading(true) : setIsMoreUsersLoading(true);

        const { status, data } = await UserService.loadUsers(
          loadPage,
          searchValue,
        );

        if (status !== 200) {
          console.error(
            "Status error during load users at UsersTable.tsx: ",
            status,
          );
          return;
        }

        setUsers((prev) =>
          loadPage === 1 ? data.users : [...prev, ...data.users],
        );
        setLastPage(data.lastPage);
      } catch (error: any) {
        console.error(
          "Server error during load users at UsersTable.tsx: ",
          error,
        );
      } finally {
        loadPage === 1
          ? setIsUsersLoading(false)
          : setIsMoreUsersLoading(false);
      }
    },
    [isUsersLoading, isMoreUsersLoading, lastPage],
  );

  useEffect(() => {
    pageRef.current = 1;
    setLastPage(null);
    setUsers([]);

    handleLoadUsers(1, debouncedSearch);
  }, [refreshUsers, debouncedSearch]);

  const handleScroll = useCallback(() => {
    if (
      !tableRef.current ||
      isUsersLoading ||
      isMoreUsersLoading ||
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
  }, [isUsersLoading, isMoreUsersLoading, lastPage, handleLoadUsers]);

  const headers = [
    "No.",
    "Employee's Name",
    "Birth Date",
    "Contact Number",
    "Email",
    "Branch Assigned",
    "Role",
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
                      className="bg-white dark:bg-gray-900 sticky top-0 px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                      key={header}
                    >
                      {header}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHeader>

              {/* Table Body */}
              <TableBody className="divide-y divide-gray-100 dark:divide-white/5">
                {isUsersLoading && users.length <= 0 && (
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
                      {handleFullNameFormat(user)}
                    </TableCell>
                    <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                      {handleDateFormat(user.birth_date)}
                    </TableCell>
                    <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                      {user.contact_number}
                    </TableCell>
                    <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                      {user.email}
                    </TableCell>
                    <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                      {user.branch.branch}
                    </TableCell>
                    <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                      {user.role.role}
                    </TableCell>
                    <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                      <div className="flex gap-2">
                        <ButtonIcon
                          type="button"
                          size="icon"
                          variant="ghost"
                          className="hover:text-blue-600"
                          onClick={() => onEditUser(user)}
                        >
                          <PencilIcon />
                        </ButtonIcon>
                        <ButtonIcon
                          type="button"
                          size="icon"
                          variant="ghost"
                          className="hover:text-red-600"
                          onClick={() => onDeleteUser(user)}
                        >
                          <TrashBinIcon />
                        </ButtonIcon>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}

                {isMoreUsersLoading && (
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

                {!isUsersLoading && users.length <= 0 && (
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
