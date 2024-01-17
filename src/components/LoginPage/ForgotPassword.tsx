import { Button } from "../ui/button";
import Diamond from "../../assets/Image/dark-logo.svg";
import { Link, useNavigate } from "react-router-dom";
import InputWithLabel from "../Common/InputWithLabel";
import { type FieldValues, useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { forgotPassword } from "@/services/authService";
import { useToast } from "../ui/use-toast";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const {
    register,
    handleSubmit,
    formState: {},
    reset,
  } = useForm();

  const EMAIL_REGEX = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

  const { mutate } = useMutation({
    mutationFn: (data: FieldValues) => forgotPassword(data),
    onSuccess: () => {
      reset();
      toast({
        variant: "success",
        title: "Forget Password Created Successfully",
      });
      navigate("/auth/verification");
    },
    onError: (error) => {
      toast({
        variant: "error",
        title: (error as { data?: { message?: string } })?.data?.message || "",
      });
    },
  });

  const onSubmit = (values: FieldValues) => {
    localStorage.setItem("forgotmail", values.email);
    mutate(values);
  };

  return (
    <>
      <img src={Diamond} alt="Diamond" className="h-[56px] [mt-21px]" />
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col items-center gap-[21px]">
          <div className="mb-[14px]">
            <h2 className="font-Nunito text-[28px] font-semibold text-[#212121]">
              Forgot Password
            </h2>
            <p className="m-0 text-[14px] font-normal font-Nunito text-[#495057]">
              Enter your email to reset your password
            </p>
          </div>
          <InputWithLabel
            id="email"
            placeholder="Email"
            className="h-[35px] w-[280px] p-[7px] border border-[#ced4da] rounded-[4px] placeholder:opacity-[0.6]"
            {...register("email", {
              required: "This field is required.",
              pattern: {
                value: EMAIL_REGEX,
                message: "Please enter valid email.",
              },
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
      <p className="m-0 text-[14px] font-normal font-Nunito text-[#495057]">
        A problem?{" "}
        <Link to={"/auth/signup"} className="text-[#2196F3]">
          Click here
        </Link>{" "}
        and let us help you.
      </p>
    </>
  );
};

export default ForgotPassword;
