import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/use-toast";
import { updateShape } from "@/services/shapeService";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import InputWithLabel from "@/components/Common/InputWithLabel";

export function DialogBoxShape({ icon, mainTitle, item }) {
  const [formValues, setFormValues] = useState({
    name: item.name,
    description: item.description,
    image: item.image,
  });
  const [imageUrl, setImageUrl] = useState(item.image); // New state for image preview
  const queryClient = useQueryClient();

  const { mutate: editShape } = useMutation({
    mutationFn: (data) => updateShape(data),
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
  console.log(item.image);

  const handleChange = (name, value) => {
    setFormValues((prev) => ({ ...prev, [name]: value }));

    // Handle file change separately for preview
    if (name === "image" && value) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageUrl(reader.result);
      };
      reader.readAsDataURL(value);
    }
  };

  const editFunction = () => {
    const payload = new FormData();
    payload.append("shapeid", item.id);
    if (formValues.image) {
      payload.append("image", formValues.image);
    }
    if (formValues.name) {
      payload.append("name", formValues.name);
    }
    if (formValues.description) {
      payload.append("description", formValues.description);
    }
    editShape(payload);
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
              onChange={(e) => handleChange("image", e.target.files[0])}
            />
          </div>
          {imageUrl && (
            <div>
              <p>Preview:</p>
              <img
                src={imageUrl}
                alt="Preview"
                style={{ width: "100px", height: "100px" }}
              />
            </div>
          )}
        </div>
        <DialogFooter>
          <Button type="submit" onClick={editFunction}>
            Update
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
