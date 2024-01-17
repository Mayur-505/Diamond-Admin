import { useEffect, useRef, useState } from "react";
import Diamond from "../../assets/Image/dark-logo.svg";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { FieldValues } from "react-hook-form";
import { ResendOtp, VerificationOtp } from "@/services/authService";
import { useToast } from "../ui/use-toast";

const Verification = () => {
  const inputsRef = useRef<HTMLInputElement[]>([]);
  const { toast } = useToast();
  const [Otp, setOtp] = useState("");
  const email = localStorage.getItem("forgotmail");
  const navigate = useNavigate();

  useEffect(() => {
    const handleInput = (
      event: React.ChangeEvent<HTMLInputElement>,
      index: number
    ) => {
      const inputs = inputsRef.current;
      const numericValues = inputs
        .map((input) => input.value)
        .filter((value) => /^[0-9]$/.test(value));
      setOtp(numericValues.join("").slice(0, 6));

      if (index !== inputs.length - 1 && inputs[index].value !== "") {
        inputs[index + 1].focus();
      }
    };

    const inputs = document.querySelectorAll<HTMLInputElement>("#otp > *[id]");
    inputsRef.current = Array.from(inputs);
    inputsRef.current.forEach((input, index) => {
      input.addEventListener("input", (event) => handleInput(event, index));
    });

    return () => {
      inputsRef.current.forEach((input, index) => {
        if (input) {
          input.removeEventListener("input", (event) =>
            handleInput(event, index)
          );
        }
      });
    };
  }, []);

  const { mutate } = useMutation({
    mutationFn: (data: FieldValues) => VerificationOtp(data),
    onSuccess: (response) => {
      localStorage.setItem(
        "ForgetPasswordToken",
        response?.data?.data?.ForgetPasswordToken
      );
      toast({
        variant: "success",
        title: "Verification Successfully",
      });
      navigate("/auth/new-password");
    },
    onError: (error) => {
      toast({
        variant: "error",
        title: (error as { data?: { message?: string } })?.data?.message || "",
      });
    },
  });
  const { mutate: resendOtp } = useMutation({
    mutationFn: (data: FieldValues) => ResendOtp(data),
    onSuccess: () => {},
  });

  const handleResentOtp = () => {
    resendOtp({ email });
  };
  return (
    <>
      <img src={Diamond} alt="Diamond" className="h-[56px] [mt-21px]" />
      <div className="flex flex-col items-center gap-[21px]">
        <div className="mb-[14px]">
          <h2 className="font-Nunito text-[28px] font-semibold text-[#212121]">
            Verification
          </h2>
          <p className="m-0 mb-[14px] text-[14px] font-normal font-Nunito text-[#495057]">
            We have sent code to you email:
          </p>
          <div className="flex items-center w-full justify-center">
            <i className="ri-mail-line text-[#757575] mr-[7px]"></i>
            <span className="text-[14px] font-Nunito font-bold">{email}</span>
          </div>
        </div>
        <form>
          <div className="mb-[21px] flex justify-center gap-[14px]" id="otp">
            {Array.from({ length: 6 }).map((_, index) => (
              <input
                key={index}
                type="text"
                maxLength={1}
                id={`otp-${index}`}
                pattern="[0-9]"
                inputMode="numeric"
                autoComplete="one-time-code"
                required
                ref={(input) => (inputsRef.current[index] = input!)}
                className="h-[35px] w-[42px] border-[1px] border-[#ced4da] text-center text-[14px] font-Nunito font-normal text-[#495057] rounded-[4px]"
              />
            ))}
          </div>
        </form>
        <Button
          variant={"secondary"}
          className="h-[35px] w-[280px] p-[7px] border border-[#2196F3] hover:bg-[#2196F3] hover:bg-opacity-[0.8] bg-[#2196F3] rounded-[4px] text-[#fff]"
          onClick={() => mutate({ email, otp: Otp })}
        >
          Verify
        </Button>
      </div>
      <p className="m-0 text-[14px] font-normal font-Nunito text-[#495057]">
        A problem?{" "}
        <span
          className="text-[#2196F3] cursor-pointer"
          onClick={handleResentOtp}
        >
          Click here
        </span>{" "}
        and let us help you.
      </p>
    </>
  );
};

export default Verification;
