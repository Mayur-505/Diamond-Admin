import React, { useEffect, useState } from "react";
import { DataTableDemo } from "../Common/DataTable";
import { Button } from "../ui/button";
import { RiArrowUpDownFill } from "react-icons/ri";
import { CustomerService } from "@/utils/CustomerJson";
import { Progress } from "../ui/progress";
import { useNavigate } from "react-router-dom";

export type PaymentStatus = "pending" | "processing" | "success" | "failed";

export type Payment = {
  id: string;
  amount: number;
  status: PaymentStatus;
  email: string;
};

interface Column<T> {
  accessorKey: keyof T | ((row: T) => any) | string;
  header: React.ReactNode | ((args: { column: any }) => React.ReactNode);
  cell: (args: { row: any }) => React.ReactNode;
  enableSorting?: boolean;
}

interface data {
  id: number;
  name: string;
  country: {
    name: string;
    code: string;
  };
  company: string;
  date: string;
  status: string;
  verified: boolean;
  activity: number;
  representative: {
    name: string;
    image: string;
  };
  balance: number;
}
[];

const data: Payment[] = [
  {
    id: "m5gr84i9",
    amount: 316,
    status: "success",
    email: "ken99@yahoo.com",
  },
  {
    id: "3u1reuv4",
    amount: 242,
    status: "success",
    email: "Abe45@gmail.com",
  },
  {
    id: "derv1ws0",
    amount: 837,
    status: "processing",
    email: "Monserrat44@gmail.com",
  },
  {
    id: "5kma53ae",
    amount: 874,
    status: "success",
    email: "Silas22@gmail.com",
  },
  {
    id: "bhqecj4p",
    amount: 721,
    status: "failed",
    email: "carmella@hotmail.com",
  },
];

const Index: React.FC = () => {
  const [customers, setCustomers] = useState<data[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    CustomerService.getCustomersXLarge().then((data) => setCustomers(data));
  }, []);

  function getCountryCode(countryName: string) {
    return `https://flagcdn.com/48x36/${countryName.toLocaleLowerCase()}.png`;
  }

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
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("name")}</div>
      ),
    },
    {
      accessorKey: "country",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            className="p-0"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Country
            <RiArrowUpDownFill className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <img
            src={getCountryCode(row.getValue("country")?.code)}
            alt="img"
            className="w-[24px] h-[20px]"
          />
          <div className="capitalize">{row.getValue("country")?.name}</div>
        </div>
      ),
    },
    {
      accessorKey: "Join Date",
      header: () => <div className="text-left">Join Date</div>,
      cell: ({ row }) => {
        return <div className="text-left font-medium">{row.original.date}</div>;
      },
    },
    {
      accessorKey: "representative",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            className="p-0"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Create By
            <RiArrowUpDownFill className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => {
        const isImage = row?.original?.representative?.image.includes("http");
        return (
          <div className="text-left font-medium flex items-center gap-2">
            {isImage ? (
              <img
                src={row?.original?.representative?.image}
                alt="img"
                className="w-[24px] h-[24px] rounded-full"
              />
            ) : (
              <div className="!w-[24px] !h-[24px] rounded-full bg-slate-500"></div>
            )}
            {row.original.representative?.name}
          </div>
        );
      },
    },
    {
      accessorKey: "Activity",
      header: () => <div className="text-left">Activity</div>,
      cell: ({ row }) => {
        return (
          <Progress value={row.original.activity} className="h-2 w-[100px]" />
          //   <div className="text-left font-medium">{row.original.activity}</div>
        );
      },
    },
  ];

  return (
    <div className="custom_contener !mb-[28px] !p-[17.5px] customShadow">
      <DataTableDemo
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        data={customers}
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        columns={columns}
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
      />
    </div>
  );
};

export default Index;
