import WhiteLogo from "../../assets/Image/WhiteLogo.svg";
import { AiOutlineHome } from "react-icons/ai";
import { CiBandage, CiImageOn, CiKeyboard } from "react-icons/ci";
import { BiCategory, BiCategoryAlt } from "react-icons/bi";
import { FaListUl, FaRegUser } from "react-icons/fa6";
import { FaPlus } from "react-icons/fa6";
import { LuHistory, LuUpload } from "react-icons/lu";
import { Link } from "react-router-dom";

const Index = ({ collapsed }: { collapsed: boolean }) => {
  return (
    <div
      className={`max-w-[224px] fixed ${
        !collapsed ? "left-[-224px]" : "left-0"
      } transition-all duration-500 lg:block hidden w-full bg-[#343a40] p-[14px] h-[100vh] z-50`}
    >
      <div className="flex gap-[7px] justify-center items-center border-b-[1px] mb-[14px] pb-[14px] border-solid border-[#ffffff33]">
        <img src={WhiteLogo} alt="WhiteLogo" className="max-w-[28px]" />
        <h1 className="text-[#FFF] font-Nunito font-normal text-[21px]">
          DIAMOND
        </h1>
      </div>
      <div className="overflow-y-auto h-[calc(100%-47px)]">
        <div className="border-b-[1px] pb-[14px] mb-[14px] border-solid border-[#ffffff33]">
          <h2 className="text-[#ffffff99] uppercase font-Nunito pb-[14px] font-[700] text-[12px]">
            <Link to={"/"}>Dashboards</Link>
          </h2>
          <ul>
            <Link
              to={"/"}
              className="text-[#ffffffcc] flex gap-[7px] items-center p-[7px] font-Nunito font-normal text-[14px]"
            >
              <AiOutlineHome />
              E-Commerce
            </Link>
          </ul>
        </div>
        <div className="border-b-[1px] pb-[14px] mb-[14px] border-solid border-[#ffffff33]">
          <h2 className="text-[#ffffff99] uppercase font-Nunito pb-[14px] font-[700] text-[12px]">
            Gems
          </h2>
          <ul>
            <Link
              to={"/gems/cut"}
              className="text-[#ffffffcc] flex gap-[7px] items-center p-[7px] font-Nunito font-normal text-[14px]"
            >
              <CiImageOn />
              Cut
            </Link>
            <Link
              to={"/gems/color"}
              className="text-[#ffffffcc] flex gap-[7px] items-center p-[7px] font-Nunito font-normal text-[14px]"
            >
              <CiImageOn />
              Color
            </Link>
            <Link
              to={"/gems/clarity"}
              className="text-[#ffffffcc] flex gap-[7px] items-center p-[7px] font-Nunito font-normal text-[14px]"
            >
              <CiImageOn />
              Clarity
            </Link>
            <Link
              to={"/gems/shape"}
              className="text-[#ffffffcc] flex gap-[7px] items-center p-[7px] font-Nunito font-normal text-[14px]"
            >
              <CiImageOn />
              Shape
            </Link>
            <Link
              to={"/gems/banner"}
              className="text-[#ffffffcc] flex gap-[7px] items-center p-[7px] font-Nunito font-normal text-[14px]"
            >
              <CiBandage />
              Banner
            </Link>
            <Link
              to={"/gems/blog"}
              className="text-[#ffffffcc] flex gap-[7px] items-center p-[7px] font-Nunito font-normal text-[14px]"
            >
              <CiKeyboard />
              Blog
            </Link>
            <Link
              to={"/gems/product-list"}
              className="text-[#ffffffcc] flex gap-[7px] items-center p-[7px] font-Nunito font-normal text-[14px]"
            >
              <FaListUl />
              Product List
            </Link>
            {/* <Link
              to={"/gems/new-product"}
              className="text-[#ffffffcc] flex gap-[7px] items-center p-[7px] font-Nunito font-normal text-[14px]"
            >
              <FaPlus />
              New Product
            </Link> */}
            <Link
              to={"/gems/order-history"}
              className="text-[#ffffffcc] flex gap-[7px] items-center p-[7px] font-Nunito font-normal text-[14px]"
            >
              <LuHistory />
              Order History
            </Link>
            <Link
              to={"/gems/bulk-upload"}
              className="text-[#ffffffcc] flex gap-[7px] items-center p-[7px] font-Nunito font-normal text-[14px]"
            >
              <LuUpload />
              Bulk Upload
            </Link>
          </ul>
        </div>
        <div className="border-b-[1px] pb-[14px] mb-[14px] border-solid border-[#ffffff33]">
          <h2 className="text-[#ffffff99] uppercase font-Nunito pb-[14px] font-[700] text-[12px]">
            Category
          </h2>
          <ul>
            <Link
              to={"/category/category"}
              className="text-[#ffffffcc] flex gap-[7px] items-center p-[7px] font-Nunito font-normal text-[14px]"
            >
              <BiCategory />
              Category
            </Link>
            <Link
              to={"/category/sub-category"}
              className="text-[#ffffffcc] flex gap-[7px] items-center p-[7px] font-Nunito font-normal text-[14px]"
            >
              <BiCategoryAlt />
              Sub Category
            </Link>
            <Link
              to={"/category/inner-category"}
              className="text-[#ffffffcc] flex gap-[7px] items-center p-[7px] font-Nunito font-normal text-[14px]"
            >
              <FaPlus />
              Inner Category
            </Link>
          </ul>
        </div>
        <div className="border-b-[1px] pb-[14px] mb-[14px] border-solid border-[#ffffff33]">
          <h2 className="text-[#ffffff99] uppercase font-Nunito pb-[14px] font-[700] text-[12px]">
            customer contact
          </h2>
          <ul>
            <Link
              to={"/customer-contact/customer"}
              className="text-[#ffffffcc] flex gap-[7px] items-center p-[7px] font-Nunito font-normal text-[14px]"
            >
              <FaRegUser />
              Contact
            </Link>
          </ul>
        </div>
        <div className="border-b-[1px] pb-[14px] mb-[14px] border-solid border-[#ffffff33]">
          <h2 className="text-[#ffffff99] uppercase font-Nunito pb-[14px] font-[700] text-[12px]">
            User
          </h2>
          <ul>
            <Link
              to={"/user/user-list"}
              className="text-[#ffffffcc] flex gap-[7px] items-center p-[7px] font-Nunito font-normal text-[14px]"
            >
              <FaRegUser />
              User List
            </Link>
            <Link
              to={"/user/admin"}
              className="text-[#ffffffcc] flex gap-[7px] items-center p-[7px] font-Nunito font-normal text-[14px]"
            >
              <FaRegUser />
              Admin
            </Link>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Index;
