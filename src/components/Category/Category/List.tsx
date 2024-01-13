import React, { useState } from "react";
import { DataTableDemo } from "@/components/Common/DataTable";
import { ExportExcelButton } from "@/components/Common/ExportButton";
import { Button } from "@/components/ui/button";
import {
  deleteSubCategory,
  getSubCategory,
} from "@/services/subcategoryService";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AiOutlineEdit } from "react-icons/ai";
import { MdDeleteOutline } from "react-icons/md";
import { RiArrowUpDownFill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import Loading from "@/components/Common/Loading";
import Modal from "@/components/Common/Model";
import { DialogBoxSubCategory } from "./DialogBoxSubCategory";

interface Customer {
  id: number;
  name: string;
  parentCategory: string;
  metatitle: string;
  metakeyword: string;
  description: string;
  status: string;
}

interface Column<T> {
  accessorKey: keyof T | ((row: T) => any) | string;
  header: React.ReactNode | ((args: { column: any }) => React.ReactNode);
  cell: (args: { row: any }) => React.ReactNode;
  enableSorting?: boolean;
}

const List = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const queryClient = useQueryClient();

  const [openDelete, setOpenDelete] = useState(false);
  const [deleteID, setDeleteID] = useState("");
  const [activePage, setActivePage] = useState(1);
  const { data: subcategoryData, isLoading } = useQuery({
    queryKey: ["GET_SUBCATEGORY", { activePage }],
    queryFn: () => getSubCategory({ page: activePage, pageSize: 10 }),
  });

  const { mutate: removeCategory } = useMutation({
    mutationFn: deleteSubCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["GET_SUBCATEGORY"] });
    },
    onError: () => {
      toast({ description: "Not deleted" });
    },
  });

  const handleDelete = (id: string) => {
    setOpenDelete(true);
    setDeleteID(id);
  };

  const handleDeleteCategory = () => {
    removeCategory(deleteID);
    setOpenDelete(false);
  };

  const columns: Column<Customer>[] = [
    {
      accessorKey: "image",
      header: <div className="text-left">Image</div>,
      cell: ({ row }) => {
        return (
          <img
            src={row?.original?.image}
            className="w-[40px] h-[40px] object-cover rounded"
          />
        );
      },
    },
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
              <DialogBoxSubCategory
                icon={<AiOutlineEdit className="text-[#fff] text-[16px]" />}
                mainTitle="Edit Category"
                item={row?.original}
              />
            </button>
            <button
              type="button"
              className="text-[14px] font-[600] bg-red-200 text-[#fff] p-1 rounded w-[26px] h-[26px] flex items-center justify-center"
              key={row.original.id}
              onClick={handleDelete.bind(null, row.original.id)}
            >
              <MdDeleteOutline className="text-[#dc3545] text-[18px]" />
            </button>
          </div>
        );
      },
    },
  ];

  const body = (
    <div>
      {isLoading && <Loading />}
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
          onClick={handleDeleteCategory}
        >
          Delete
        </Button>
      </div>
    </div>
  );

  return (
    <div className="custom_contener !p-[17.5px] !mb-[28px] customShadow">
      <DataTableDemo
        data={subcategoryData?.data?.responseData || []}
        columns={columns}
        filterName={"name"}
        setActivePage={setActivePage}
        pageCount={subcategoryData?.data?.total}
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
            <Modal
              open={openDelete}
              onClose={() => setOpenDelete(false)}
              children={body}
              className="!p-[20px]"
            />
          </div>
        }
      />
    </div>
  );
};

export default List;
