import { User } from "@/lib/types";
import { createCurrency, getCurrency, updateCurrency } from "@/services/currencyService";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { CiEdit } from "react-icons/ci";
import { RiArrowUpDownFill } from "react-icons/ri";
import * as yup from "yup";
import { DataTableDemo } from "../Common/DataTable";
import InputWithLabel from "../Common/InputWithLabel";
import Loading from "../Common/Loading";
import Modal from "../Common/Model";
import { Button } from "../ui/button";

interface Column<T> {
  accessorKey: keyof T | ((row: T) => any) | string;
  header: React.ReactNode | ((args: { column: any }) => React.ReactNode);
  cell: (args: { row: any }) => React.ReactNode;
  enableSorting?: boolean;
}

const schema = yup.object({
  name: yup.string().required("Field is required"),
  description: yup.string().notRequired(),
});

const Index: React.FC = () => {
  const [activePage, setActivePage] = useState(1);
  const [open, setOpen] = React.useState<boolean>(false);
  const [edit, setEdit] = React.useState<string>("");

  const queryClient = useQueryClient();

  const methods = useForm({
    resolver: yupResolver(schema),
    mode: "all",
  });

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = methods;

  const { data: CurrencyData, isLoading } = useQuery({
    queryKey: ["GET_CURRENCY"],
    queryFn: () => getCurrency({ page: activePage, pageSize: 10 }),
  });
  const columns: Column<User>[] = [
    {
      accessorKey: "name",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            className="p-0"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Currency Code
            <RiArrowUpDownFill className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => <div className="">{row.original.name}</div>,
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
            Current Price
            <RiArrowUpDownFill className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => <div className="font-bold">{row.original.currencypriceid?.value}</div>,
    },
    {
      accessorKey: "status",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            className="p-0"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Status
            <RiArrowUpDownFill className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => (
        <span
          className={`badge text-white px-2 py-0.5 text-[12px] capitalize rounded ${row?.original?.status === 1
            ? "bg-[#28a745]"
            : "bg-[#343a40]"
            }`}
        >
          {row.original.status == 1 ? "ACTIVE" : "INACTIVE"}
        </span>
      ),
    },
    {
      accessorKey: "role",
      header: () => <div className="text-left">Action</div>,
      cell: ({ row }) => {
        return (
          <div>
            <Button type="button" onClick={() => handleEdit(row?.original)} className="p-0 bg-transparent text-black hover:bg-transparent ">
              <CiEdit className="h-6 w-6" />
            </Button>
          </div>
        );
      },
    },
  ];

  const handleEdit = (item: any) => {
    setEdit(item.id);
    setValue("name", item.name)
    setValue("description", item.description)
    setOpen(true);
  };

  const { mutate: create } = useMutation({
    mutationFn: createCurrency,
    onSuccess: () => {
      setOpen(false);
      reset();
      queryClient.invalidateQueries({ queryKey: ["GET_CURRENCY"] });
    },
    onError: () => {
      console.log("error");
    }
  })

  const { mutate: update } = useMutation({
    mutationFn: updateCurrency,
    onSuccess: () => {
      setOpen(false);
      reset();
      setEdit("");
      queryClient.invalidateQueries({ queryKey: ["GET_CURRENCY"] });
    },
    onError: (error) => {
      console.log("error", error);
    }
  })

  const onSubmit = (data: any) => {
    const payload = {
      name: (data.name).toUpperCase(),
      description: data.description
    }
    if (edit) {
      update({ data: payload, id: edit });
    } else {
      create(payload);
    }
  }

  const handleClose = () => {
    setOpen(false);
    reset();
    setEdit("");
  }

  const body = (
    <div>
      {/* {createPortal(<>{isPending && <Loading />}</>, document.body)}
      {createPortal(<>{isopen && <Loading />}</>, document.body)} */}
      <h2 className="text-[22px] font-[700] text-[#343a40] font-Nunito mb-4">
        {edit ? "Edit" : "Add"} Currency
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
              label="Currency Name"
              placeholder="Enter Currency Name"
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
              placeholder="Enter Description"
              error={errors?.description?.message}
              {...register("description")}
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
    <div className="custom_contener !mb-[28px] !p-[17.5px] customShadow">
      {isLoading && <Loading />}
      <DataTableDemo
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        data={CurrencyData?.data?.CurrencyData || []}
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        columns={columns}
        setActivePage={setActivePage}
        pageCount={CurrencyData?.data?.total}
        filterName={"name"}
        customButton={<Button type="button" onClick={() => setOpen(true)} className="bg-[#343a40]">Add Currency</Button>}
      />
      <Modal
        open={open}
        onClose={() => {
          setOpen(false), setEdit(""), reset();
        }}
        children={body}
        className="!p-[20px]"
      />
    </div>
  );
};

export default Index;
