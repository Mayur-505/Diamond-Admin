import React, { useState } from "react";
import { DataTableDemo } from "../Common/DataTable";
import { Button } from "../ui/button";
import { RiArrowUpDownFill } from "react-icons/ri";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { assignAdmin, getAdmin, removeAdmin } from "@/services/adminService";
import { MdDeleteOutline } from "react-icons/md";
import { toast } from "../ui/use-toast";
import InputWithLabel from "../Common/InputWithLabel";
import Loading from "../Common/Loading";
import { useNavigate } from "react-router-dom";
import { Admin } from "@/lib/types";
import DeleteModal from "../Common/DeleteModal";

interface CustomError {
  code?: number;
}
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
  const [isopen, setIsOpen] = React.useState<boolean>(false);
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
      toast({
        description: "Admin deleted successfully",
      });
      setOpenDelete(false);
      setIsOpen(false);
    },
    onError: (error) => {
      toast({
        variant: "error",
        title: (error as { data?: { message?: string } })?.data?.message || "",
      });
      if ((error as CustomError)?.code === 401) {
        navigate("/auth/login");
      }
      setIsOpen(false);
    },
  });
  const { mutate, isPending } = useMutation({
    mutationFn: assignAdmin,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["GET_ADMIN"],
      });
      toast({
        description: "Admin add successfully",
      });
    },
    onError: (error) => {
      toast({
        variant: "error",
        title: (error as { data?: { message?: string } })?.data?.message || "",
      });
      if ((error as CustomError)?.code === 401) {
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
    setIsOpen(true);
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
        return (
          <span
            className={`badge text-white px-1 py-0.5 text-[12px] rounded ${
              row?.original?.status === "Active"
                ? "bg-[#28a745]"
                : "bg-[#343a40]"
            }`}
          >
            {row.original.role == 2 && "Admin"}
          </span>
        );
      },
    },
    {
      accessorKey: "Action",
      header: () => <div className="text-left">Action</div>,
      cell: ({ row }) => {
        return (
          <div className="flex gap-2">
            <Button
              type="button"
              onClick={handleDelete.bind(null, row.original.id)}
              className="text-[14px] font-[600] bg-red-200 text-[#fff] p-1 rounded w-[26px] h-[26px] flex items-center justify-center"
            >
              <MdDeleteOutline className="text-[#dc3545] text-[18px]" />
            </Button>
          </div>
        );
      },
    },
  ];
  // const Deletebody = (
  //   <div>
  //     {isPending && <Loading />}
  //     {isopen && <Loading />}
  //     <div>Are you Sure you want to delete data?</div>
  //     <div className="flex justify-end gap-4 mt-5">
  //       <Button
  //         variant={"outline"}
  //         className="w-full text-[#343a40] border border-[#343a40] bg-[#fff]"
  //         onClick={() => setOpenDelete(false)}
  //       >
  //         Cancel
  //       </Button>
  //       <Button
  //         type="submit"
  //         variant={"outline"}
  //         className="w-full bg-[#343a40] border border-transparent hover:border-[#343a40] text-white"
  //         onClick={handleDeleteAdmin}
  //       >
  //         Remove
  //       </Button>
  //     </div>
  //   </div>
  // );

  return (
    <>
      <div className="custom_contener !mb-[28px] !p-[17.5px] customShadow">
        {isLoading && <Loading />}
        {isPending && <Loading />}
        <DataTableDemo
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          data={adminData?.data?.admindata || []}
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          columns={columns}
          filterName="firstname"
          setActivePage={setActivePage}
          pageCount={adminData?.data?.total}
        />
        <DeleteModal
          openDelete={openDelete}
          setOpenDelete={setOpenDelete}
          isopen={isopen}
          handleDelete={handleDeleteAdmin}
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
        <Button
          className="px-5 h-[35px] bg-[#2796ef] rounded-[4px] text-[#ffffff] border border-transparent font-Nunito font-[600]"
          type="button"
          onClick={handleAssign}
          disabled={!formValues.email.length}
        >
          Assign Admin
        </Button>
      </div>
    </>
  );
};

export default AdminUser;
