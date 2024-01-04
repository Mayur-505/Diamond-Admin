import WhiteLogo from "../../assets/Image/WhiteLogo.svg";
import { AiOutlineHome } from "react-icons/ai";
import { CiImageOn } from "react-icons/ci";
import { BiCategory, BiCategoryAlt } from "react-icons/bi";
import { TfiCheckBox } from "react-icons/tfi";
import { FaListUl, FaRegUser } from "react-icons/fa6";
import { FaRegFile } from "react-icons/fa";
import { LuShoppingCart } from "react-icons/lu";
import { FaPlus } from "react-icons/fa6";
import { LuHistory } from "react-icons/lu";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="max-w-[224px] lg:block hidden w-full bg-[#343a40] p-[14px] h-[100vh]">
      <div className="flex gap-[7px] justify-center items-center border-b-[1px] mb-[14px] pb-[14px] border-solid border-[#ffffff33]">
        <img src={WhiteLogo} alt="WhiteLogo" className="max-w-[28px]" />
        <h1 className="text-[#FFF] font-Nunito font-normal text-[21px]">
          DIAMOND
        </h1>
      </div>
      <div className="overflow-y-auto h-[calc(100%-47px)]">
        <div className="border-b-[1px] pb-[14px] mb-[14px] border-solid border-[#ffffff33]">
          <h2 className="text-[#ffffff99] uppercase font-Nunito pb-[14px] font-[700] text-[12px]">
            <Link to={"/dashboard"}>Dashboards</Link>
          </h2>
          <ul>
            <Link
              to={"/dashboard"}
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
              to={"/gems/clarity"}
              className="text-[#ffffffcc] flex gap-[7px] items-center p-[7px] font-Nunito font-normal text-[14px]"
            >
              <CiImageOn />
              Clarity
            </Link>
            <Link
              to={"/gems/product-overview"}
              className="text-[#ffffffcc] flex gap-[7px] items-center p-[7px] font-Nunito font-normal text-[14px]"
            >
              <CiImageOn />
              Product Overview
            </Link>
            <Link
              to={"/gems/product-list"}
              className="text-[#ffffffcc] flex gap-[7px] items-center p-[7px] font-Nunito font-normal text-[14px]"
            >
              <FaListUl />
              Product List
            </Link>
            <Link
              to={"/gems/new-product"}
              className="text-[#ffffffcc] flex gap-[7px] items-center p-[7px] font-Nunito font-normal text-[14px]"
            >
              <FaPlus />
              New Product
            </Link>
            <Link
              to={"/gems/shopping-cart"}
              className="text-[#ffffffcc] flex gap-[7px] items-center p-[7px] font-Nunito font-normal text-[14px]"
            >
              <LuShoppingCart />
              Shopping Cart
            </Link>
            <Link
              to={"/gems/checkout-form"}
              className="text-[#ffffffcc] flex gap-[7px] items-center p-[7px] font-Nunito font-normal text-[14px]"
            >
              <TfiCheckBox />
              Checkout From
            </Link>
            <Link
              to={"/gems/order-history"}
              className="text-[#ffffffcc] flex gap-[7px] items-center p-[7px] font-Nunito font-normal text-[14px]"
            >
              <LuHistory />
              Order History
            </Link>
            <Link
              to={"/gems/order-summary"}
              className="text-[#ffffffcc] flex gap-[7px] items-center p-[7px] font-Nunito font-normal text-[14px]"
            >
              <FaRegFile />
              Order Summary
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
              to={""}
              className="text-[#ffffffcc] flex gap-[7px] items-center p-[7px] font-Nunito font-normal text-[14px]"
            >
              <FaPlus />
              Inner Category
            </Link>
          </ul>
        </div>
        <div className="border-b-[1px] pb-[14px] mb-[14px] border-solid border-[#ffffff33]">
          <h2 className="text-[#ffffff99] uppercase font-Nunito pb-[14px] font-[700] text-[12px]">
            Customer Cantact
          </h2>
          <ul>
            <Link
              to={"/customer-contact/customer"}
              className="text-[#ffffffcc] flex gap-[7px] items-center p-[7px] font-Nunito font-normal text-[14px]"
            >
              <FaRegUser />
              Customers
            </Link>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Index;
