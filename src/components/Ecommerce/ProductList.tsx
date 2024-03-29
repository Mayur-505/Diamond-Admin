import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  deleteProduct,
  getProduct,
  getSingleProduct,
} from "@/services/productService";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { DataTableDemo } from "../Common/DataTable";
import { Button } from "../ui/button";
import Modal from "../Common/Model";
import { MdDeleteOutline } from "react-icons/md";
import { AiOutlineEdit } from "react-icons/ai";
import { RiArrowUpDownFill } from "react-icons/ri";
import { ErrorType, Products } from "@/lib/types";
import { EyeIcon } from "lucide-react";
import Loading from "../Common/Loading";
import { toast } from "../ui/use-toast";
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

interface SingleBlogData {
  id: string;
  maintitle: string;
  productimage: string;
  diamond_clarity: {
    clarityimage: string;
    clarity_desc: string;
  };
  diamond_color: {
    colorimage: string;
    color_desc: string;
  };
  diamond_cut: {
    cutimage: string;
    cut_desc: string;
  };
  diamond_size: {
    sizeimages: string;
    size_desc: string;
  };
  price: number;
  total: string;
  colour: string;
  shape: string;
  carat: string;
  table: number;
  polish: string;
  clarity: string;
  symmetry: string;
  flourescence: string;
  categoryid: {
    name: string;
  };
  innercategoryid: {
    name: string;
  };
  subcategoryid: {
    name: string;
  };
}

