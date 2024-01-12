import React, { FC } from "react";
import { FaChevronLeft, FaRegBell } from "react-icons/fa6";
import { LuSearch } from "react-icons/lu";
import { useLocation } from "react-router-dom";
import ProfileImage from "../../assets/Image/profileImage.jpg";
import { GrTextAlignRight } from "react-icons/gr";
import { ProfileDropDown } from "../Common/ProfileDropDown";

interface HeaderProps {
  setCollapsed: (collapsed: boolean) => void;
  collapsed: boolean;
}

const Index: FC<HeaderProps> = ({ setCollapsed, collapsed }) => {
  const location = useLocation();
  const path = location.pathname;

  const cleanedPath = path.replace(/^\/|\/$/g, "").trim();

  const parts = cleanedPath.split("/");

  const firstPart = parts[0];
  const secondPart = parts[1];
  return (
    <div
      className={`${
        collapsed ? "w-[calc(100%-224px)]" : "w-full"
      } transition-all duration-[0.5s] z-10 h-[56px] fixed right-0 top-0 flex items-center justify-between px-[28px] bg-[#FFF] border-[1px] border-solid border-[#dee2e6]`}
    >
      <div className="flex items-center gap-[14px]">
        <div className="border-[#dee2e6] border-r-[1px] border-solid">
          <button
            type="button"
            onClick={() => setCollapsed(!collapsed)}
            className="h-[35px] w-[35px] bg-[#f8f9fa] mr-[14px] hidden items-center justify-center lg:flex "
          >
            <FaChevronLeft />
          </button>
          {/* <div className="h-[35px] w-[35px] bg-[#f8f9fa] mr-[14px] flex items-center justify-center lg:hidden ">
            <MenubarDrawer />
          </div> */}
        </div>
        <h1 className="font-Nunito font-[600] text-[#6c757d] uppercase text-[14px]">
          {path == "/dashboard"
            ? "E-Commerce Dashboard"
            : `${firstPart}  /  ${secondPart}`}
        </h1>
      </div>
      <div className="flex items-center gap-[14px]">
        <div className="flex gap-[14px] items-center pr-[14px] border-[#dee2e6] border-r-[1px] border-solid">
          <LuSearch style={{ fontSize: "22px" }} />
          <FaRegBell style={{ fontSize: "22px" }} />
        </div>
        <ProfileDropDown />
        <div className="h-[35px] w-[35px] bg-[#f8f9fa] mr-[14px]  flex items-center justify-center">
          <GrTextAlignRight style={{ fontSize: "20px" }} />
        </div>
      </div>
    </div>
  );
};

export default Index;
