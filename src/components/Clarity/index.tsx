import React from "react";
import { DataTableDemo } from "../Common/DataTable";
import { Button } from "../ui/button";
import { AiOutlineEdit } from "react-icons/ai";
import { MdDeleteOutline } from "react-icons/md";
import { Clarity, ErrorType } from "@/lib/types";
import { RiArrowUpDownFill } from "react-icons/ri";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createClarity,
  deleteClarity,
  getClarity,
} from "@/services/clarityService";
import Modal from "../Common/Model";
import InputWithLabel from "../Common/InputWithLabel";
import { toast } from "../ui/use-toast";
import { DialogBoxClarity } from "./DialogBoxClarity";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

interface Column<T> {
  accessorKey: keyof T | ((row: T) => any) | string;
  header: React.ReactNode | ((args: { column: any }) => React.ReactNode);
  cell: (args: { row: any }) => React.ReactNode;
  enableSorting?: boolean;
}

const Index = () => {
  const [open, setOpen] = React.useState<boolean>(false);
  const [activePage, setActivePage] = React.useState<number>(1);
  const [edit, setEdit] = React.useState<string>("");
  const methods = useForm({
    resolver: yupResolver(Schema),
    defaultValues: initialValues,
    mode: "all",
  });

  const queryClient = useQueryClient();
  const { data: clarityData } = useQuery({
    queryKey: ["GET_CLARITY", { activePage }],
    queryFn: () => getClarity({ page: activePage, pageSize: 10 }),
  });

  const handleChange = (name: string, value: string | undefined) => {
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const { mutate: createClarityData } = useMutation({
    mutationFn: createClarity,
    onSuccess: () => {
      toast({
        variant: "success",
        description: "Contact Created Successfully.",
      });
      queryClient.invalidateQueries({ queryKey: ["GET_CLARITY"] });
    },
    onError: (error: ErrorType) => {
      toast({ variant: "error", description: "Something went wrong." });
    },
  });

  const { mutate: removeClarity, isPending } = useMutation({
    mutationFn: deleteClarity,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["GET_CLARITY"] });
    },
    onError: () => {
      toast({ variant: "error", description: "Not deleted" });
    },
  });

  const handleSubmit = () => {
    const payload = new FormData();
    if (formValues.name) {
      payload.append("name", formValues.name);
    }
    createClarityData(payload);
    setOpen(false);
    setFormValues({
      name: "",
    });
  };

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
      cell: ({ row }) => <div className="capitalize">{row?.original.name}</div>,
    },
    {
      accessorKey: "Action",
      header: () => <div className="text-left">Action</div>,
      cell: ({ row }) => {
        return (
          <div className="flex gap-2">
            <button
              type="button"
              className="text-[14px] font-[600] bg-[#343a40] text-[#fff] p-1 rounded w-[26px] h-[26px] flex items-center justify-center"
            >
              <DialogBoxClarity
                icon={<AiOutlineEdit className="text-[#fff] text-[16px]" />}
                mainTitle="Edit Clarity"
                item={row?.original}
              />
            </button>
            <button
              type="button"
              onClick={() => removeClarity(row?.original?.id)}
              className="text-[14px] font-[600] bg-red-200 text-[#fff] p-1 rounded w-[26px] h-[26px] flex items-center justify-center"
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
      <h2 className="text-[22px] font-[700] text-[#343a40] font-Nunito mb-4">
        Add Clarity
      </h2>
      <div>
        <div className="mt-1">
          <InputWithLabel
            type="text"
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            name="clarity"
            id="clarity"
            label="Clarity"
            placeholder="Clarity"
            defaultValue={formValues.name}
            onChange={(e) => handleChange("name", e.target.value)}
            className="border border-[#ced4da] rounded-[4px] placeholder:opacity-[0.6] mt-1"
          />
        </div>
        <div className="flex justify-end gap-4 mt-5">
          <Button
            variant={"outline"}
            className="w-full bg-[#343a40] text-white"
            // onClick={() => handleClose()}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant={"outline"}
            className="w-full bg-[#343a40] text-white"
            onClick={handleSubmit}
          >
            Save
          </Button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="custom_contener !p-[17.5px] !mb-[28px] customShadow">
      <DataTableDemo
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        data={clarityData?.data?.Claritydata || []}
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        columns={columns}
        setActivePage={setActivePage}
        pageCount={clarityData?.data?.total}
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
        onClose={() => setOpen(false)}
        children={body}
        className="!p-[20px]"
      />
    </div>
  );
};

export default Index;
