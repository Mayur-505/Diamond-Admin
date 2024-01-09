import InputWithLabel from "@/components/Common/InputWithLabel";
import SelectMenu from "@/components/Common/SelectMenu";
import TextAreaWithLabel from "@/components/Common/TextAreaWithLabel";
import { useToast } from "@/components/ui/use-toast";
import {
  addInnerCategory,
  getInnerCategory,
} from "@/services/innercateGoryService";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddInnerCategory = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const [formValues, setFormValues] = useState({
    name: "",
    description: "",
    category: "",
  });

  const { data: InnercategoryData } = useQuery({
    queryKey: ["GET_INNERCATEGORY"],
    queryFn: getInnerCategory,
  });

  const categoryOptions = InnercategoryData?.data?.responseData
    ? InnercategoryData?.data?.responseData?.map((item) => ({
        label: item.name,
        value: item.subCategory,
      }))
    : [];

  const handleChange = (name: string, value: string | undefined) => {
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const { mutate: createInnerCategory } = useMutation({
    mutationFn: addInnerCategory,
    onSuccess: () => {
      toast({
        variant: "success",
        description: "Inner category Created Successfully.",
      });
      queryClient.invalidateQueries({ queryKey: ["addCategory"] });
    },
    onError: () => {
      toast({ variant: "error", description: "Something went wrong." });
    },
  });

  const handleSubmit = () => {
    const payload = new FormData();
    if (formValues.category) {
      payload.append("subcategoryid", formValues.category);
    }
    if (formValues.name) {
      payload.append("name", formValues.name);
    }
    if (formValues.description) {
      payload.append("description", formValues.description);
    }
    createInnerCategory(payload);
    setFormValues({
      name: "",
      description: "",
      category: "",
    });
  };

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
            <SelectMenu
              placeholder="Sub Category Name"
              className="border border-[#ced4da] rounded-[4px] placeholder:opacity-[0.6] "
              label=""
              options={categoryOptions}
              value={formValues.category}
              onChange={(e) => handleChange("category", e)}
            />
          </div>
          <div className="col-span-4">
            <InputWithLabel
              id="title"
              placeholder="Title"
              value={formValues.name}
              className="border border-[#ced4da] rounded-[4px] placeholder:opacity-[0.6] "
              onChange={(e) => handleChange("name", e.target.value)}
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
              id="description"
              label={""}
              placeholder="description"
              value={formValues.description}
              textAreaClassName="h-[210px] border border-[#ced4da] rounded-[4px] placeholder:opacity-[0.6]"
              className="md:col-span-2"
              onChange={(e) => handleChange("description", e.target.value)}
            />
          </div>
          <div className="col-span-12 flex items-center gap-4">
            <button
              className="px-5 py-1.5 bg-[#2796ef] rounded-[4px] text-[#ffffff] border border-transparent font-Nunito font-[600]"
              type="button"
              onClick={handleSubmit}
            >
              Create Category
            </button>
            <button
              className="px-5 py-1.5 rounded-[4px] text-[#ff0000] border border-[#ff0000] font-Nunito font-[600]"
              type="button"
              onClick={() => navigate("/category/inner-category")}
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
