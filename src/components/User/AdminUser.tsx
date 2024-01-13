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
import Modal from "../Common/Model";
import Loading from "../Common/Loading";
import { useNavigate } from "react-router-dom";

interface Column<T> {
  accessorKey: keyof T | ((row: T) => any) | string;
  header: React.ReactNode | ((args: { column: any }) => React.ReactNode);
  cell: (args: { row: any }) => React.ReactNode;
  enableSorting?: boolean;
}

const AdminUser: React.FC = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [activePage, setActivePage] = useState(1);
  const [openDelete, setOpenDelete] = React.useState(false);
  const [deleteID, setDeleteID] = React.useState("");
  const [formValues, setFormValues] = useState({
    email: "",
  });

  const { data: adminData, isLoading } = useQuery({
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
    onError: (error) => {
      toast({ description: "Not deleted" });
      if (error?.code == 401) {
        navigate("/auth/login");
      }
    },
  });
  const { mutate, isPending } = useMutation({
    mutationFn: assignAdmin,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["GET_ADMIN"],
      });
    },
    onError: (error) => {
      toast({ description: error?.data?.message });
      if (error?.code == 401) {
        navigate("/auth/login");
      }
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
  const handleDelete = (id: string) => {
    setOpenDelete(true);
    setDeleteID(id);
  };

  const handleDeleteAdmin = () => {
    removeadmin(deleteID);
    setOpenDelete(false);
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
          <div className="">{row.original.email}</div>
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
              onClick={handleDelete.bind(null, row.original.id)}
              className="text-[14px] font-[600] bg-red-200 text-[#fff] p-1 rounded w-[26px] h-[26px] flex items-center justify-center"
            >
              <MdDeleteOutline className="text-[#dc3545] text-[18px]" />
            </button>
          </div>
        );
      },
    },
  ];
  const Deletebody = (
    <div>
      {isPending && <Loading />}
      <div>Are you Sure you want to delete data?</div>
      <div className="flex justify-end gap-4 mt-5">
        <Button
          variant={"outline"}
          className="w-full text-[#343a40] border border-[#343a40] bg-[#fff]"
          onClick={() => setOpenDelete(false)}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          variant={"outline"}
          className="w-full bg-[#343a40] border border-transparent hover:border-[#343a40] text-white"
          onClick={handleDeleteAdmin}
        >
          Delete
        </Button>
      </div>
    </div>
  );

  return (
    <>
      <div className="custom_contener !mb-[28px] !p-[17.5px] customShadow">
        {isLoading && <Loading />}
        {isPending && <Loading />}
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
        <Modal
          open={openDelete}
          onClose={() => setOpenDelete(false)}
          children={Deletebody}
          className="!p-[20px]"
        />
      </div>
      <div className="custom_contener flex items-center justify-center !mb-[28px] !p-[17.5px] customShadow">
        <InputWithLabel
          id="email"
          placeholder="Assign Email"
          className="h-[35px] mr-4 w-[500px] p-[7px] border border-[#ced4da] rounded-[4px] placeholder:opacity-[0.6]"
          value={formValues.email}
          onChange={(e) => handleChange("email", e.target.value)}
        />
        <button
          className="px-5 h-[35px] bg-[#2796ef] rounded-[4px] text-[#ffffff] border border-transparent font-Nunito font-[600]"
          type="button"
          onClick={handleAssign}
          disabled={!formValues.email.length}
        >
          Assign Admin
        </button>
      </div>
    </>
  );
};

export default AdminUser;
