import InputWithLabel from "@/components/Common/InputWithLabel";
import SelectMenu from "@/components/Common/SelectMenu";
import TextAreaWithLabel from "@/components/Common/TextAreaWithLabel";
import { AddSubCategory, getSubCategory } from "@/services/subcategoryService";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import Loading from "@/components/Common/Loading";
import { UploadImage } from "@/services/adminService";
import { allgetCategorydata } from "@/services/categoryService";

const AddCategory = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const [imageUrl, setImageUrl] = useState<string>("");
  const [isopen, setIsOpen] = useState<boolean>(false);

  const [formValues, setFormValues] = useState({
    name: "",
    description: "",
    category: "",
    image: "",
  });

  const { data: subcategoryData } = useQuery({
    queryKey: ["GET_SUBCATEGORY"],
    queryFn: allgetCategorydata,
  });

  const categoryOptions = subcategoryData?.data?.modifiedCategories
    ? subcategoryData?.data?.modifiedCategories?.map((item) => ({
        label: item.name,
        value: item.id,
      }))
    : [];

  const { mutate: UploadImagedata } = useMutation({
    mutationFn: UploadImage,
    onSuccess: (res) => {
      setImageUrl(res?.data?.data?.image);
      setIsOpen(false);
    },
    onError: (error) => {
      console.log(error);
      setIsOpen(false);
    },
  });

  const handleChange = (name: string, value: string | Date | undefined) => {
    setFormValues((prev) => ({ ...prev, [name]: value }));
    if (name == "image") {
      const payload = new FormData();
      payload.append("image", value);
      UploadImagedata(payload);
      setIsOpen(true);
    }
  };

  const { mutate: createSubCategory, isPending } = useMutation({
    mutationFn: AddSubCategory,
    onSuccess: () => {
      toast({
        description: "Sub category Created Successfully.",
      });
      setFormValues({
        name: "",
        description: "",
        category: "",
        image: "",
      });
      navigate("/category/sub-category");
      queryClient.invalidateQueries({ queryKey: ["addCategory"] });
    },
    onError: (error) => {
      toast({
        variant: "error",
        title: error?.data?.message || "",
      });
      if (error?.code == 401) {
        navigate("/auth/login");
      }
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
  };

  return (
    <div className="custom_contener !p-[17.5px] !mb-[28px] customShadow">
      {isPending && <Loading />}
      {isopen && <Loading />}
      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-2">
          <h3 className="text-[17.5px] font-Nunito font-[700] mb-[21px]">
            Create Sub-Category
          </h3>
        </div>
        <div className="col-span-10 grid grid-cols-12 gap-4">
          <div className="col-span-12 flex gap-[10px]">
            <SelectMenu
              placeholder="Parent Category Name"
              className="border w-[50%] border-[#ced4da] rounded-[4px] placeholder:opacity-[0.6] "
              label=""
              options={categoryOptions}
              value={formValues.category}
              onChange={(e) => handleChange("category", e)}
            />
            <div className="col-span-4 w-[50%]">
              <InputWithLabel
                id="title"
                placeholder="Title"
                value={formValues.name}
                className="border border-[#ced4da] h-full rounded-[4px] placeholder:opacity-[0.6] "
                onChange={(e) => handleChange("name", e.target.value)}
              />
            </div>
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
          <div className="col-span-4">
            <input
              id="image"
              type="file"
              className="col-span-3"
              onChange={(e) => handleChange("image", e.target.files[0])}
            />
            {imageUrl && (
              <img
                src={imageUrl}
                alt="images"
                className="w-[300px] h-[150px] mt-[10px]"
              />
            )}
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
