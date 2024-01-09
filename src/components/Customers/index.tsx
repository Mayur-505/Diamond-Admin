import React, { useState } from "react";
import { DataTableDemo } from "../Common/DataTable";
import { Button } from "../ui/button";
import { RiArrowUpDownFill } from "react-icons/ri";
import { Progress } from "../ui/progress";
import { useNavigate } from "react-router-dom";
import {
  getActiveContact,
  getInActiveContact,
} from "@/services/contactService";
import { useQuery } from "@tanstack/react-query";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";

interface Column<T> {
  accessorKey: keyof T | ((row: T) => any) | string;
  header: React.ReactNode | ((args: { column: any }) => React.ReactNode);
  cell: (args: { row: any }) => React.ReactNode;
  enableSorting?: boolean;
}

const Index: React.FC = () => {
  const [activePage, setActivePage] = useState(1);
  const [inActivePage, setInActivePage] = useState(1);
  const navigate = useNavigate();

  const { data: ActiveContactData } = useQuery({
    queryKey: ["ACTIVE_CONTACT", { activePage }],
    queryFn: () => getActiveContact({ page: activePage, pageSize: 10 }),
  });
  const { data: InActiveContactData } = useQuery({
    queryKey: ["INACTIVE_CONTACT", { inActivePage }],
    queryFn: () => getInActiveContact({ page: inActivePage, pageSize: 10 }),
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
          {/* <img
            src={getCountryCode(row.getValue("country")?.code)}
            alt="img"
            className="w-[24px] h-[20px]"
          /> */}
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
            {/* {isImage ? (
              <img
                src={row?.original?.representative?.image}
                alt="img"
                className="w-[24px] h-[24px] rounded-full"
              />
            ) : (
              <div className="!w-[24px] !h-[24px] rounded-full bg-slate-500"></div>
            )} */}
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
  ];

  return (
    <div className="custom_contener !mb-[28px] !p-[17.5px] customShadow">
      <Tabs defaultValue="Active" className="">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="Active">Active</TabsTrigger>
          <TabsTrigger value="InActive">InActive</TabsTrigger>
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
            customButton={
              <Button
                variant={"outline"}
                className="w-full bg-[#343a40] text-white"
                onClick={() => navigate("/customer-contact/add_customer")}
              >
                Add Customer
              </Button>
            }
            // TabButton={}
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
            // customButton={
            //   <Button
            //     variant={"outline"}
            //     className="w-full bg-[#343a40] text-white"
            //     onClick={() => navigate("/customer-contact/add_customer")}
            //   >
            //     Add Customer
            //   </Button>
            // }
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Index;
