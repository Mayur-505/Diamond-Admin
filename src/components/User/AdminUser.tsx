import React, { useState } from "react";
import { DataTableDemo } from "../Common/DataTable";
import { Button } from "../ui/button";
import { RiArrowUpDownFill } from "react-icons/ri";
import { Progress } from "../ui/progress";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { assignAdmin, getAdmin, removeAdmin } from "@/services/adminService";
import { MdDeleteOutline } from "react-icons/md";
import { toast } from "../ui/use-toast";
import { AiOutlineEdit } from "react-icons/ai";
import InputWithLabel from "../Common/InputWithLabel";
import { error } from "console";

interface Column<T> {
  accessorKey: keyof T | ((row: T) => any) | string;
  header: React.ReactNode | ((args: { column: any }) => React.ReactNode);
  cell: (args: { row: any }) => React.ReactNode;
  enableSorting?: boolean;
}

const AdminUser: React.FC = () => {
  const queryClient = useQueryClient();
  const [activePage, setActivePage] = useState(1);
  const [formValues, setFormValues] = useState({
    email: "",
  });

  const { data: adminData } = useQuery({
    queryKey: ["GET_ADMIN", { activePage }],
    queryFn: () => getAdmin({ page: activePage, pageSize: 10 }),
  });

  const { mutate: removeadmin } = useMutation({
    mutationFn: removeAdmin,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["GET_ADMIN"],
      });
    },
    onError: () => {
      toast({ description: "Not deleted" });
    },
  });
  const { mutate } = useMutation({
    mutationFn: assignAdmin,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["GET_ADMIN"],
      });
    },
    onError: (error) => {
      toast({ description: error?.data?.message });
    },
  });
  const handleChange = (name: string, value: string | undefined) => {
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };
  const handleAssign = () => {
    mutate({ email: formValues.email });
    setFormValues({
      email: "",
    });
  };
  const columns: Column<Admin>[] = [
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
    {
      accessorKey: "Action",
      header: () => <div className="text-left">Action</div>,
      cell: ({ row }) => {
        return (
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => removeadmin(row?.original?.id)}
              className="text-[14px] font-[600] bg-red-200 text-[#fff] p-1 rounded w-[26px] h-[26px] flex items-center justify-center"
            >
              <MdDeleteOutline className="text-[#dc3545] text-[18px]" />
            </button>
          </div>
        );
      },
    },
  ];

  return (
    <div className="custom_contener !mb-[28px] !p-[17.5px] customShadow">
      <div>
        <InputWithLabel
          id="email"
          placeholder="Assign Email"
          className="h-[35px] mb-[10px] w-[280px] p-[7px] border border-[#ced4da] rounded-[4px] placeholder:opacity-[0.6]"
          value={formValues.email}
          onChange={(e) => handleChange("email", e.target.value)}
        />
        <button
          className="px-5 h-[35px] bg-[#2796ef] rounded-[4px] text-[#ffffff] border border-transparent font-Nunito font-[600]"
          type="button"
          onClick={handleAssign}
        >
          Assign Admin
        </button>
      </div>
      <DataTableDemo
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        data={adminData?.data?.admindata || []}
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        columns={columns}
        setActivePage={setActivePage}
        pageCount={adminData?.data?.admindata?.total}
        filterable={"name"}
      />
    </div>
  );
};

export default AdminUser;