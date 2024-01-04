import React, { useState } from "react";
import flag from "../../assets/Image/flag.png";
import shop1 from "../../assets/Image/shop-1.png";
import { Checkbox } from "../ui/checkbox";
import { Button } from "../ui/button";
import InputWithLabel from "../Common/InputWithLabel";
import { LuMinus } from "react-icons/lu";
import { FiPlus } from "react-icons/fi";
import { FaAngleRight } from "react-icons/fa6";

const CheckoutForm = () => {
  const [count, setCount] = useState<number>(0);
  const handleIncrement = () => {
    setCount(count + 1);
  };
  const handleDecrement = () => {
    setCount(count - 1);
  };
  return (
    <div className="custom_contener !pb-[28px]">
      <div>
        <div className="mb-0 bg-[#ffffff] rounded-[4px] p-[17.5px] customShadow">
          <div className="flex flex-wrap mr-0 ml-0 mt-0">
            <div className="p-0  md:px-[42px] w-full px-[21px]">
              <span className="text-[#212121] font-bold block text-[17.5px] font-Nunito">
                Checkout
              </span>
            </div>
            <div className="p-0 h-full py-[21px] lg:w-[50%] w-full md:px-[42px] px-[21px]">
              <ul className="flex items-center list-none flex-wrap p-0 mb-[42px] mt-[14px]">
                <li className="flex items-center gap-2 mr-[7px] text-[14px] font-Nunito font-normal text-[#2196F3]">
                  Cart <FaAngleRight />
                </li>
                <li className="flex items-center gap-2 mr-[7px] text-[14px] font-Nunito font-normal text-[#9E9E9E]">
                  Information <FaAngleRight />
                </li>
                <li className="flex items-center gap-2 mr-[7px] text-[14px] font-Nunito font-normal text-[#9E9E9E]">
                  Shipping <FaAngleRight />
                </li>
                <li className="flex items-center gap-2 mr-[7px] text-[14px] font-Nunito font-normal text-[#9E9E9E]">
                  Payment{" "}
                </li>
              </ul>
              <div className="flex flex-wrap mt-0 mx-[-14px]">
                <div className="py-0 mb-[42px] px-[14px] w-full">
                  <span className="mb-[28px] font-medium text-[#212121] block text-[21px] font-Nunito">
                    Contact Information
                  </span>
                  <div className="py-0 mb-[14px] w-full">
                    <InputWithLabel
                      id="email"
                      placeholder="Email"
                      className="mb-[21px] border border-[#ced4da] rounded-[4px] placeholder:opacity-[0.6] "
                    />
                    <div className="flex items-center space-x-2">
                      <Checkbox id="terms" className="" />
                      <label
                        htmlFor="terms"
                        className="text-sm text-[#212121] font-Nunito font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Email me with news and offers
                      </label>
                    </div>
                  </div>
                </div>
                <div className="py-0 mb-[21px] px-[14px] w-full">
                  <span className="mb-[28px] font-medium text-[#212121] block text-[21px] font-Nunito">
                    Shipping
                  </span>
                </div>
                <div className="py-0 mb-[21px] px-[14px] lg:w-[50%] w-full">
                  <InputWithLabel
                    id="name"
                    placeholder="Name"
                    className="border border-[#ced4da] rounded-[4px] placeholder:opacity-[0.6] "
                  />
                </div>
                <div className="py-0 mb-[21px] px-[14px] lg:w-[50%] w-full">
                  <InputWithLabel
                    id="lastname"
                    placeholder="Last Name"
                    className="border border-[#ced4da] rounded-[4px] placeholder:opacity-[0.6] "
                  />
                </div>
                <div className="py-0 mb-[21px] px-[14px] w-full">
                  <InputWithLabel
                    id="address"
                    placeholder="Address"
                    className="border border-[#ced4da] rounded-[4px] placeholder:opacity-[0.6] "
                  />
                </div>
                <div className="py-0 mb-[21px] px-[14px] w-full">
                  <InputWithLabel
                    id="Apartment"
                    placeholder="Apartment, suite, etc"
                    className="border border-[#ced4da] rounded-[4px] placeholder:opacity-[0.6] "
                  />
                </div>
                <div className="py-0 mb-[21px] px-[14px] lg:w-[50%] w-full">
                  <InputWithLabel
                    id="code"
                    placeholder="Postal Code"
                    className="border border-[#ced4da] rounded-[4px] placeholder:opacity-[0.6] "
                  />
                </div>
                <div className="py-0 mb-[21px] px-[14px] lg:w-[50%] w-full">
                  <InputWithLabel
                    id="city"
                    placeholder="City"
                    className="border border-[#ced4da] rounded-[4px] placeholder:opacity-[0.6] "
                  />
                </div>
                <div className="py-0 mb-[21px] px-[14px] lg:w-[50%] w-full">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="nextPurchase" className="" />
                    <label
                      htmlFor="nextPurchase"
                      className="text-sm text-[#212121] font-Nunito font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Save for next purchase
                    </label>
                  </div>
                </div>
                <div className="py-0 mt-[42px] px-[14px] flex flex-col lg:flex-row justify-center items-center lg:justify-end w-full">
                  <Button
                    variant={"outline"}
                    className="py-[7px] px-[14px] mr-[21px] text-[#607D8B] border-[1px] border-[#607D8B] rounded-[4px] font-Nunito"
                  >
                    <i className="ri-arrow-left-line text-[#607D8B] text-[14px] mr-[7px]"></i>{" "}
                    Return to Cart
                  </Button>
                  <Button
                    variant={"secondary"}
                    className="py-[7px] px-[14px] mr-[21px] text-[#fff] border-[1px] bg-[#0d89ec] border-[#0d89ec] rounded-[4px] font-Nunito"
                  >
                    <i className="ri-check-line text-[14px] mr-[7px]"></i>
                    Continue to Shipping
                  </Button>
                </div>
              </div>
            </div>
            <div className="w-full p-0 md:px-[42px] md:py-[21px] lg:w-[50%]">
              <div className="pb-[14px] border-[#dee2e6]">
                <span className="font-Nunito text-[17.5px] font-medium text-[#212121]">
                  Your Cart
                </span>
              </div>
              <div className="flex flex-col lg:flex-row flex-wrap lg:items-center py-[7px] mt-[14px]">
                <img
                  src={shop1}
                  alt="shop1"
                  className="w-[112px] h-[112px] mb-[14px]"
                />
                <div className="flex-auto lg:ml-[14px]">
                  <div className="flex items-center justify-between mb-[21px]">
                    <span className="font-Nunito text-[14px] font-bold text-[#212121]">
                      Product Name
                    </span>
                    <span className="font-Nunito text-[14px] font-bold text-[#212121]">
                      $123.00
                    </span>
                  </div>
                  <div className="mb-[14px] text-[#757575] text-[12.25px] font-Nunito font-normal">
                    Black | Large
                  </div>
                  <div className="flex flex-auto justify-between items-center">
                    <div className="flex items-center gap-3">
                      <button
                        onClick={handleDecrement}
                        className="py-[7px] w-[31px] flex items-center justify-center shadow"
                      >
                        <LuMinus />
                      </button>
                      <input
                        type="text"
                        value={count}
                        className="max-w-[42px] w-full text-center border border-[rgb(206, 212, 218)] max-h-[35] h-full p-[7px]"
                      />
                      <button
                        onClick={handleIncrement}
                        className="py-[7px] w-[31px] flex items-center justify-center shadow"
                      >
                        <FiPlus />
                      </button>
                    </div>
                    <div>
                      <Button
                        variant={"secondary"}
                        className="bg-[rgba(33, 150, 243, 0.04)] border border-transparent rounded-[50%]"
                      >
                        <i className="ri-delete-bin-5-line text-[#2196F3]"></i>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="py-[7px] mt-[14px]">
                <div className="relative">
                  <p className="m-0 block">
                    <input
                      type="text"
                      placeholder="Promo code"
                      className="bg-[#fff] border border-[#ced4da]  px-[7px] py-[7px] sm:w-[622px] max-w-[622px] w-full rounded-[4px]"
                    />
                  </p>
                  <p className="m-0 block">
                    <input
                      type="submit"
                      value="Apply"
                      className="absolute right-0 top-[50%] translate-y-[-50%] translate-x-[0] bg-[#2196F3] rounded-[4px] border-[#2196F3] border px-[14px] py-[7px] text-[#fff] font-medium font-Nunito"
                    />
                  </p>
                </div>
              </div>
              <div className="py-[7px] mt-[14px]">
                <div className="flex justify-between items-center mb-[14px]">
                  <span className="font-Nunito text-[14px] font-medium text-[#212121]">
                    Subtotal
                  </span>
                  <span className="font-Nunito text-[14px] font-normal text-[#212121]">
                    $123.00
                  </span>
                </div>
                <div className="flex justify-between items-center mb-[14px]">
                  <span className="font-Nunito text-[14px] font-medium text-[#212121]">
                    Shipping
                  </span>
                  <span className="font-Nunito text-[14px] font-normal text-[#212121]">
                    Free
                  </span>
                </div>
                <div className="flex justify-between items-center mb-[14px]">
                  <span className="font-Nunito text-[14px] font-bold text-[#212121]">
                    Total
                  </span>
                  <span className="font-Nunito text-[17.5px] font-medium text-[#212121]">
                    $123.00
                  </span>
                </div>
              </div>
              <Button
                variant={"secondary"}
                className="bg-[#fef0cd] flex items-center justify-center rounded-[4px] py-[7px] mt-[14px] w-full hover:border hover:border-[#fef0cd] text-[16px] font-normal font-Nunito"
              >
                <img src={flag} alt="flag" className="mr-[7px]" />
                No additional duties or taxes.
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutForm;
