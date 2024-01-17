import InputWithLabel from "@/components/Common/InputWithLabel";
import Loading from "@/components/Common/Loading";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/use-toast";
import { UploadImage } from "@/services/adminService";
import { EditCategory } from "@/services/categoryService";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useNavigate } from "react-router-dom";

export function DialogBoxCategory({ icon, mainTitle, item }) {
  const queryClient = useQueryClient();
  const [isopen, setIsOpen] = useState<boolean>(false);
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState({
    name: "",
    description: "",
    image: "",
  });

  useEffect(() => {
    setFormValues({ ...item });
  }, [item]);

  const { mutate: editCategory } = useMutation({
    mutationFn: (data) => EditCategory(item.id, data),
    onSuccess: () => {
      setIsOpen(false);
      toast({
        description: "Parent Category Updated Successfully.",
      });
      queryClient.invalidateQueries({ queryKey: ["GET_CATEGORY"] });
    },
    onError: (error) => {
      toast({
        variant: "error",
        title: error?.data?.message || "",
      });
      setIsOpen(false);
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
        title: error?.data?.message || "",
      });
      if (error?.code == 401) {
        navigate("/auth/login");
      }
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
    editCategory(payload);
    setIsOpen(true);
  };

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
                onInput={handlechangeImage}
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
