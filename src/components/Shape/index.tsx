import React, { useEffect } from "react";
import { AiOutlineEdit } from "react-icons/ai";
import { MdDeleteOutline } from "react-icons/md";
import { RiArrowUpDownFill } from "react-icons/ri";
import { Button } from "../ui/button";
import { Shape } from "@/lib/types";
import {
  createShape,
  deleteShape,
  getShape,
  updateShape,
} from "@/services/shapeService";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { DataTableDemo } from "../Common/DataTable";
import { FieldValues, FormProvider, useForm } from "react-hook-form";
import InputWithLabel from "../Common/InputWithLabel";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Modal from "../Common/Model";
import Loading from "../Common/Loading";
import { UploadImage } from "@/services/adminService";
import { useNavigate } from "react-router-dom";
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

const schema = yup.object({
  name: yup.string().required(),
  description: yup.string().required(),
  images: yup
    .mixed()
    .test("fileSize", "The file is too large", (value: any) => {
      if (!value.length) return true; // attachment is optional
      return value[0].size <= 2000000;
    }),
});

const Index = () => {
  const [open, setOpen] = React.useState<boolean>(false);
  const [isopen, setIsOpen] = React.useState<boolean>(false);
  const [imageUrl, setImageUrl] = React.useState<string>("");
  const [activePage, setActivePage] = React.useState<number>(1);
  const [deleteID, setDeleteID] = React.useState("");
  const [openDelete, setOpenDelete] = React.useState(false);
  const [isEdit, setIsEdit] = React.useState<string>("");
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const methods = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      name: "",
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

  const { data: data, isPending } = useQuery({
    queryKey: ["GET_SHAPE", { activePage }],
    queryFn: () => getShape({ page: activePage, pageSize: 10 }),
  });

  useEffect(() => {
    if (data && isEdit) {
      const findData: Shape = data?.Shapedata?.find(
        (item: Shape) => item.id === isEdit
      );
      setValue("name", findData?.name);
      setValue("description", findData?.description);
      setValue("images", findData?.images);
    } else {
      setValue("name", "");
      setValue("description", "");
      setValue("images", []);
    }
  }, [data, isEdit]);

  const { mutate: addShape } = useMutation({
    mutationFn: createShape,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["GET_SHAPE"] });
      toast({
        variant: "success",
        title: "Shape Created successfully",
      });
      setIsOpen(false);
      setOpen(false);
      setIsEdit("");
      setImageUrl("");
      reset();
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

  const { mutate: removeShape } = useMutation({
    mutationFn: deleteShape,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["GET_SHAPE"] });
      toast({
        variant: "success",
        title: "Shape delete successfully",
      });
      setIsOpen(false);
      setOpenDelete(false);
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

  const { mutate: editShape } = useMutation({
    mutationFn: updateShape,
    onSuccess: () => {
      setIsOpen(false);
      queryClient.invalidateQueries({ queryKey: ["GET_SHAPE"] });
      toast({
        variant: "success",
        title: "Shape edit successfully",
      });
      setImageUrl("");
      setOpen(false);
      setIsEdit("");
      reset();
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
  const handleDelete = (id: string) => {
    setOpenDelete(true);
    setDeleteID(id);
  };

  const handleDeleteShape = () => {
    removeShape(deleteID);
    setIsOpen(true);
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
  //         onClick={handleDeleteShape}
  //       >
  //         Delete
  //       </Button>
  //     </div>
  //   </div>
  // );

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
      accessorKey: "name",
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
      cell: ({ row }) => <div className="">{row?.original.name}</div>,
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

  const onSubmit = (data: FieldValues) => {
    // setOpen(false);
    const payload = new FormData();
    payload.append("name", data.name);
    payload.append("description", data.description);
    if (isEdit) {
      payload.append("image", imageUrl);
      payload.append("shapeid", isEdit);
    } else {
      payload.append("image", data.images?.[0] || "");
    }

    if (isEdit) {
      editShape({ data: payload });
    } else {
      addShape(payload);
    }
    setIsOpen(true);
  };

  const handlechangeImage = (e: any) => {
    const { files } = e.target;
    const payload = new FormData();
    setIsOpen(true);
    payload.append("image", files[0]);
    UploadImagedata(payload);
  };

  const body = (
    <div>
      {isPending && <Loading />}
      {isopen && <Loading />}
      <h2 className="text-[22px] font-[700] text-[#343a40] font-Nunito mb-4">
        {isEdit ? "Edit" : "Add"} Shape
      </h2>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mt-1">
            <InputWithLabel
              type="text"
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-expect-error
              name="name"
              id="name"
              label="Shape"
              placeholder="shape"
              error={errors?.name?.message}
              {...register("name")}
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
              image={imageUrl}
              placeholder="Image"
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

  return (
    <div className="custom_contener !p-[17.5px] !mb-[28px] customShadow">
      {isPending && <Loading />}
      {isopen && <Loading />}
      <DataTableDemo
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        data={data?.Shapedata || []}
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
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
        onClose={() => {
          setOpen(false), setIsEdit(""), setImageUrl("");
        }}
        children={body}
        className="!p-[20px]"
      />
      <DeleteModal
        openDelete={openDelete}
        setOpenDelete={setOpenDelete}
        isopen={isopen}
        handleDelete={handleDeleteShape}
      />
    </div>
  );
};

export default Index;
