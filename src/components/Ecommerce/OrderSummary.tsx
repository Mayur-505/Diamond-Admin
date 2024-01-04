import React from "react";
import { Progress } from "../ui/progress";

const OrderSummary = () => {
  return (
    <div className="custom_contener !mb-[28px]">
      <div className="!p-[17.5px] customShadow mb-[32px]">
        <span className="text-700 text-xl font-Nunito">Thanks!</span>
        <div className="text-900 font-bold text-[28px] font-Nunito my-2">
          Successful Order 🚀
        </div>
        <p className="text-700 text-[17.5px] font-Nunito mt-0 mb-4 p-0">
          Your order is on the way. It'll be shipped today. We'll inform you.
        </p>
        <div className="h-[3px] linerBg"></div>
        <div className="flex flex-column sm:flex-row sm:items-center sm:justify-between py-5">
          <div className="mb-3 sm:mb-0">
            <span className="font-medium text-xl text-900 mr-2 font-Nunito">
              Order number:
            </span>
            <span className="font-medium text-xl text-blue-500 font-Nunito">
              451234
            </span>
          </div>
          <div className="flex items-center gap-3">
            <button className="border border-blue-500 rounded px-4 py-1 text-blue-500 font-Nunito font-[500]">
              Details
            </button>
            <button className="border border-blue-500 rounded px-4 py-1 text-blue-500 font-Nunito font-[500]">
              Print
            </button>
          </div>
        </div>
        <div className="border border-[#dee2e6] rounded">
          <ul className="list-none p-0 m-0">
            <li className="flex justify-between items-center p-[14px] border-b">
              <div className="flex gap-3 items-center">
                <img
                  src="https://www.primefaces.org/diamond-ng/assets/demo/images/ecommerce/ordersummary/order-summary-1-1.png"
                  alt="img"
                  className="w-3rem h-3rem"
                />
                <div>
                  <div className="text-900 font-bold text-[17.5px] font-Nunito mb-[7px]">
                    Cotton Sweatshirt
                  </div>
                  <div className="text-700 text-[15px] font-Nunito mb-[14px]">
                    White | Medium
                  </div>
                  <div className="text-400 font-[400] text-[14px] font-Nunito">
                    Quantity: 2
                  </div>
                </div>
              </div>
              <div className="text-900 font-[500] text-[#212121] text-[16px] font-Nunito">
                $12
              </div>
            </li>
            <li className="flex justify-between items-center p-[14px]">
              <div className="flex gap-3 items-center">
                <img
                  src="https://www.primefaces.org/diamond-ng/assets/demo/images/ecommerce/ordersummary/order-summary-1-2.png"
                  alt="img"
                  className="w-3rem h-3rem"
                />
                <div>
                  <div className="text-900 font-bold text-[17.5px] font-Nunito mb-[7px]">
                    Regular Jeans
                  </div>
                  <div className="text-700 text-[15px] font-Nunito mb-[14px]">
                    Black | Large
                  </div>
                  <div className="text-400 font-[400] text-[14px] font-Nunito">
                    Quantity: 1
                  </div>
                </div>
              </div>
              <div className="text-900 font-[500] text-[#212121] text-[16px] font-Nunito">
                $24
              </div>
            </li>
          </ul>
        </div>
        <div className="flex flex-wrap mt-3 pb-3">
          <div className="w-full lg:w-1/2 pl-3">
            <span className="font-medium text-[14px] font-Nunito">
              Shipping Address
            </span>
            <div className="flex flex-col text-900 font-Nunito mt-3 mb-5">
              <p className="mb-1 text-[14px] font-Nunito">Celeste Slater</p>
              <p className="mb-1 text-[14px] font-Nunito">
                606-3727 Ullamcorper. Roseville NH 11523
              </p>
              <p className="font-Nunito text-[14px]">(786) 713-8616</p>
            </div>
            <span className="font-medium text-900 font-Nunito text-[14px]">
              Payment
            </span>
            <div className="flex align-items-center mt-3">
              <img
                src="https://www.primefaces.org/diamond-ng/assets/demo/images/ecommerce/ordersummary/visa.png"
                className="w-[65px] h-[40px] mr-3"
              />
              <div className="flex flex-col">
                <p className="text-[14px] font-Nunito">Visa Debit Card</p>
                <p className="text-[14px] font-medium ">**** **** **** 1234</p>
              </div>
            </div>
          </div>
          <div className="w-full lg:w-1/2">
            <span className="font-medium text-[14px] font-Nunito">Summary</span>
            <div className="flex justify-between mt-3 mb-3">
              <span className="text-900 font-Nunito text-[14px]">Subtotal</span>
              <span className="text-900 font-Nunito text-[14px]">$36</span>
            </div>
            <div className="flex justify-between mb-3">
              <span className="text-900 font-Nunito text-[14px]">Shipping</span>
              <span className="text-900 font-Nunito text-[14px]">$5</span>
            </div>
            <div className="flex justify-between mb-3">
              <span className="text-900 font-Nunito text-[14px]">Taxes</span>
              <span className="text-900 font-Nunito text-[14px]">$2</span>
            </div>
            <div className="flex justify-between mb-3 border-t border-[#dee2e6] py-3">
              <span className="text-900 font-Nunito text-[14px]">Total</span>
              <span className="text-900 font-Nunito text-[14px]">$41</span>
            </div>
          </div>
        </div>
      </div>
      <div className="!p-[17.5px] customShadow">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
          <span className="text-2xl font-[400] text-900 font-Nunito">
            Thanks for your order!
          </span>
          <div className="flex mt-3 sm:mt-0">
            <div className="flex flex-col items-center">
              <span className="text-[14px] font-[400] mb-[7px]">Order ID</span>
              <span className="text-[14px]">451234</span>
            </div>
            <div className="flex flex-col items-center ml-6 md:ml-8">
              <span className="text-[14px] font-[400] mb-[7px]">
                Order Date
              </span>
              <span className="text-[14px]">7 Feb 2023</span>
            </div>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center my-3 sm:my-5">
          <img
            src="https://www.primefaces.org/diamond-ng/assets/demo/images/ecommerce/ordersummary/order-summary-2-1.png"
            alt="img"
            className="w-15rem flex-shrink-0 md:mr-6"
          />
          <div className="flex-auto mt-3 md:mt-0">
            <span className="text-xl font-Nunito text-900">Product Name</span>
            <div className="font-medium text-2xl font-Nunito text-900 mt-3 mb-5">
              Order Processing
            </div>
            <div className="">
              <Progress value={33.33} />
              <div className="flex items-center justify-between">
                <div className="col-span-1">
                  <span className="text-[14px] font-[400]">Ordered</span>
                </div>
                <div className="col-span-1">
                  <span className="text-[14px] font-[400]">Processing</span>
                </div>
                <div className="col-span-1">
                  <span className="text-[14px] font-[400]">Shipping</span>
                </div>
                <div className="col-span-1">
                  <span className="text-[14px] font-[400]">Delivered</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="py-5 flex justify-between flex-wrap border-t border-[#dee2e6]">
          <div className="flex sm:mr-5 mb-5">
            <span className="font-medium font-Nunito text-900 text-xl mr-8">
              Product Name
            </span>
            <span className="text-900 font-Nunito text-xl">$21.00</span>
          </div>
          <div className="flex flex-col sm:mr-5 mb-5">
            <span className="font-medium text-900 font-Nunito text-xl">
              Shipping Address
            </span>
            <div className="flex flex-col text-900 mt-3">
              <span className="mb-1 font-Nunito">Celeste Slater</span>
              <span className="mb-1 font-Nunito">
                606-3727 Ullamcorper. Roseville NH 11523
              </span>
              <span>(786) 713-8616</span>
            </div>
          </div>
          <div className="flex flex-col">
            <span className="font-medium text-900 text-xl font-Nunito">
              Payment
            </span>
            <div className="flex align-items-center mt-3">
              <img
                src="https://www.primefaces.org/diamond-ng/assets/demo/images/ecommerce/ordersummary/visa.png"
                className="w-[4rem] h-[40px] mr-3"
              />
              <div className="flex flex-col">
                <span className="text-900 mb-1 font-Nunito">
                  Visa Debit Card
                </span>
                <span className="text-900 font-medium font-Nunito">
                  **** **** **** 1234
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
