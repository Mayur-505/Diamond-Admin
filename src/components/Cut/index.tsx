import React from "react";
import { DataTableDemo } from "../Common/DataTable";
import { Button } from "../ui/button";
import { AiOutlineEdit } from "react-icons/ai";
import { MdDeleteOutline } from "react-icons/md";
import { Cut } from "@/lib/types";
import { RiArrowUpDownFill } from "react-icons/ri";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Modal from "../Common/Model";
import InputWithLabel from "../Common/InputWithLabel";
import { FormProvider, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "../ui/use-toast";
import {
  createCut,
  deleteCut,
  getCut,
  updateCut,
} from "@/services/cutServices";
import Loading from "../Common/Loading";
import { useNavigate } from "react-router-dom";
import { createPortal } from "react-dom";

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
  const navigate = useNavigate();
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

  const { data: cutData, isPending } = useQuery({
    queryKey: ["GET_CUT", { activePage }],
    queryFn: () => getCut({ page: activePage, pageSize: 10 }),
  });

  const queryClient = useQueryClient();

  const { mutate: addCut } = useMutation({
    mutationFn: createCut,
    onSuccess: () => {
      setIsOpen(false);
      queryClient.invalidateQueries({ queryKey: ["GET_CUT"] });
      toast({
        variant: "success",
        title: "Cut created successfully",
      });
      setOpen(false);
      reset();
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

  const { mutate: removeCut } = useMutation({
    mutationFn: deleteCut,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["GET_CUT"] });
      toast({
        variant: "success",
        title: "Cut deleted successfully",
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

  const { mutate: editCut } = useMutation({
    mutationFn: updateCut,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["GET_CUT"] });
      setOpen(false);
      setIsOpen(false);
      toast({
        variant: "success",
        title: "Cut edit successfully",
      });
      setEdit("");
      reset();
    },
    onError: (error) => {
      console.log(error);
      if ((error as CustomError)?.code === 401) {
        navigate("/auth/login");
      }
      toast({
        variant: "error",
        title: (error as { data?: { message?: string } })?.data?.message || "",
      });
      setIsOpen(false);
    },
  });

  const handleEdit = (id: string) => {
    const allData: Cut[] = cutData?.data?.Cutdata;
    const data = allData?.find((item: Cut) => item.id === id);

    setEdit(id);
    setValue("name", data?.name || "");
    setOpen(true);
  };

  const columns: Column<Cut>[] = [
    {
      accessorKey: "name",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            className="p-0"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Cut
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
    setEdit("");
    reset();
  };

  const onSubmit = (data: data) => {
    const { name } = data;
    if (edit) {
      const payload = {
        name,
        cutid: edit,
      };
      editCut({ data: payload });
    } else {
      addCut(data);
    }
    setIsOpen(true);
  };

  const handleDelete = (id: string) => {
    setOpenDelete(true);
    setDeleteID(id);
  };

  const handleDeleteCut = () => {
    removeCut(deleteID);
    setIsOpen(true);
  };

  const Deletebody = (
    <div>
      {createPortal(<>{isopen && <Loading />}</>, document.body)}
      {createPortal(<>{isPending && <Loading />}</>, document.body)}
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
          onClick={handleDeleteCut}
        >
          Delete
        </Button>
      </div>
    </div>
  );

  const body = (
    <div>
      {createPortal(<>{isPending && <Loading />}</>, document.body)}
      {createPortal(<>{isopen && <Loading />}</>, document.body)}
      <h2 className="text-[22px] font-[700] text-[#343a40] font-Nunito mb-4">
        {edit ? "Edit" : "Add"} Cut
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
              label="Cut"
              placeholder="Cut"
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
      {createPortal(<>{isopen && <Loading />}</>, document.body)}
      {createPortal(<>{isPending && <Loading />}</>, document.body)}
      <DataTableDemo
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        data={cutData?.data?.Cutdata || []}
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
        pageCount={cutData?.data?.total}
      />
      <Modal
        open={open}
        onClose={() => {
          setOpen(false), setEdit(""), reset();
        }}
        children={body}
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

export default Index;
