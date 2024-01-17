import { FC, useEffect, useState } from "react";
import { FaChevronLeft } from "react-icons/fa6";
import { useLocation } from "react-router-dom";
import { GrTextAlignRight } from "react-icons/gr";
import { ProfileDropDown } from "../Common/ProfileDropDown";
import { useQuery } from "@tanstack/react-query";
import { useAppSelector } from "@/hooks/use-redux";
import { GetOneUser } from "@/services/adminService";

interface HeaderProps {
  setCollapsed: (collapsed: boolean) => void;
  collapsed: boolean;
}

const Index: FC<HeaderProps> = ({ setCollapsed, collapsed }) => {
  const location = useLocation();
  const { user } = useAppSelector((state) => state.auth);
  const [userdata, setUserData] = useState({});
  const [userID, setUserId] = useState(user?.query?.id || "");

  const path = location.pathname;

  const cleanedPath = path.replace(/^\/|\/$/g, "").trim();

  const parts = cleanedPath.split("/");

  const firstPart = parts[0];
  const secondPart = parts[1];

  useEffect(() => {
    if (user?.qurey?.id) setUserId(user?.qurey?.id);
  }, [user]);

  const { data: categoryData } = useQuery({
    queryKey: ["GET_ONEUSER", { userID }],
    queryFn: () => GetOneUser(userID),
  });

  useEffect(() => {
    setUserData(categoryData?.data?.data);
  }, [categoryData]);
  return (
    <div
      className={`${
        collapsed ? "w-[calc(100%-224px)]" : "w-full"
      } transition-all duration-[0.5s] z-10 h-[56px] fixed right-0 top-0 flex items-center justify-between px-[28px] bg-[#FFF] border-[1px] border-solid border-[#dee2e6]`}
    >
      <div className="flex items-center gap-[14px]">
        <div className="border-[#dee2e6] border-r-[1px] border-solid">
          <div
            onClick={() => setCollapsed(!collapsed)}
            className="h-[35px] w-[35px] bg-[#f8f9fa] mr-[14px] hidden items-center justify-center lg:flex cursor-pointer"
          >
            <FaChevronLeft />
          </div>
        </div>
        <h1 className="font-Nunito font-[600] text-[#6c757d] uppercase text-[14px]">
          {path == "/dashboard"
            ? "E-Commerce Dashboard"
            : `${firstPart}  /  ${secondPart}`}
        </h1>
      </div>
      <div className="flex items-center gap-[14px]">
        <ProfileDropDown userdata={userdata} />
        <div className="h-[35px] w-[35px] bg-[#f8f9fa] mr-[14px]  flex items-center justify-center">
          <GrTextAlignRight style={{ fontSize: "20px" }} />
        </div>
      </div>
    </div>
  );
};

export default Index;
