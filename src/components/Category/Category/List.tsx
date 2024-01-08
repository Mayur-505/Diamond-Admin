import React from "react";
import { DataTableDemo } from "@/components/Common/DataTable";
import { ExportExcelButton } from "@/components/Common/ExportButton";
import { Button } from "@/components/ui/button";
import { getSubCategory } from "@/services/subcategoryService";
import { useQuery } from "@tanstack/react-query";
import { AiOutlineEdit } from "react-icons/ai";
import { MdDeleteOutline } from "react-icons/md";
import { RiArrowUpDownFill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";

interface Customer {
  id: number;
  name: string;
  parentCategory: string;
  metatitle: string;
  metakeyword: string;
  description: string;
  status: string;
}

// const data: Customer[] = [
//   {
//     id: 1,
//     name: "Category 1",
//     parentCategory: "Parent Category 1",
//     metatitle: "Meta Title 1",
//     metakeyword: "Meta Keyword 1",
//     description: "Description 1",
//     status: "Active",
//   },
//   {
//     id: 2,
//     name: "Category 2",
//     parentCategory: "Parent Category 2",
//     metatitle: "Meta Title 2",
//     metakeyword: "Meta Keyword 2",
//     description: "Description 2",
//     status: "InActive",
//   },
//   {
//     id: 3,
//     name: "Category 3",
//     parentCategory: "Parent Category 3",
//     metatitle: "Meta Title 3",
//     metakeyword: "Meta Keyword 3",
//     description: "Description 3",
//     status: "Active",
//   },
// ];

interface Column<T> {
  accessorKey: keyof T | ((row: T) => any) | string;
  header: React.ReactNode | ((args: { column: any }) => React.ReactNode);
  cell: (args: { row: any }) => React.ReactNode;
  enableSorting?: boolean;
}

const List = () => {
  const navigate = useNavigate();
  // const statusBodyTemplate = (rowData) => {
  //   return (
  //     <span
  //       className={`badge text-white px-1 py-0.5 text-[12px] rounded ${
  //         rowData.status === "Active" ? "bg-[#28a745]" : "bg-[#dc3545]"
  //       }`}
  //     >
  //       {rowData.status}
  //     </span>
  //   );
  // };

  // const actionBodyTemplate = (rowData) => {
  //   return (
  //     <div className="flex gap-2">
  //       <button
  //         type="button"
  //         className="text-[14px] font-[600] bg-[#343a40] text-[#fff] p-1 rounded w-[26px] h-[26px] flex items-center justify-center"
  //       >
  //         <AiOutlineEdit className="text-[#fff] text-[16px]" />
  //       </button>
  //       <button
  //         type="button"
  //         className="text-[14px] font-[600] bg-red-200 text-[#fff] p-1 rounded w-[26px] h-[26px] flex items-center justify-center"
  //       >
  //         <MdDeleteOutline className="text-[#dc3545] text-[18px]" />
  //       </button>
  //     </div>
  //   );
  // };
  const { data: subcategoryData } = useQuery({
    queryKey: ["GET_SUBCATEGORY"],
    queryFn: getSubCategory,
  });

  const columns: Column<Customer>[] = [
    {
      accessorKey: "name",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            className="p-0"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Category
            <RiArrowUpDownFill className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => <div className="capitalize">{row?.original.name}</div>,
    },
    {
      accessorKey: "parentCategory",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            className="p-0"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Parent Category
            <RiArrowUpDownFill className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className="capitalize">{row?.original?.categoryid?.name}</div>
      ),
    },
    {
      accessorKey: "metatitle",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            className="p-0"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Meta Title
            <RiArrowUpDownFill className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className="capitalize">{row?.original.metatitle}</div>
      ),
    },
    {
      accessorKey: "metakeyword",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            className="p-0"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Meta Keyword
            <RiArrowUpDownFill className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className="capitalize">{row?.original.metakeyword}</div>
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
            {row?.original?.status == "0" ? "Inactive" : "Active"}
          </span>
        );
      },
    },
    {
      accessorKey: "Activity",
      header: () => <div className="text-left">Activity</div>,
      cell: ({ row }) => {
        return (
          <div className="flex gap-2">
            <button
              type="button"
              className="text-[14px] font-[600] bg-[#343a40] text-[#fff] p-1 rounded w-[26px] h-[26px] flex items-center justify-center"
            >
              <AiOutlineEdit className="text-[#fff] text-[16px]" />
            </button>
            <button
              type="button"
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
    <div className="custom_contener !p-[17.5px] !mb-[28px] customShadow">
      <DataTableDemo
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        data={subcategoryData?.data?.responseData || []}
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        columns={columns}
        filterName={"name"}
        customButton={
          <div className="flex justify-end gap-4">
            <Button
              variant={"outline"}
              onClick={() => navigate("/category/sub-category/add_category")}
              className="w-full bg-[#343a40] text-white"
            >
              Add
            </Button>
            <ExportExcelButton
              data={subcategoryData?.data?.responseData || []}
              filename="CategoryData.xlsx"
              className="text-[14px] font-[600] text-[#343a40] border px-4 py-2 rounded"
            />
          </div>
        }
      />
    </div>
  );
};

export default List;
