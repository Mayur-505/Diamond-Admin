import React, { useState } from "react";
import { DataTableDemo } from "../Common/DataTable";
import { Button } from "../ui/button";
import { RiArrowUpDownFill } from "react-icons/ri";
import { IoMdCheckmark } from "react-icons/io";
import { Progress } from "../ui/progress";
import {
  EditContact,
  deleteContact,
  getActiveContact,
  getInActiveContact,
} from "@/services/contactService";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { toast } from "../ui/use-toast";
import { MdDeleteOutline } from "react-icons/md";
import Loading from "../Common/Loading";
import Modal from "../Common/Model";
import { useNavigate } from "react-router-dom";
import { Customers } from "@/lib/types";
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

const Index: React.FC = () => {
  const [activePage, setActivePage] = useState(1);
  const [inActivePage, setInActivePage] = useState(1);
  const [active, setActive] = useState("active");
  const [openDelete, setOpenDelete] = React.useState(false);
  const [isopen, setIsOpen] = React.useState<boolean>(false);
  const [deleteID, setDeleteID] = React.useState("");
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { data: ActiveContactData, isLoading } = useQuery({
    queryKey: ["ACTIVE_CONTACT", { activePage }],
    queryFn: () => getActiveContact({ page: activePage, pageSize: 10 }),
  });
  const { data: InActiveContactData, isPending } = useQuery({
    queryKey: ["INACTIVE_CONTACT", { inActivePage }],
    queryFn: () => getInActiveContact({ page: inActivePage, pageSize: 10 }),
  });

  const { mutate: removeContact } = useMutation({
    mutationFn: deleteContact,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["ACTIVE_CONTACT"],
      });
      queryClient.invalidateQueries({
        queryKey: ["INACTIVE_CONTACT"],
      });
      toast({
        title: "User deleted successfully",
      });
      setOpenDelete(false);
      setIsOpen(false);
    },
    onError: (error) => {
      if ((error as CustomError)?.code === 401) {
        navigate("/auth/login");
      }
      setIsOpen(false);
      toast({
        variant: "error",
        title: (error as { data?: { message?: string } })?.data?.message || "",
      });
    },
  });

  const { mutate } = useMutation({
    mutationFn: EditContact,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["ACTIVE_CONTACT"],
      });
      setIsOpen(false);
      toast({
        title: "User is Inactive successfully",
      });
    },
    onError: (error) => {
      setIsOpen(false);
      if ((error as CustomError)?.code === 401) {
        navigate("/auth/login");
      }
      toast({
        variant: "error",
        title: (error as { data?: { message?: string } })?.data?.message || "",
      });
    },
  });

  const handleDelete = (id: string) => {
    setOpenDelete(true);
    setDeleteID(id);
  };

  const handleDeleteContact = () => {
    removeContact(deleteID);
    setIsOpen(true);
  };

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
  //         onClick={handleDeleteContact}
  //       >
  //         Delete
  //       </Button>
  //     </div>
  //   </div>
  // );

  const columns: Column<Customers>[] = [
    {
      accessorKey: "name",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            className="p-0"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Name
            <RiArrowUpDownFill className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => <div className="">{row.original.name}</div>,
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
      accessorKey: "Phone Number",
      header: () => <div className="text-left">Phone Number</div>,
      cell: ({ row }) => {
        return (
          <div className="text-left font-medium">
            {row.original.phone_number}
          </div>
        );
      },
    },
    {
      accessorKey: "Comment",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            className="p-0"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Comment
            <RiArrowUpDownFill className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => {
        // const isImage = row?.original?.representative?.image.includes("http");
        return (
          <div className="text-left font-medium flex items-center gap-2">
            {row.original.comment}
          </div>
        );
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
            {active === "active" && (
              <Button
                type="button"
                onClick={() => {
                  mutate({ contactid: row?.original?.id, status: 2 }),
                    setIsOpen(true);
                }}
                className="text-[14px] font-[600] bg-[#343a40] text-[#fff] p-1 rounded w-[26px] h-[26px] flex items-center justify-center"
              >
                <IoMdCheckmark className="text-[#fff] text-[16px]" />
              </Button>
            )}
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

  return (
    <div className="custom_contener !mb-[28px] !p-[17.5px] customShadow">
      {isLoading && <Loading />}
      {isPending && <Loading />}
      {isopen && <Loading />}
      <Tabs defaultValue="Active" className="">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="Active" onClick={() => setActive("active")}>
            Active
          </TabsTrigger>
          <TabsTrigger value="InActive" onClick={() => setActive("inactive")}>
            InActive
          </TabsTrigger>
        </TabsList>
        <TabsContent value="Active">
          <DataTableDemo
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            data={ActiveContactData?.data?.Contactdata || []}
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            columns={columns}
            setActivePage={setActivePage}
            pageCount={ActiveContactData?.data?.total}
            filterName={"name"}
          />
        </TabsContent>
        <TabsContent value="InActive">
          <DataTableDemo
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            data={InActiveContactData?.data?.Contactdata || []}
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            columns={columns}
            setActivePage={setInActivePage}
            pageCount={InActiveContactData?.data?.total}
            filterName={"name"}
          />
        </TabsContent>
      </Tabs>
      <DeleteModal
        openDelete={openDelete}
        setOpenDelete={setOpenDelete}
        isopen={isopen}
        handleDelete={handleDeleteContact}
      />
    </div>
  );
};

export default Index;
