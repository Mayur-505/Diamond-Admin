import React, { useEffect } from "react";
import { AiOutlineEdit } from "react-icons/ai";
import { MdDeleteOutline } from "react-icons/md";
import { RiArrowUpDownFill } from "react-icons/ri";
import { Button } from "../ui/button";
import { Blog, ErrorType } from "@/lib/types";
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
import { UploadImage } from "@/services/adminService";
import { useNavigate } from "react-router-dom";

interface CustomError {
  code?: number;
}
interface Column<T> {
  accessorKey: keyof T | ((row: T) => any) | string;
  header: React.ReactNode | ((args: { column: any }) => React.ReactNode);
  cell: (args: { row: any }) => React.ReactNode;
  enableSorting?: boolean;
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

interface SingleBlogData {
  id: string;
  title: string;
  heading: string;
  description: string;
  image: string;
  author: {
    email: string;
  };
  total: number;
}

const BlogList = () => {
  const { user } = useAppSelector((state) => state.auth);
  const [open, setOpen] = React.useState<boolean>(false);
  const [isopen, setIsOpen] = React.useState<boolean>(false);
  const [openview, setOpenView] = React.useState<boolean>(false);
  const [singleBlogData, setSingleBlogData] =
    React.useState<SingleBlogData | null>(null);
  const [activePage, setActivePage] = React.useState<number>(1);
  const [isEdit, setIsEdit] = React.useState<string>("");
  const [imageUrl, setImageUrl] = React.useState<string>("");
  const [openDelete, setOpenDelete] = React.useState(false);
  const [deleteID, setDeleteID] = React.useState("");
  const queryClient = useQueryClient();
  const navigate = useNavigate();
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

  const { data, isPending } = useQuery({
    queryKey: ["GET_BLOG", { activePage }],
    queryFn: () => getBlog({ page: activePage, pageSize: 10 }),
  });

  useEffect(() => {
    if (data && isEdit) {
      const findData: Blog = data?.Blogdata?.find(
        (item: Blog) => item.id === isEdit
      );
      setValue("title", findData?.title);
      setValue("heading", findData?.heading);
      setValue("description", findData?.description);
      setValue("images", findData?.images);
    }
  }, [data, isEdit]);

  const { mutate: addBlog } = useMutation({
    mutationFn: createBlog,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["GET_BLOG"] });
      setOpen(false);
      setIsOpen(false);
      reset();
      setImageUrl("");
      toast({
        description: "create blog successfully",
      });
    },
    onError: (error) => {
      console.log(error);
      setIsOpen(false);
      if ((error as CustomError)?.code === 401) {
        navigate("/auth/login");
      }
      toast({
        variant: "error",
        title: (error as { data?: { message?: string } })?.data?.message || "",
      });
    },
  });

  const { mutate: removeBlog } = useMutation({
    mutationFn: deleteBlog,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["GET_BLOG"] });
      toast({
        description: "delete blog successfully",
      });
      setOpenDelete(false);
      setIsOpen(false);
    },
    onError: (error) => {
      console.log(error);
      setIsOpen(false);
      if ((error as CustomError)?.code === 401) {
        navigate("/auth/login");
      }
      toast({
        variant: "error",
        title: (error as { data?: { message?: string } })?.data?.message || "",
      });
    },
  });

  const { mutate: editBlog } = useMutation({
    mutationFn: updateBlog,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["GET_BLOG"] });
      setIsOpen(false);
      setOpen(false);
      setImageUrl("");
      reset();
      toast({
        description: "update blog successfully",
      });
    },
    onError: (error) => {
      console.log(error);
      setIsOpen(false);
      if ((error as CustomError)?.code === 401) {
        navigate("/auth/login");
      }
      toast({
        variant: "error",
        title: (error as { data?: { message?: string } })?.data?.message || "",
      });
    },
  });

  const { mutate: UploadImagedata } = useMutation({
    mutationFn: UploadImage,
    onSuccess: (res) => {
      setImageUrl(res?.data?.data?.image);
      setIsOpen(false);
    },
    onError: (error) => {
      console.log(error);
      setIsOpen(false);
    },
  });

  const handlechangeImage = (e: any) => {
    const { files } = e.target;
    const payload = new FormData();
    payload.append("image", files[0]);
    setIsOpen(true);
    UploadImagedata(payload);
  };

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

  const columns: Column<Blog>[] = [
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
      accessorKey: "title",
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
      cell: ({ row }) => <div className="">{row?.original.title}</div>,
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
      cell: ({ row }) => <div className="">{row?.original.heading}</div>,
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
      cell: ({ row }) => <div className="">{row?.original.description}</div>,
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
                ViewBlog(row?.original?.id);
                setOpenView(true);
              }}
              className="text-[14px] font-[600] bg-[#343a40] text-[#fff] p-1 rounded w-[26px] h-[26px] flex items-center justify-center"
            >
              <EyeIcon className="text-[#fff] text-[16px]" />
            </Button>
            <Button
              type="button"
              onClick={() => {
                setIsEdit(row?.original?.id);
                setOpen(true);
                setImageUrl(row?.original?.image);
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
    setOpen(false);
    setImageUrl("");
  };

  const onSubmit = (data: FieldValues) => {
    // setOpen(false);
    const payload = new FormData();
    payload.append("title", data.title);
    payload.append("description", data.description);

    if (isEdit) {
      payload.append("image", imageUrl);
      payload.append("blogid", isEdit);
    } else {
      payload.append("image", data?.images?.[0] || "");
    }

    if (isEdit) {
      editBlog({ data: payload });
    } else {
      payload.append("heading", data.heading);
      payload.append("author", user?.qurey?.id);
      addBlog(payload);
    }
    setIsOpen(true);
    setIsEdit("");
  };

  const handleDelete = (id: string) => {
    setOpenDelete(true);
    setDeleteID(id);
  };

  const handleDeleteBlog = () => {
    removeBlog(deleteID);
    setIsOpen(true);
  };

  const body = (
    <div>
      {isPending && <Loading />}
      {isopen && <Loading />}
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
              image={imageUrl}
              error={errors?.images?.message}
              onInput={handlechangeImage}
              {...register("images")}
              className="border border-[#ced4da] rounded-[4px] placeholder:opacity-[0.6] mt-1"
            />
            {}
          </div>
          <div className="flex justify-end gap-4 mt-5">
            <Button
              variant={"outline"}
              type="button"
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

  const Deletebody = (
    <div>
      {isPending && <Loading />}
      {isopen && <Loading />}
      <div>Are you Sure you want to delete data?</div>
      <div className="flex justify-end gap-4 mt-5">
        <Button
          variant={"outline"}
          className="w-full text-[#343a40] border border-[#343a40] bg-[#fff]"
          onClick={() => {
            setOpenDelete(false), setIsEdit(""), setImageUrl("");
          }}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          variant={"outline"}
          className="w-full bg-[#343a40] border border-transparent hover:border-[#343a40] text-white"
          onClick={handleDeleteBlog}
        >
          Delete
        </Button>
      </div>
    </div>
  );

  const BlogViewBody = (
    <div>
      {isPending && <Loading />}
      {isopen && <Loading />}
      <h2 className="text-[22px] font-[700] text-[#343a40] font-Nunito mb-4">
        {singleBlogData?.heading}
      </h2>
      <div>
        <div className="lg:w-[100%] w-full">
          <div className="flex">
            <div className="w-full h-[250px] flex">
              <img
                src={singleBlogData?.image}
                alt="Selected Product"
                className="w-full rounded-[4px] border-[2px] border-transparent"
              />
            </div>
          </div>
        </div>
        <div className="bg-grey py-4">
          <div className="grid grid-cols-3 gap-4 border-b py-2">
            <strong>Title</strong>
            <div className="grid grid-cols-subgrid gap-4 col-span-2">
              {singleBlogData?.title}
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4 border-b py-2">
            <strong>Description</strong>
            <div className="grid grid-cols-subgrid gap-4 col-span-2">
              {singleBlogData?.description}
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4 border-b py-2">
            <strong>Author</strong>
            <div className="grid grid-cols-subgrid gap-4 col-span-2">
              {singleBlogData?.author?.email}
            </div>
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
      {isPending && <Loading />}
      {isopen && <Loading />}
      <DataTableDemo
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        data={data?.Blogdata || []}
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        columns={columns}
        filterName={"title"}
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
        onClose={() => {
          setOpen(false), setIsEdit(""), setImageUrl("");
        }}
        children={body}
        className="!p-[20px]"
      />
      <Modal
        open={openview}
        onClose={() => setOpenView(false)}
        children={BlogViewBody}
        className="!p-[20px]"
      />
      <Modal
        open={openDelete}
        onClose={() => setOpenDelete(false)}
        children={Deletebody}
        className="!p-[20px]"
      />
    </div>
  );
};

export default BlogList;
