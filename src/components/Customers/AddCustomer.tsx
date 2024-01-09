import { useState } from "react";
import InputWithLabel from "../Common/InputWithLabel";
import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "../ui/use-toast";
import { ErrorType } from "@/lib/types";
import { addContact } from "@/services/contactService";

const AddCustomer = () => {
  const [formValues, setFormValues] = useState({
    name: "",
    email: "",
    comment: "",
    phone_number: "",
  });
  const [errors, setErrors] = useState({});
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const handleChange = (name: string, value: string | undefined) => {
    setFormValues((prev) => ({ ...prev, [name]: value }));

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "value",
    }));
  };

  const { mutate: createContact } = useMutation({
    mutationFn: addContact,
    onSuccess: () => {
      toast({
        variant: "success",
        description: "Contact Created Successfully.",
      });
      queryClient.invalidateQueries({ queryKey: ["ACTIVE_CONTACT"] });
    },
    onError: (error: ErrorType) => {
      toast({ variant: "error", description: "Something went wrong." });
    },
  });

  const validatePhoneNumber = (phone) => {
    const phoneRegex = /^\d{10}$/;

    if (!phoneRegex.test(phone)) {
      return "Please enter a valid 10-digit phone number.";
    }

    return "";
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate phone_number field
    const phoneError = validatePhoneNumber(formValues.phone_number);

    if (phoneError) {
      // If there is a validation error, update the state
      setErrors({ phone_number: phoneError });
      return;
    }
    const payload = new FormData();
    if (formValues.name) {
      payload.append("name", formValues.name);
    }
    if (formValues.comment) {
      payload.append("comment", formValues.comment);
    }
    if (formValues.email) {
      payload.append("email", formValues.email);
    }
    if (formValues.phone_number) {
      payload.append("phone_number", formValues.phone_number);
    }
    createContact(payload);
    setFormValues({
      name: "",
      email: "",
      comment: "",
      phone_number: "",
    });
  };

  return (
    <div className="custom_contener !p-[17.5px] !mb-[28px] customShadow">
      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-2">
          <h3 className="text-[17.5px] font-Nunito font-[700] mb-[21px]">
            Create Customer
          </h3>
        </div>
        <div className="col-span-10 grid grid-cols-12 gap-4">
          <div className="col-span-8">
            <InputWithLabel
              id="name"
              placeholder="Customer Name"
              className="border border-[#ced4da] rounded-[4px] placeholder:opacity-[0.6]"
              value={formValues.name}
              onChange={(e) => handleChange("name", e.target.value)}
            />
          </div>
          <div className="col-span-4">
            <InputWithLabel
              id="email"
              placeholder="Email"
              className="border border-[#ced4da] rounded-[4px] placeholder:opacity-[0.6]"
              value={formValues.email}
              onChange={(e) => handleChange("email", e.target.value)}
            />
          </div>
          <div className="col-span-4">
            <InputWithLabel
              id="phone_number"
              placeholder="Phone Number"
              className="border border-[#ced4da] rounded-[4px] placeholder:opacity-[0.6]"
              value={formValues.phone_number}
              onChange={(e) => handleChange("phone_number", e.target.value)}
            />
            {errors.phone_number && (
              <p className="text-red-500">{errors.phone_number}</p>
            )}
          </div>
          <div className="col-span-4">
            <InputWithLabel
              id="comment"
              placeholder="Comment"
              className="border border-[#ced4da] rounded-[4px] placeholder:opacity-[0.6]"
              onChange={(e) => handleChange("comment", e.target.value)}
            />
          </div>
          <div className="col-span-12 flex items-center gap-4">
            <button
              className="px-5 py-1.5 bg-[#2796ef] rounded-[4px] text-[#ffffff] border border-transparent font-Nunito font-[600]"
              type="button"
              onClick={handleSubmit}
            >
              Create Customer
            </button>
            <button
              className="px-5 py-1.5 rounded-[4px] text-[#ff0000] border border-[#ff0000] font-Nunito font-[600]"
              type="button"
              onClick={() => navigate("/customer-contact/customer")}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddCustomer;
