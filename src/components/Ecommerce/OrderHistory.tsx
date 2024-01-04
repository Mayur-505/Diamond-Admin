import React from "react";
import { CiFileOn, CiFolderOn, CiSearch } from "react-icons/ci";
import { FaCircleCheck } from "react-icons/fa6";
import { IoChatbubbleOutline, IoRefreshOutline } from "react-icons/io5";

const OrderHistory = () => {
  return (
    <div className="custom_contener !mb-[28px] !p-[17.5px] customShadow">
      <div className="flex flex-col md:flex-row justify-between items-center mb-4">
        <div className="flex flex-col text-center md:text-left">
          <span className="text-900 text-[21px] font-Nunito mb-2">
            My Orders
          </span>
          <span className="text-700 text-[16px] text-[#616161] font-Nunito">
            Dignissim diam quis enim lobortis.
          </span>
        </div>
        <span className="mt-5 mb-2 md:mt-0 md:mb-0 w-full lg:w-[25rem] relative">
          <input
            type="text"
            placeholder="Search"
            className="w-full lg:w-25rem border border-[#ced4da] text-[14px] bg-transparent outline-none p-[7px] pr-[35px] rounded"
          />
          <CiSearch className="absolute right-3 top-1/2 -translate-y-1/2 text-[#bdbdbd] font-[600] text-[18px]" />
        </span>
      </div>
      <div className="w-full shadow rounded-[4px] m-0 mb-6 bg-white flex flex-wrap overflow-hidden">
        <div className="p-2 bg-[#f5f5f5] w-full rounded-tr rounded-tl grid grid-cols-12 divide-x divide-[#dee2e6]">
          <div className="col-span-4 py-2 px-4 flex-auto text-center md:text-left">
            <span className="text-700 text-[14px] text-[#616161] font-Nunito block">
              Order Number
            </span>
            <span className="text-[#212121] text-[14px] font-medium font-Nunito block mt-2">
              45123
            </span>
          </div>
          <div className="col-span-4 py-2 px-4 flex-auto text-center md:text-left">
            <span className="text-700 text-[14px] text-[#616161] font-Nunito block">
              Order Date
            </span>
            <span className="text-[#212121] text-[14px] font-medium font-Nunito block mt-2">
              7 February 2023
            </span>
          </div>
          <div className="col-span-4 py-2 px-4 flex-auto text-center md:text-left">
            <span className="text-700 text-[14px] text-[#616161] font-Nunito block">
              Total Amount
            </span>
            <span className="text-[#212121] text-[14px] font-medium font-Nunito block mt-2">
              $123.00
            </span>
          </div>
        </div>
        <div className="w-full">
          <div className="p-2 my-4 flex flex-col lg:flex-row justify-between items-center">
            <div className="flex flex-col lg:flex-row justify-center  items-center px-2">
              <img
                src="https://www.primefaces.org/diamond-ng/assets/demo/images/ecommerce/order-history/orderhistory-1.png"
                alt=""
                className="w-[8rem] h-[8rem] mr-3 flex-shrink-0"
              />
              <div className="flex flex-col my-auto text-center md:text-left">
                <span className="text-900 text-[14px] font-Nunito font-medium mb-[14px] mt-3 lg:mt-0">
                  Product Name Placeholder A Little Bit Long One
                </span>
                <span className="text-700 text-[12px] font-Nunito mb-[14px]">
                  White | Small
                </span>
                <a className="p-[7px] cursor-pointer w-[10rem] mx-auto lg:mx-0 rounded font-medium text-center border border-blue-500 text-blue-500 transition-duration-150 font-Nunito text-[14px]">
                  Buy Again <span className="font-light">| $50</span>
                  <span
                    className="p-ink"
                    aria-hidden="true"
                    role="presentation"
                  ></span>
                </a>
              </div>
            </div>
            <div className="mr-0 lg:mr-3 mt-4 lg:mt-0 p-2 flex items-center bg-[#4caf501a] rounded-[25px]">
              <FaCircleCheck className="text-[#4caf50] text-[28px] mr-[7px]" />
              <span className="text-green-500 font-Nunito text-[14px]">
                Delivered on 7 February 2023
              </span>
            </div>
          </div>
          <div className="p-2 my-4 flex flex-col lg:flex-row justify-between items-center">
            <div className="flex flex-col lg:flex-row justify-center  items-center px-2">
              <img
                src="https://www.primefaces.org/diamond-ng/assets/demo/images/ecommerce/order-history/orderhistory-2.png"
                alt=""
                className="w-[8rem] h-[8rem] mr-3 flex-shrink-0"
              />
              <div className="flex flex-col my-auto text-center md:text-left">
                <span className="text-900 text-[14px] font-Nunito font-medium mb-[14px] mt-3 lg:mt-0">
                  Product Name Placeholder A Little Bit Long One
                </span>
                <span className="text-700 text-[12px] font-Nunito mb-[14px]">
                  White | Small
                </span>
                <a className="p-[7px] cursor-pointer w-[10rem] mx-auto lg:mx-0 rounded font-medium text-center border border-blue-500 text-blue-500 transition-duration-150 font-Nunito text-[14px]">
                  Buy Again <span className="font-light">| $50</span>
                  <span
                    className="p-ink"
                    aria-hidden="true"
                    role="presentation"
                  ></span>
                </a>
              </div>
            </div>
            <div className="mr-0 lg:mr-3 mt-4 lg:mt-0 p-2 flex items-center bg-[#4caf501a] rounded-[25px]">
              <FaCircleCheck className="text-[#4caf50] text-[28px] mr-[7px]" />
              <span className="text-green-500 font-Nunito text-[14px]">
                Delivered on 7 February 2023
              </span>
            </div>
          </div>
          <div className="p-2 my-4 flex flex-col lg:flex-row justify-between items-center">
            <div className="flex flex-col lg:flex-row justify-center  items-center px-2">
              <img
                src="https://www.primefaces.org/diamond-ng/assets/demo/images/ecommerce/order-history/orderhistory-3.png"
                alt=""
                className="w-[8rem] h-[8rem] mr-3 flex-shrink-0"
              />
              <div className="flex flex-col my-auto text-center md:text-left">
                <span className="text-900 text-[14px] font-Nunito font-medium mb-[14px] mt-3 lg:mt-0">
                  Product Name Placeholder A Little Bit Long One
                </span>
                <span className="text-700 text-[12px] font-Nunito mb-[14px]">
                  White | Small
                </span>
                <a className="p-[7px] cursor-pointer w-[10rem] mx-auto lg:mx-0 rounded font-medium text-center border border-blue-500 text-blue-500 transition-duration-150 font-Nunito text-[14px]">
                  Buy Again <span className="font-light">| $60</span>
                  <span
                    className="p-ink"
                    aria-hidden="true"
                    role="presentation"
                  ></span>
                </a>
              </div>
            </div>
            <div className="mr-0 lg:mr-3 mt-4 lg:mt-0 p-2 flex items-center bg-[#4caf501a] rounded-[25px]">
              <FaCircleCheck className="text-[#4caf50] text-[28px] mr-[7px]" />
              <span className="text-green-500 font-Nunito text-[14px]">
                Delivered on 7 February 2023
              </span>
            </div>
          </div>
        </div>
        <div className="p-0 flex border-t border-[#dee2e6] w-full">
          <a className="cursor-pointer py-4 text-[14px] flex flex-col md:flex-row text-center justify-center items-center w-full text-[#2196F3] hover:bg-[#2196F3] hover:text-[#fff]">
            <CiFolderOn className="text-[22px] mr-2" />
            Archive Order
          </a>
          <a className="cursor-pointer py-4 text-[14px] flex flex-col md:flex-row text-center justify-center items-center w-full text-[#2196F3] hover:bg-[#2196F3] hover:text-[#fff]">
            <IoRefreshOutline className="text-[22px] mr-2" />
            Return
          </a>
          <a className="cursor-pointer py-4 text-[14px] flex flex-col md:flex-row text-center justify-center items-center w-full text-[#2196F3] hover:bg-[#2196F3] hover:text-[#fff]">
            <CiFileOn className="text-[22px] mr-2" />
            View Invoice
          </a>
          <a className="cursor-pointer py-4 text-[14px] flex flex-col md:flex-row text-center justify-center items-center w-full text-[#2196F3] hover:bg-[#2196F3] hover:text-[#fff]">
            <IoChatbubbleOutline className="text-[22px] mr-2" />
            Write a Review
          </a>
        </div>
      </div>
      <div className="w-full shadow rounded-[4px] m-0 mb-6 bg-white flex flex-wrap overflow-hidden">
        <div className="p-2 bg-[#f5f5f5] w-full rounded-tr rounded-tl grid grid-cols-12 divide-x divide-[#dee2e6]">
          <div className="col-span-4 py-2 px-4 flex-auto text-center md:text-left">
            <span className="text-700 text-[14px] text-[#616161] font-Nunito block">
              Order Number
            </span>
            <span className="text-[#212121] text-[14px] font-medium font-Nunito block mt-2">
              45126
            </span>
          </div>
          <div className="col-span-4 py-2 px-4 flex-auto text-center md:text-left">
            <span className="text-700 text-[14px] text-[#616161] font-Nunito block">
              Order Date
            </span>
            <span className="text-[#212121] text-[14px] font-medium font-Nunito block mt-2">
              9 February 2023
            </span>
          </div>
          <div className="col-span-4 py-2 px-4 flex-auto text-center md:text-left">
            <span className="text-700 text-[14px] text-[#616161] font-Nunito block">
              Total Amount
            </span>
            <span className="text-[#212121] text-[14px] font-medium font-Nunito block mt-2">
              $250.00
            </span>
          </div>
        </div>
        <div className="w-full">
          <div className="p-2 my-4 flex flex-col lg:flex-row justify-between items-center">
            <div className="flex flex-col lg:flex-row justify-center  items-center px-2">
              <img
                src="https://www.primefaces.org/diamond-ng/assets/demo/images/ecommerce/order-history/orderhistory-4.png"
                alt=""
                className="w-[8rem] h-[8rem] mr-3 flex-shrink-0"
              />
              <div className="flex flex-col my-auto text-center md:text-left">
                <span className="text-900 text-[14px] font-Nunito font-medium mb-[14px] mt-3 lg:mt-0">
                  Product Name Placeholder A Little Bit Long One
                </span>
                <span className="text-700 text-[12px] font-Nunito mb-[14px]">
                  White | Small
                </span>
                <a className="p-[7px] cursor-pointer w-[10rem] mx-auto lg:mx-0 rounded font-medium text-center border border-blue-500 text-blue-500 transition-duration-150 font-Nunito text-[14px]">
                  Buy Again <span className="font-light">| $80</span>
                  <span
                    className="p-ink"
                    aria-hidden="true"
                    role="presentation"
                  ></span>
                </a>
              </div>
            </div>
            <div className="mr-0 lg:mr-3 mt-4 lg:mt-0 p-2 flex items-center bg-[#4caf501a] rounded-[25px]">
              <FaCircleCheck className="text-[#4caf50] text-[28px] mr-[7px]" />
              <span className="text-green-500 font-Nunito text-[14px]">
                Delivered on 7 February 2023
              </span>
            </div>
          </div>
          <div className="p-2 my-4 flex flex-col lg:flex-row justify-between items-center">
            <div className="flex flex-col lg:flex-row justify-center  items-center px-2">
              <img
                src="https://www.primefaces.org/diamond-ng/assets/demo/images/ecommerce/order-history/orderhistory-5.png"
                alt=""
                className="w-[8rem] h-[8rem] mr-3 flex-shrink-0"
              />
              <div className="flex flex-col my-auto text-center md:text-left">
                <span className="text-900 text-[14px] font-Nunito font-medium mb-[14px] mt-3 lg:mt-0">
                  Product Name Placeholder A Little Bit Long One
                </span>
                <span className="text-700 text-[12px] font-Nunito mb-[14px]">
                  White | Small
                </span>
                <a className="p-[7px] cursor-pointer w-[10rem] mx-auto lg:mx-0 rounded font-medium text-center border border-blue-500 text-blue-500 transition-duration-150 font-Nunito text-[14px]">
                  Buy Again <span className="font-light">| $20</span>
                  <span
                    className="p-ink"
                    aria-hidden="true"
                    role="presentation"
                  ></span>
                </a>
              </div>
            </div>
            <div className="mr-0 lg:mr-3 mt-4 lg:mt-0 p-2 flex items-center bg-[#4caf501a] rounded-[25px]">
              <FaCircleCheck className="text-[#4caf50] text-[28px] mr-[7px]" />
              <span className="text-green-500 font-Nunito text-[14px]">
                Delivered on 7 February 2023
              </span>
            </div>
          </div>
          <div className="p-2 my-4 flex flex-col lg:flex-row justify-between items-center">
            <div className="flex flex-col lg:flex-row justify-center  items-center px-2">
              <img
                src="https://www.primefaces.org/diamond-ng/assets/demo/images/ecommerce/order-history/orderhistory-6.png"
                alt=""
                className="w-[8rem] h-[8rem] mr-3 flex-shrink-0"
              />
              <div className="flex flex-col my-auto text-center md:text-left">
                <span className="text-900 text-[14px] font-Nunito font-medium mb-[14px] mt-3 lg:mt-0">
                  Product Name Placeholder A Little Bit Long One
                </span>
                <span className="text-700 text-[12px] font-Nunito mb-[14px]">
                  White | Small
                </span>
                <a className="p-[7px] cursor-pointer w-[10rem] mx-auto lg:mx-0 rounded font-medium text-center border border-blue-500 text-blue-500 transition-duration-150 font-Nunito text-[14px]">
                  Buy Again <span className="font-light">| $120</span>
                  <span
                    className="p-ink"
                    aria-hidden="true"
                    role="presentation"
                  ></span>
                </a>
              </div>
            </div>
            <div className="mr-0 lg:mr-3 mt-4 lg:mt-0 p-2 flex items-center bg-[#4caf501a] rounded-[25px]">
              <FaCircleCheck className="text-[#4caf50] text-[28px] mr-[7px]" />
              <span className="text-green-500 font-Nunito text-[14px]">
                Delivered on 7 February 2023
              </span>
            </div>
          </div>
        </div>
        <div className="p-0 flex border-t border-[#dee2e6] w-full">
          <a className="cursor-pointer py-4 text-[14px] flex flex-col md:flex-row text-center justify-center items-center w-full text-[#2196F3] hover:bg-[#2196F3] hover:text-[#fff]">
            <CiFolderOn className="text-[22px] mr-2" />
            Archive Order
          </a>
          <a className="cursor-pointer py-4 text-[14px] flex flex-col md:flex-row text-center justify-center items-center w-full text-[#2196F3] hover:bg-[#2196F3] hover:text-[#fff]">
            <IoRefreshOutline className="text-[22px] mr-2" />
            Return
          </a>
          <a className="cursor-pointer py-4 text-[14px] flex flex-col md:flex-row text-center justify-center items-center w-full text-[#2196F3] hover:bg-[#2196F3] hover:text-[#fff]">
            <CiFileOn className="text-[22px] mr-2" />
            View Invoice
          </a>
          <a className="cursor-pointer py-4 text-[14px] flex flex-col md:flex-row text-center justify-center items-center w-full text-[#2196F3] hover:bg-[#2196F3] hover:text-[#fff]">
            <IoChatbubbleOutline className="text-[22px] mr-2" />
            Write a Review
          </a>
        </div>
      </div>
    </div>
  );
};

export default OrderHistory;
