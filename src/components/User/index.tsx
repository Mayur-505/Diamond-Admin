import React, { useState } from "react";
import { DataTableDemo } from "../Common/DataTable";
import { Button } from "../ui/button";
import { RiArrowUpDownFill } from "react-icons/ri";
import { Progress } from "../ui/progress";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getUser } from "@/services/userService";
import Loading from "../Common/Loading";

interface Column<T> {
  accessorKey: keyof T | ((row: T) => any) | string;
  header: React.ReactNode | ((args: { column: any }) => React.ReactNode);
  cell: (args: { row: any }) => React.ReactNode;
  enableSorting?: boolean;
}

const Index: React.FC = () => {
  const [activePage, setActivePage] = useState(1);
  const navigate = useNavigate();

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
          <div className="capitalize">{row.original.email}</div>
        </div>
      ),
    },
    {
      accessorKey: "role",
      header: () => <div className="text-left">Role</div>,
      cell: ({ row }) => {
        return <div className="text-left font-medium">{row.original.role}</div>;
      },
    },
    {
      accessorKey: "Activity",
      header: () => <div className="text-left">Activity</div>,
      cell: ({ row }) => {
        return (
          <Progress value={row.original.status} className="h-2 w-[100px]" />
          //   <div className="text-left font-medium">{row.original.activity}</div>
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
        // @ts-expect-error
        columns={columns}
        setActivePage={setActivePage}
        pageCount={UserData?.data?.total}
        filterable={"name"}
      />
    </div>
  );
};

export default Index;
