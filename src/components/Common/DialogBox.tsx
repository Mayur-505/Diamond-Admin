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
import { EditCategory } from "@/services/categoryService";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "../ui/use-toast";

export function DialogBox({ icon, mainTitle, ID }) {
  const [formValues, setFormValues] = useState({
    name: "",
    image: "",
  });

  console.log("formValues", formValues);

  const { mutate: EditSubCategory } = useMutation({
    mutationFn: (data) => EditCategory(ID, data),
    onSuccess: () => {
      toast({
        description: "Sub category Created Successfully.",
      });
      // queryClient.invalidateQueries({ queryKey: ["addCategory"] });
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
    EditSubCategory(payload);
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
            <Input
              id="name"
              type="text"
              defaultValue=""
              className="col-span-3 border-[#ccc] border-[1px] border-solid rounded-[5px]"
              onChange={(e) => handelchange("name", e)}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              type="file"
              className="col-span-3"
              onChange={(e) => handelchange("image", e)}
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" onClick={() => editFuction()}>
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
