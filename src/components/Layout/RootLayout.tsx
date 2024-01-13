import { Navigate, Outlet } from "react-router-dom";
import Sidebar from "../Sidebar";
import TopBar from "../Topbar";
import Footer from "../Footer";
import { useState } from "react";
import { Toaster } from "../ui/toaster";
import { useAppSelector } from "@/hooks/use-redux";

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
      } transition-all duration-[0.5s]`}
    >
      <Sidebar collapsed={collapsed} />
      <Toaster />
      <div
        className={`relative ${
          collapsed ? "pl-[224px]" : "pl-0"
        } h-[100vh] transition-all duration-[0.5s] overflow-y-auto pt-[54px] w-full `}
      >
        <TopBar collapsed={collapsed} setCollapsed={setCollapsed} />
        <Outlet />
        <Footer />
      </div>
    </div>
  );
};

export default RootLayout;
