import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createProduct,
  deleteProduct,
  getProduct,
  getSingleProduct,
  updateProduct,
} from "@/services/productService";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { DataTableDemo } from "../Common/DataTable";
import { Button } from "../ui/button";
import InputWithLabel from "../Common/InputWithLabel";
import { FieldValues, FormProvider, useForm } from "react-hook-form";
import Modal from "../Common/Model";
import Loading from "../Common/Loading";
import { MdDeleteOutline } from "react-icons/md";
import { AiOutlineEdit } from "react-icons/ai";
import { RiArrowUpDownFill } from "react-icons/ri";
import { yupResolver } from "@hookform/resolvers/yup";
import { ErrorType, Products } from "@/lib/types";
import * as yup from "yup";
import { EyeIcon } from "lucide-react";

interface Column<T> {
  accessorKey: keyof T | ((row: T) => any) | string;
  header: React.ReactNode | ((args: { column: any }) => React.ReactNode);
  cell: (args: { row: any }) => React.ReactNode;
  enableSorting?: boolean;
}

interface data {
  maintitle: string;
  title: string;
  price: string;
  disccount_price: string;
  shape: string;
  carat: string;
  colour: string;
  clarity: string;
  polish: string;
  symmetry: string;
  flourescence: string;
  cert_number: string;
  table: string;
  crown_height: string;
  pavilian_depth: string;
  depth: string;
  size_desc: string;
  color_desc: string;
  clarity_desc: string;
  cut_desc: string;
  productId: string;
  sizeproductimage: string;
  productimage: File[];
}

const schema = yup.object({
  maintitle: yup.string().required(),
  title: yup.string().required(),
  price: yup.string().required(),
});

