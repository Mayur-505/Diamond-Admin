import { Button } from "../ui/button";
import ShoppinCart1 from "../../assets/Image/shopping-cart-1.png";
import { Link } from "react-router-dom";

const ShoppingCart = () => {
  return (
    <div className="custom_contener !pb-[28px]">
      <div>
        <div className="mb-0 bg-[#ffffff] rounded-[4px] p-[17.5px]">
          <div className="flex flex-col items-center mb-[42px]">
            <div className="mb-[21px] text-[#212121] font-medium text-[28px] font-Nunito">
              Your cart total is $82.00
            </div>
            <p className="mb-[21px] mt-0 font-medium text-[#616161] text-[17.5px] font-Nunito">
              FREE SHIPPING AND RETURN
            </p>
            <Button
              variant={"secondary"}
              className="m-0 flex items-center justify-center py-[7px] px-[14px] rounded-[4px] bg-[#2196F3] border-[#2196F3] border text-[#FFF] font-normal font-Nunito text-sm hover:text-[#212121]"
            >
              Check Out
            </Button>
          </div>
          <ul className="list-none p--0 m-0">
            <li className="flex flex-col md:flex-row border-t-[1px] py-[42px] border-b-[1px] md:items-center border-[#dee2e6]">
              <img
                src={ShoppinCart1}
                alt="ShoppinCart1"
                className="mx-auto md:mx-0 w-[168px] "
              />
              <div className="md:pl-[28px] py-[28px] flex-auto">
                <div className="flex flex-wrap items-start sm:items-center sm:flex-row sm:justify-between pb-[42px]">
                  <div className="w-full sm:w-[50%] flex flex-col">
                    <span className="font-medium text-[#212121] mb-[14px] text-[17.5px] font-Nunito">
                      Product Name
                    </span>
                    <span className="font-normal text-[#616161] mb-[14px] text-[14px] font-Nunito">
                      Medium
                    </span>
                  </div>
                  <div className="w-full sm:w-[50%] flex items-start justify-between sm:mt-0 mt-[14px]">
                    <div>
                      <select
                        id="yourSelect"
                        name="yourSelect"
                        className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-[4px] shadow-sm focus:outline-none focus:ring-[##E3F2FD] focus:border-[#E3F2FD] sm:text-sm"
                      >
                        <option value="1" className="py-[7px] px-[14px]">
                          1
                        </option>
                        <option value="2" className="py-[7px] px-[14px]">
                          2
                        </option>
                        <option value="3" className="py-[7px] px-[14px]">
                          3
                        </option>
                      </select>
                    </div>
                    <div className="flex flex-col sm:items-end">
                      <span className="sm:mb-[14px] mb-[7px] text-[#212121] text-[17.5px] font-Nunito font-medium">
                        $20.00
                      </span>
                      <Link
                        to={""}
                        className="text-[#e91e63] text-left font-medium text-[12.25px] font-Nunito"
                      >
                        Remove
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col">
                  <span className="inline-flex items-center mb-[14px]">
                    <i className="ri-mail-line mr-[7px] text-[#616161] font-normal text-[14px]"></i>
                    <span className="mr-[7px] text-[#616161] font-Nunito font-normal text-[14px]">
                      Order today.
                    </span>
                  </span>
                  <span className="inline-flex items-center mb-[14px]">
                    <i className="ri-send-plane-fill mr-[7px] text-[#616161] font-normal text-[14px]"></i>
                    <span className="mr-[7px] text-[#616161] font-Nunito font-normal text-[14px]">
                      Delivery by <span className="font-bold">Dec 23.</span>
                    </span>
                  </span>
                  <span className="inline-flex items-center mb-[14px]">
                    <i className="ri-error-warning-line mr-[7px] text-[#616161] font-normal text-[14px]"></i>
                    <span className="mr-[7px] text-[#616161] font-Nunito font-normal text-[14px]">
                      Only 8 Available.
                    </span>
                  </span>
                </div>
              </div>
            </li>
            <li className="flex flex-col md:flex-row border-t-[1px] py-[42px] border-b-[1px] md:items-center border-[#dee2e6]">
              <img
                src={ShoppinCart1}
                alt="ShoppinCart1"
                className="mx-auto md:mx-0 w-[168px] "
              />
              <div className="md:pl-[28px] py-[28px] flex-auto">
                <div className="flex flex-wrap items-start sm:items-center sm:flex-row sm:justify-between pb-[42px]">
                  <div className="w-full sm:w-[50%] flex flex-col">
                    <span className="font-medium text-[#212121] mb-[14px] text-[17.5px] font-Nunito">
                      Product Name
                    </span>
                    <span className="font-normal text-[#616161] mb-[14px] text-[14px] font-Nunito">
                      Medium
                    </span>
                  </div>
                  <div className="w-full sm:w-[50%] flex items-start justify-between sm:mt-0 mt-[14px]">
                    <div>
                      <select
                        id="yourSelect"
                        name="yourSelect"
                        className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-[4px] shadow-sm focus:outline-none focus:ring-[##E3F2FD] focus:border-[#E3F2FD] sm:text-sm"
                      >
                        <option value="1" className="py-[7px] px-[14px]">
                          1
                        </option>
                        <option value="2" className="py-[7px] px-[14px]">
                          2
                        </option>
                        <option value="3" className="py-[7px] px-[14px]">
                          3
                        </option>
                      </select>
                    </div>
                    <div className="flex flex-col sm:items-end">
                      <span className="sm:mb-[14px] mb-[7px] text-[#212121] text-[17.5px] font-Nunito font-medium">
                        $20.00
                      </span>
                      <Link
                        to={""}
                        className="text-[#e91e63] text-left font-medium text-[12.25px] font-Nunito"
                      >
                        Remove
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col">
                  <span className="inline-flex items-center mb-[14px]">
                    <i className="ri-mail-line mr-[7px] text-[#616161] font-normal text-[14px]"></i>
                    <span className="mr-[7px] text-[#616161] font-Nunito font-normal text-[14px]">
                      Order today.
                    </span>
                  </span>
                  <span className="inline-flex items-center mb-[14px]">
                    <i className="ri-send-plane-fill mr-[7px] text-[#616161] font-normal text-[14px]"></i>
                    <span className="mr-[7px] text-[#616161] font-Nunito font-normal text-[14px]">
                      Delivery by <span className="font-bold">Dec 23.</span>
                    </span>
                  </span>
                  <span className="inline-flex items-center mb-[14px]">
                    <i className="ri-error-warning-line mr-[7px] text-[#616161] font-normal text-[14px]"></i>
                    <span className="mr-[7px] text-[#616161] font-Nunito font-normal text-[14px]">
                      Only 8 Available.
                    </span>
                  </span>
                </div>
              </div>
            </li>
          </ul>
          <div className="flex">
            <div className="hidden w-[168px] md:block"></div>
            <ul className="list-none py-0 pr-0 pl-0 md:pl-[28px] mt-[42px] mx-0 mb-0 flex-auto">
              <li className="flex justify-between mb-[21px]">
                <span className="font-semibold text-[#212121] text-[17.5px] font-Nunito">
                  Subtotal
                </span>
                <span className="font-normal text-[#212121] text-[17.5px] font-Nunito">
                  $82.00
                </span>
              </li>
              <li className="flex justify-between mb-[21px]">
                <span className="font-semibold text-[#212121] text-[17.5px] font-Nunito">
                  Shipping
                </span>
                <span className="font-normal text-[#212121] text-[17.5px] font-Nunito">
                  Free
                </span>
              </li>
              <li className="flex justify-between mb-[21px]">
                <span className="font-semibold text-[#212121] text-[17.5px] font-Nunito">
                  VAT
                </span>
                <span className="font-normal text-[#212121] text-[17.5px] font-Nunito">
                  $8.00
                </span>
              </li>
              <li className="flex justify-between border-t-[1px] border-[#dee2e6] mb-[21px] pt-[21px]">
                <span className="font-bold text-[#212121] text-[24.5px] font-Nunito">
                  Total
                </span>
                <span className="font-bold text-[#212121] text-[24.5px] font-Nunito">
                  $90.00
                </span>
              </li>
              <li className="flex justify-end">
                <Button
                  variant={"secondary"}
                  className="m-0 flex items-center justify-center py-[7px] px-[14px] rounded-[4px] bg-[#2196F3] border-[#2196F3] border text-[#FFF] font-normal font-Nunito text-sm hover:text-[#212121]"
                >
                  Check Out
                </Button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShoppingCart;
