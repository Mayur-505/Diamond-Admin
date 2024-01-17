import { RiArrowUpDownFill } from "react-icons/ri";
import { Button } from "../ui/button";
import { DataTableDemo } from "../Common/DataTable";
import { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getOrderHistory,
  getOrderSummary,
  updateOrderHistory,
} from "@/services/orderhistoryService";
import { EyeIcon } from "lucide-react";
import Modal from "../Common/Model";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { AiOutlineEdit } from "react-icons/ai";
import { FieldValues, FormProvider, useForm } from "react-hook-form";
import InputWithLabel from "../Common/InputWithLabel";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Loading from "../Common/Loading";
import { toast } from "../ui/use-toast";
import { useNavigate } from "react-router-dom";
import SelectMenu from "../Common/SelectMenu";
import { Label } from "../ui/label";
import { Value } from "@radix-ui/react-select";
import { useAppSelector } from "@/hooks/use-redux";

const OrderHistory = () => {
  const [activePage, setActivePage] = useState(1);
  const [isEdit, setIsEdit] = useState<string>("");
  const { user } = useAppSelector((state) => state.auth);
  const [open, setOpen] = useState<boolean>(false);
  const [summaryData, setSummaryData] = useState(null);
  const [selectMenu, setSelectmenu] = useState("");
  const [active, setActive] = useState(0);
  const [openview, setOpenView] = useState<boolean>(false);
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [filter, setFilter] = useState({
    orderstatus: selectMenu,
    orderid: "",
  });
  const schema = yup.object({
    orderstatus: yup.string().required(),
    orderid: yup.string().required(),
  });

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
  } = methods;

  const { data: orderHistoryData, isLoading } = useQuery({
    queryKey: ["GET_ORDER_HISTORY", { activePage, active }],
    queryFn: () =>
      getOrderHistory({
        page: activePage,
        pageSize: 10,
        orderstatus: active,
        payment: !active == 1 ? 0 : 2,
      }),
  });

  useEffect(() => {
    if (orderHistoryData && isEdit) {
      const findData = orderHistoryData?.data?.responceData?.find(
        (item) => item.id === isEdit
      );

      console.log("datata", findData);
      setValue("orderstatus", findData?.orderstatus || "");
      setValue("orderid", findData?.id || "");
    } else {
      setValue("orderstatus", "");
      setValue("orderid", "");
    }
  }, [orderHistoryData, isEdit]);

  const { mutate: updateOrder, isPending } = useMutation({
    mutationFn: updateOrderHistory,
    onSuccess: () => {
      toast({
        description: "Order updated successfully.",
      });
      setOpen(false);
      reset();
      navigate("/gems/order-history");
      queryClient.invalidateQueries({ queryKey: ["GET_ORDER_HISTORY"] });
    },
    onError: (error) => {
      toast({
        variant: "error",
        title: error?.data?.message || "",
      });
      if (error?.code == 401) {
        navigate("/auth/login");
      }
    },
  });

  const onSubmit = (data) => {
    const object = {
      orderid: data.orderid,
      orderstatus: selectMenu,
    };
    console.log("datas", data);
    updateOrder(object);
  };

  const columns: Column<Customer>[] = [
    {
      accessorKey: "Product Image",
      header: <div className="text-left">Image</div>,
      cell: ({ row }) => {
        return (
          <img
            src={
              row?.original?.productResponse?.[0]?.product?.productimage?.[0]
            }
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
            Title
            <RiArrowUpDownFill className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className="">
          {row?.original?.productResponse?.[0]?.product?.title}
        </div>
      ),
    },
    {
      accessorKey: "payment",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            className="p-0"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            payment
            <RiArrowUpDownFill className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className="">
          {row?.original?.payment == 2 ? "Success" : "Pendding"}
        </div>
      ),
    },
    {
      accessorKey: "Quantity",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            className="p-0"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Quantity
            <RiArrowUpDownFill className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className="">{row?.original?.productResponse?.[0]?.quantity}</div>
      ),
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
            {row?.original?.productResponse?.[0]?.status == "0"
              ? "Inactive"
              : "Active"}
          </span>
        );
      },
    },
    {
      accessorKey: "Action",
      header: () => <div className="text-left">Action</div>,
      cell: ({ row }) => {
        return (
          <div className="flex gap-2">
            {/* <Button
              onClick={() => {
                handleView(row?.original?.id);
                setOpenView(true);
              }}
              className="text-[14px] font-[600] bg-[#343a40] text-[#fff] p-1 rounded w-[26px] h-[26px] flex items-center justify-center"
            >
              <EyeIcon className="text-[#fff] text-[16px]" />
            </Button> */}
            {active !== 2 && (
              <button
                type="button"
                onClick={() => {
                  setIsEdit(row?.original?.id);
                  setSelectmenu(String(row?.original?.orderstatus || 1));
                  setOpen(true);
                }}
                className="text-[14px] font-[600] bg-[#343a40] text-[#fff] p-1 rounded w-[26px] h-[26px] flex items-center justify-center"
              >
                <AiOutlineEdit className="text-[#fff] text-[16px]" />
              </button>
            )}
          </div>
        );
      },
    },
  ];

  const handleClose = () => {
    setOpenView(false);
  };

  const handleChangeMenu = (value) => {
    setSelectmenu(value);
  };
  const body = (
    <div>
      {isPending && <Loading />}
      {isLoading && <Loading />}
      <h2 className="text-[22px] font-[700] text-[#343a40] font-Nunito mb-4">
        {isEdit ? "Edit" : "Add"} Order
      </h2>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mt-1">
            <Label className={` text-xs font-[500] font-Nunito md:text-sm`}>
              Order Status
            </Label>
            <SelectMenu
              placeholder="Order Status"
              className="border w-full border-[#ced4da] rounded-[4px] placeholder:opacity-[0.6]"
              onChange={handleChangeMenu}
              options={[
                { value: "0", label: "Processing" },
                { value: "1", label: "Pendding" },
                { value: "2", label: "Complete" },
              ]}
              value={selectMenu}
              name="orderstatus"
            />
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
    <div className="custom_contener !mb-[28px] !p-[17.5px] customShadow">
      {isPending && <Loading />}
      {isLoading && <Loading />}
      <Tabs defaultValue="Processing" className="">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="Processing" onClick={() => setActive(0)}>
            Processing
          </TabsTrigger>
          <TabsTrigger value="Ongoing" onClick={() => setActive(1)}>
            Ongoing
          </TabsTrigger>
          <TabsTrigger value="Delivered" onClick={() => setActive(2)}>
            Delivered
          </TabsTrigger>
        </TabsList>
        <TabsContent value="Processing">
          <DataTableDemo
            data={orderHistoryData?.data?.responceData || []}
            columns={columns}
            filterName={"title"}
            setActivePage={setActivePage}
            pageCount={orderHistoryData?.data?.total}
            customButton={
              <div className="flex justify-end gap-4">
                <div className="flex flex-col text-center md:text-left">
                  <span className="text-900 text-[21px] font-Nunito mb-2">
                    My Orders
                  </span>
                  <span className="text-700 text-[16px] text-[#616161] font-Nunito">
                    Dignissim diam quis enim lobortis.
                  </span>
                </div>
              </div>
            }
          />
        </TabsContent>
        <TabsContent value="Ongoing">
          <DataTableDemo
            data={orderHistoryData?.data?.responceData || []}
            columns={columns}
            filterName={"title"}
            setActivePage={setActivePage}
            pageCount={orderHistoryData?.data?.total}
            customButton={
              <div className="flex justify-end gap-4">
                <div className="flex flex-col text-center md:text-left">
                  <span className="text-900 text-[21px] font-Nunito mb-2">
                    My Orders
                  </span>
                  <span className="text-700 text-[16px] text-[#616161] font-Nunito">
                    Dignissim diam quis enim lobortis.
                  </span>
                </div>
              </div>
            }
          />
        </TabsContent>
        <TabsContent value="Delivered">
          <DataTableDemo
            data={orderHistoryData?.data?.responceData || []}
            columns={columns}
            filterName={"title"}
            setActivePage={setActivePage}
            pageCount={orderHistoryData?.data?.total}
            customButton={
              <div className="flex justify-end gap-4">
                <div className="flex flex-col text-center md:text-left">
                  <span className="text-900 text-[21px] font-Nunito mb-2">
                    My Orders
                  </span>
                  <span className="text-700 text-[16px] text-[#616161] font-Nunito">
                    Dignissim diam quis enim lobortis.
                  </span>
                </div>
              </div>
            }
          />
        </TabsContent>
      </Tabs>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        children={body}
        className="!p-[20px]"
      />
      {/* <Modal
        open={openview}
        onClose={() => setOpenView(false)}
        children={OrderViewBody}
        className="!p-[20px]"
      /> */}
    </div>
  );
};

export default OrderHistory;
