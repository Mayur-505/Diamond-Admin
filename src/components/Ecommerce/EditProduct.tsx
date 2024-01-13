import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import InputWithLabel from "../Common/InputWithLabel";
import TextAreaWithLabel from "../Common/TextAreaWithLabel";
import SelectMenu from "../Common/SelectMenu";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  categoryTosubCategory,
  getSubCategory,
  subcategoryToInnerCategory,
} from "@/services/subcategoryService";
import { getCategory } from "@/services/categoryService";
import { getShape } from "@/services/shapeService";
import { getColor } from "@/services/colorServices";
import { getClarity } from "@/services/clarityService";
import { getCut } from "@/services/cutServices";
import { toast } from "../ui/use-toast";
import { addProduct } from "@/services/newproductService";
import { useNavigate, useParams } from "react-router-dom";
import { getProduct, updateProduct } from "@/services/productService";
import { Products } from "@/lib/types";
import { FieldValues, FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup.object({
  title: yup.string().required(),
  maintitle: yup.string().required(),
});

const EditProduct = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { id } = useParams();
  const [activePage, setActivePage] = useState(1);
  const methods = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      maintitle: "",
      title: "",
      price: "",
      disccount_price: "",
      subcategoryid: "",
      innercategoryid: "",
      categoryid: "",
      shape: "",
      carat: "",
      colour: "",
      clarity: "",
      polish: "",
      cut: "",
      symmetry: "",
      flourescence: "",
      measurements: "",
      cert_number: "",
      table: "",
      crown_height: "",
      depth: "",
      crown_angle: "",
      pavilian_depth: "",
      pavilian_angle: "",
      status: "",
      size: "",
      size_desc: "",
      color_desc: "",
      clarity_desc: "",
      cut_desc: "",
      sizeimages: null,
      colorimage: null,
      clarityimage: null,
      cutimage: null,
      productimage: [],
    },
  });
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setValue,
    getValues,
  } = methods;
  const [formValues, setFormValues] = useState({
    maintitle: "",
    title: "",
    price: "",
    disccount_price: "",
    subcategoryid: "",
    innercategoryid: "",
    categoryid: "",
    shape: "",
    carat: "",
    colour: "",
    clarity: "",
    polish: "",
    cut: "",
    symmetry: "",
    flourescence: "",
    measurements: "",
    cert_number: "",
    table: "",
    crown_height: "",
    depth: "",
    crown_angle: "",
    pavilian_depth: "",
    pavilian_angle: "",
    status: "",
    size: "",
    size_desc: "",
    color_desc: "",
    clarity_desc: "",
    cut_desc: "",
    sizeimages: null,
    colorimage: null,
    clarityimage: null,
    cutimage: null,
    productimage: [],
  });

  const { data } = useQuery({
    queryKey: ["GET_PRODUCT", { activePage }],
    queryFn: () => getProduct({ page: activePage, pageSize: 10 }),
  });
  const { data: categoryData } = useQuery({
    queryKey: ["GET_CATEGORY", { activePage }],
    queryFn: () => getCategory({ page: activePage, pageSize: 10 }),
  });

  const categoryOptions = categoryData?.data?.modifiedCategories
    ? categoryData?.data?.modifiedCategories?.map((item) => ({
        label: item.name,
        value: item.id,
      }))
    : [];

  const { data: subcategoryData } = useQuery({
    queryKey: ["GET_CATEGORY_TO_SUBCATEGORY", formValues.categoryid],
    queryFn: () =>
      categoryTosubCategory({
        page: activePage,
        pageSize: 10,
        categoryid: formValues.categoryid,
      }),
  });

  const categorySubOptions = subcategoryData?.data?.data?.categories
    ? subcategoryData?.data?.data?.categories?.map((item) => ({
        label: item.name,
        value: item.id,
      }))
    : [];

  const { data: InnercategoryData } = useQuery({
    queryKey: ["SUB_CATEGORY_TO_INNERCATEGORY", formValues.subcategoryid],
    queryFn: () =>
      subcategoryToInnerCategory({
        subcategoryid: formValues.subcategoryid,
      }),
  });

  const categoryInnerOptions = InnercategoryData?.data?.data?.innercategories
    ? InnercategoryData?.data?.data?.innercategories?.map((item) => ({
        label: item.name,
        value: item.id,
      }))
    : [];

  const { data: shapeData } = useQuery({
    queryKey: ["GET_SHAPE", { activePage }],
    queryFn: () => getShape({ page: activePage, pageSize: 10 }),
  });

  const shapeOptions = shapeData?.Shapedata
    ? shapeData?.Shapedata?.map((item) => ({
        label: item.name,
        value: item.name,
      }))
    : [];

  const { data: colorData } = useQuery({
    queryKey: ["GET_COLOR", { activePage }],
    queryFn: () => getColor({ page: activePage, pageSize: 10 }),
  });

  const colorOptions = colorData?.data?.Colordata
    ? colorData?.data?.Colordata?.map((item) => ({
        label: item.name,
        value: item.name,
      }))
    : [];

  const { data: clarityData } = useQuery({
    queryKey: ["GET_CLARITY", { activePage }],
    queryFn: () => getClarity({ page: activePage, pageSize: 10 }),
  });
  const clarityOptions = clarityData?.data?.Claritydata
    ? clarityData?.data?.Claritydata?.map((item) => ({
        label: item.name,
        value: item.name,
      }))
    : [];

  const { data: cutData } = useQuery({
    queryKey: ["GET_CUT", { activePage }],
    queryFn: () => getCut({ page: activePage, pageSize: 10 }),
  });

  const cutOptions = cutData?.data?.Cutdata
    ? cutData?.data?.Cutdata?.map((item) => ({
        label: item.name,
        value: item.name,
      }))
    : [];
  const handleChange = (name: string, value: string | number) => {
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleChangeImage = (e: any) => {
    const { files } = e.target;
    if (files) {
      const images: File[] = [];

      for (let i = 0; i < files.length; i++) {
        images.push(files[i]);
      }
      setFormValues((prev) => ({ ...prev, productimage: images }));
    }
  };

  const { mutate: updateproduct } = useMutation({
    mutationFn: updateProduct,
    onSuccess: () => {
      toast({
        description: "Product updated successfully.",
      });
      navigate("/gems/product-list");
      queryClient.invalidateQueries({ queryKey: ["updateCategory"] });
    },
    onError: (error) => {
      toast({ description: "Something went wrong." });
      if (error?.code == 401) {
        navigate("/auth/login");
      }
    },
  });

  useEffect(() => {
    if (data) {
      const findData: Products = data?.product?.find(
        (item: Products) => item.id === id
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
      setValue("productId", String(id));
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
      setValue("productId", String(id));
      setValue("sizeimages", "");
      setValue("colorimage", "");
      setValue("clarityimage", "");
      setValue("cutimage", "");
      setValue("productimage", []);
    }
  }, [data]);

  const onSubmit = (data: FieldValues) => {
    var urlencoded = new URLSearchParams();
    const payload = new FormData();
    urlencoded.append("maintitle", data.maintitle);
    urlencoded.append("title", data.title);
    urlencoded.append("price", data.price);
    urlencoded.append("disccount_price", data.disccount_price);
    urlencoded.append("shape", data.shape);
    urlencoded.append("carat", data.carat);
    urlencoded.append("colour", data.colour);
    urlencoded.append("clarity", data.clarity);
    urlencoded.append("cut", data.cut);
    urlencoded.append("polish", data.polish);
    urlencoded.append("symmetry", data.symmetry);
    urlencoded.append("flourescence", data.flourescence);
    urlencoded.append("measurements", data.measurements);
    urlencoded.append("cert_number", data.cert_number);
    urlencoded.append("table", data.table);
    urlencoded.append("crown_height", data.crown_height);
    urlencoded.append("pavilian_depth", data.pavilian_depth);
    urlencoded.append("depth", data.depth);
    urlencoded.append("crown_angle", data.crown_angle);
    urlencoded.append("pavilian_angle", data.pavilian_angle);
    urlencoded.append("status", data.status);
    urlencoded.append("size", data.size);
    urlencoded.append("size_desc", data.size_desc);
    urlencoded.append("color_desc", data.color_desc);
    urlencoded.append("clarity_desc", data.clarity_desc);
    urlencoded.append("cut_desc", data.cut_desc);
    urlencoded.append("productId", String(id));
    urlencoded.append("sizeimages", data.sizeimages);
    urlencoded.append("colorimage", data.colorimage);
    urlencoded.append("clarityimage", data.clarityimage);
    urlencoded.append("cutimage", data.cutimage);
    if (data.productimage && data.productimage.length > 0) {
      data.productimage.forEach((image, index) => {
        urlencoded.append(`productimage[${index}]`, image);
      });
    }
    if (data.sizeimages && data.sizeimages.length > 0) {
      data.sizeimages.forEach((sizeImage, index) => {
        urlencoded.append(`sizeimages[${index}]`, sizeImage);
      });
    }

    if (data.colorimage && data.colorimage.length > 0) {
      data.colorimage.forEach((colorImage, index) => {
        urlencoded.append(`colorimage[${index}]`, colorImage);
      });
    }

    if (data.clarityimage && data.clarityimage.length > 0) {
      data.clarityimage.forEach((clarityImage, index) => {
        urlencoded.append(`clarityimage[${index}]`, clarityImage);
      });
    }

    if (data.cutimage && data.cutimage.length > 0) {
      data.cutimage.forEach((cutImage, index) => {
        urlencoded.append(`cutimage[${index}]`, cutImage);
      });
    }
    if (data.productimage && data.productimage.length > 0) {
      data.productimage.forEach((image, index) => {
        urlencoded.append(`productimage[${index}]`, image);
      });
    }
    if (data?.productimage && data?.productimage?.length > 0) {
      for (let i = 0; i < data.productimage.length; i++) {
        urlencoded.append(`productimage[${i}]`, data.productimage[i]);
      }
    }
    updateproduct({ data: urlencoded });
  };
  console.log("formValues", formValues);

  return (
    <div className="custom_contener !pb-[28px]">
      <div>
        <div className="mb-0 bg-[#ffffff] rounded-[4px] p-[17.5px]">
          <div className="mb-[21px] text-[#212121] font-bold text-[17.5px] font-Nunito">
            Update Product
          </div>
          <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="grid grid-cols-12 gap-[14px] mx-0 mt-0">
                <div className="col-span-8 p-0 w-full">
                  <div className="flex mt-0 flex-wrap mx-[-14px]">
                    <div className="px-[14px] py-0 mb-[14px] w-full">
                      <InputWithLabel
                        type="text"
                        id="maintitle"
                        label="Main Title"
                        placeholder="Main Title"
                        error={errors?.maintitle?.message}
                        {...register("maintitle")}
                        className="border border-[#ced4da] rounded-[4px] placeholder:opacity-[0.6]"
                      />
                    </div>
                    <div className="px-[14px] py-0 mb-[14px] lg:w-[33.33%] w-full">
                      <InputWithLabel
                        type="text"
                        id="title"
                        label="Title"
                        placeholder="Title"
                        error={errors?.title?.message}
                        {...register("title")}
                        className="border border-[#ced4da] rounded-[4px] placeholder:opacity-[0.6]"
                      />
                    </div>
                    <div className="px-[14px] py-0 mb-[14px] lg:w-[33.33%] w-full">
                      <InputWithLabel
                        type="text"
                        id="price"
                        label="Price"
                        placeholder="Price"
                        error={errors?.price?.message}
                        {...register("price")}
                        className="border border-[#ced4da] rounded-[4px] placeholder:opacity-[0.6]"
                      />
                    </div>
                    <div className="px-[14px] py-0 mb-[14px] lg:w-[33.33%] w-full">
                      <InputWithLabel
                        type="text"
                        id="disccount_price"
                        label="Disccount price"
                        placeholder="disccount_price"
                        error={errors?.disccount_price?.message}
                        {...register("disccount_price")}
                        className="border border-[#ced4da] rounded-[4px] placeholder:opacity-[0.6]"
                      />
                    </div>
                    <div className="px-[14px] py-0 mb-[14px] lg:w-[33.33%] w-full">
                      <SelectMenu
                        placeholder="Category"
                        options={categoryOptions}
                        className="border border-[#ced4da] rounded-[4px] placeholder:opacity-[0.6]"
                        value={formValues.categoryid}
                        onChange={(val) => handleChange("categoryid", val)}
                      />
                    </div>
                    <div className="px-[14px] py-0 mb-[14px] lg:w-[33.33%] w-full">
                      <SelectMenu
                        placeholder="Sub Category"
                        options={categorySubOptions}
                        className="border border-[#ced4da] rounded-[4px] placeholder:opacity-[0.6]"
                        value={formValues.subcategoryid}
                        onChange={(e) => handleChange("subcategoryid", e)}
                      />
                    </div>
                    <div className="px-[14px] py-0 mb-[14px] lg:w-[33.33%] w-full">
                      <SelectMenu
                        placeholder="Inner Category"
                        options={categoryInnerOptions}
                        className="border border-[#ced4da] rounded-[4px] placeholder:opacity-[0.6]"
                        value={formValues.innercategoryid}
                        onChange={(e) => handleChange("innercategoryid", e)}
                      />
                    </div>

                    <div className="px-[14px] py-0 mb-[14px] lg:w-[33.33%] w-full">
                      <SelectMenu
                        placeholder="shape"
                        options={shapeOptions}
                        className="border border-[#ced4da] rounded-[4px] placeholder:opacity-[0.6]"
                        value={formValues.shape}
                        onChange={(e) => handleChange("shape", e)}
                      />
                    </div>
                    <div className="px-[14px] py-0 mb-[14px] lg:w-[33.33%] w-full">
                      <InputWithLabel
                        type="text"
                        id="carat"
                        label="Carat"
                        placeholder="carat"
                        error={errors?.carat?.message}
                        {...register("carat")}
                        className="border border-[#ced4da] rounded-[4px] placeholder:opacity-[0.6]"
                      />
                    </div>
                    <div className="px-[14px] py-0 mb-[14px] lg:w-[33.33%] w-full">
                      <SelectMenu
                        options={colorOptions}
                        placeholder="colour"
                        className="border border-[#ced4da] rounded-[4px] placeholder:opacity-[0.6]"
                        value={formValues.colour}
                        onChange={(e) => handleChange("colour", e)}
                      />
                    </div>
                    <div className="px-[14px] py-0 mb-[14px] lg:w-[33.33%] w-full">
                      <SelectMenu
                        placeholder="clarity"
                        options={clarityOptions}
                        className="border border-[#ced4da] rounded-[4px] placeholder:opacity-[0.6]"
                        value={formValues.clarity}
                        onChange={(e) => handleChange("clarity", e)}
                      />
                    </div>
                    <div className="px-[14px] py-0 mb-[14px] lg:w-[33.33%] w-full">
                      <InputWithLabel
                        type="text"
                        id="polish"
                        label="Polish"
                        placeholder="polish"
                        error={errors?.polish?.message}
                        {...register("polish")}
                        className="border border-[#ced4da] rounded-[4px] placeholder:opacity-[0.6]"
                      />
                    </div>
                    <div className="px-[14px] py-0 mb-[14px] lg:w-[33.33%] w-full">
                      <SelectMenu
                        options={cutOptions}
                        placeholder="cut"
                        className="border border-[#ced4da] rounded-[4px] placeholder:opacity-[0.6]"
                        value={formValues.cut}
                        onChange={(e) => handleChange("cut", e)}
                      />
                    </div>
                    <div className="px-[14px] py-0 mb-[14px] lg:w-[33.33%] w-full">
                      <InputWithLabel
                        type="text"
                        id="symmetry"
                        label="Symmetry"
                        placeholder="symmetry"
                        error={errors?.symmetry?.message}
                        {...register("symmetry")}
                        className="border border-[#ced4da] rounded-[4px] placeholder:opacity-[0.6]"
                      />
                    </div>
                    <div className="px-[14px] py-0 mb-[14px] lg:w-[33.33%] w-full">
                      <InputWithLabel
                        type="text"
                        id="flourescence"
                        label="Flourescence"
                        placeholder="flourescence"
                        error={errors?.flourescence?.message}
                        {...register("flourescence")}
                        className="border border-[#ced4da] rounded-[4px] placeholder:opacity-[0.6]"
                      />
                    </div>
                    <div className="px-[14px] py-0 mb-[14px] lg:w-[33.33%] w-full">
                      <InputWithLabel
                        type="text"
                        id="measurements"
                        label="Measurements"
                        placeholder="measurements"
                        error={errors?.measurements?.message}
                        {...register("measurements")}
                        className="border border-[#ced4da] rounded-[4px] placeholder:opacity-[0.6]"
                      />
                    </div>
                    <div className="px-[14px] py-0 mb-[14px] lg:w-[33.33%] w-full">
                      <InputWithLabel
                        type="text"
                        id="cert_number"
                        label="Cert_number"
                        placeholder="cert_number"
                        error={errors?.cert_number?.message}
                        {...register("cert_number")}
                        className="border border-[#ced4da] rounded-[4px] placeholder:opacity-[0.6]"
                      />
                    </div>
                    <div className="px-[14px] py-0 mb-[14px] lg:w-[33.33%] w-full">
                      <InputWithLabel
                        type="text"
                        id="table"
                        label="Table"
                        placeholder="table"
                        error={errors?.table?.message}
                        {...register("table")}
                        className="border border-[#ced4da] rounded-[4px] placeholder:opacity-[0.6]"
                      />
                    </div>
                    <div className="px-[14px] py-0 mb-[14px] lg:w-[33.33%] w-full">
                      <InputWithLabel
                        type="text"
                        id="crown_height"
                        label="Crown height"
                        placeholder="crown_height"
                        error={errors?.crown_height?.message}
                        {...register("crown_height")}
                        className="border border-[#ced4da] rounded-[4px] placeholder:opacity-[0.6]"
                      />
                    </div>
                    <div className="px-[14px] py-0 mb-[14px] lg:w-[33.33%] w-full">
                      <InputWithLabel
                        type="text"
                        id="depth"
                        label="Depth"
                        placeholder="depth"
                        error={errors?.depth?.message}
                        {...register("depth")}
                        className="border border-[#ced4da] rounded-[4px] placeholder:opacity-[0.6]"
                      />
                    </div>
                    <div className="px-[14px] py-0 mb-[14px] lg:w-[33.33%] w-full">
                      <InputWithLabel
                        type="text"
                        id="crown_angle"
                        label="Crown Angle"
                        placeholder="crown_angle"
                        error={errors?.crown_angle?.message}
                        {...register("crown_angle")}
                        className="border border-[#ced4da] rounded-[4px] placeholder:opacity-[0.6]"
                      />
                    </div>
                    <div className="px-[14px] py-0 mb-[14px] lg:w-[33.33%] w-full">
                      <InputWithLabel
                        type="text"
                        id="pavilian_depth"
                        label="Pavilian Depth"
                        placeholder="pavilian_depth"
                        error={errors?.pavilian_depth?.message}
                        {...register("pavilian_depth")}
                        className="border border-[#ced4da] rounded-[4px] placeholder:opacity-[0.6]"
                      />
                    </div>
                    <div className="px-[14px] py-0 mb-[14px] lg:w-[33.33%] w-full">
                      <InputWithLabel
                        type="text"
                        id="pavilian_angle"
                        label="Pavilian Angle"
                        placeholder="pavilian_angle"
                        error={errors?.pavilian_angle?.message}
                        {...register("pavilian_angle")}
                        className="border border-[#ced4da] rounded-[4px] placeholder:opacity-[0.6]"
                      />
                    </div>
                    <div className="px-[14px] py-0 mb-[14px] lg:w-[33.33%] w-full">
                      <InputWithLabel
                        type="text"
                        id="status"
                        label="Status"
                        placeholder="status"
                        error={errors?.status?.message}
                        {...register("status")}
                        className="border border-[#ced4da] rounded-[4px] placeholder:opacity-[0.6]"
                      />
                    </div>
                    <div className="px-[14px] py-0 mb-[14px] lg:w-[33.33%] w-full">
                      <InputWithLabel
                        type="text"
                        id="size"
                        label="Size"
                        placeholder="size"
                        error={errors?.size?.message}
                        {...register("size")}
                        className="border border-[#ced4da] rounded-[4px] placeholder:opacity-[0.6]"
                      />
                    </div>

                    <div className="px-[14px] py-0 mb-[14px] lg:w-[50%] w-full">
                      <label
                        htmlFor="sizeimages"
                        className="flex items-center justify-center border border-dashed border-[#ced4da] h-[50px] w-full textsm text-center"
                      >
                        {formValues.sizeimages
                          ? formValues.sizeimages?.name
                          : "Size Images"}
                      </label>
                      <input
                        id="sizeimages"
                        type="file"
                        className="hidden"
                        onChange={(e) =>
                          handleChange("sizeimages", e.target.files[0])
                        }
                      />
                    </div>
                    <div className="px-[14px] py-0 mb-[14px] lg:w-[50%] w-full">
                      <label
                        htmlFor="colorimage"
                        className="flex items-center justify-center border border-dashed border-[#ced4da] h-[50px] w-full textsm text-center"
                      >
                        {formValues.colorimage
                          ? formValues.colorimage?.name
                          : "Color Image"}
                      </label>
                      <input
                        id="colorimage"
                        type="file"
                        className="hidden"
                        onChange={(e) =>
                          handleChange("colorimage", e.target.files[0])
                        }
                      />
                    </div>
                    <div className="px-[14px] py-0 mb-[14px] lg:w-[50%] w-full">
                      <label
                        htmlFor="clarityimage"
                        className="flex items-center justify-center border border-dashed border-[#ced4da] h-[50px] w-full textsm text-center"
                      >
                        {formValues.clarityimage
                          ? formValues.clarityimage?.name
                          : "Clarity Image"}
                      </label>
                      <input
                        id="clarityimage"
                        type="file"
                        className="hidden"
                        onChange={(e) =>
                          handleChange("clarityimage", e.target.files[0])
                        }
                      />
                    </div>
                    <div className="px-[14px] py-0 mb-[14px] lg:w-[50%] w-full">
                      <label
                        htmlFor="cutimage"
                        className="flex items-center justify-center border border-dashed border-[#ced4da] h-[50px] w-full textsm text-center"
                      >
                        {formValues.cutimage
                          ? formValues.cutimage?.name
                          : "Cut Image"}
                      </label>
                      <input
                        id="cutimage"
                        type="file"
                        className="hidden"
                        onChange={(e) =>
                          handleChange("cutimage", e.target.files[0])
                        }
                      />
                    </div>
                    <div className="px-[14px] py-0 mb-[14px] w-full">
                      <label
                        htmlFor="productimage"
                        className="flex items-center justify-center border border-dashed border-[#ced4da] h-[50px] w-full textsm text-center"
                      >
                        {formValues.productimage.length
                          ? "images selected"
                          : "Product Image"}
                      </label>
                      <input
                        type="file"
                        id="productimage"
                        className="hidden"
                        multiple
                        onChange={handleChangeImage}
                      />
                    </div>
                  </div>
                </div>
                <div className="col-span-4 flex-1 w-full gap-y-[14px] flex flex-col">
                  <div className="border border-[#dee2e6] rounded-[4px]">
                    <div className="p-[14px] py-0 mb-[14px] w-full">
                      <TextAreaWithLabel
                        label={"Size Description"}
                        placeholder="size_desc"
                        value={formValues.size_desc}
                        textAreaClassName="border border-[#ced4da] rounded-[4px] placeholder:opacity-[0.6]"
                        className="md:col-span-2"
                        onChange={(e) =>
                          handleChange("size_desc", e.target.value)
                        }
                      />
                    </div>
                  </div>
                  <div className="border border-[#dee2e6] rounded-[4px]">
                    <div className="p-[14px] py-0 mb-[14px] w-full">
                      <TextAreaWithLabel
                        label={"Color Description"}
                        placeholder="color_desc"
                        value={formValues.color_desc}
                        textAreaClassName="border border-[#ced4da] rounded-[4px] placeholder:opacity-[0.6]"
                        className="md:col-span-2"
                        onChange={(e) =>
                          handleChange("color_desc", e.target.value)
                        }
                      />
                    </div>
                  </div>
                  <div className="border border-[#dee2e6] rounded-[4px]">
                    <div className="p-[14px] py-0 mb-[14px] w-full">
                      <TextAreaWithLabel
                        label={"Clarity Description"}
                        placeholder="clarity_desc"
                        value={formValues.clarity_desc}
                        textAreaClassName="border border-[#ced4da] rounded-[4px] placeholder:opacity-[0.6]"
                        className="md:col-span-2"
                        onChange={(e) =>
                          handleChange("clarity_desc", e.target.value)
                        }
                      />
                    </div>
                  </div>
                  <div className="border border-[#dee2e6] rounded-[4px]">
                    <div className="p-[14px] py-0 mb-[14px] w-full">
                      <TextAreaWithLabel
                        label={"Cut Description"}
                        placeholder="cut_desc"
                        value={formValues.cut_desc}
                        textAreaClassName="border border-[#ced4da] rounded-[4px] placeholder:opacity-[0.6]"
                        className="md:col-span-2"
                        onChange={(e) =>
                          handleChange("cut_desc", e.target.value)
                        }
                      />
                    </div>
                  </div>
                  <div className="rounded-[4px] flex justify-between items-center py-[7px] gap-4">
                    <Button
                      type="submit"
                      className="flex-1 bg-[#2196F3] rounded-[4px] border-[#2196F3] border hover:text-[#000] hover:bg-white text-[#fff]"
                    >
                      <span>Update Product</span>
                    </Button>
                  </div>
                </div>
              </div>
            </form>
          </FormProvider>
        </div>
      </div>
    </div>
  );
};

export default EditProduct;