const ProductList = () => {
  const navigate = useNavigate();
  const [activePage, setActivePage] = useState<number>(1);
  const [isopen, setIsOpen] = React.useState<boolean>(false);
  const [singleProductData, setSingleProductData] =
    React.useState<SingleBlogData | null>(null);
  const [openview, setOpenView] = useState<boolean>(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [deleteID, setDeleteID] = useState("");
  const queryClient = useQueryClient();
  const [selectedImage, setSelectedImage] = useState<string>();

  const { data, isLoading } = useQuery({
    queryKey: ["GET_PRODUCT", { activePage }],
    queryFn: () => getProduct({ page: activePage, pageSize: 10 }),
  });

  useEffect(() => {
    if (singleProductData?.productimage?.length) {
      setSelectedImage(singleProductData?.productimage[0]);
    }
  }, [singleProductData]);

  const { mutate: ViewProduct } = useMutation({
    mutationFn: getSingleProduct,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["GET_PRODUCT"] });
      setOpenView(true);
      setSingleProductData(data.data);
      setIsOpen(false);
    },
    onError: (error: ErrorType) => {
      console.log(error);
      setIsOpen(false);
    },
  });

  const { mutate: removeProduct } = useMutation({
    mutationFn: deleteProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["GET_PRODUCT"] });
      setIsOpen(false);
      setOpenDelete(false);
      toast({
        variant: "success",
        title: "Product deleted successfully.",
      });
    },
    onError: (error) => {
      console.log(error);
      if ((error as CustomError)?.code === 401) {
        navigate("/auth/login");
        setIsOpen(false);
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

  const handleDeleteProduct = () => {
    setIsOpen(true);
    removeProduct(deleteID);
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
  //         onClick={handleDeleteProduct}
  //       >
  //         Delete
  //       </Button>
  //     </div>
  //   </div>
  // );

  const columns: Column<Products>[] = [
    {
      accessorKey: "productimage",
      header: <div className="text-left">Image</div>,
      cell: ({ row }) => {
        return (
          <img
            src={row?.original?.productimage[0]}
            className="w-[40px] h-[40px] object-cover rounded"
          />
        );
      },
    },
    {
      accessorKey: "maintitle",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            className="p-0"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Product
            <RiArrowUpDownFill className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => <div className="">{row?.original.maintitle}</div>,
    },
    {
      accessorKey: "price",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            className="p-0"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Price
            <RiArrowUpDownFill className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => <div className="">{row?.original.price}</div>,
    },
    {
      accessorKey: "shape",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            className="p-0"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Shape
            <RiArrowUpDownFill className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => <div className="">{row?.original.shape}</div>,
    },
    {
      accessorKey: "category",
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
      cell: ({ row }) => (
        <div className="">{row?.original?.categoryid?.name}</div>
      ),
    },
    {
      accessorKey: "innercategory",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            className="p-0"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Innercategory
            <RiArrowUpDownFill className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className="">{row?.original?.innercategoryid?.name}</div>
      ),
    },
    {
      accessorKey: "subcategory",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            className="p-0"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Subcategory
            <RiArrowUpDownFill className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className="">{row?.original?.subcategoryid?.name}</div>
      ),
    },
    {
      accessorKey: "Action",
      header: () => <div className="text-left">Action</div>,
      cell: ({ row }) => {
        return (
          <div className="flex gap-2">
            <Button
              type="button"
              onClick={() => {
                ViewProduct(row?.original?.id);
                setOpenView(true);
                setIsOpen(true);
              }}
              className="text-[14px] font-[600] bg-[#343a40] text-[#fff] p-1 rounded w-[26px] h-[26px] flex items-center justify-center"
            >
              <EyeIcon className="text-[#fff] text-[16px]" />
            </Button>
            <Button
              type="button"
              onClick={() => {
                navigate(`/gems/edit-product/${row?.original?.id}`, {
                  state: { editdata: row.original },
                });
              }}
              className="text-[14px] font-[600] bg-[#343a40] text-[#fff] p-1 rounded w-[26px] h-[26px] flex items-center justify-center"
            >
              <AiOutlineEdit className="text-[#fff] text-[16px]" />
            </Button>
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

  const handleClose = () => {
    setOpenView(false);
  };

  const handleThumbnailClick = (thumbnailImage: string) => {
    setSelectedImage(thumbnailImage);
  };

  const ProductViewBody = (
    <div>
      {isLoading && <Loading />}
      <h2 className="text-[22px] font-[700] text-[#343a40] font-Nunito mb-4">
        {singleProductData?.maintitle}
      </h2>
      <div>
        <div className="lg:w-[100%] w-full">
          <div className="flex">
            <div className="w-[16.6667%] h-fit gap-[10px] flex gap-x-[16px] justify-between flex-col ">
              {[
                singleProductData?.diamond_clarity?.clarityimage,
                singleProductData?.diamond_color?.colorimage,
                singleProductData?.diamond_cut?.cutimage,
                singleProductData?.diamond_size?.sizeimages,
              ].map((thumbnail, index) => (
                <img
                  key={index}
                  src={thumbnail}
                  alt={`Product${index + 1}`}
                  className="cursor-pointer w-full rounded-[4px] border-[2px] border-transparent transition-all"
                  onClick={() => thumbnail && handleThumbnailClick(thumbnail)}
                />
              ))}
            </div>
            <div className="pl-3 w-[83.3333%] h-[250px] flex">
              <img
                src={selectedImage}
                alt="Selected Product"
                className="w-full rounded-[4px] border-[2px] border-transparent"
              />
            </div>
          </div>
        </div>
        <div className="py-4">
          <strong className="max-w-[150px] w-full inline-block">Price:</strong>{" "}
          {singleProductData?.price}
        </div>
        <div className="pb-4">
          <strong className="max-w-[150px] w-full inline-block">Colour:</strong>{" "}
          {singleProductData?.colour}
        </div>
        <div className="pb-4">
          <strong className="max-w-[150px] w-full inline-block">Shape:</strong>{" "}
          {singleProductData?.shape}
        </div>
        <div className="pb-4">
          <strong className="max-w-[150px] w-full inline-block">Table:</strong>{" "}
          {singleProductData?.table}
        </div>
        <div className="pb-4">
          <strong className="max-w-[150px] w-full inline-block">Carat:</strong>{" "}
          {singleProductData?.carat}
        </div>
        <div className="pb-4">
          <strong className="max-w-[150px] w-full inline-block">
            Clarity:
          </strong>{" "}
          {singleProductData?.clarity}
        </div>
        <div className="pb-4">
          <strong className="max-w-[150px] w-full inline-block">polish:</strong>{" "}
          {singleProductData?.polish}
        </div>
        <div className="pb-4">
          <strong className="max-w-[150px] w-full inline-block">
            Symmetry:
          </strong>{" "}
          {singleProductData?.symmetry}
        </div>
        <div className="pb-4">
          <strong className="max-w-[150px] w-full inline-block">
            Flourescence:
          </strong>{" "}
          {singleProductData?.flourescence}
        </div>
        {singleProductData?.categoryid?.name && (
          <div className="pb-4">
            <strong className="max-w-[150px] w-full inline-block">
              Category:
            </strong>{" "}
            {singleProductData?.categoryid?.name}
          </div>
        )}
        {singleProductData?.innercategoryid?.name && (
          <div className="pb-4">
            <strong className="max-w-[150px] w-full inline-block">
              Inner Category:
            </strong>{" "}
            {singleProductData?.innercategoryid?.name}
          </div>
        )}
        {singleProductData?.subcategoryid?.name && (
          <div className="pb-4">
            <strong className="max-w-[150px] w-full inline-block">
              Subcategory:
            </strong>{" "}
            {singleProductData?.subcategoryid?.name}
          </div>
        )}
        {/* <div className="pb-4">
          <div className="pb-2">
            <strong>Diamond Size:</strong>
          </div>
          <div className="flex items-center">
            <img
              src={singleProductData?.diamond_size?.sizeimages}
              alt=""
              className="rounded-[4px] h-[80px] min-w-[100px] me-4"
            />
            <div>{singleProductData?.diamond_size?.size_desc}</div>
          </div>
        </div>
        <div className="pb-4">
          <div className="pb-2">
            <strong>Diamond Color:</strong>
          </div>
          <div className="flex items-center">
            <img
              src={singleProductData?.diamond_color?.colorimage}
              alt=""
              className="rounded-[4px] h-[80px] min-w-[100px] me-4"
            />
            <div>{singleProductData?.diamond_color?.color_desc}</div>
          </div>
        </div>
        <div className="pb-4">
          <div className="pb-2">
            <strong>Diamond Clarity:</strong>
          </div>
          <div className="flex items-center">
            <img
              src={singleProductData?.diamond_clarity?.clarityimage}
              alt=""
              className="rounded-[4px] h-[80px] min-w-[100px] me-4"
            />
            <div>{singleProductData?.diamond_clarity?.clarity_desc}</div>
          </div>
        </div>
        <div className="pb-4">
          <div className="pb-2">
            <strong>Diamond Cut:</strong>
          </div>
          <div className="flex items-center">
            <img
              src={singleProductData?.diamond_cut?.cutimage}
              alt=""
              className="rounded-[4px] h-[80px] min-w-[100px] me-4"
            />
            <div>{singleProductData?.diamond_cut?.cut_desc}</div>
          </div>
        </div> */}
      </div>
      <div className="flex justify-end gap-4 mt-5">
        <Button
          variant={"outline"}
          className="w-full text-[#343a40] border border-[#343a40] bg-[#fff]"
          onClick={() => handleClose()}
        >
          Cancel
        </Button>
      </div>
    </div>
  );

  return (
    <div className="custom_contener !py-[28px] !px-[28px]">
      {isLoading && <Loading />}
      <div>
        <DataTableDemo
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          data={data?.product || []}
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          columns={columns}
          filterName={"maintitle"}
          customButton={
            <div className="flex justify-end gap-4">
              <Button
                variant={"outline"}
                className="w-full bg-[#343a40] text-white"
                onClick={() => navigate("/gems/new-product")}
              >
                Add
              </Button>
            </div>
          }
          setActivePage={setActivePage}
          pageCount={data?.total}
        />
        <Modal
          open={openview}
          onClose={() => setOpenView(false)}
          children={ProductViewBody}
          className="!p-[20px]"
        />
        <DeleteModal
          openDelete={openDelete}
          setOpenDelete={setOpenDelete}
          isopen={isopen}
          handleDelete={handleDeleteProduct}
        />
      </div>
    </div>
  );
};

export default ProductList;
