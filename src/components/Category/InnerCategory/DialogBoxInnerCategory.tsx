import InputWithLabel from "@/components/Common/InputWithLabel";
import Loading from "@/components/Common/Loading";
import SelectMenu from "@/components/Common/SelectMenu";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/use-toast";
import { UploadImage } from "@/services/adminService";
import { EditInnerCategory } from "@/services/innercateGoryService";
import { getSubCategoryall } from "@/services/subcategoryService";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

export function DialogBoxInnerCategory({ icon, mainTitle, item }: any) {
  const [formValues, setFormValues] = useState({
    name: "",
    description: "",
    image: "",
  });
  const [isopen, setIsOpen] = useState<boolean>(false);
  const queryClient = useQueryClient();

  const { mutate: editInnerCategory } = useMutation({
    mutationFn: (data: FormData) => EditInnerCategory(item.id, data),
    onSuccess: () => {
      toast({
        description: "Inner Category Updated Successfully.",
      });
      setIsOpen(false);
      queryClient.invalidateQueries({ queryKey: ["GET_INNERCATEGORY"] });
    },
    onError: (error) => {
      setIsOpen(false);
      toast({
        variant: "error",
        title: (error as { data?: { message?: string } })?.data?.message || "",
      });
    },
  });

  const { mutate: UploadImagedata } = useMutation({
    mutationFn: UploadImage,
    onSuccess: (res) => {
      setFormValues((prev) => ({ ...prev, image: res?.data?.data?.image }));
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
  const handlechangeImage = (e: any) => {
    const { files } = e.target;
    const payload = new FormData();
    payload.append("image", files[0]);
    setIsOpen(true);
    UploadImagedata(payload);
  };

  const handleChange = (name: string, value: string | number) => {
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const { data: InnercategoryData } = useQuery({
    queryKey: ["GET_INNERCATEGORY"],
    queryFn: getSubCategoryall,
  });
  const categoryOptions = InnercategoryData?.data?.responseData
    ? InnercategoryData?.data?.responseData?.map((item: any) => ({
        label: item.name,
        value: item.id,
      }))
    : [];

  const editFuction = () => {
    const payload = new FormData();

    if (formValues.image) {
      payload.append("image", formValues.image);
    }
    if (formValues.name) {
      payload.append("name", formValues.name);
    }
    if (formValues.description) {
      payload.append("description", formValues.description);
    }
    editInnerCategory(payload);
    setIsOpen(true);
  };

  useEffect(() => {
    setFormValues({ ...item });
  }, [item]);

  return (
    <>
      {createPortal(<>{isopen && <Loading />}</>, document.body)}
      <Dialog>
        <DialogTrigger asChild>{icon}</DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{mainTitle}</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name">Sub Category</Label>
              <SelectMenu
                placeholder="Sub Category Name"
                className="border w-[277px] border-[#ced4da] rounded-[4px] placeholder:opacity-[0.6] "
                label=""
                options={categoryOptions}
                value={item.subCategory}
                disabled={true}
                // onChange={(e) => handleChange("category", e)}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name">Name</Label>
              <InputWithLabel
                id="title"
                placeholder="Title"
                defaultValue={item.name}
                className="border border-[#ced4da] w-[277px] rounded-[4px] placeholder:opacity-[0.6] "
                onChange={(e) => handleChange("name", e.target.value)}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name">Description</Label>
              <Input
                id="description"
                type="text"
                defaultValue={item.description}
                className="col-span-3 border-[#ccc] border-[1px] border-solid rounded-[5px]"
                onChange={(e) => handleChange("description", e.target.value)}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="image">Image</Label>
              <input
                id="image"
                type="file"
                className="col-span-3"
                onChange={handlechangeImage}
              />
            </div>
            {item.image && (
              <img
                src={formValues?.image}
                alt="images"
                className="!w-[200px] h-[100px]"
              />
            )}
          </div>
          <DialogFooter>
            <Button type="submit" onClick={editFuction}>
              Update
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
