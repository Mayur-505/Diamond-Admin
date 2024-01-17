import InputWithLabel from "@/components/Common/InputWithLabel";
import Loading from "@/components/Common/Loading";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { ErrorType } from "@/lib/types";
import { UploadImage } from "@/services/adminService";
import { AddCategory } from "@/services/categoryService";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddParentCategory = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [isopen, setIsOpen] = useState<boolean>(false);
  const [imageUrl, setImageUrl] = useState<string>("");
  const { toast } = useToast();

  const [category, setCategory] = useState({
    name: "",
    description: "",
    image: "",
  });

  const handleChange = (name: string, value: string | Date | undefined) => {
    setCategory((prev) => ({ ...prev, [name]: value }));
    if (name == "image") {
      const payload = new FormData();
      payload.append("image", value);
      UploadImagedata(payload);
      setIsOpen(true);
    }
  };

  const { mutate: createCategory, isPending } = useMutation({
    mutationFn: AddCategory,
    onSuccess: () => {
      toast({
        description: "Parent Category Created Successfully.",
      });
      setCategory({
        name: "",
        description: "",
        image: "",
      });
      navigate("/category/category");
      queryClient.invalidateQueries({ queryKey: ["addCategory"] });
    },
    onError: (error: ErrorType) => {
      if (error?.code == 401) {
        navigate("/auth/login");
      }
      toast({
        variant: "error",
        title: error?.data?.message || "",
      });
    },
  });

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
  };

  return (
    <div className="w-full max-w-2xl rounded p-6 mx-auto mb-8 customShadow">
      {isPending && <Loading />}
      {isopen && <Loading />}
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
            type="button"
            onClick={() => navigate("/category/category")}
            className="text-[14px] font-[600] text-[#ffffff] shadow-md px-4 py-2 w-full rounded"
          >
            Cancel
          </Button>
          <Button
            className="text-[14px] font-[600] bg-[#2796ef] text-[#fff] shadow-md px-4 py-2 w-full rounded"
            onClick={handleSubmit}
          >
            Add
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AddParentCategory;