const ProductList = () => {
  const navigate = useNavigate();
  const [filter, setFilter] = useState({
    maintitle: "",
    title: "",
    price: "",
    disccount_price: "",
    shape: "",
    carat: "",
    colour: "",
    clarity: "",
    polish: "",
    symmetry: "",
    flourescence: "",
    cert_number: "",
    table: "",
    crown_height: "",
    pavilian_depth: "",
    depth: "",
    size_desc: "",
    color_desc: "",
    clarity_desc: "",
    cut_desc: "",
    productId: "",
    sizeproductimage: "",
    productimage: [],
  });
  const [open, setOpen] = useState<boolean>(false);
  const [activePage, setActivePage] = useState<number>(1);
  const [isEdit, setIsEdit] = useState<string>("");
  const [isView, setIsView] = useState<string>("");
  const [singleProductData, setSingleProductData] = useState(null);
  const [openview, setOpenView] = useState<boolean>(false);
  const queryClient = useQueryClient();
  const [selectedImage, setSelectedImage] = useState<string>();
  console.log("singleProductData", singleProductData);

  const methods = useForm({
    resolver: yupResolver(schema),
    defaultValues: filter,
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setValue,
    watch,
    getValues,
  } = methods;

  const { data } = useQuery({
    queryKey: ["GET_PRODUCT", { activePage }],
    queryFn: () => getProduct({ page: activePage, pageSize: 10 }),
  });

  useEffect(() => {
    if (singleProductData?.productimage?.length) {
      setSelectedImage(singleProductData?.productimage[0]);
    }
  }, [singleProductData]);

  useEffect(() => {
    if (data && isEdit) {
      const findData: Products = data?.product?.find(
        (item: Products) => item.id === isEdit
      );
      setValue("maintitle", findData?.maintitle || "");
      setValue("title", findData?.title || "");
      setValue("price", findData?.price || "");
      setValue("disccount_price", findData?.disccount_price || "");
      setValue("shape", findData?.shape || "");
      setValue("carat", findData?.carat || "");
      setValue("colour", findData?.colour || "");
      setValue("clarity", findData?.clarity || "");
      setValue("cut", findData?.cut || "");
      setValue("polish", findData?.polish || "");
      setValue("symmetry", findData?.symmetry || "");
      setValue("flourescence", findData?.flourescence || "");
      setValue("measurements", findData?.measurements || "");
      setValue("cert_number", findData?.cert_number || "");
      setValue("table", findData?.table || "");
      setValue("crown_height", findData?.crown_height || "");
      setValue("pavilian_depth", findData?.pavilian_depth || "");
      setValue("depth", findData?.depth || "");
      setValue("crown_angle", findData?.crown_angle || "");
      setValue("pavilian_angle", findData?.pavilian_angle || "");
      setValue("status", findData?.status || "");
      setValue("size", findData?.size || "");
      setValue("size_desc", findData?.size_desc || "");
      setValue("color_desc", findData?.color_desc || "");
      setValue("clarity_desc", findData?.clarity_desc || "");
      setValue("cut_desc", findData?.cut_desc || "");
      setValue("subcategoryid", findData?.subcategoryid || "");
      setValue("innercategoryid", findData?.innercategoryid || "");
      setValue("categoryid", findData?.categoryid || "");
      setValue("productId", findData?.productId || "");
      setValue("sizeimages", findData?.sizeimages || "");
      setValue("colorimage", findData?.colorimage || "");
      setValue("clarityimage", findData?.clarityimage || "");
      setValue("cutimage", findData?.cutimage || "");
      setValue("productimage", findData?.productimage || []);
    } else {
      setValue("maintitle", "");
      setValue("title", "");
      setValue("price", "");
      setValue("disccount_price", "");
      setValue("shape", "");
      setValue("carat", "");
      setValue("colour", "");
      setValue("clarity", "");
      setValue("cut", "");
      setValue("polish", "");
      setValue("symmetry", "");
      setValue("flourescence", "");
      setValue("measurements", "");
      setValue("cert_number", "");
      setValue("table", "");
      setValue("crown_height", "");
      setValue("pavilian_depth", "");
      setValue("depth", "");
      setValue("crown_angle", "");
      setValue("pavilian_angle", "");
      setValue("status", "");
      setValue("size", "");
      setValue("size_desc", "");
      setValue("color_desc", "");
      setValue("clarity_desc", "");
      setValue("cut_desc", "");
      setValue("subcategoryid", "");
      setValue("innercategoryid", "");
      setValue("categoryid", "");
      setValue("productId", "");
      setValue("sizeimages", "");
      setValue("colorimage", "");
      setValue("clarityimage", "");
      setValue("cutimage", "");
      setValue("productimage", []);
    }
  }, [data, isEdit]);

  const { mutate: addProduct, isPending } = useMutation({
    mutationFn: createProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["GET_PRODUCT"] });
      setOpen(false);
      reset();
    },
    onError: (error: ErrorType) => {
      console.log(error);
    },
  });

  const { mutate: ViewProduct } = useMutation({
    mutationFn: getSingleProduct,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["GET_PRODUCT"] });
      setOpenView(true);
      setSingleProductData(data.data);
    },
    onError: (error: ErrorType) => {
      console.log(error);
    },
  });

  const { mutate: removeProduct } = useMutation({
    mutationFn: deleteProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["GET_PRODUCT"] });
    },
    onError: (error: ErrorType) => {
      console.log(error);
    },
  });

  const { mutate: editProduct } = useMutation({
    mutationFn: updateProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["GET_PRODUCT"] });
      setOpen(false);
      reset();
    },
    onError: (error: ErrorType) => {
      console.log(error);
    },
  });

  const columns: Column<Products>[] = [
    {
      accessorKey: "productimage",
      header: <div className="text-left">Image</div>,
      cell: ({ row }) => {
        return (
          <img
            src={row?.original?.productimage}
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
      cell: ({ row }) => (
        <div className="capitalize">{row?.original.maintitle}</div>
      ),
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
            price
            <RiArrowUpDownFill className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className="capitalize">{row?.original.price}</div>
      ),
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
      cell: ({ row }) => (
        <div className="capitalize">{row?.original.shape}</div>
      ),
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
        <div className="capitalize">{row?.original?.categoryid?.name}</div>
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
        <div className="capitalize">{row?.original?.innercategoryid?.name}</div>
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
        <div className="capitalize">{row?.original?.subcategoryid?.name}</div>
      ),
    },
    {
      accessorKey: "Action",
      header: () => <div className="text-left">Action</div>,
      cell: ({ row }) => {
        return (
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => {
                ViewProduct(row?.original?.id);
                setOpenView(true);
              }}
              className="text-[14px] font-[600] bg-[#343a40] text-[#fff] p-1 rounded w-[26px] h-[26px] flex items-center justify-center"
            >
              <EyeIcon className="text-[#fff] text-[16px]" />
            </button>
            <button
              type="button"
              onClick={() => {
                setIsEdit(row?.original?.id);
                setOpen(true);
              }}
              className="text-[14px] font-[600] bg-[#343a40] text-[#fff] p-1 rounded w-[26px] h-[26px] flex items-center justify-center"
            >
              <AiOutlineEdit className="text-[#fff] text-[16px]" />
            </button>
            <button
              type="button"
              onClick={() => removeProduct(row?.original?.id)}
              className="text-[14px] font-[600] bg-red-200 text-[#fff] p-1 rounded w-[26px] h-[26px] flex items-center justify-center"
            >
              <MdDeleteOutline className="text-[#dc3545] text-[18px]" />
            </button>
          </div>
        );
      },
    },
  ];

  const handleClose = () => {
    setOpen(false);
    setOpenView(false);
  };

  const onSubmit = (data: FieldValues) => {
    // setOpen(false);
    const payload = new FormData();
    payload.append("maintitle", data.maintitle);
    payload.append("title", data.title);
    payload.append("price", data.price);
    payload.append("disccount_price", data.disccount_price);
    payload.append("shape", data.shape);
    payload.append("carat", data.carat);
    payload.append("colour", data.colour);
    payload.append("clarity", data.clarity);
    payload.append("cut", data.cut);
    payload.append("polish", data.polish);
    payload.append("symmetry", data.symmetry);
    payload.append("flourescence", data.flourescence);
    payload.append("measurements", data.measurements);
    payload.append("cert_number", data.cert_number);
    payload.append("table", data.table);
    payload.append("crown_height", data.crown_height);
    payload.append("pavilian_depth", data.pavilian_depth);
    payload.append("depth", data.depth);
    payload.append("crown_angle", data.crown_angle);
    payload.append("pavilian_angle", data.pavilian_angle);
    payload.append("status", data.status);
    payload.append("size", data.size);
    payload.append("size_desc", data.size_desc);
    payload.append("color_desc", data.color_desc);
    payload.append("clarity_desc", data.clarity_desc);
    payload.append("cut_desc", data.cut_desc);
    payload.append("productId", data.productId);
    payload.append("sizeimages", data.sizeimages);
    payload.append("colorimage", data.colorimage);
    payload.append("clarityimage", data.clarityimage);
    payload.append("cutimage", data.cutimage);
    if (data.productimage && data.productimage.length > 0) {
      data.productimage.forEach((image, index) => {
        payload.append(`productimage[${index}]`, image);
      });
    }
    if (data?.productimage && data?.productimage?.length > 0) {
      for (let i = 0; i < data.productimage.length; i++) {
        payload.append(`productimage[${i}]`, data.productimage[i]);
      }
    }
    if (isEdit) {
      editProduct({ data: payload });
    } else {
      addProduct(payload);
    }
  };

  const body = (
    <div>
      {isPending && <Loading />}
      <h2 className="text-[22px] font-[700] text-[#343a40] font-Nunito mb-4">
        {isEdit ? "Edit" : "Add"} Product
      </h2>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mt-1">
            <InputWithLabel
              type="text"
              name="maintitle"
              id="maintitle"
              label="Main Title"
              placeholder="Main Title"
              error={errors?.maintitle?.message}
              {...register("maintitle")}
              className="border border-[#ced4da] rounded-[4px] placeholder:opacity-[0.6] mt-1"
            />
          </div>
          <div className="mt-1">
            <InputWithLabel
              type="text"
              name="title"
              id="title"
              label="Title"
              placeholder="Title"
              error={errors?.title?.message}
              {...register("title")}
              className="border border-[#ced4da] rounded-[4px] placeholder:opacity-[0.6] mt-1"
            />
          </div>
          <div className="mt-1">
            <InputWithLabel
              type="text"
              name="price"
              id="price"
              label="Price"
              placeholder="Price"
              error={errors?.price?.message}
              {...register("price")}
              className="border border-[#ced4da] rounded-[4px] placeholder:opacity-[0.6] mt-1"
            />
          </div>
          <div className="mt-1">
            <InputWithLabel
              type="text"
              name="disccount_price"
              id="disccount_price"
              label="Discount Price"
              placeholder="Discount Price"
              error={errors?.disccount_price?.message}
              {...register("disccount_price")}
              className="border border-[#ced4da] rounded-[4px] placeholder:opacity-[0.6] mt-1"
            />
          </div>
          <div className="mt-1">
            <InputWithLabel
              type="text"
              name="shape"
              id="shape"
              label="Shape"
              placeholder="Shape"
              error={errors?.shape?.message}
              {...register("shape")}
              className="border border-[#ced4da] rounded-[4px] placeholder:opacity-[0.6] mt-1"
            />
          </div>
          <div className="mt-1">
            <InputWithLabel
              type="file"
              name="productimage"
              id="productimage"
              label="Images"
              placeholder="Images"
              error={errors?.productimage?.message}
              {...register("productimage", { required: !isEdit })}
              className="border border-[#ced4da] rounded-[4px] placeholder:opacity-[0.6] mt-1"
              multiple
            />
            {}
          </div>
          <div className="flex justify-end gap-4 mt-5">
            <Button
              variant={"outline"}
              className="w-full text-[#343a40] border border-[#343a40] bg-[#fff]"
              onClick={() => handleClose()}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant={"outline"}
              className="w-full bg-[#343a40] border border-transparent hover:border-[#343a40] text-white"
            >
              Save
            </Button>
          </div>
        </form>
      </FormProvider>
    </div>
  );

  const handleThumbnailClick = (thumbnailImage: string) => {
    setSelectedImage(thumbnailImage);
  };

  const ProductViewBody = (
    <div>
      {isPending && <Loading />}
      <h2 className="text-[22px] font-[700] text-[#343a40] font-Nunito mb-4">
        {singleProductData?.maintitle}
      </h2>
      <div>
        <div className="lg:w-[100%] w-full">
          <div className="flex">
            <div className="w-[16.6667%] h-[100px] flex gap-x-[16px] justify-between flex-col ">
              {[
                singleProductData?.productimage,
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
                  onClick={() => handleThumbnailClick(thumbnail)}
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
          <strong>Price:</strong> {singleProductData?.price}
        </div>
        <div className="pb-4">
          <strong>Colour:</strong> {singleProductData?.colour}
        </div>
        <div className="pb-4">
          <strong>Shape:</strong> {singleProductData?.shape}
        </div>
        <div className="pb-4">
          <strong>Table:</strong> {singleProductData?.table}
        </div>
        <div className="pb-4">
          <strong>Carat:</strong> {singleProductData?.carat}
        </div>
        <div className="pb-4">
          <strong>Clarity:</strong> {singleProductData?.clarity}
        </div>
        <div className="pb-4">
          <strong>polish:</strong> {singleProductData?.polish}
        </div>
        <div className="pb-4">
          <strong>Symmetry:</strong> {singleProductData?.symmetry}
        </div>
        <div className="pb-4">
          <strong>Flourescence:</strong> {singleProductData?.flourescence}
        </div>
        {singleProductData?.categoryid?.name && (
          <div className="pb-4">
            <strong>Category:</strong> {singleProductData?.categoryid?.name}
          </div>
        )}
        {singleProductData?.innercategoryid?.name && (
          <div className="pb-4">
            <strong>Inner Category:</strong>{" "}
            {singleProductData?.innercategoryid?.name}
          </div>
        )}
        {singleProductData?.subcategoryid?.name && (
          <div className="pb-4">
            <strong>Subcategory:</strong>{" "}
            {singleProductData?.subcategoryid?.name}
          </div>
        )}
        <div className="pb-4">
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
        </div>
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
          open={open}
          onClose={() => setOpen(false)}
          children={body}
          className="!p-[20px]"
        />
        <Modal
          open={openview}
          onClose={() => setOpenView(false)}
          children={ProductViewBody}
          className="!p-[20px]"
        />
      </div>
    </div>
  );
};

export default ProductList;
