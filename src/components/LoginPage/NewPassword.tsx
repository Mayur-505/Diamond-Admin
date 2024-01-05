import { Link } from "react-router-dom";
import Diamond from "../../assets/Image/dark-logo.svg";
import { Button } from "../ui/button";
import InputWithLabel from "../Common/InputWithLabel";

const NewPassword = () => {
  return (
    <>
      <img src={Diamond} alt="Diamond" className="h-[56px] [mt-21px]" />
      <div className="flex flex-col items-center gap-[21px]">
        <div className="mb-[14px]">
          <h2 className="font-Nunito text-[28px] font-semibold text-[#212121]">
            Create a new password
          </h2>
          <p className="m-0 text-[14px] font-normal font-Nunito text-[#495057]">
            Lorem ipsum dolor sit amet
          </p>
        </div>
        <InputWithLabel
          id="password"
          placeholder="Password"
          className="h-[35px] w-[280px] p-[7px] border border-[#ced4da] rounded-[4px] placeholder:opacity-[0.6]"
        />
        <InputWithLabel
          id="repeatpassword"
          placeholder="Repeat Password"
          className="h-[35px] w-[280px] p-[7px] border border-[#ced4da] rounded-[4px] placeholder:opacity-[0.6]"
        />
        <Button
          variant={"secondary"}
          className="h-[35px] w-[280px] p-[7px] border border-[#2196F3] hover:bg-[#2196F3] hover:bg-opacity-[0.8] bg-[#2196F3] rounded-[4px] text-[#fff]"
        >
          CONTINUE
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

export default NewPassword;
