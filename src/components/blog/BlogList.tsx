import React, { useEffect } from "react";
import { AiOutlineEdit } from "react-icons/ai";
import { MdDeleteOutline } from "react-icons/md";
import { RiArrowUpDownFill } from "react-icons/ri";
import { Button } from "../ui/button";
import { ErrorType, Shape } from "@/lib/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { DataTableDemo } from "../Common/DataTable";
import { FieldValues, FormProvider, useForm } from "react-hook-form";
import InputWithLabel from "../Common/InputWithLabel";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Modal from "../Common/Model";
import Loading from "../Common/Loading";
import {
  createBlog,
  deleteBlog,
  getBlog,
  getSingleBlog,
  updateBlog,
} from "@/services/blogService";
import { useAppSelector } from "@/hooks/use-redux";
import { EyeIcon } from "lucide-react";
import { toast } from "../ui/use-toast";

interface Column<T> {
  accessorKey: keyof T | ((row: T) => any) | string;
  header: React.ReactNode | ((args: { column: any }) => React.ReactNode);
  cell: (args: { row: any }) => React.ReactNode;
  enableSorting?: boolean;
}

interface data {
  title: string;
  heading: string;
  description: string;
  images: File[];
}

const schema = yup.object({
  title: yup.string().required(),
  heading: yup.string().required(),
  description: yup.string().required(),
  images: yup
    .mixed()
    .test("fileSize", "The file is too large", (value: any) => {
      if (!value.length) return true; // attachment is optional
      return value[0].size <= 2000000;
    }),
});

