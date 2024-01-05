import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import Diamond from "../../assets/Image/dark-logo.svg";
import { Checkbox } from "../ui/checkbox";
import InputWithLabel from "../Common/InputWithLabel";

const SignUp = () => {
  return (
    <>
      <img src={Diamond} alt="Diamond" className="h-[56px] [mt-21px]" />
      <div className="flex flex-col items-center gap-[21px]">
        <div className="mb-[14px]">
          <h2 className="font-Nunito text-[28px] font-semibold text-[#212121]">
            Register
          </h2>
          <p className="m-0 text-[14px] font-normal font-Nunito text-[#495057]">
            Let's get started
          </p>
        </div>
        <InputWithLabel
          id="usrname"
          placeholder="User Name"
          className="h-[35px] w-[350px] p-[7px] border border-[#ced4da] rounded-[4px] placeholder:opacity-[0.6]"
        />
        <InputWithLabel
          id="email"
          placeholder="Email"
          className="h-[35px] w-[350px] p-[7px] border border-[#ced4da] rounded-[4px] placeholder:opacity-[0.6]"
        />
        <InputWithLabel
          id="password"
          placeholder="Password"
          className="h-[35px] w-[350px] p-[7px] border border-[#ced4da] rounded-[4px] placeholder:opacity-[0.6]"
        />
        <div className="flex items-start space-x-2">
          <Checkbox id="terms" className="" />
          <label
            htmlFor="terms"
            className="text-sm text-[#212121] font-Nunito font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            I have read the Terms and Conditions
          </label>
        </div>
        <Button
          variant={"secondary"}
          className="h-[35px] w-[350px] p-[7px] border border-[#2196F3] hover:bg-[#2196F3] hover:bg-opacity-[0.8] bg-[#2196F3] rounded-[4px] text-[#fff]"
        >
          CONTINUE
        </Button>
      </div>
      <p className="m-0 text-[14px] font-normal font-Nunito text-[#495057]">
        Already have an account? Login <br /> A problem?
        <Link to={"/auth/login"} className="text-[#2196F3]">
          Click here
        </Link>{" "}
        and let us help you.
      </p>
    </>
  );
};

export default SignUp;
