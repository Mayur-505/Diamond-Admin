import React, { useState } from "react";
import { Button } from "../ui/button";
import { Switch } from "../ui/switch";
import { TagInput } from "../Common/TagInput";
import InputWithLabel from "../Common/InputWithLabel";
import { useDropzone } from "react-dropzone";
import TextAreaWithLabel from "../Common/TextAreaWithLabel";

const NewProduct = () => {
  const [selected, setSelected] = useState<string[]>(["Nike"]);
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
    console.log(acceptedFiles);
  };
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
                    id="Product-Name"
                    placeholder="Product Name"
                    className="border border-[#ced4da] rounded-[4px] placeholder:opacity-[0.6] "
                  />
                </div>
                <div className="px-[14px] py-0 mb-[14px] lg:w-[33.33%] w-full">
                  <InputWithLabel
                    id="Price"
                    placeholder="Price"
                    className="border border-[#ced4da] rounded-[4px] placeholder:opacity-[0.6]"
                  />
                </div>
                <div className="px-[14px] py-0 mb-[14px] lg:w-[33.33%] w-full">
                  <InputWithLabel
                    id="Product-code"
                    placeholder="Product Code"
                    className="border border-[#ced4da] rounded-[4px] placeholder:opacity-[0.6]"
                  />
                </div>
                <div className="px-[14px] py-0 mb-[14px] lg:w-[33.33%] w-full">
                  <InputWithLabel
                    id="Product-SKU"
                    placeholder="Product-SKU"
                    className="border border-[#ced4da] rounded-[4px] placeholder:opacity-[0.6]"
                  />
                </div>
                <div className="p-[14px] py-0 mb-[14px] w-full">
                  <TextAreaWithLabel
                    label={""}
                    placeholder="description"
                    value={""}
                    textAreaClassName="h-[292px] border border-[#ced4da] rounded-[4px] placeholder:opacity-[0.6]"
                    className="md:col-span-2"
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
                <div className="font-bold border-b-[1px] border-[#dee2e6] text-[#212121] p-[14px] text-[14px]">
                  Publish
                </div>
                <div className="p-[14px]">
                  <div className="rounded-[4px] py-[7px] px-[14px] flex items-center bg-[#F5F5F5] ">
                    <span className="mr-[14px] font-bold text-[#000000e6] text-[14px] font-Nunito">
                      Status:
                    </span>
                    <span className="text-[14px] font-Nunito font-semibold text-[#0009]">
                      Draft
                    </span>
                    <button className="ml-auto text-[#0009]">
                      <span>
                        <i className="ri-pencil-line"></i>
                      </span>
                    </button>
                  </div>
                </div>
              </div>
              <div className="border border-[#dee2e6] rounded-[4px]">
                <div className="font-bold border-b-[1px] border-[#dee2e6] text-[#212121] p-[14px] text-[14px]">
                  Tags
                </div>
                <div className="p-[14px] w-full">
                  <div className="rounded-[4px] ">
                    <TagInput
                      placeholder="Enter a topic"
                      tags={selected}
                      className="border border-[#ced4da] rounded-[4px] placeholder:opacity-[0.6] w-full"
                      setTags={(newTags) => {
                        setSelected(newTags);
                      }}
                    />
                  </div>
                </div>
              </div>
              <div className="border border-[#dee2e6] rounded-[4px]">
                <div className="font-bold border-b-[1px] border-[#dee2e6] text-[#212121] p-[14px] text-[14px]">
                  Category
                </div>
                <div className="p-[14px]">
                  <select
                    id="yourSelect"
                    name="yourSelect"
                    className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-[4px] shadow-sm focus:outline-none focus:ring-[##E3F2FD] focus:border-[#E3F2FD] sm:text-sm"
                  >
                    <option value="option1" className="py-[7px] px-[14px]">
                      Option 1
                    </option>
                    <option value="option2" className="py-[7px] px-[14px]">
                      Option 2
                    </option>
                    <option value="option3" className="py-[7px] px-[14px]">
                      Option 3
                    </option>
                  </select>
                </div>
              </div>
              <div className="border border-[#dee2e6] rounded-[4px]">
                <div className="font-bold border-b-[1px] border-[#dee2e6] text-[#212121] p-[14px] text-[14px]">
                  Color
                </div>
                <div className="p-[14px]">
                  <div className="flex items-center">
                    <div className="h-[28px] w-[28px] bg-[#607d8b] mxr-1 rounded-[50%] border-[2px] cursor-pointer"></div>
                    <div className="h-[28px] w-[28px] bg-[#3f51b5] border-[#dee2e6] mr-1 rounded-[50%] border-[2px] cursor-pointer"></div>
                    <div className="h-[28px] w-[28px] bg-[#9c27b0] border-[#dee2e6] mr-1 rounded-[50%] border-[2px] cursor-pointer"></div>
                  </div>
                </div>
              </div>
              <div className="border border-[#dee2e6] rounded-[4px]">
                <div className="font-bold border-b-[1px] border-[#dee2e6] text-[#212121] p-[14px] text-[14px]">
                  Stock
                </div>
                <div className="p-[14px]">
                  <select
                    id="yourSelect"
                    name="yourSelect"
                    className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-[4px] shadow-sm focus:outline-none focus:ring-[##E3F2FD] focus:border-[#E3F2FD] sm:text-sm"
                  >
                    <option value="option1" className="py-[7px] px-[14px]">
                      Option 1
                    </option>
                    <option value="option2" className="py-[7px] px-[14px]">
                      Option 2
                    </option>
                    <option value="option3" className="py-[7px] px-[14px]">
                      Option 3
                    </option>
                  </select>
                </div>
              </div>
              <div className="border border-[#dee2e6] rounded-[4px] flex justify-between items-center py-[7px] px-[14px]">
                <span className="font-bold p-[14px] text-sm font-Nunito">
                  In stock
                </span>
                <p>
                  <Switch id="inStock" />
                </p>
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
