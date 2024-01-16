import { useEffect, useRef, useState } from "react";
import { Button } from "../ui/button";
import InputWithLabel from "../Common/InputWithLabel";
import TextAreaWithLabel from "../Common/TextAreaWithLabel";
import SelectMenu from "../Common/SelectMenu";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  categoryTosubCategory,
  subcategoryToInnerCategory,
} from "@/services/subcategoryService";
import { getCategory } from "@/services/categoryService";
import { getShape } from "@/services/shapeService";
import { getColor } from "@/services/colorServices";
import { getClarity } from "@/services/clarityService";
import { getCut } from "@/services/cutServices";
import { toast } from "../ui/use-toast";
import { addProduct } from "@/services/newproductService";
import { useLocation, useNavigate } from "react-router-dom";
import Loading from "../Common/Loading";
import { UploadImage } from "@/services/adminService";
import { updateProduct } from "@/services/productService";

const NewProduct = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [activePage, setActivePage] = useState(1);
  const [isopen, setIsOpen] = useState<boolean>(false);
  const { state } = useLocation();
  console.log("state", state);

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
  useEffect(() => {
    if (state?.editdata) {
      setFormValues({
        ...state?.editdata,
        productId: state?.editdata.id,
        categoryid: state?.editdata.categoryid?.id || "",
        subcategoryid: state?.editdata.subcategoryid?.id || "",
        innercategoryid: state?.editdata.innercategoryid?.id || "",
        size: state?.editdata.diamond_size.size || "",
        size_desc: state?.editdata.diamond_size.size_desc || "",
        sizeimages: state?.editdata.diamond_size.sizeimages || "",
        cut_desc: state?.editdata.diamond_cut.cut_desc || "",
        cutimage: state?.editdata.diamond_cut.cutimage || "",
        cut: state?.editdata.diamond_cut.cut || "",
        colour: state?.editdata.diamond_color.colour || "",
        color_desc: state?.editdata.diamond_color.color_desc || "",
        colorimage: state?.editdata.diamond_color.colorimage || "",
        clarity: state?.editdata.diamond_clarity.clarity || "",
        clarity_desc: state?.editdata.diamond_clarity.clarity_desc || "",
        clarityimage: state?.editdata.diamond_clarity.clarityimage || "",
      });
    }
  }, [state]);

  const [imgUrl, setImgUrl] = useState("");
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
    // if (name === "sizeimages") {
    //   setImgUrl(name);
    //   const payload = new FormData();
    //   setIsOpen(true);
    //   payload.append("image", value);
    //   UploadImagedata(payload);
    // } else if (name === "colorimage") {
    //   setImgUrl(name);
    //   const payload = new FormData();
    //   setIsOpen(true);
    //   payload.append("image", value);
    //   UploadImagedata(payload);
    // } else if (name === "clarityimage") {
    //   setImgUrl(name);
    //   const payload = new FormData();
    //   setIsOpen(true);
    //   payload.append("image", value);
    //   UploadImagedata(payload);
    // } else if (name === "cutimage") {
    //   setImgUrl(name);
    //   const payload = new FormData();
    //   setIsOpen(true);
    //   payload.append("image", value);
    //   UploadImagedata(payload);
    // } else {
    //   setFormValues((prev) => ({ ...prev, [name]: value }));
    // }
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleChangeImage = (e: any) => {
    // const { files } = e.target;
    // console.log("productimage", formValues.productimage, files);
    // setFormValues((prev) => ({ ...prev, productimage: [] }));
    // if (files) {
    //   if (files.length <= 4) {
    //     for (let i = 0; i < files.length; i++) {
    //       const payload = new FormData();
    //       payload.append("image", files[i]);
    //       UploadMultiImagedata(payload);
    //     }
    //     setIsOpen(true);
    //     setImgUrl("productimage");
    //   } else {
    //     toast({
    //       variant: "error",
    //       title: "More than 4 images are allowed",
    //     });
    //   }
    // }
    const { files } = e.target;
    if (files) {
      const images: File[] = [];

      for (let i = 0; i < files.length; i++) {
        images.push(files[i]);
      }
      setFormValues((prev) => ({ ...prev, productimage: images }));
    }
  };

  const { mutate: UploadImagedata } = useMutation({
    mutationFn: UploadImage,
    onSuccess: (res) => {
      setFormValues((prev) => ({
        ...prev,
        [imgUrl]: res?.data?.data?.image,
      }));
      setIsOpen(false);
    },
    onError: (error) => {
      console.log(error);
      setIsOpen(false);
    },
  });

  const { mutate: UploadMultiImagedata } = useMutation({
    mutationFn: UploadImage,
    onSuccess: (res) => {
      formValues.productimage.push(res?.data?.data?.image);
      setFormValues({ ...formValues });
      setIsOpen(false);
    },
    onError: (error) => {
      console.log(error);
      setIsOpen(false);
    },
  });

  const { mutate: createProduct, isPending } = useMutation({
    mutationFn: addProduct,
    onSuccess: () => {
      toast({
        variant: "success",
        title: "Product Created Successfully.",
      });
      queryClient.invalidateQueries({ queryKey: ["GET_PRODUCT"] });
      navigate("/gems/product-list");
      setFormValues({
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
    },
    onError: (error) => {
      toast({
        variant: "error",
        title: error?.data?.message,
      });
      if (error?.code == 401) {
        navigate("/auth/login");
      }
    },
  });

  const { mutate: updateproduct } = useMutation({
    mutationFn: updateProduct,
    onSuccess: () => {
      toast({
        variant: "success",
        title: "Product updated successfully.",
      });
      queryClient.invalidateQueries({ queryKey: ["GET_PRODUCT"] });
      navigate("/gems/product-list");
    },
    onError: (error) => {
      toast({
        variant: "error",
        title: error?.data?.message,
      });
      if (error?.code == 401) {
        navigate("/auth/login");
      }
    },
  });

  const handleSubmit = () => {
    const payload = new FormData();
    for (const key in formValues) {
      if (key !== "productimage") {
        payload.append(key, formValues[key]);
      }
    }
    formValues.productimage.forEach((image) => {
      payload.append("productimage", image);
    });
    if (state?.editdata) {
      console.log("payload", payload);

      // payload.append("productId", state?.editdata?.id);
      updateproduct(payload);
    } else {
      createProduct(payload);
    }
  };

  const handleDiscard = () => {
    setFormValues({
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
  };
  console.log("UploadMultiImagedata", formValues.productimage);

  return (
    <div className="custom_contener !pb-[28px]">
      {isPending && <Loading />}
      {isopen && <Loading />}
      <div>
        <div className="mb-0 bg-[#ffffff] rounded-[4px] p-[17.5px]">
          <div className="mb-[21px] text-[#212121] font-bold text-[17.5px] font-Nunito">
            {state?.editdata ? "Edit Product" : "Create Product"}
          </div>
          <div className="grid grid-cols-12 gap-[14px] mx-0 mt-0">
            <div className="col-span-8 p-0 w-full">
              <div className="flex mt-0 flex-wrap items-center mx-[-14px]">
                <div className="px-[14px] py-0 mb-[14px] w-full">
                  <InputWithLabel
                    id="maintitle"
                    label="Main Title"
                    placeholder="main title"
                    className="border border-[#ced4da] rounded-[4px] placeholder:opacity-[0.6]"
                    value={formValues.maintitle}
                    onChange={(e) => handleChange("maintitle", e.target.value)}
                  />
                </div>
                <div className="px-[14px] py-0 mb-[14px] lg:w-[33.33%] w-full">
                  <InputWithLabel
                    id="title"
                    label="Title"
                    placeholder="title"
                    className="border border-[#ced4da] rounded-[4px] placeholder:opacity-[0.6]"
                    value={formValues.title}
                    onChange={(e) => handleChange("title", e.target.value)}
                  />
                </div>
                <div className="px-[14px] py-0 mb-[14px] lg:w-[33.33%] w-full">
                  <InputWithLabel
                    id="Price"
                    type="number"
                    placeholder="price"
                    label="Price"
                    className="border border-[#ced4da] rounded-[4px] placeholder:opacity-[0.6]"
                    value={formValues.price}
                    onChange={(e) => handleChange("price", e.target.value)}
                  />
                </div>
                <div className="px-[14px] py-0 mb-[14px] lg:w-[33.33%] w-full">
                  <InputWithLabel
                    id="disccount_price"
                    type="number"
                    label="Disccount Price"
                    placeholder="disccount price"
                    className="border border-[#ced4da] rounded-[4px] placeholder:opacity-[0.6]"
                    value={formValues.disccount_price}
                    onChange={(e) =>
                      handleChange("disccount_price", e.target.value)
                    }
                  />
                </div>
                <div className="px-[14px] py-0 mb-[14px] lg:w-[33.33%] w-full">
                  <SelectMenu
                    placeholder="Select Category"
                    label="Category"
                    options={categoryOptions}
                    className="rounded-[4px] placeholder:opacity-[0.6]"
                    value={formValues.categoryid}
                    onChange={(val) => handleChange("categoryid", val)}
                  />
                </div>
                <div className="px-[14px] py-0 mb-[14px] lg:w-[33.33%] w-full">
                  <SelectMenu
                    placeholder="Select Sub Category"
                    label="Sub Category"
                    options={categorySubOptions}
                    className="rounded-[4px] placeholder:opacity-[0.6]"
                    value={formValues.subcategoryid}
                    onChange={(e) => handleChange("subcategoryid", e)}
                  />
                </div>
                <div className="px-[14px] py-0 mb-[14px] lg:w-[33.33%] w-full">
                  <SelectMenu
                    placeholder="Select Inner Category"
                    label="Inner Category"
                    options={categoryInnerOptions}
                    className="rounded-[4px] placeholder:opacity-[0.6]"
                    value={formValues.innercategoryid}
                    onChange={(e) => handleChange("innercategoryid", e)}
                  />
                </div>
                <div className="px-[14px] py-0 mb-[14px] lg:w-[33.33%] w-full">
                  <SelectMenu
                    placeholder="Select Shape"
                    label="Shape"
                    options={shapeOptions}
                    className="rounded-[4px] placeholder:opacity-[0.6]"
                    value={formValues.shape}
                    onChange={(e) => handleChange("shape", e)}
                  />
                </div>
                <div className="px-[14px] py-0 mb-[14px] lg:w-[33.33%] w-full">
                  <InputWithLabel
                    id="carat"
                    label="Carat"
                    placeholder="carat"
                    className="border border-[#ced4da] rounded-[4px] placeholder:opacity-[0.6]"
                    value={formValues.carat}
                    onChange={(e) => handleChange("carat", e.target.value)}
                  />
                </div>

                <div className="px-[14px] py-0 mb-[14px] lg:w-[33.33%] w-full">
                  <InputWithLabel
                    id="polish"
                    label="Polish"
                    placeholder="polish"
                    className="border border-[#ced4da] rounded-[4px] placeholder:opacity-[0.6]"
                    value={formValues.polish}
                    onChange={(e) => handleChange("polish", e.target.value)}
                  />
                </div>

                <div className="px-[14px] py-0 mb-[14px] lg:w-[33.33%] w-full">
                  <InputWithLabel
                    id="symmetry"
                    placeholder="symmetry"
                    label="Symmetry"
                    className="border border-[#ced4da] rounded-[4px] placeholder:opacity-[0.6]"
                    value={formValues.symmetry}
                    onChange={(e) => handleChange("symmetry", e.target.value)}
                  />
                </div>
                <div className="px-[14px] py-0 mb-[14px] lg:w-[33.33%] w-full">
                  <InputWithLabel
                    id="flourescence"
                    placeholder="flourescence"
                    label="Flourescence"
                    className="border border-[#ced4da] rounded-[4px] placeholder:opacity-[0.6]"
                    value={formValues.flourescence}
                    onChange={(e) =>
                      handleChange("flourescence", e.target.value)
                    }
                  />
                </div>
                <div className="px-[14px] py-0 mb-[14px] lg:w-[33.33%] w-full">
                  <InputWithLabel
                    id="measurements"
                    placeholder="measurements"
                    label="Measurements"
                    className="border border-[#ced4da] rounded-[4px] placeholder:opacity-[0.6]"
                    value={formValues.measurements}
                    onChange={(e) =>
                      handleChange("measurements", e.target.value)
                    }
                  />
                </div>
                <div className="px-[14px] py-0 mb-[14px] lg:w-[33.33%] w-full">
                  <InputWithLabel
                    id="cert_number"
                    placeholder="cert_number"
                    label="Cert Number"
                    className="border border-[#ced4da] rounded-[4px] placeholder:opacity-[0.6]"
                    value={formValues.cert_number}
                    onChange={(e) =>
                      handleChange("cert_number", e.target.value)
                    }
                  />
                </div>
                <div className="px-[14px] py-0 mb-[14px] lg:w-[33.33%] w-full">
                  <InputWithLabel
                    id="table"
                    placeholder="table"
                    label="Table"
                    className="border border-[#ced4da] rounded-[4px] placeholder:opacity-[0.6]"
                    value={formValues.table}
                    onChange={(e) => handleChange("table", e.target.value)}
                  />
                </div>
                <div className="px-[14px] py-0 mb-[14px] lg:w-[33.33%] w-full">
                  <InputWithLabel
                    id="crown_height"
                    placeholder="crown_height"
                    label="Crown Height"
                    className="border border-[#ced4da] rounded-[4px] placeholder:opacity-[0.6]"
                    value={formValues.crown_height}
                    onChange={(e) =>
                      handleChange("crown_height", e.target.value)
                    }
                  />
                </div>
                <div className="px-[14px] py-0 mb-[14px] lg:w-[33.33%] w-full">
                  <InputWithLabel
                    id="depth"
                    placeholder="depth"
                    label="Depth"
                    className="border border-[#ced4da] rounded-[4px] placeholder:opacity-[0.6]"
                    value={formValues.depth}
                    onChange={(e) => handleChange("depth", e.target.value)}
                  />
                </div>
                <div className="px-[14px] py-0 mb-[14px] lg:w-[33.33%] w-full">
                  <InputWithLabel
                    id="crown_angle"
                    placeholder="crown angle"
                    label="Crown Angle"
                    className="border border-[#ced4da] rounded-[4px] placeholder:opacity-[0.6]"
                    value={formValues.crown_angle}
                    onChange={(e) =>
                      handleChange("crown_angle", e.target.value)
                    }
                  />
                </div>
                <div className="px-[14px] py-0 mb-[14px] lg:w-[33.33%] w-full">
                  <InputWithLabel
                    id="pavilian_depth"
                    placeholder="pavilian depth"
                    label="Pavilian Depth"
                    className="border border-[#ced4da] rounded-[4px] placeholder:opacity-[0.6]"
                    value={formValues.pavilian_depth}
                    onChange={(e) =>
                      handleChange("pavilian_depth", e.target.value)
                    }
                  />
                </div>
                <div className="px-[14px] py-0 mb-[14px] lg:w-[33.33%] w-full">
                  <InputWithLabel
                    id="pavilian_angle"
                    placeholder="pavilian angle"
                    label="Pavilian Angle"
                    className="border border-[#ced4da] rounded-[4px] placeholder:opacity-[0.6]"
                    value={formValues.pavilian_angle}
                    onChange={(e) =>
                      handleChange("pavilian_angle", e.target.value)
                    }
                  />
                </div>
                <div className="px-[14px] py-0 mb-[14px] lg:w-[33.33%] w-full">
                  <InputWithLabel
                    id="status"
                    type="number"
                    placeholder="status"
                    label="Status"
                    className="border border-[#ced4da] rounded-[4px] placeholder:opacity-[0.6]"
                    value={formValues.status}
                    onChange={(e) => handleChange("status", e.target.value)}
                  />
                </div>

                <div className="px-[14px] py-0 mb-[14px] lg:w-[50%] w-full relative z-[0]">
                  <label
                    htmlFor="sizeimages"
                    className="flex items-center justify-center border border-dashed border-[#ced4da] h-[200px] w-full textsm text-center"
                  >
                    Size Images
                  </label>
                  <input
                    id="sizeimages"
                    type="file"
                    className="hidden"
                    onChange={(e) =>
                      handleChange("sizeimages", e.target.files[0])
                    }
                  />
                  <img
                    src={formValues?.sizeimages || ""}
                    alt={formValues?.sizeimages || ""}
                    className={`absolute top-0 h-full w-full px-[14px] left-0 z-[-1] ${
                      !formValues?.sizeimages?.length && "hidden"
                    }`}
                  />
                </div>
                <div className="px-[14px] py-0 mb-[14px] lg:w-[50%] w-full relative z-[0]">
                  <label
                    htmlFor="colorimage"
                    className="flex items-center justify-center border border-dashed border-[#ced4da] h-[200px] w-full textsm text-center"
                  >
                    Color Image
                  </label>
                  <input
                    id="colorimage"
                    type="file"
                    className="hidden"
                    onChange={(e) =>
                      handleChange("colorimage", e.target.files[0])
                    }
                  />

                  <img
                    src={formValues?.colorimage || ""}
                    alt={formValues?.colorimage || ""}
                    className={`absolute top-0 h-full w-full px-[14px] left-0 z-[-1] ${
                      !formValues?.colorimage?.length && "hidden"
                    }`}
                  />
                </div>
                <div className="px-[14px] py-0 mb-[14px] lg:w-[50%] w-full relative z-0">
                  <label
                    htmlFor="clarityimage"
                    className="flex items-center justify-center border border-dashed border-[#ced4da] h-[200px] w-full textsm text-center"
                  >
                    Clarity Image
                  </label>
                  <input
                    id="clarityimage"
                    type="file"
                    className="hidden"
                    onChange={(e) =>
                      handleChange("clarityimage", e.target.files[0])
                    }
                  />
                  <img
                    src={formValues?.clarityimage || ""}
                    alt={formValues?.clarityimage || ""}
                    className={`absolute top-0 h-full w-full px-[14px] left-0 z-[-1] ${
                      !formValues?.clarityimage?.length && "hidden"
                    }`}
                  />
                </div>
                <div className="px-[14px] py-0 mb-[14px] lg:w-[50%] w-full relative z-0">
                  <label
                    htmlFor="cutimage"
                    className="flex items-center justify-center border border-dashed border-[#ced4da] h-[200px] w-full textsm text-center"
                  >
                    Cut Image
                  </label>
                  <input
                    id="cutimage"
                    type="file"
                    className="hidden"
                    onChange={(e) =>
                      handleChange("cutimage", e.target.files[0])
                    }
                  />
                  <img
                    src={formValues?.cutimage || ""}
                    alt={formValues?.cutimage || ""}
                    className={`absolute top-0 h-full w-full px-[14px] left-0 z-[-1] ${
                      !formValues?.cutimage?.length && "hidden"
                    }`}
                  />
                </div>
                <div className="px-[14px] py-0 mb-[14px] w-full relative z-0">
                  <label
                    htmlFor="productimage"
                    className="flex items-center justify-center border border-dashed border-[#ced4da] h-[100px] mb-[20px] w-full textsm text-center"
                  >
                    Product Image
                  </label>
                  <input
                    type="file"
                    id="productimage"
                    className="hidden"
                    multiple
                    onChange={handleChangeImage}
                  />
                  <div className="flex items-center justify-center gap-[10px] absolute z-[-1] top-0">
                    {formValues?.productimage?.map((item) => {
                      return (
                        <img
                          src={item || ""}
                          alt={"image"}
                          className={`w-[235px] h-[100px] px-[14px] z-[-1] ${
                            !formValues?.productimage?.length && "hidden"
                          }`}
                        />
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
            <div className="col-span-4 flex-1 w-full gap-y-[14px] flex flex-col">
              <div className="border border-[#dee2e6] rounded-[4px]">
                <div className="px-[14px] py-0 mb-[14px] w-full">
                  <InputWithLabel
                    id="size"
                    label="Size"
                    placeholder="size"
                    className="border border-[#ced4da] rounded-[4px] placeholder:opacity-[0.6]"
                    value={formValues.size}
                    onChange={(e) => handleChange("size", e.target.value)}
                  />
                </div>
                <div className="p-[14px] py-0 mb-[14px] w-full">
                  <TextAreaWithLabel
                    label={"Size Description"}
                    placeholder="size_desc"
                    value={formValues.size_desc}
                    textAreaClassName="border border-[#ced4da] rounded-[4px] placeholder:opacity-[0.6] h-[145px]"
                    className="md:col-span-2 "
                    onChange={(e) => handleChange("size_desc", e.target.value)}
                  />
                </div>
              </div>
              <div className="border border-[#dee2e6] rounded-[4px]">
                <div className="px-[14px] py-0 mb-[14px] w-full">
                  <SelectMenu
                    options={colorOptions}
                    placeholder="Select Colour"
                    label="Colour"
                    className="rounded-[4px] placeholder:opacity-[0.6]"
                    value={formValues.colour}
                    onChange={(e) => handleChange("colour", e)}
                  />
                </div>
                <div className="p-[14px] py-0 mb-[14px] w-full">
                  <TextAreaWithLabel
                    label={"Color Description"}
                    placeholder="color_desc"
                    value={formValues.color_desc}
                    textAreaClassName="border border-[#ced4da] rounded-[4px] placeholder:opacity-[0.6] h-[145px]"
                    className="md:col-span-2"
                    onChange={(e) => handleChange("color_desc", e.target.value)}
                  />
                </div>
              </div>
              <div className="border border-[#dee2e6] rounded-[4px]">
                <div className="px-[14px] py-0 mb-[14px] w-full">
                  <SelectMenu
                    placeholder="Select Clarity"
                    label="Clarity"
                    options={clarityOptions}
                    className="rounded-[4px] placeholder:opacity-[0.6]"
                    value={formValues.clarity}
                    onChange={(e) => handleChange("clarity", e)}
                  />
                </div>
                <div className="p-[14px] py-0 mb-[14px] w-full">
                  <TextAreaWithLabel
                    label={"Clarity Description"}
                    placeholder="clarity_desc"
                    value={formValues.clarity_desc}
                    textAreaClassName="border border-[#ced4da] rounded-[4px] placeholder:opacity-[0.6] h-[145px]"
                    className="md:col-span-2"
                    onChange={(e) =>
                      handleChange("clarity_desc", e.target.value)
                    }
                  />
                </div>
              </div>
              <div className="border border-[#dee2e6] rounded-[4px]">
                <div className="px-[14px] py-0 mb-[14px] w-full">
                  <SelectMenu
                    options={cutOptions}
                    placeholder="Select Cut"
                    label="Cut"
                    className="rounded-[4px] placeholder:opacity-[0.6]"
                    value={formValues.cut}
                    onChange={(e) => handleChange("cut", e)}
                  />
                </div>
                <div className="p-[14px] py-0 mb-[14px] w-full">
                  <TextAreaWithLabel
                    label={"Cut Description"}
                    placeholder="cut_desc"
                    value={formValues.cut_desc}
                    textAreaClassName="border border-[#ced4da] rounded-[4px] placeholder:opacity-[0.6] h-[145px]"
                    className="md:col-span-2"
                    onChange={(e) => handleChange("cut_desc", e.target.value)}
                  />
                </div>
              </div>
              <div className="rounded-[4px] flex justify-between items-center py-[7px] gap-4">
                <Button
                  className="flex-1 rounded-[4px] bg-transparent border-[#D32F2F] border text-[#D32F2F] hover:bg-[#D32F2F] hover:text-white"
                  onClick={handleDiscard}
                >
                  <span>Cancel</span>
                </Button>
                <Button
                  className="flex-1 bg-[#2196F3] rounded-[4px] border-[#2196F3] border hover:text-[#000] hover:bg-white text-[#fff]"
                  onClick={handleSubmit}
                >
                  <span>
                    {state?.editdata ? "Update Product" : "Create Product"}
                  </span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewProduct;
