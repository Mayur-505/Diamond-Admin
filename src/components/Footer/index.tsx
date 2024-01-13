import FooterLogo from "../../assets/Image/dark-logo.svg";

const index = () => {
  return (
    <div className="bg-[#fff] h-[4rem] fixed bottom-0 right-0 w-[calc(100%-224px)] border-t-[1px] border-b-[1px] px-[2rem] flex items-center justify-between border-[#dee2e6]">
      <div className="flex items-center w-[1.5rem] h-[1.54rem] text-base font-semibold ml-2">
        <img src={FooterLogo} alt="FooterLogo" />
        <span className="text-sm font-Nunito text-[#495057] font-semibold ml-2">
          DIAMOND
        </span>
      </div>
      <span className="text-[0.875rem] text-[#6c757d]">
        © Your Organization - 2022
      </span>
    </div>
  );
};

export default index;
