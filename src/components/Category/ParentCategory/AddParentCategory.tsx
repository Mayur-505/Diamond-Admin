import InputWithLabel from "@/components/Common/InputWithLabel";
import React from "react";
import { useNavigate } from "react-router-dom";

const AddParentCategory = () => {
  const navigate = useNavigate();
  const [checked, setChecked] = React.useState(true);
  return (
    <div className="w-full max-w-2xl rounded p-6 mx-auto mb-8 customShadow">
      <h2 className="text-[20px] font-[600] mb-4 font-Nunito">
        Add Parent Category
      </h2>
      <div className="grid grid-cols-12 gap-4 ">
        <div className="col-span-12">
          <InputWithLabel
            id="category"
            placeholder="Category Name"
            className="border border-[#ced4da] rounded-[4px] placeholder:opacity-[0.6] "
          />
        </div>
        <div className="col-span-12">
          <InputWithLabel
            id="description"
            placeholder="Description"
            className="border border-[#ced4da] rounded-[4px] placeholder:opacity-[0.6] "
          />
        </div>
        <div className="col-span-12 flex items-center gap-4">
          <button
            type="button"
            onClick={() => navigate("/category/category")}
            className="text-[14px] font-[600] text-[#343a40] shadow-md px-4 py-2 w-full rounded"
          >
            Cancel
          </button>
          <button className="text-[14px] font-[600] bg-[#343a40] text-[#fff] shadow-md px-4 py-2 w-full rounded">
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddParentCategory;
