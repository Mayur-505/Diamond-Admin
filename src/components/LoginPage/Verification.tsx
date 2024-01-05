import { useEffect, useRef, useState } from "react";
import Diamond from "../../assets/Image/dark-logo.svg";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";

const Verification = () => {
  const inputsRef = useRef([]);
  const [Otp, setOtp] = useState("");

  useEffect(() => {
    const handleKeyDown = (event, index) => {
      const inputs = inputsRef.current;
      if (event.key === "Backspace") {
        setOtp((prev) => prev.slice(0, -1));
        inputs[index].value = "";
        if (index !== 0) inputs[index - 1].focus();
      } else if (event.key === "Tab") return false;
      else {
        const isNumericKey = /^[0-9]$/.test(event.key);
        if (index === inputs.length - 1 && inputs[index].value !== "") {
          return true;
        } else if (isNumericKey) {
          setOtp((prevValue) => prevValue + event.key.toUpperCase());
          inputs[index].value = event.key;
          if (index !== inputs.length - 1) inputs[index + 1].focus();
          event.preventDefault();
        } else if (/^[A-Za-z]$/.test(event.key)) {
          setOtp((prevValue) => prevValue + event.key.toUpperCase());
          inputs[index].value = event.key.toUpperCase();
          if (index !== inputs.length - 1) inputs[index + 1].focus();
          event.preventDefault();
        }
      }
    };
    const inputs = document.querySelectorAll("#otp > *[id]");
    inputsRef.current = Array.from(inputs);
    inputsRef.current.forEach((input, index) => {
      input.addEventListener("keydown", (event) => handleKeyDown(event, index));
    });
    return () => {
      // Cleanup event listeners when the component unmounts
      inputsRef.current.forEach((input, index) => {
        input.removeEventListener("keydown", (event) =>
          handleKeyDown(event, index)
        );
      });
    };
  }, []);
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
            <span className="text-[14px] font-Nunito font-bold">
              dm**@gmail.com
            </span>
          </div>
        </div>
        <form>
          <div className="mb-[21px] flex justify-center gap-[14px]" id="otp">
            {Array.from({ length: 4 }).map((_, index) => (
              <input
                key={index}
                type="text"
                maxLength="1"
                id={`otp-${index}`}
                pattern="[0-9]"
                inputMode="numeric"
                autoComplete="one-time-code"
                required
                ref={(input) => (inputsRef.current[index] = input)}
                className="h-[35px] w-[42px] border-[1px] border-[#ced4da] text-center text-[14px] font-Nunito font-normal text-[#495057] rounded-[4px]"
              />
            ))}
          </div>
        </form>
        <Button
          variant={"secondary"}
          className="h-[35px] w-[280px] p-[7px] border border-[#2196F3] hover:bg-[#2196F3] hover:bg-opacity-[0.8] bg-[#2196F3] rounded-[4px] text-[#fff]"
        >
          Verify
        </Button>
      </div>
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

export default Verification;
