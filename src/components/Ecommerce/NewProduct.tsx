import { useEffect, useState } from "react";
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
import { useNavigate, useParams } from "react-router-dom";
import Loading from "../Common/Loading";
import { UploadImage } from "@/services/adminService";
import { getSingleProduct, updateProduct } from "@/services/productService";
import { RiUploadCloud2Line } from "react-icons/ri";
import { Label } from "../ui/label";

interface CustomError {
  code?: number;
}

const NewProduct = () => {
  const queryClient = useQueryClient();
  const [imageArray, setImageArray] = useState<any>(["", "", "", ""]);
  const [base64imageArray, setbase64imageArray] = useState(["", "", "", ""]);
  const navigate = useNavigate();
  const { editId } = useParams();
  const [isopen, setIsOpen] = useState<boolean>(false);
  const [errors, setErrors] = useState<any>({});
  const [indexNumber, setIndexNuber] = useState(0);
  const [priviewImages, setPriviewImages] = useState<any>({
    sizeimages: null,
    colorimage: null,
    clarityimage: null,
    cutimage: null,
    productimage: [],
  });
  const { data: editdata } = useQuery({
    queryKey: ["GET_SiNGLE_PRODUCT", { editId }],
    queryFn: () => getSingleProduct(editId || ""),
  });

  console.log("editdata", editdata?.data);

  const [formValues, setFormValues] = useState<any>({
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

  const validateForm = () => {
    let formIsValid = true;
    const newErrors: any = {};
    if (!formValues.maintitle?.trim()) {
      formIsValid = false;
      newErrors.maintitle = "main title required";
    }
    if (!formValues.title?.trim()) {
      formIsValid = false;
      newErrors.title = "title required";
    }
    if (!formValues.price?.trim()) {
      formIsValid = false;
      newErrors.price = "price required";
    }
    if (!formValues.disccount_price?.trim()) {
      formIsValid = false;
      newErrors.disccount_price = "disccount Price required";
    }
    if (!formValues.categoryid?.trim()) {
      formIsValid = false;
      newErrors.categoryid = "category required";
    }
    if (!formValues.shape?.trim()) {
      formIsValid = false;
      newErrors.shape = "shape required";
    }
    if (!formValues.colour?.trim()) {
      formIsValid = false;
      newErrors.colour = "colour required";
    }
    if (!formValues.clarity?.trim()) {
      formIsValid = false;
      newErrors.clarity = "clarity required";
    }
    if (!formValues.polish?.trim()) {
      formIsValid = false;
      newErrors.polish = "polish required";
    }
    if (!formValues.cut?.trim()) {
      formIsValid = false;
      newErrors.cut = "cut required";
    }
    if (!formValues.symmetry?.trim()) {
      formIsValid = false;
      newErrors.symmetry = "symmetry required";
    }
    if (!formValues.flourescence?.trim()) {
      formIsValid = false;
      newErrors.flourescence = "flourescence required";
    }
    if (!formValues.measurements?.trim()) {
      formIsValid = false;
      newErrors.measurements = "measurements required";
    }
    if (!formValues.cert_number?.trim()) {
      formIsValid = false;
      newErrors.cert_number = "cert number required";
    }
    if (!formValues.table?.trim()) {
      formIsValid = false;
      newErrors.table = "table number required";
    }
    if (!formValues.crown_height?.trim()) {
      formIsValid = false;
      newErrors.crown_height = "crown height required";
    }
    if (!formValues.depth?.trim()) {
      formIsValid = false;
      newErrors.depth = "depth required";
    }
    if (!formValues.crown_angle?.trim()) {
      formIsValid = false;
      newErrors.crown_angle = "crown angle required";
    }
    if (!formValues.pavilian_depth?.trim()) {
      formIsValid = false;
      newErrors.pavilian_depth = "pavilian depth required";
    }
    if (!formValues.pavilian_angle?.trim()) {
      formIsValid = false;
      newErrors.pavilian_angle = "pavilian angle required";
    }
    if (!formValues.status?.trim()) {
      formIsValid = false;
      newErrors.status = "status required";
    }
    if (!formValues.size?.trim()) {
      formIsValid = false;
      newErrors.size = "size required";
    }
    if (!formValues.size_desc?.trim()) {
      formIsValid = false;
      newErrors.size_desc = "size desc required";
    }
    if (!formValues.color_desc?.trim()) {
      formIsValid = false;
      newErrors.color_desc = "color desc required";
    }
    if (!formValues.clarity_desc?.trim()) {
      formIsValid = false;
      newErrors.clarity_desc = "clarity desc required";
    }
    if (!formValues.cut_desc?.trim()) {
      formIsValid = false;
      newErrors.cut_desc = "cut desc required";
    }
    if (!formValues.sizeimages) {
      formIsValid = false;
      newErrors.sizeimages = "size images required";
    }
    if (!formValues.colorimage) {
      formIsValid = false;
      newErrors.colorimage = "color image required";
    }
    if (!formValues.clarityimage) {
      formIsValid = false;
      newErrors.clarityimage = "clarity image required";
    }
    if (!formValues.cutimage) {
      formIsValid = false;
      newErrors.cutimage = "cut image required";
    }
    if (!formValues?.productimage?.length) {
      formIsValid = false;
      newErrors.productimage = "product image required";
    }
    setErrors(newErrors);
    return formIsValid;
  };

  useEffect(() => {
    if (editdata?.data) {
      setFormValues({
        ...editdata?.data,
        productId: editdata?.data.id,
        categoryid: editdata?.data?.categoryid?.id || "",
        subcategoryid: editdata?.data?.subcategoryid?.id || "",
        innercategoryid: editdata?.data?.innercategoryid?.id || "",
        size: editdata?.data?.diamond_size.size || "",
        size_desc: editdata?.data?.diamond_size.size_desc || "",
        sizeimages: editdata?.data?.diamond_size.sizeimages || "",
        cut_desc: editdata?.data?.diamond_cut.cut_desc || "",
        cutimage: editdata?.data?.diamond_cut.cutimage || "",
        cut: editdata?.data?.cut || "",
        colour: editdata?.data?.colour || "",
        color_desc: editdata?.data?.diamond_color.color_desc || "",
        colorimage: editdata?.data?.diamond_color.colorimage || "",
        clarity: editdata?.data?.clarity || "",
        clarity_desc: editdata?.data?.diamond_clarity.clarity_desc || "",
        clarityimage: editdata?.data?.diamond_clarity.clarityimage || "",
        shape: editdata?.data?.shape || "",
      });
      imageArray[0] = editdata?.data?.productimage?.[0] || "";
      imageArray[1] = editdata?.data?.productimage?.[1] || "";
      imageArray[2] = editdata?.data?.productimage?.[2] || "";
      imageArray[3] = editdata?.data?.productimage?.[3] || "";
      setImageArray([...imageArray]);
    }
  }, [editdata?.data]);
  let activePage = 1;
  const [imgUrl, setImgUrl] = useState("");
  const { data: categoryData } = useQuery({
    queryKey: ["GET_CATEGORY", { activePage }],
    queryFn: () => getCategory({ page: activePage, pageSize: 10 }),
  });

  const categoryOptions = categoryData?.data?.modifiedCategories
    ? categoryData?.data?.modifiedCategories?.map((item: any) => ({
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
    ? subcategoryData?.data?.data?.categories?.map((item: any) => ({
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
    ? InnercategoryData?.data?.data?.innercategories?.map((item: any) => ({
        label: item.name,
        value: item.id,
      }))
    : [];

  const { data: shapeData } = useQuery({
    queryKey: ["GET_SHAPE", { activePage }],
    queryFn: () => getShape({ page: activePage, pageSize: 10 }),
  });

  const shapeOptions = shapeData?.Shapedata
    ? shapeData?.Shapedata?.map((item: any) => ({
        label: item.name,
        value: item.name,
      }))
    : [];

  const { data: colorData } = useQuery({
    queryKey: ["GET_COLOR", { activePage }],
    queryFn: () => getColor({ page: activePage, pageSize: 10 }),
  });

  const colorOptions = colorData?.data?.Colordata
    ? colorData?.data?.Colordata?.map((item: any) => ({
        label: item.name,
        value: item.name,
      }))
    : [];

  const { data: clarityData } = useQuery({
    queryKey: ["GET_CLARITY", { activePage }],
    queryFn: () => getClarity({ page: activePage, pageSize: 10 }),
  });
  const clarityOptions = clarityData?.data?.Claritydata
    ? clarityData?.data?.Claritydata?.map((item: any) => ({
        label: item.name,
        value: item.name,
      }))
    : [];

  const { data: cutData } = useQuery({
    queryKey: ["GET_CUT", { activePage }],
    queryFn: () => getCut({ page: activePage, pageSize: 10 }),
  });

  const cutOptions = cutData?.data?.Cutdata
    ? cutData?.data?.Cutdata?.map((item: any) => ({
        label: item.name,
        value: item.name,
      }))
    : [];

  const handleChange = (name: string, value: any) => {
    if (editdata?.data) {
      if (name === "sizeimages") {
        setImgUrl(name);
        const payload = new FormData();
        setIsOpen(true);
        payload.append("image", value);
        UploadImagedata(payload);
      } else if (name === "colorimage") {
        setImgUrl(name);
        const payload = new FormData();
        setIsOpen(true);
        payload.append("image", value);
        UploadImagedata(payload);
      } else if (name === "clarityimage") {
        setImgUrl(name);
        const payload = new FormData();
        setIsOpen(true);
        payload.append("image", value);
        UploadImagedata(payload);
      } else if (name === "cutimage") {
        setImgUrl(name);
        const payload = new FormData();
        setIsOpen(true);
        payload.append("image", value);
        UploadImagedata(payload);
      }
    }
    setFormValues((prev: any) => ({ ...prev, [name]: value }));
  };

  function convertFileToBase64(file: any) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
    });
  }
  const handleChangeImage = async (e: any, index: any) => {
    const { files } = e.target;
    // if (editdata?.data) {
    //   const payload = new FormData();
    //   setIsOpen(true);
    //   payload.append("image", files[0]);
    //   UploadImagedata(payload);
    // }
    const image = await convertFileToBase64(files[0]);
    imageArray[index] = image;
    setImageArray([...imageArray]);
    base64imageArray[index] = files[0];
    setbase64imageArray([...base64imageArray]);

    if (files) {
      if (files?.length) {
        if (editdata?.data) {
          setIsOpen(true);
          const payload = new FormData();
          payload.append("image", files[0]);
          setIndexNuber(index);
          UploadMultiImagedata(payload);
        } else {
          const images: File[] = [];
          for (let i = 0; i < files.length; i++) {
            images.push(files[i]);
          }
          setFormValues((prev: any) => ({ ...prev, productimage: images }));
        }
      } else {
        toast({
          variant: "error",
          title: "More than 4 images are allowed",
        });
      }
    }
    // const { files } = e.target;
    // if (files) {
    //   const images: File[] = [];

    //   for (let i = 0; i < files.length; i++) {
    //     images.push(files[i]);
    //   }
    //   setFormValues((prev) => ({ ...prev, productimage: images }));
    // }
  };

  const { mutate: UploadImagedata } = useMutation({
    mutationFn: UploadImage,
    onSuccess: (res) => {
      setFormValues((prev: any) => ({
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
      formValues.productimage[indexNumber] = res?.data?.data?.image;
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
      if ((error as CustomError)?.code === 401) {
        navigate("/auth/login");
      }
      toast({
        variant: "error",
        title: (error as { data?: { message?: string } })?.data?.message || "",
      });
    },
  });

  const { mutate: updateproducts } = useMutation({
    mutationFn: updateProduct,
    onSuccess: () => {
      toast({
        variant: "success",
        title: "Product updated successfully.",
      });
      setIsOpen(false);
      queryClient.invalidateQueries({ queryKey: ["GET_PRODUCT"] });
      navigate("/gems/product-list");
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

  const handleSubmit = () => {
    if (editdata?.data) {
      setIsOpen(true);
      updateproducts(formValues);
    } else {
      if (validateForm()) {
        const payload = new FormData();
        for (const key in formValues) {
          if (key !== "productimage") {
            payload.append(key, formValues[key]);
          }
        }
        base64imageArray.forEach((image) => {
          payload.append("productimage", image);
        });
        createProduct(payload);
      }
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
    navigate("/gems/product-list");
  };
  const base64fuc = async (name: string, imageData: any) => {
    if (editdata?.data) {
      setPriviewImages((prev: any) => ({ ...prev, [name]: formValues[name] }));
    } else {
      if (name == "productimage") {
        priviewImages.productimage = [];
        setPriviewImages({ ...priviewImages });
        for (let key of imageData) {
          const image = await convertFileToBase64(key);
          priviewImages.productimage.push(image);
          setPriviewImages({ ...priviewImages });
        }
      } else {
        const image = await convertFileToBase64(imageData);
        setPriviewImages((prev: any) => ({ ...prev, [name]: image }));
      }
    }
  };

  useEffect(() => {
    if (formValues.sizeimages) {
      base64fuc("sizeimages", formValues?.sizeimages);
    }
    if (formValues.colorimage) {
      base64fuc("colorimage", formValues?.colorimage);
    }
    if (formValues.clarityimage) {
      base64fuc("clarityimage", formValues?.clarityimage);
    }
    if (formValues.cutimage) {
      base64fuc("cutimage", formValues?.cutimage);
    }
    if (formValues.productimage?.length) {
      base64fuc("productimage", formValues?.productimage);
    }
  }, [formValues]);

  return (
    <div className="custom_contener !pb-[28px]">
      {isPending && <Loading />}
      {isopen && <Loading />}
      <div>
        <div className="mb-0 bg-[#ffffff] rounded-[4px] p-[17.5px]">
          <div className="mb-[21px] text-[#212121] font-bold text-[17.5px] font-Nunito">
            {editdata?.data ? "Edit Product" : "Create Product"}
          </div>
          <div className="grid grid-cols-12 gap-[14px] mx-0 mt-0">
            <div className="col-span-12 p-0 w-full">
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
                  <div className="text-[red] text-[13px]">
                    {errors?.maintitle}
                  </div>
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
                  <div className="text-[red] text-[13px]">{errors?.title}</div>
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
                  <div className="text-[red] text-[13px]">{errors?.price}</div>
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
                  <div className="text-[red] text-[13px]">
                    {errors?.disccount_price}
                  </div>
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
                  <div className="text-[red] text-[13px]">
                    {errors?.categoryid}
                  </div>
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
                  <div className="text-[red] text-[13px]">{errors?.shape}</div>
                </div>
                <div className="px-[14px] py-0 mb-[14px] lg:w-[33.33%] w-full">
                  <InputWithLabel
                    id="carat"
                    label="Carat"
                    type="number"
                    placeholder="carat"
                    className="border border-[#ced4da] rounded-[4px] placeholder:opacity-[0.6]"
                    value={formValues.carat}
                    onChange={(e) => handleChange("carat", e.target.value)}
                  />
                  <div className="text-[red] text-[13px]">{errors?.carat}</div>
                </div>

                <div className="px-[14px] py-0 mb-[14px] lg:w-[33.33%] w-full">
                  <InputWithLabel
                    id="polish"
                    label="Polish"
                    type="text"
                    placeholder="polish"
                    className="border border-[#ced4da] rounded-[4px] placeholder:opacity-[0.6]"
                    value={formValues.polish}
                    onChange={(e) => handleChange("polish", e.target.value)}
                  />
                  <div className="text-[red] text-[13px]">{errors?.polish}</div>
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
                  <div className="text-[red] text-[13px]">
                    {errors?.symmetry}
                  </div>
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
                  <div className="text-[red] text-[13px]">
                    {errors?.flourescence}
                  </div>
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
                  <div className="text-[red] text-[13px]">
                    {errors?.measurements}
                  </div>
                </div>
                <div className="px-[14px] py-0 mb-[14px] lg:w-[33.33%] w-full">
                  <InputWithLabel
                    id="cert_number"
                    type="number"
                    placeholder="cert_number"
                    label="Cert Number"
                    className="border border-[#ced4da] rounded-[4px] placeholder:opacity-[0.6]"
                    value={formValues.cert_number}
                    onChange={(e) =>
                      handleChange("cert_number", e.target.value)
                    }
                  />
                  <div className="text-[red] text-[13px]">
                    {errors?.cert_number}
                  </div>
                </div>
                <div className="px-[14px] py-0 mb-[14px] lg:w-[33.33%] w-full">
                  <InputWithLabel
                    id="table"
                    placeholder="table"
                    type="number"
                    label="Table"
                    className="border border-[#ced4da] rounded-[4px] placeholder:opacity-[0.6]"
                    value={formValues.table}
                    onChange={(e) => handleChange("table", e.target.value)}
                  />
                  <div className="text-[red] text-[13px]">{errors?.table}</div>
                </div>
                <div className="px-[14px] py-0 mb-[14px] lg:w-[33.33%] w-full">
                  <InputWithLabel
                    id="crown_height"
                    placeholder="crown_height"
                    label="Crown Height"
                    type="number"
                    className="border border-[#ced4da] rounded-[4px] placeholder:opacity-[0.6]"
                    value={formValues.crown_height}
                    onChange={(e) =>
                      handleChange("crown_height", e.target.value)
                    }
                  />
                  <div className="text-[red] text-[13px]">
                    {errors?.crown_height}
                  </div>
                </div>
                <div className="px-[14px] py-0 mb-[14px] lg:w-[33.33%] w-full">
                  <InputWithLabel
                    id="depth"
                    placeholder="depth"
                    label="Depth"
                    type="text"
                    className="border border-[#ced4da] rounded-[4px] placeholder:opacity-[0.6]"
                    value={formValues.depth}
                    onChange={(e) => handleChange("depth", e.target.value)}
                  />
                  <div className="text-[red] text-[13px]">{errors?.depth}</div>
                </div>
                <div className="px-[14px] py-0 mb-[14px] lg:w-[33.33%] w-full">
                  <InputWithLabel
                    id="crown_angle"
                    placeholder="crown angle"
                    label="Crown Angle"
                    type="number"
                    className="border border-[#ced4da] rounded-[4px] placeholder:opacity-[0.6]"
                    value={formValues.crown_angle}
                    onChange={(e) =>
                      handleChange("crown_angle", e.target.value)
                    }
                  />
                  <div className="text-[red] text-[13px]">
                    {errors?.crown_angle}
                  </div>
                </div>
                <div className="px-[14px] py-0 mb-[14px] lg:w-[33.33%] w-full">
                  <InputWithLabel
                    id="pavilian_depth"
                    placeholder="pavilian depth"
                    label="Pavilian Depth"
                    type="text"
                    className="border border-[#ced4da] rounded-[4px] placeholder:opacity-[0.6]"
                    value={formValues.pavilian_depth}
                    onChange={(e) =>
                      handleChange("pavilian_depth", e.target.value)
                    }
                  />
                  <div className="text-[red] text-[13px]">
                    {errors?.pavilian_depth}
                  </div>
                </div>
                <div className="px-[14px] py-0 mb-[14px] lg:w-[33.33%] w-full">
                  <InputWithLabel
                    id="pavilian_angle"
                    placeholder="pavilian angle"
                    type="number"
                    label="Pavilian Angle"
                    className="border border-[#ced4da] rounded-[4px] placeholder:opacity-[0.6]"
                    value={formValues.pavilian_angle}
                    onChange={(e) =>
                      handleChange("pavilian_angle", e.target.value)
                    }
                  />
                  <div className="text-[red] text-[13px]">
                    {errors?.pavilian_angle}
                  </div>
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
                  <div className="text-[red] text-[13px]">{errors?.status}</div>
                </div>
                <div className="w-full">
                  <div className="px-[14px] py-0 mb-[14px] w-[50%]">
                    <InputWithLabel
                      id="size"
                      label="Size"
                      placeholder="size"
                      className="border border-[#ced4da] rounded-[4px] placeholder:opacity-[0.6]"
                      value={formValues.size}
                      onChange={(e) => handleChange("size", e.target.value)}
                    />
                    <div className="text-[red] text-[13px]">{errors?.size}</div>
                  </div>
                  <div className="p-[14px] py-0 mb-[14px] w-full">
                    <TextAreaWithLabel
                      label={"Size Description"}
                      placeholder="size_desc"
                      value={formValues.size_desc}
                      textAreaClassName="border border-[#ced4da] rounded-[4px] placeholder:opacity-[0.6] h-[145px]"
                      className="md:col-span-2 "
                      onChange={(e) =>
                        handleChange("size_desc", e.target.value)
                      }
                    />
                    <div className="text-[red] text-[13px]">
                      {errors?.size_desc}
                    </div>
                  </div>
                </div>
                <div className="w-full">
                  <div className="px-[14px] py-0 mb-[14px] w-[50%]">
                    <SelectMenu
                      options={colorOptions}
                      placeholder="Select Colour"
                      label="Colour"
                      className="rounded-[4px] placeholder:opacity-[0.6]"
                      value={formValues.colour}
                      onChange={(e) => handleChange("colour", e)}
                    />
                    <div className="text-[red] text-[13px]">
                      {errors?.colour}
                    </div>
                  </div>
                  <div className="p-[14px] py-0 mb-[14px] w-full">
                    <TextAreaWithLabel
                      label={"Color Description"}
                      placeholder="color_desc"
                      value={formValues.color_desc}
                      textAreaClassName="border border-[#ced4da] rounded-[4px] placeholder:opacity-[0.6] h-[145px]"
                      className="md:col-span-2"
                      onChange={(e) =>
                        handleChange("color_desc", e.target.value)
                      }
                    />
                    <div className="text-[red] text-[13px]">
                      {errors?.color_desc}
                    </div>
                  </div>
                </div>
                <div className="w-full">
                  <div className="px-[14px] py-0 mb-[14px] w-[50%]">
                    <SelectMenu
                      placeholder="Select Clarity"
                      label="Clarity"
                      options={clarityOptions}
                      className="rounded-[4px] placeholder:opacity-[0.6]"
                      value={formValues.clarity}
                      onChange={(e) => handleChange("clarity", e)}
                    />
                    <div className="text-[red] text-[13px]">
                      {errors?.clarity}
                    </div>
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
                    <div className="text-[red] text-[13px]">
                      {errors?.clarity_desc}
                    </div>
                  </div>
                </div>
                <div className="w-full">
                  <div className="px-[14px] py-0 mb-[14px] w-[50%]">
                    <SelectMenu
                      options={cutOptions}
                      placeholder="Select Cut"
                      label="Cut"
                      className="rounded-[4px] placeholder:opacity-[0.6]"
                      value={formValues.cut}
                      onChange={(e) => handleChange("cut", e)}
                    />
                    <div className="text-[red] text-[13px]">{errors?.cut}</div>
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
                    <div className="text-[red] text-[13px]">
                      {errors?.cut_desc}
                    </div>
                  </div>
                </div>
                <div className="px-[14px] py-0 mb-[14px] lg:w-[50%] w-full relative z-[0]">
                  <Label className="font-ArboriaMedium text-xs font-[400] md:text-sm">
                    Size Images
                  </Label>
                  <label
                    htmlFor="sizeimages"
                    className="flex items-center text-[30px] gap-[10px] justify-center border border-dashed border-[#ced4da] h-[200px] w-full textsm text-center"
                  >
                    <RiUploadCloud2Line />
                    <span className="text-[15px]"> Upload Image</span>
                  </label>
                  <input
                    id="sizeimages"
                    type="file"
                    className="hidden"
                    onChange={(e: any) =>
                      handleChange("sizeimages", e.target.files[0])
                    }
                  />
                  {priviewImages.sizeimages && (
                    <img
                      src={priviewImages?.sizeimages || ""}
                      alt={priviewImages?.sizeimages || ""}
                      className={`absolute top-0 h-[80%] mt-[30px] object-contain w-full px-[14px] left-0 z-[-1] `}
                    />
                  )}
                  <div className="text-[red] text-[13px]">
                    {errors?.sizeimages}
                  </div>
                </div>
                <div className="px-[14px] py-0 mb-[14px] lg:w-[50%] w-full relative z-[0]">
                  <Label className="font-ArboriaMedium text-xs font-[400] md:text-sm">
                    Color Image
                  </Label>
                  <label
                    htmlFor="colorimage"
                    className="flex items-center gap-[10px] text-[30px] justify-center border border-dashed border-[#ced4da] h-[200px] w-full textsm text-center"
                  >
                    <RiUploadCloud2Line />
                    <span className="text-[15px]"> Upload Image</span>
                  </label>
                  <input
                    id="colorimage"
                    type="file"
                    className="hidden"
                    onChange={(e: any) =>
                      handleChange("colorimage", e.target.files[0])
                    }
                  />

                  {priviewImages.colorimage && (
                    <img
                      src={priviewImages?.colorimage || ""}
                      alt={priviewImages?.colorimage || ""}
                      className={`absolute top-0 h-[80%] mt-[30px] object-contain w-full px-[14px] left-0 z-[-1] `}
                    />
                  )}
                  <div className="text-[red] text-[13px]">
                    {errors?.colorimage}
                  </div>
                </div>
                <div className="px-[14px] py-0 mb-[14px] lg:w-[50%] w-full relative z-0">
                  <Label className="font-ArboriaMedium text-xs font-[400] md:text-sm">
                    Clarity Image
                  </Label>
                  <label
                    htmlFor="clarityimage"
                    className="flex items-center text-[30px] gap-[10px] justify-center border border-dashed border-[#ced4da] h-[200px] w-full textsm text-center"
                  >
                    <RiUploadCloud2Line />
                    <span className="text-[15px]"> Upload Image</span>
                  </label>
                  <input
                    id="clarityimage"
                    type="file"
                    className="hidden"
                    onChange={(e: any) =>
                      handleChange("clarityimage", e.target.files[0])
                    }
                  />
                  {priviewImages?.clarityimage && (
                    <img
                      src={priviewImages?.clarityimage || ""}
                      alt={priviewImages?.clarityimage || ""}
                      className={`absolute top-0 h-[80%] mt-[30px] object-contain w-full px-[14px] left-0 z-[-1] `}
                    />
                  )}
                  <div className="text-[red] text-[13px]">
                    {errors?.clarityimage}
                  </div>
                </div>
                <div className="px-[14px] py-0 mb-[14px] lg:w-[50%] w-full relative z-0">
                  <Label className="font-ArboriaMedium text-xs font-[400] md:text-sm">
                    Cut Image
                  </Label>
                  <label
                    htmlFor="cutimage"
                    className="flex items-center text-[30px] gap-[10px] justify-center border border-dashed border-[#ced4da] h-[200px] w-full textsm text-center"
                  >
                    <RiUploadCloud2Line />
                    <span className="text-[15px]"> Upload Image</span>
                  </label>
                  <input
                    id="cutimage"
                    type="file"
                    className="hidden"
                    onChange={(e: any) =>
                      handleChange("cutimage", e.target.files[0])
                    }
                  />
                  {priviewImages?.cutimage && (
                    <img
                      src={priviewImages?.cutimage || ""}
                      alt={priviewImages?.cutimage || ""}
                      className={`absolute top-0 h-[80%] mt-[30px] w-full object-contain px-[14px] left-0 z-[-1] `}
                    />
                  )}
                  <div className="text-[red] text-[13px]">
                    {errors?.cutimage}
                  </div>
                </div>
                <div className="px-[14px] py-0 w-full relative z-0">
                  <Label className="font-ArboriaMedium text-xs font-[400] md:text-sm">
                    Product Image
                  </Label>
                  <div className="flex gap-[10px]">
                    {imageArray.map((item: any, ind: number) => {
                      return (
                        <div className="w-full relative h-[200px]">
                          <label className="flex flex-col text-[30px] items-center justify-center border border-dashed border-[#ced4da] h-full w-full textsm text-center">
                            <RiUploadCloud2Line />
                            <span className="text-[15px]"> Upload Image</span>
                          </label>
                          <input
                            type="file"
                            className="absolute top-0 left-0 opacity-0 w-full h-full"
                            onChange={(e) => handleChangeImage(e, ind)}
                          />
                          <div className="flex items-center justify-center h-full w-full gap-[10px] absolute z-[-1] top-0">
                            {item && (
                              <img
                                src={item || ""}
                                alt={"image"}
                                className={`w-full h-full px-[14px] object-contain z-[-1] ${
                                  !formValues?.productimage?.length && "hidden"
                                }`}
                              />
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  <div className="text-[red] text-[13px]">
                    {errors?.productimage}
                  </div>

                  <div className="rounded-[4px] flex justify-end mb-[30px] items-center py-[7px] gap-4 max-[]">
                    <Button
                      className="flex-1 rounded-[4px] max-w-[250px] bg-transparent border-[#D32F2F] border text-[#D32F2F] hover:bg-[#D32F2F] hover:text-white"
                      onClick={handleDiscard}
                    >
                      <span>Cancel</span>
                    </Button>
                    <Button
                      className="flex-1 bg-[#2196F3] max-w-[250px] rounded-[4px] border-[#2196F3] border hover:text-[#000] hover:bg-white text-[#fff]"
                      onClick={handleSubmit}
                    >
                      <span>
                        {editdata?.data ? "Update Product" : "Create Product"}
                      </span>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
            {/* <div className="col-span-4 flex-1 w-full gap-y-[14px] flex flex-col"> */}

            {/* </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewProduct;
