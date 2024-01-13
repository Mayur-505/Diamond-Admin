import React, { useState } from "react";
import { DataTableDemo } from "../Common/DataTable";
import { Button } from "../ui/button";
import { RiArrowUpDownFill } from "react-icons/ri";
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
import { AiOutlineEdit } from "react-icons/ai";

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
  const queryClient = useQueryClient();

  const { data: ActiveContactData } = useQuery({
    queryKey: ["ACTIVE_CONTACT", { activePage }],
    queryFn: () => getActiveContact({ page: activePage, pageSize: 10 }),
  });
  const { data: InActiveContactData } = useQuery({
    queryKey: ["INACTIVE_CONTACT", { inActivePage }],
    queryFn: () => getInActiveContact({ page: inActivePage, pageSize: 10 }),
  });

  const { mutate: removeContact } = useMutation({
    mutationFn: deleteContact,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["ACTIVE_CONTACT", "INACTIVE_CONTACT"],
      });
    },
    onError: () => {
      toast({ description: "Not deleted" });
    },
  });

  const { mutate } = useMutation({
    mutationFn: EditContact,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["ACTIVE_CONTACT"],
      });
    },
    onError: () => {
      toast({ description: "Not deleted" });
    },
  });
  const columns: Column<Payment>[] = [
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
          <div className="capitalize">{row.original.email}</div>
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
              <button
                type="button"
                onClick={() =>
                  mutate({ contactid: row?.original?.id, status: 2 })
                }
                className="text-[14px] font-[600] bg-[#343a40] text-[#fff] p-1 rounded w-[26px] h-[26px] flex items-center justify-center"
              >
                <AiOutlineEdit className="text-[#fff] text-[16px]" />
              </button>
            )}
            <button
              type="button"
              onClick={() => removeContact(row?.original?.id)}
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
            // @ts-expect-error
            columns={columns}
            setActivePage={setActivePage}
            pageCount={ActiveContactData?.data?.total}
            filterable={"name"}
          />
        </TabsContent>
        <TabsContent value="InActive">
          <DataTableDemo
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            data={InActiveContactData?.data?.Contactdata || []}
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            columns={columns}
            setActivePage={setInActivePage}
            pageCount={InActiveContactData?.data?.total}
            filterable={"name"}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Index;
