import React, { useState } from "react";
import { DataTableDemo } from "@/components/Common/DataTable";
import { ExportExcelButton } from "@/components/Common/ExportButton";
import { Button } from "@/components/ui/button";
import {
  deleteInnerCategory,
  getInnerCategory,
} from "@/services/innercateGoryService";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AiOutlineEdit } from "react-icons/ai";
import { MdDeleteOutline } from "react-icons/md";
import { RiArrowUpDownFill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import Loading from "@/components/Common/Loading";
import Modal from "@/components/Common/Model";
import { DialogBoxInnerCategory } from "./DialogBoxInnerCategory";
import { getSubCategoryall } from "@/services/subcategoryService";
import DeleteModal from "@/components/Common/DeleteModal";

interface CustomError {
  code?: number;
}
interface Customer {
  id: number;
  name: string;
  subCategory: string;
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

const InnerCategoryList = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const [openDelete, setOpenDelete] = useState(false);
  const [deleteID, setDeleteID] = useState("");

  const [activePage, setActivePage] = useState(1);
  const { data: InnercategoryData, isLoading } = useQuery({
    queryKey: ["GET_INNERCATEGORY", { activePage }],
    queryFn: () => getInnerCategory({ page: activePage, pageSize: 10 }),
  });

  const { data: SubcategoryData } = useQuery({
    queryKey: ["GET_INNERCATEGORY"],
    queryFn: getSubCategoryall,
  });

  const { mutate: removeCategory, isPending } = useMutation({
    mutationFn: deleteInnerCategory,
    onSuccess: () => {
      setOpenDelete(false);
      queryClient.invalidateQueries({ queryKey: ["GET_INNERCATEGORY"] });
      setOpenDelete(false);
    },
    onError: (error) => {
      toast({
        variant: "error",
        title: (error as { data?: { message?: string } })?.data?.message || "",
      });
      if ((error as CustomError)?.code === 401) {
        navigate("/auth/login");
      }
      setOpenDelete(false);
    },
  });

  const handleDelete = (id: string) => {
    setOpenDelete(true);
    setDeleteID(id);
  };

  const handleDeleteCategory = () => {
    removeCategory(deleteID);
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
      cell: ({ row }) => <div className="">{row?.original.name}</div>,
    },
    {
      accessorKey: "subCategory",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            className="p-0"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Sub Category
            <RiArrowUpDownFill className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => {
        const data = SubcategoryData?.data?.responseData?.find(
          (item: any) => item?.id == row?.original?.subCategory
        );
        return <div className="">{data?.name}</div>;
      },
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
            <Button
              type="button"
              className="text-[14px] font-[600] bg-[#343a40] text-[#fff] p-1 rounded w-[26px] h-[26px] flex items-center justify-center"
            >
              <DialogBoxInnerCategory
                icon={<AiOutlineEdit className="text-[#fff] text-[16px]" />}
                mainTitle="Edit Inner Category"
                item={row?.original}
              />
            </Button>
            <Button
              type="button"
              className="text-[14px] font-[600] bg-red-200 text-[#fff] p-1 rounded w-[26px] h-[26px] flex items-center justify-center"
              key={row.original.id}
              onClick={handleDelete.bind(null, row.original.id)}
            >
              <MdDeleteOutline className="text-[#dc3545] text-[18px]" />
            </Button>
          </div>
        );
      },
    },
  ];
  // const body = (
  //   <div>
  //     {isLoading && <Loading />}
  //     {isPending && <Loading />}
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
  //         onClick={handleDeleteCategory}
  //       >
  //         Delete
  //       </Button>
  //     </div>
  //   </div>
  // );
  return (
    <div className="custom_contener !p-[17.5px] !mb-[28px] customShadow">
      {isLoading && <Loading />}
      <DataTableDemo
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        data={InnercategoryData?.data?.responseData || []}
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        columns={columns}
        filterName={"name"}
        setActivePage={setActivePage}
        pageCount={InnercategoryData?.data?.total}
        customButton={
          <div className="flex justify-end gap-4">
            <Button
              variant={"outline"}
              onClick={() =>
                navigate("/category/inner-category/add_inner_category")
              }
              className="w-full bg-[#343a40] text-white"
            >
              Add
            </Button>
            <ExportExcelButton
              data={InnercategoryData?.data?.responseData || []}
              filename="CategoryData.xlsx"
              className="text-[14px] font-[600] text-[#fff] border px-4 py-2 rounded"
            />
            <DeleteModal
              openDelete={openDelete}
              setOpenDelete={setOpenDelete}
              isopen={isPending}
              handleDelete={handleDeleteCategory}
            />
          </div>
        }
      />
    </div>
  );
};

export default InnerCategoryList;
