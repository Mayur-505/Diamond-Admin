import { RiArrowUpDownFill } from "react-icons/ri";
import { Button } from "../ui/button";
import { DataTableDemo } from "../Common/DataTable";
import { useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  getOrderHistory,
  getOrderSummary,
} from "@/services/orderhistoryService";

const OrderHistory = () => {
  const [activePage, setActivePage] = useState(1);
  const [summaryData, setSummaryData] = useState();

  const { data: orderHistoryData } = useQuery({
    queryKey: ["GET_ORDER_HISTORY", { activePage }],
    queryFn: () => getOrderHistory({ page: activePage, pageSize: 10 }),
  });

  const { mutate: orderSummaryData } = useMutation({
    mutationFn: (id) => getOrderSummary(id),
    onSuccess: (res) => {
      setSummaryData(res?.data?.data);
    },
  });
  const handleView = (id: any) => {
    orderSummaryData(id);
  };

  console.log("summaryData", summaryData);

  const columns: Column<Customer>[] = [
    {
      accessorKey: "Product Image",
      header: <div className="text-left">Image</div>,
      cell: ({ row }) => {
        return (
          <img
            src={row?.original?.order_item?.[0]?.productimage?.[0]}
            className="w-[40px] h-[40px] object-cover rounded"
          />
        );
      },
    },
    {
      accessorKey: "title",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            className="p-0"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Title
            <RiArrowUpDownFill className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className="capitalize">
          {row?.original?.order_item?.[0]?.title}
        </div>
      ),
    },
    {
      accessorKey: "Status",
      header: () => <div className="text-left">Status</div>,
      cell: ({ row }) => {
        return (
          <span
            className={`badge text-white px-1 py-0.5 text-[12px] rounded ${
              row?.original?.status === "Active"
                ? "bg-[#28a745]"
                : "bg-[#dc3545]"
            }`}
          >
            {row?.original?.order_item?.[0]?.status == "0"
              ? "Inactive"
              : "Active"}
          </span>
        );
      },
    },
    {
      accessorKey: "Summary",
      header: () => <div className="text-left">Summary</div>,
      cell: ({ row }) => {
        return (
          <div className="flex gap-2">
            <Button
              variant={"outline"}
              className="w-[50px] bg-[#343a40] text-white"
              onClick={() => handleView(row?.original?.id)}
            >
              View
            </Button>
          </div>
        );
      },
    },
  ];
  return (
    <div className="custom_contener !mb-[28px] !p-[17.5px] customShadow">
      <DataTableDemo
        data={orderHistoryData?.data?.Orderdata || []}
        columns={columns}
        filterName={"title"}
        setActivePage={setActivePage}
        pageCount={orderHistoryData?.data?.total}
        customButton={
          <div className="flex justify-end gap-4">
            <div className="flex flex-col text-center md:text-left">
              <span className="text-900 text-[21px] font-Nunito mb-2">
                My Orders
              </span>
              <span className="text-700 text-[16px] text-[#616161] font-Nunito">
                Dignissim diam quis enim lobortis.
              </span>
            </div>
          </div>
        }
      />
    </div>
  );
};

export default OrderHistory;
