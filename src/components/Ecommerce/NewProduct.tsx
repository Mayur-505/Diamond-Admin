import React, { useState } from "react";
import { Button } from "../ui/button";
import { Switch } from "../ui/switch";
import { TagInput } from "../Common/TagInput";
import InputWithLabel from "../Common/InputWithLabel";
import { useDropzone } from "react-dropzone";
import TextAreaWithLabel from "../Common/TextAreaWithLabel";
import SelectMenu from "../Common/SelectMenu";

const NewProduct = () => {
  const [selected, setSelected] = useState<string[]>(["Nike"]);
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
    pavilian_angle: "",
    status: "",
    size: "",
    size_desc: "",
    color_desc: "",
    clarity_desc: "",
    cut_desc: "",
  });
  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/*": [],
    },
    onDrop: (acceptedFiles: File[]) => {
      // Handle the dropped files
      onImageUpload(acceptedFiles);
    },
  });

  const onImageUpload = (acceptedFiles: File[]) => {
    // Handle the uploaded image
  };

  const handleChange = (name: string, value: string | Date | undefined) => {
    setFormValues((prev) => ({ ...prev, [name]: value }));
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
                    defaultValue={formValues.maintitle}
                    onChange={(e) => handleChange("maintitle", e.target.value)}
                  />
                </div>
                <div className="px-[14px] py-0 mb-[14px] lg:w-[33.33%] w-full">
                  <InputWithLabel
                    id="title"
                    placeholder="title"
                    className="border border-[#ced4da] rounded-[4px] placeholder:opacity-[0.6]"
                    defaultValue={formValues.title}
                    onChange={(e) => handleChange("title", e.target.value)}
                  />
                </div>
                <div className="px-[14px] py-0 mb-[14px] lg:w-[33.33%] w-full">
                  <InputWithLabel
                    id="Price"
                    placeholder="Price"
                    className="border border-[#ced4da] rounded-[4px] placeholder:opacity-[0.6]"
                    defaultValue={formValues.price}
                    onChange={(e) => handleChange("price", e.target.value)}
                  />
                </div>
                <div className="px-[14px] py-0 mb-[14px] lg:w-[33.33%] w-full">
                  <InputWithLabel
                    id="disccount_price"
                    placeholder="disccount_price"
                    className="border border-[#ced4da] rounded-[4px] placeholder:opacity-[0.6]"
                    defaultValue={formValues.disccount_price}
                    onChange={(e) =>
                      handleChange("disccount_price", e.target.value)
                    }
                  />
                </div>
                <div className="px-[14px] py-0 mb-[14px] lg:w-[33.33%] w-full">
                  <SelectMenu
                    id="subcategory"
                    placeholder="Sub Category"
                    options={""}
                    className="border border-[#ced4da] rounded-[4px] placeholder:opacity-[0.6]"
                    defaultValue={formValues.shape}
                    onChange={(e) =>
                      handleChange("subcategoryid", e.target.value)
                    }
                  />
                </div>
                <div className="px-[14px] py-0 mb-[14px] lg:w-[33.33%] w-full">
                  <SelectMenu
                    id="innercategory"
                    placeholder="Inner Category"
                    className="border border-[#ced4da] rounded-[4px] placeholder:opacity-[0.6]"
                    defaultValue={formValues.carat}
                    onChange={(e) =>
                      handleChange("innercategoryid", e.target.value)
                    }
                  />
                </div>
                <div className="px-[14px] py-0 mb-[14px] lg:w-[33.33%] w-full">
                  <SelectMenu
                    id="category"
                    placeholder="Category"
                    className="border border-[#ced4da] rounded-[4px] placeholder:opacity-[0.6]"
                    defaultValue={formValues.carat}
                    onChange={(e) => handleChange("categoryid", e.target.value)}
                  />
                </div>
                <div className="px-[14px] py-0 mb-[14px] lg:w-[33.33%] w-full">
                  <SelectMenu
                    id="shape"
                    placeholder="shape"
                    options={""}
                    className="border border-[#ced4da] rounded-[4px] placeholder:opacity-[0.6]"
                    defaultValue={formValues.shape}
                    onChange={(e) => handleChange("shape", e.target.value)}
                  />
                </div>
                <div className="px-[14px] py-0 mb-[14px] lg:w-[33.33%] w-full">
                  <InputWithLabel
                    id="carat"
                    placeholder="carat"
                    className="border border-[#ced4da] rounded-[4px] placeholder:opacity-[0.6]"
                    defaultValue={formValues.carat}
                    onChange={(e) => handleChange("carat", e.target.value)}
                  />
                </div>
                <div className="px-[14px] py-0 mb-[14px] lg:w-[33.33%] w-full">
                  <SelectMenu
                    id="colour"
                    options={""}
                    placeholder="colour"
                    className="border border-[#ced4da] rounded-[4px] placeholder:opacity-[0.6]"
                    defaultValue={formValues.colour}
                    onChange={(e) => handleChange("colour", e.target.value)}
                  />
                </div>
                <div className="px-[14px] py-0 mb-[14px] lg:w-[33.33%] w-full">
                  <SelectMenu
                    id="clarity"
                    placeholder="clarity"
                    options={""}
                    className="border border-[#ced4da] rounded-[4px] placeholder:opacity-[0.6]"
                    defaultValue={formValues.clarity}
                    onChange={(e) => handleChange("clarity", e.target.value)}
                  />
                </div>
                <div className="px-[14px] py-0 mb-[14px] lg:w-[33.33%] w-full">
                  <InputWithLabel
                    id="polish"
                    placeholder="polish"
                    className="border border-[#ced4da] rounded-[4px] placeholder:opacity-[0.6]"
                    defaultValue={formValues.polish}
                    onChange={(e) => handleChange("polish", e.target.value)}
                  />
                </div>
                <div className="px-[14px] py-0 mb-[14px] lg:w-[33.33%] w-full">
                  <SelectMenu
                    id="cut"
                    options={""}
                    placeholder="cut"
                    className="border border-[#ced4da] rounded-[4px] placeholder:opacity-[0.6]"
                    defaultValue={formValues.cut}
                    onChange={(e) => handleChange("cut", e.target.value)}
                  />
                </div>
                <div className="px-[14px] py-0 mb-[14px] lg:w-[33.33%] w-full">
                  <InputWithLabel
                    id="symmetry"
                    placeholder="symmetry"
                    className="border border-[#ced4da] rounded-[4px] placeholder:opacity-[0.6]"
                    defaultValue={formValues.symmetry}
                    onChange={(e) => handleChange("symmetry", e.target.value)}
                  />
                </div>
                <div className="px-[14px] py-0 mb-[14px] lg:w-[33.33%] w-full">
                  <InputWithLabel
                    id="flourescence"
                    placeholder="flourescence"
                    className="border border-[#ced4da] rounded-[4px] placeholder:opacity-[0.6]"
                    defaultValue={formValues.flourescence}
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
                    defaultValue={formValues.measurements}
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
                    defaultValue={formValues.cert_number}
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
                    defaultValue={formValues.table}
                    onChange={(e) => handleChange("table", e.target.value)}
                  />
                </div>
                <div className="px-[14px] py-0 mb-[14px] lg:w-[33.33%] w-full">
                  <InputWithLabel
                    id="crown_height"
                    placeholder="crown_height"
                    className="border border-[#ced4da] rounded-[4px] placeholder:opacity-[0.6]"
                    defaultValue={formValues.crown_height}
                    onChange={(e) =>
                      handleChange("crown_height", e.target.value)
                    }
                  />
                </div>
                <div className="px-[14px] py-0 mb-[14px] lg:w-[33.33%] w-full">
                  <InputWithLabel
                    id="pavilian_angle"
                    placeholder="pavilian_angle"
                    className="border border-[#ced4da] rounded-[4px] placeholder:opacity-[0.6]"
                    defaultValue={formValues.pavilian_angle}
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
                    defaultValue={formValues.status}
                    onChange={(e) => handleChange("status", e.target.value)}
                  />
                </div>
                <div className="px-[14px] py-0 mb-[14px] lg:w-[33.33%] w-full">
                  <InputWithLabel
                    id="size"
                    placeholder="size"
                    className="border border-[#ced4da] rounded-[4px] placeholder:opacity-[0.6]"
                    defaultValue={formValues.size}
                    onChange={(e) => handleChange("size", e.target.value)}
                  />
                </div>

                <div className="p-[14px] py-0 mb-[14px] w-full">
                  <div
                    {...getRootProps()}
                    className="border border-[#ced4da] rounded-[4px] px-[14px] py-[28px] text-center cursor-pointer h-[292px] flex items-center justify-center flex-col"
                  >
                    <input {...getInputProps()} className="h-[182px]" />
                    <div>
                      <i className="ri-file-3-line text-[28px] text-[#2196F3]"></i>
                    </div>
                    <p className="text-[#212121] font-semibold text-[15.75px] font-Nunito">
                      Drop or select images
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-span-4 flex-1 w-full gap-y-[14px] flex flex-col">
              <div className="border border-[#dee2e6] rounded-[4px]">
                <div className="p-[14px] py-0 mb-[14px] w-full">
                  <TextAreaWithLabel
                    label={"Size Description"}
                    placeholder="size_desc"
                    value={""}
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
                    value={""}
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
                    value={""}
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
                    value={""}
                    textAreaClassName="border border-[#ced4da] rounded-[4px] placeholder:opacity-[0.6]"
                    className="md:col-span-2"
                    onChange={(e) => handleChange("cut_desc", e.target.value)}
                  />
                </div>
              </div>
              <div className="rounded-[4px] flex justify-between items-center py-[7px] gap-4">
                <Button className="flex-1 rounded-[4px] bg-transparent border-[#D32F2F] border text-[#D32F2F] hover:bg-[#D32F2F] hover:text-white">
                  <span>Discard</span>
                </Button>
                <Button className="flex-1 bg-[#2196F3] rounded-[4px] border-[#2196F3] border hover:text-[#000] hover:bg-white text-[#fff]">
                  <span>Save</span>
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
