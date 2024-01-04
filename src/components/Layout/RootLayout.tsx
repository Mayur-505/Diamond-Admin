import { Outlet } from "react-router-dom";
import Sidebar from "../Sidebar";
import TopBar from "../Topbar";
import Footer from "../Footer";

const RootLayout = () => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="w-full h-[100vh] overflow-y-auto pt-[84px]">
        <TopBar />
        <Outlet />
        <Footer />
      </div>
    </div>
  );
};

export default RootLayout;
