import InputWithLabel from "@/components/Common/InputWithLabel";
import SelectMenu from "@/components/Common/SelectMenu";
import TextAreaWithLabel from "@/components/Common/TextAreaWithLabel";
import { AddSubCategory, getSubCategory } from "@/services/subcategoryService";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import Loading from "@/components/Common/Loading";

const AddCategory = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const [formValues, setFormValues] = useState({
    name: "",
    description: "",
    category: "",
    image: "",
  });

  const { data: subcategoryData } = useQuery({
    queryKey: ["GET_SUBCATEGORY"],
    queryFn: getSubCategory,
  });

  const categoryOptions = subcategoryData?.data?.responseData
    ? subcategoryData?.data?.responseData?.map((item) => ({
        label: item.name,
        value: item.category,
      }))
    : [];

  const handleChange = (name: string, value: string | Date | undefined) => {
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const { mutate: createSubCategory, isPending } = useMutation({
    mutationFn: AddSubCategory,
    onSuccess: () => {
      toast({
        description: "Sub category Created Successfully.",
      });
      navigate("/category/sub-category");
      queryClient.invalidateQueries({ queryKey: ["addCategory"] });
    },
    onError: () => {
      toast({ description: "Something went wrong." });
    },
  });

  const handleSubmit = () => {
    const payload = new FormData();
    if (formValues.category) {
      payload.append("categoryid", formValues.category);
    }
    if (formValues.name) {
      payload.append("name", formValues.name);
    }
    if (formValues.description) {
      payload.append("description", formValues.description);
    }
    if (formValues.image) {
      payload.append("image", formValues.image);
    }
    createSubCategory(payload);
    setFormValues({
      name: "",
      description: "",
      category: "",
      image: "",
    });
  };

  return (
    <div className="custom_contener !p-[17.5px] !mb-[28px] customShadow">
      {isPending && <Loading />}
      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-2">
          <h3 className="text-[17.5px] font-Nunito font-[700] mb-[21px]">
            Create Category
          </h3>
        </div>
        <div className="col-span-10 grid grid-cols-12 gap-4">
          <div className="col-span-12">
            <SelectMenu
              placeholder="Parent Category Name"
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
            <input
              id="image"
              type="file"
              className="col-span-3"
              onChange={(e) => handleChange("image", e.target.files[0])}
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
              onClick={() => navigate("/category/sub-category")}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddCategory;
