import InputWithLabel from "@/components/Common/InputWithLabel";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/use-toast";
import { updateClarity } from "@/services/clarityService";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

export function DialogBoxClarity({ icon, mainTitle, item }) {
  const [formValues, setFormValues] = useState({
    name: "",
  });
  const queryClient = useQueryClient();

  const { mutate: editClarity } = useMutation({
    mutationFn: (data) => updateClarity(data),
    onSuccess: () => {
      toast({
        description: "Clarity Updated Successfully.",
      });
      queryClient.invalidateQueries({ queryKey: ["GET_CLARITY"] });
    },
    onError: () => {
      toast({ description: "Something went wrong." });
    },
  });

  const handleChange = (name: string, value: string | undefined) => {
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const editFuction = () => {
    const payload = new FormData();
    payload.append("clarityid", item.id);
    if (formValues.name) {
      payload.append("name", formValues.name);
    }
    editClarity(payload);
  };

  return (
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