const BlogList = () => {
  const { user } = useAppSelector((state) => state.auth);
  const [open, setOpen] = React.useState<boolean>(false);
  const [openview, setOpenView] = React.useState<boolean>(false);
  const [singleBlogData, setSingleBlogData] = React.useState(null);
  const [activePage, setActivePage] = React.useState<number>(1);
  const [isEdit, setIsEdit] = React.useState<string>("");
  const queryClient = useQueryClient();
  const methods = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      title: "",
      heading: "",
      description: "",
      images: [],
    },
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setValue,
  } = methods;

  const { data } = useQuery({
    queryKey: ["GET_BLOG", { activePage }],
    queryFn: () => getBlog({ page: activePage, pageSize: 10 }),
  });
  console.log("data?.Blogdata", data?.Blogdata);

  useEffect(() => {
    if (data && isEdit) {
      const findData: Shape = data?.Blogdata?.find(
        (item: Shape) => item.id === isEdit
      );
      setValue("title", findData?.title);
      setValue("heading", findData?.heading);
      setValue("description", findData?.description);
      setValue("images", findData?.images);
    } else {
      setValue("title", "");
      setValue("heading", "");
      setValue("description", "");
      setValue("images", []);
    }
  }, [data, isEdit]);

  const { mutate: addBlog, isPending } = useMutation({
    mutationFn: createBlog,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["GET_BLOG"] });
      setOpen(false);
      reset();
      toast({
        title: "create blog",
        description: "create blog successfully",
      });
    },
    onError: (error: ErrorType) => {
      console.log(error);
    },
  });

  const { mutate: removeBlog } = useMutation({
    mutationFn: deleteBlog,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["GET_BLOG"] });
      toast({
        title: "delete blog",
        description: "delete blog successfully",
      });
    },
    onError: (error: ErrorType) => {
      console.log(error);
    },
  });

  const { mutate: editBlog } = useMutation({
    mutationFn: updateBlog,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["GET_BLOG"] });
      setOpen(false);
      reset();
      toast({
        title: "update blog",
        description: "update blog successfully",
      });
    },
    onError: (error: ErrorType) => {
      console.log(error);
    },
  });

  const { mutate: ViewBlog } = useMutation({
    mutationFn: getSingleBlog,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["GET_BLOG"] });
      setOpenView(true);
      setSingleBlogData(data.data);
    },
    onError: (error: ErrorType) => {
      console.log(error);
    },
  });

  const columns: Column<Shape>[] = [
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
      accessorKey: "Blog",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            className="p-0"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Blog
            <RiArrowUpDownFill className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className="capitalize">{row?.original.title}</div>
      ),
    },
    {
      accessorKey: "Heading",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            className="p-0"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Heading
            <RiArrowUpDownFill className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className="capitalize">{row?.original.heading}</div>
      ),
    },
    {
      accessorKey: "description",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            className="p-0"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Description
            <RiArrowUpDownFill className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className="capitalize">{row?.original.description}</div>
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
                ViewBlog(row?.original?.id);
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
              onClick={() => removeBlog(row?.original?.id)}
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
  };

  const onSubmit = (data: FieldValues) => {
    // setOpen(false);
    const payload = new FormData();
    payload.append("title", data.title);
    payload.append("description", data.description);
    if (data?.images && data?.images?.length > 0) {
      payload.append("image", data.images[0]);
    }
    console.log("data?.images", data?.images);

    if (isEdit) {
      payload.append("blogid", isEdit);
    }

    if (isEdit) {
      editBlog({ data: payload });
    } else {
      payload.append("heading", data.heading);
      payload.append("author", user?.qurey?.id);
      addBlog(payload);
    }
  };

  const body = (
    <div>
      {isPending && <Loading />}
      <h2 className="text-[22px] font-[700] text-[#343a40] font-Nunito mb-4">
        {isEdit ? "Edit" : "Add"} Blog
      </h2>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mt-1">
            <InputWithLabel
              type="text"
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-expect-error
              name="title"
              id="title"
              label="Blog"
              placeholder="Blog Title"
              error={errors?.title?.message}
              {...register("title")}
              className="border border-[#ced4da] rounded-[4px] placeholder:opacity-[0.6] mt-1"
            />
          </div>
          <div className="mt-1">
            <InputWithLabel
              type="text"
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-expect-error
              name="heading"
              id="heading"
              label="Heading"
              placeholder="Heading"
              error={errors?.heading?.message}
              {...register("heading")}
              className="border border-[#ced4da] rounded-[4px] placeholder:opacity-[0.6] mt-1"
            />
          </div>
          <div className="mt-1">
            <InputWithLabel
              type="text"
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-expect-error
              name="description"
              id="description"
              label="Description"
              placeholder="Description"
              error={errors?.description?.message}
              {...register("description")}
              className="border border-[#ced4da] rounded-[4px] placeholder:opacity-[0.6] mt-1"
            />
          </div>
          <div className="mt-1">
            <InputWithLabel
              type="file"
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-expect-error
              name="images"
              id="images"
              label="Image"
              placeholder="Image"
              error={errors?.images?.message}
              {...register("images")}
              className="border border-[#ced4da] rounded-[4px] placeholder:opacity-[0.6] mt-1"
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
  const BlogViewBody = (
    <div>
      {isPending && <Loading />}
      <h2 className="text-[22px] font-[700] text-[#343a40] font-Nunito mb-4">
        {singleBlogData?.heading}
      </h2>
      <div>
        <div className="lg:w-[100%] w-full">
          <div className="flex">
            <div className="pl-4 w-full h-[250px] flex">
              <img
                src={singleBlogData?.image}
                alt="Selected Product"
                className="w-full rounded-[4px] border-[2px] border-transparent"
              />
            </div>
          </div>
        </div>
        <div className="py-4">
          <strong>Title:</strong> {singleBlogData?.title}
        </div>
        <div className="pb-4">
          <strong>Description:</strong> {singleBlogData?.description}
        </div>
        <div className="pb-4">
          <div className="pb-2">
            <strong>author:</strong>
          </div>
          <div className="pb-4">
            <strong>Firstname:</strong> {singleBlogData?.author?.firstname}
          </div>
          <div className="pb-4">
            <strong>Lastname:</strong> {singleBlogData?.author?.lastname}
          </div>
          <div className="pb-4">
            <strong>email:</strong> {singleBlogData?.author?.email}
          </div>
        </div>
      </div>
      <div className="flex justify-end gap-4 mt-5">
        <Button
          variant={"outline"}
          className="w-full text-[#343a40] border border-[#343a40] bg-[#fff]"
          onClick={() => setOpenView(false)}
        >
          Cancel
        </Button>
      </div>
    </div>
  );
  return (
    <div className="custom_contener !p-[17.5px] !mb-[28px] customShadow">
      <DataTableDemo
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        data={data?.Blogdata || []}
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        columns={columns}
        filterName={"name"}
        customButton={
          <div className="flex justify-end gap-4">
            <Button
              variant={"outline"}
              className="w-full bg-[#343a40] text-white"
              onClick={() => setOpen(true)}
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
        children={BlogViewBody}
        className="!p-[20px]"
      />
    </div>
  );
};

export default BlogList;
