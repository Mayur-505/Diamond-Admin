import { useNavigate } from "react-router-dom";
import Diamond from "../../assets/Image/dark-logo.svg";
import { Button } from "../ui/button";
import InputWithLabel from "../Common/InputWithLabel";
import { FieldValues, useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { newPassword } from "@/services/authService";
import { useToast } from "../ui/use-toast";

const NewPassword = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const {
    register,
    formState: {},
    reset,
    handleSubmit,
  } = useForm();

  const { mutate: NewPass } = useMutation({
    mutationFn: (data: FieldValues) => newPassword(data),
    onSuccess: () => {
      toast({
        variant: "success",
        title: "Password Created Successfully",
      });
      reset();
      navigate("/auth/login");
      localStorage.removeItem("ForgetPasswordToken");
    },
    onError: (error) => {
      toast({
        variant: "error",
        title: (error as { data?: { message?: string } })?.data?.message || "",
      });
    },
  });

  const onSubmit = (values: FieldValues) => {
    const payload = new FormData();
    payload.append("new_pass", values.new_pass);
    payload.append("confirm_pass", values.confirm_pass);
    NewPass(payload);
  };
  return (
    <>
      <img src={Diamond} alt="Diamond" className="h-[56px] [mt-21px]" />
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col items-center gap-[21px]">
          <div className="mb-[14px]">
            <h2 className="font-Nunito text-[28px] font-semibold text-[#212121]">
              Create a new password
            </h2>
          </div>
          <InputWithLabel
            id="new_pass"
            type="password"
            placeholder="Password"
            className="h-[35px] w-[280px] p-[7px] border border-[#ced4da] rounded-[4px] placeholder:opacity-[0.6]"
            {...register("new_pass", { required: "This field is required." })}
          />
          <InputWithLabel
            id="confirm_pass"
            type="password"
            placeholder="Repeat Password"
            className="h-[35px] w-[280px] p-[7px] border border-[#ced4da] rounded-[4px] placeholder:opacity-[0.6]"
            {...register("confirm_pass", {
              required: "This field is required.",
            })}
          />
          <Button
            variant={"secondary"}
            className="h-[35px] w-[280px] p-[7px] border border-[#2196F3] hover:bg-[#2196F3] hover:bg-opacity-[0.8] bg-[#2196F3] rounded-[4px] text-[#fff]"
          >
            CONTINUE
          </Button>
        </div>
      </form>
      <p className="m-0 text-[14px] font-normal font-Nunito text-[#495057]"></p>
    </>
  );
};

export default NewPassword;
