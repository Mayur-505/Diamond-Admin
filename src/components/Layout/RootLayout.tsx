import { Outlet } from "react-router-dom";
import Sidebar from "../Sidebar";
import TopBar from "../Topbar";
import Footer from "../Footer";
import { useState } from "react";
import { Toaster } from "../ui/toaster";

const RootLayout = () => {
  const [collapsed, setCollapsed] = useState<boolean>(true);
  return (
    <div
      className={`${
        collapsed ? "flex" : "block"
      } transition-all duration-[0.5s]`}
    >
      <Sidebar collapsed={collapsed} />
      <div
        className={`relative ${
          collapsed ? "pl-[224px]" : "pl-0"
        } h-[100vh] transition-all duration-[0.5s] overflow-y-auto pt-[54px] w-full`}
      >
        <TopBar collapsed={collapsed} setCollapsed={setCollapsed} />
        <Outlet />
        <Toaster />
        <Footer />
      </div>
    </div>
  );
};

export default RootLayout;
