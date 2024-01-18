import React from "react";
import { DataTableDemo } from "../Common/DataTable";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import { AiOutlineEdit } from "react-icons/ai";
import { MdDeleteOutline } from "react-icons/md";
import { Clarity } from "@/lib/types";
import { RiArrowUpDownFill } from "react-icons/ri";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createClarity,
  deleteClarity,
  getClarity,
  updateClarity,
} from "@/services/clarityService";
import Modal from "../Common/Model";
import InputWithLabel from "../Common/InputWithLabel";
import { FormProvider, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "../ui/use-toast";
import Loading from "../Common/Loading";
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

interface data {
  name: string;
}

const schema = yup.object({
  name: yup.string().required(),
});

const initialValues: data = {
  name: "",
};

const Index = () => {
  const [open, setOpen] = React.useState<boolean>(false);
  const [isopen, setIsOpen] = React.useState<boolean>(false);
  const [activePage, setActivePage] = React.useState<number>(1);
  const [edit, setEdit] = React.useState<string>("");
  const [openDelete, setOpenDelete] = React.useState(false);
  const [deleteID, setDeleteID] = React.useState("");
  const methods = useForm({
    resolver: yupResolver(schema),
    defaultValues: initialValues,
    mode: "all",
  });

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = methods;

  const navigate = useNavigate();
  const { data: clarityData, isPending } = useQuery({
    queryKey: ["GET_CLARITY", { activePage }],
    queryFn: () => getClarity({ page: activePage, pageSize: 10 }),
  });

  const queryClient = useQueryClient();

  const { mutate: addClarity } = useMutation({
    mutationFn: createClarity,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["GET_CLARITY"] });
      setIsOpen(false);
      toast({
        variant: "success",
        title: "Clarity created successfully",
      });
      setOpen(false);
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

  const { mutate: removeClarity } = useMutation({
    mutationFn: deleteClarity,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["GET_CLARITY"] });
      toast({
        variant: "success",
        title: "Clarity deleted successfully",
      });
      setIsOpen(false);
      setOpenDelete(false);
    },
    onError: (error) => {
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

  const { mutate: editClarity } = useMutation({
    mutationFn: updateClarity,
    onSuccess: () => {
      setIsOpen(false);
      queryClient.invalidateQueries({ queryKey: ["GET_CLARITY"] });
      setOpen(false);
      setEdit("");
      toast({
        variant: "success",
        title: "Clarity edit successfully",
      });
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

  const handleEdit = (id: string) => {
    const allData: Clarity[] = clarityData?.data?.Claritydata;
    const data = allData?.find((item: Clarity) => item?.id === id);
    setEdit(id);
    setValue("name", data?.name || "");
    setOpen(true);
  };

  const handleDelete = (id: string) => {
    setOpenDelete(true);
    setDeleteID(id);
  };

  const handleDeleteClarity = () => {
    removeClarity(deleteID);
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
  //         onClick={handleDeleteClarity}
  //       >
  //         Delete
  //       </Button>
  //     </div>
  //   </div>
  // );
  const columns: Column<Clarity>[] = [
    {
      accessorKey: "name",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            className="p-0"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Clarity
            <RiArrowUpDownFill className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => <div className="">{row?.original.name}</div>,
    },
    {
      accessorKey: "Action",
      header: () => <div className="text-left">Action</div>,
      cell: ({ row }) => {
        return (
          <div className="flex gap-2">
            <Button
              type="button"
              onClick={() => handleEdit(row?.original?.id)}
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
    reset();
  };

  const onSubmit = (data: data) => {
    // setOpen(false);
    const { name } = data;
    if (edit) {
      editClarity({ name, clarityid: edit });
    } else {
      addClarity({ name: name });
    }
    setIsOpen(true);
  };

  const body = (
    <div>
      {isPending && <Loading />}
      {isopen && <Loading />}
      <h2 className="text-[22px] font-[700] text-[#343a40] font-Nunito mb-4">
        {edit ? "Edit" : "Add"} Clarity
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
              label="Clarity"
              placeholder="Clarity"
              error={errors?.name?.message}
              {...register("name")}
              className="border border-[#ced4da] rounded-[4px] placeholder:opacity-[0.6] mt-1"
            />
          </div>
          <div className="flex justify-end gap-4 mt-5">
            <Button
              variant={"outline"}
              type="button"
              className="w-full bg-[#343a40] text-white"
              onClick={() => handleClose()}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant={"outline"}
              className="w-full bg-[#343a40] text-white"
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
        data={clarityData?.data?.Claritydata || []}
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
        pageCount={clarityData?.data?.total}
      />
      <Modal
        open={open}
        onClose={() => {
          setOpen(false), setEdit(""), reset();
        }}
        children={body}
        className="!p-[20px]"
      />
      <DeleteModal
        openDelete={openDelete}
        setOpenDelete={setOpenDelete}
        isopen={isopen}
        handleDelete={handleDeleteClarity}
      />
    </div>
  );
};

export default Index;
