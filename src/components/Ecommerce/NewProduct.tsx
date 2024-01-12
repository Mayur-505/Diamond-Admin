import { useState } from "react";
import { Button } from "../ui/button";
import InputWithLabel from "../Common/InputWithLabel";
import TextAreaWithLabel from "../Common/TextAreaWithLabel";
import SelectMenu from "../Common/SelectMenu";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getInnerCategory } from "@/services/innercateGoryService";
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

const NewProduct = () => {
  const queryClient = useQueryClient();
  const [activePage, setActivePage] = useState(1);
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

  const { mutate: createProduct } = useMutation({
    mutationFn: addProduct,
    onSuccess: () => {
      toast({
        description: "Sub category Created Successfully.",
      });
      queryClient.invalidateQueries({ queryKey: ["addCategory"] });
    },
    onError: () => {
      toast({ description: "Something went wrong." });
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

    createProduct(payload);
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
  console.log("formValues", formValues);

  return (
    <div className="custom_contener !pb-[28px]">
      <div>
        <div className="mb-0 bg-[#ffffff] rounded-[4px] p-[17.5px]">
          <div className="mb-[21px] text-[#212121] font-bold text-[17.5px] font-Nunito">
            Create Product
          </div>
          <div className="grid grid-cols-12 gap-[14px] mx-0 mt-0">
            <div className="col-span-8 p-0 w-full">
              <div className="flex mt-0 flex-wrap mx-[-14px]">
                <div className="px-[14px] py-0 mb-[14px] w-full">
                  <InputWithLabel
                    id="maintitle"
                    placeholder="Main Title"
                    className="border border-[#ced4da] rounded-[4px] placeholder:opacity-[0.6]"
                    value={formValues.maintitle}
                    onChange={(e) => handleChange("maintitle", e.target.value)}
                  />
                </div>
                <div className="px-[14px] py-0 mb-[14px] lg:w-[33.33%] w-full">
                  <InputWithLabel
                    id="title"
                    placeholder="title"
                    className="border border-[#ced4da] rounded-[4px] placeholder:opacity-[0.6]"
                    value={formValues.title}
                    onChange={(e) => handleChange("title", e.target.value)}
                  />
                </div>
                <div className="px-[14px] py-0 mb-[14px] lg:w-[33.33%] w-full">
                  <InputWithLabel
                    id="Price"
                    placeholder="Price"
                    className="border border-[#ced4da] rounded-[4px] placeholder:opacity-[0.6]"
                    value={formValues.price}
                    onChange={(e) => handleChange("price", e.target.value)}
                  />
                </div>
                <div className="px-[14px] py-0 mb-[14px] lg:w-[33.33%] w-full">
                  <InputWithLabel
                    id="disccount_price"
                    placeholder="disccount_price"
                    className="border border-[#ced4da] rounded-[4px] placeholder:opacity-[0.6]"
                    value={formValues.disccount_price}
                    onChange={(e) =>
                      handleChange("disccount_price", e.target.value)
                    }
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
                    id="carat"
                    placeholder="carat"
                    className="border border-[#ced4da] rounded-[4px] placeholder:opacity-[0.6]"
                    value={formValues.carat}
                    onChange={(e) => handleChange("carat", e.target.value)}
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
                    id="polish"
                    placeholder="polish"
                    className="border border-[#ced4da] rounded-[4px] placeholder:opacity-[0.6]"
                    value={formValues.polish}
                    onChange={(e) => handleChange("polish", e.target.value)}
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
                    id="symmetry"
                    placeholder="symmetry"
                    className="border border-[#ced4da] rounded-[4px] placeholder:opacity-[0.6]"
                    value={formValues.symmetry}
                    onChange={(e) => handleChange("symmetry", e.target.value)}
                  />
                </div>
                <div className="px-[14px] py-0 mb-[14px] lg:w-[33.33%] w-full">
                  <InputWithLabel
                    id="flourescence"
                    placeholder="flourescence"
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
                    className="border border-[#ced4da] rounded-[4px] placeholder:opacity-[0.6]"
                    value={formValues.table}
                    onChange={(e) => handleChange("table", e.target.value)}
                  />
                </div>
                <div className="px-[14px] py-0 mb-[14px] lg:w-[33.33%] w-full">
                  <InputWithLabel
                    id="crown_height"
                    placeholder="crown_height"
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
                    placeholder="Depth"
                    className="border border-[#ced4da] rounded-[4px] placeholder:opacity-[0.6]"
                    value={formValues.depth}
                    onChange={(e) => handleChange("depth", e.target.value)}
                  />
                </div>
                <div className="px-[14px] py-0 mb-[14px] lg:w-[33.33%] w-full">
                  <InputWithLabel
                    id="crown_angle"
                    placeholder="Crown Angle"
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
                    placeholder="Pavilian Depth"
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
                    placeholder="pavilian_angle"
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
                    placeholder="status"
                    className="border border-[#ced4da] rounded-[4px] placeholder:opacity-[0.6]"
                    value={formValues.status}
                    onChange={(e) => handleChange("status", e.target.value)}
                  />
                </div>
                <div className="px-[14px] py-0 mb-[14px] lg:w-[33.33%] w-full">
                  <InputWithLabel
                    id="size"
                    placeholder="size"
                    className="border border-[#ced4da] rounded-[4px] placeholder:opacity-[0.6]"
                    value={formValues.size}
                    onChange={(e) => handleChange("size", e.target.value)}
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
                    onChange={(e) => handleChange("size_desc", e.target.value)}
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
                    onChange={(e) => handleChange("color_desc", e.target.value)}
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
                    onChange={(e) => handleChange("cut_desc", e.target.value)}
                  />
                </div>
              </div>
              <div className="rounded-[4px] flex justify-between items-center py-[7px] gap-4">
                <Button
                  className="flex-1 rounded-[4px] bg-transparent border-[#D32F2F] border text-[#D32F2F] hover:bg-[#D32F2F] hover:text-white"
                  onClick={handleDiscard}
                >
                  <span>Discard</span>
                </Button>
                <Button
                  className="flex-1 bg-[#2196F3] rounded-[4px] border-[#2196F3] border hover:text-[#000] hover:bg-white text-[#fff]"
                  onClick={handleSubmit}
                >
                  <span>Create Product</span>
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
