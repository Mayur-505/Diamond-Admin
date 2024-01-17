import InputWithLabel from "@/components/Common/InputWithLabel";
import Loading from "@/components/Common/Loading";
import SelectMenu from "@/components/Common/SelectMenu";
import TextAreaWithLabel from "@/components/Common/TextAreaWithLabel";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { UploadImage } from "@/services/adminService";
import { addInnerCategory } from "@/services/innercateGoryService";
import { getSubCategoryall } from "@/services/subcategoryService";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface CustomError {
  code?: number;
}

const AddInnerCategory = () => {
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

  const { data: InnercategoryData } = useQuery({
    queryKey: ["GET_INNERCATEGORY"],
    queryFn: getSubCategoryall,
  });

  const { mutate: UploadImagedata } = useMutation({
    mutationFn: UploadImage,
    onSuccess: (res) => {
      setImageUrl(res?.data?.data?.image);
      setIsOpen(false);
    },
    onError: (error) => {
      toast({
        variant: "error",
        title: (error as { data?: { message?: string } })?.data?.message || "",
      });
      setIsOpen(false);
    },
  });

  const categoryOptions = InnercategoryData?.data?.responseData
    ? InnercategoryData?.data?.responseData?.map((item: any) => ({
        label: item.name,
        value: item.id,
      }))
    : [];

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleChange("image", files[0]);
    }
  };

  const handleChange = (name: string, value: string | File | undefined) => {
    setFormValues((prev) => ({ ...prev, [name]: value }));
    if (name == "image" && value) {
      const payload = new FormData();
      payload.append("image", value);
      UploadImagedata(payload);
      setIsOpen(true);
    }
  };

  const { mutate: createInnerCategory, isPending } = useMutation({
    mutationFn: addInnerCategory,
    onSuccess: () => {
      navigate("/category/inner-category");
      toast({
        description: "Inner Category Created Successfully.",
      });
      setFormValues({
        name: "",
        description: "",
        category: "",
        image: "",
      });
      queryClient.invalidateQueries({ queryKey: ["addCategory"] });
    },
    onError: (error) => {
      toast({
        variant: "error",
        title: (error as { data?: { message?: string } })?.data?.message || "",
      });
      if ((error as CustomError)?.code === 401) {
        navigate("/auth/login");
      }
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
    if (formValues.image) {
      payload.append("image", formValues.image);
    }
    createInnerCategory(payload);
  };

  return (
    <div className="custom_contener !p-[17.5px] !mb-[28px] customShadow">
      {isPending && <Loading />}
      {isopen && <Loading />}
      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-2">
          <h3 className="text-[17.5px] font-Nunito font-[700] mb-[21px]">
            Create Inner-Category
          </h3>
        </div>
        <div className="col-span-10 grid grid-cols-12 gap-4">
          <div className="col-span-12">
            <SelectMenu
              placeholder="Select Sub Category"
              className="border border-[#ced4da] rounded-[4px] placeholder:opacity-[0.6] "
              label=""
              options={categoryOptions}
              value={formValues.category}
              onChange={(e) => handleChange("category", e)}
            />
          </div>
          <div className="col-span-12">
            <InputWithLabel
              id="title"
              placeholder="Title"
              value={formValues.name}
              className="border border-[#ced4da] rounded-[4px] placeholder:opacity-[0.6] "
              onChange={(e) => handleChange("name", e.target.value)}
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
          <div className="col-span-4">
            <input
              id="image"
              type="file"
              className="col-span-3"
              onChange={(e) => handleFileChange(e)}
            />
            {imageUrl && (
              <img
                src={imageUrl}
                alt="images"
                className="!w-[300px] h-[150px] mt-[10px]"
              />
            )}
          </div>
          <div className="col-span-12 flex items-center gap-4">
            <Button
              className="px-5 py-1.5 bg-[#2796ef] rounded-[4px] text-[#ffffff] border border-transparent font-Nunito font-[600]"
              type="button"
              onClick={handleSubmit}
            >
              Create Inner Category
            </Button>
            <Button
              className="px-5 py-1.5 rounded-[4px] text-[#fff] font-Nunito font-[600]"
              type="button"
              onClick={() => navigate("/category/inner-category")}
            >
              Cancel
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddInnerCategory;
