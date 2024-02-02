import { Navigate, Outlet } from "react-router-dom";
import Sidebar from "../Sidebar";
import TopBar from "../Topbar";
import Footer from "../Footer";
import { useState } from "react";
import { useAppSelector } from "@/hooks/use-redux";
import { Toaster } from "react-hot-toast";

const RootLayout = () => {
  const [collapsed, setCollapsed] = useState<boolean>(true);
  const { token } = useAppSelector((state) => state.auth);

  if (!token) {
    return <Navigate to={"/auth/login"} />;
  }
  return (
    <div
      className={`${
        collapsed ? "flex" : "block"
      } transition-all duration-500`}
    >
      <Sidebar collapsed={collapsed} />
      <Toaster />
      {/* <Toaster /> */}
      <div
        className={`relative ${
          collapsed ? "pl-[224px]" : "pl-0"
        } h-[100vh] transition-all duration-500 overflow-y-auto pt-[54px] w-full `}
      >
        <TopBar collapsed={collapsed} setCollapsed={setCollapsed} />
        <Outlet />
        <Footer />
      </div>
    </div>
  );
};

export default RootLayout;
