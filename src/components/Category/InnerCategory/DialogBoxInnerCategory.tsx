import InputWithLabel from "@/components/Common/InputWithLabel";
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
import { EditInnerCategory } from "@/services/innercateGoryService";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

export function DialogBoxInnerCategory({ icon, mainTitle, item }) {
  const [formValues, setFormValues] = useState({
    name: "",
    description: "",
    image: "",
  });
  const queryClient = useQueryClient();

  const { mutate: editInnerCategory } = useMutation({
    mutationFn: (data) => EditInnerCategory(item.id, data),
    onSuccess: () => {
      toast({
        description: "Sub category Created Successfully.",
      });
      queryClient.invalidateQueries({ queryKey: ["GET_INNERCATEGORY"] });
    },
    onError: () => {
      toast({ description: "Something went wrong." });
    },
  });

  const handelchange = (name, e) => {
    setFormValues((prev) => ({ ...prev, [name]: e.target.value }));
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
    editInnerCategory(payload);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>{icon}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{mainTitle}</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name">Name</Label>
            <InputWithLabel
              id="title"
              placeholder="Title"
              defaultValue={item.name}
              className="border border-[#ced4da] w-[277px] rounded-[4px] placeholder:opacity-[0.6] "
              onChange={(e) => handelchange("name", e)}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name">Description</Label>
            <Input
              id="description"
              type="text"
              defaultValue={item.description}
              className="col-span-3 border-[#ccc] border-[1px] border-solid rounded-[5px]"
              onChange={(e) => handelchange("description", e)}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="image">Image</Label>
            <input
              id="image"
              type="file"
              className="col-span-3"
              onChange={(e) => handelchange("image", e.target.files[0])}
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" onClick={editFuction}>
            Update
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
