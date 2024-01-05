import InputWithLabel from "@/components/Common/InputWithLabel";
import TextAreaWithLabel from "@/components/Common/TextAreaWithLabel";
import React from "react";
import { useNavigate } from "react-router-dom";

const AddInnerCategory = () => {
  const navigate = useNavigate();
  return (
    <div className="custom_contener !p-[17.5px] !mb-[28px] customShadow">
      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-2">
          <h3 className="text-[17.5px] font-Nunito font-[700] mb-[21px]">
            Create Category
          </h3>
        </div>
        <div className="col-span-10 grid grid-cols-12 gap-4">
          <div className="col-span-12">
            <InputWithLabel
              id="sub-category"
              placeholder="sub Category Name"
              className="border border-[#ced4da] rounded-[4px] placeholder:opacity-[0.6] "
            />
          </div>
          <div className="col-span-4">
            <InputWithLabel
              id="title"
              placeholder="Title"
              className="border border-[#ced4da] rounded-[4px] placeholder:opacity-[0.6] "
            />
          </div>
          <div className="col-span-4">
            <InputWithLabel
              id="meta-title"
              placeholder="Meta Title"
              className="border border-[#ced4da] rounded-[4px] placeholder:opacity-[0.6] "
            />
          </div>
          <div className="col-span-4">
            <InputWithLabel
              id="meta-keyword"
              placeholder="Meta Keyword"
              className="border border-[#ced4da] rounded-[4px] placeholder:opacity-[0.6] "
            />
          </div>
          <div className="col-span-12">
            <TextAreaWithLabel
              label={""}
              placeholder="description"
              value={""}
              textAreaClassName="h-[210px] border border-[#ced4da] rounded-[4px] placeholder:opacity-[0.6]"
              className="md:col-span-2"
            />
          </div>
          <div className="col-span-12 flex items-center gap-4">
            <button
              className="px-5 py-1.5 bg-[#2796ef] rounded-[4px] text-[#ffffff] border border-transparent font-Nunito font-[600]"
              type="button"
            >
              Create Category
            </button>
            <button
              className="px-5 py-1.5 rounded-[4px] text-[#ff0000] border border-[#ff0000] font-Nunito font-[600]"
              type="button"
              onClick={() => navigate("/category/category")}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddInnerCategory;
