import React, { useState } from "react";
import { DataTableDemo } from "../Common/DataTable";
import { Button } from "../ui/button";
import { RiArrowUpDownFill } from "react-icons/ri";
import { useQuery } from "@tanstack/react-query";
import { getUser } from "@/services/userService";
import Loading from "../Common/Loading";
import { User } from "@/lib/types";

interface Column<T> {
  accessorKey: keyof T | ((row: T) => any) | string;
  header: React.ReactNode | ((args: { column: any }) => React.ReactNode);
  cell: (args: { row: any }) => React.ReactNode;
  enableSorting?: boolean;
}

const Index: React.FC = () => {
  const [activePage, setActivePage] = useState(1);

  const { data: UserData, isLoading } = useQuery({
    queryKey: ["GET_USER", { activePage }],
    queryFn: () => getUser({ page: activePage, pageSize: 10 }),
  });
  const columns: Column<User>[] = [
    {
      accessorKey: "firstname",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            className="p-0"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            First Name
            <RiArrowUpDownFill className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => <div className="">{row.original.firstname}</div>,
    },
    {
      accessorKey: "lastname",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            className="p-0"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Last Name
            <RiArrowUpDownFill className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => <div className="">{row.original.lastname}</div>,
    },
    {
      accessorKey: "Email",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            className="p-0"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Email
            <RiArrowUpDownFill className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <div className="">{row.original.email}</div>
        </div>
      ),
    },
    {
      accessorKey: "role",
      header: () => <div className="text-left">Role</div>,
      cell: ({ row }) => {
        return (
          <span
            className={`badge text-white px-1 py-0.5 text-[12px] rounded ${
              row?.original?.status === "Active"
                ? "bg-[#28a745]"
                : "bg-[#343a40]"
            }`}
          >
            {row.original.role == 1 && "User"}
          </span>
        );
      },
    },
  ];

  return (
    <div className="custom_contener !mb-[28px] !p-[17.5px] customShadow">
      {isLoading && <Loading />}
      <DataTableDemo
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        data={UserData?.data?.userdata || []}
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        columns={columns}
        setActivePage={setActivePage}
        pageCount={UserData?.data?.total}
        filterName={"firstname"}
      />
    </div>
  );
};

export default Index;
