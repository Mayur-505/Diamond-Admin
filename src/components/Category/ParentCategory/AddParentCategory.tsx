import InputWithLabel from "@/components/Common/InputWithLabel";
import { useToast } from "@/components/ui/use-toast";
import { ErrorType } from "@/lib/types";
import { AddCategory, deleteCategory } from "@/services/categoryService";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddParentCategory = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const [category, setCategory] = useState({
    name: "",
    description: "",
    image: "",
  });

  const handleChange = (name: string, value: string | Date | undefined) => {
    setCategory((prev) => ({ ...prev, [name]: value }));
  };

  const { mutate: createCategory } = useMutation({
    mutationFn: AddCategory,
    onSuccess: () => {
      toast({
        description: "Parent category Created Successfully.",
      });
      queryClient.invalidateQueries({ queryKey: ["addCategory"] });
    },
    onError: (error: ErrorType) => {
      toast({ description: "Something went wrong." });
    },
  });

  const handleSubmit = () => {
    const payload = new FormData();
    if (category.image) {
      payload.append("image", category.image);
    }
    if (category.name) {
      payload.append("name", category.name);
    }
    if (category.description) {
      payload.append("description", category.description);
    }
    createCategory(payload);
    setCategory({
      name: "",
      description: "",
      image: "",
    });
  };

  return (
    <div className="w-full max-w-2xl rounded p-6 mx-auto mb-8 customShadow">
      <h2 className="text-[20px] font-[600] mb-4 font-Nunito">
        Add Parent Category
      </h2>
      <div className="grid grid-cols-12 gap-4 ">
        <div className="col-span-12">
          <InputWithLabel
            id="name"
            placeholder="Category Name"
            value={category.name}
            onChange={(e) => handleChange("name", e.target.value)}
            className="border border-[#ced4da] rounded-[4px] placeholder:opacity-[0.6] "
          />
        </div>
        <div className="col-span-12">
          <InputWithLabel
            id="description"
            placeholder="Description"
            value={category.description}
            onChange={(e) => handleChange("description", e.target.value)}
            className="border border-[#ced4da] rounded-[4px] placeholder:opacity-[0.6] "
          />
        </div>
        <div className="col-span-4">
          <input
            id="image"
            type="file"
            className="col-span-3"
            onChange={(e) => handleChange("image", e.target.files[0])}
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
          <button
            className="text-[14px] font-[600] bg-[#343a40] text-[#fff] shadow-md px-4 py-2 w-full rounded"
            onClick={handleSubmit}
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddParentCategory;
