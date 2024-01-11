import { useQuery } from "@tanstack/react-query";
import ProductList1 from "../../assets/Image/product-list-1.png";
import ProductList2 from "../../assets/Image/product-list-2.png";
import { getProduct } from "@/services/productService";
import SmoothImage from "react-smooth-image";
import { useState } from "react";
const ProductList = () => {
  const [filter, setFilter] = useState({
    subcategoryid: "",
    innnercategoryid: "",
    categoryid: "",
    minPrice: "",
    maxPrice: "",
    sort: "",
    mincarat: "",
    maxcarat: "",
    Clarity: [],
    Cuts: [],
    Color: [],
    shape: "",
  });
  const { data, isLoading } = useQuery({
    queryKey: ["GET_CUT", { filter }],
    queryFn: () => getProduct(filter),
  });

  console.log("+++++++++++++++", data);

  return (
    <div className="custom_contener !py-[28px] !px-[28px]">
      <div>
        <div className="mb-[0] bg-[#ffffff] rounded-[4px] p-[14px]">
          <div className="grid grid-cols-12 gap-4 mt-[-14px] mx-[-14px]">
            {data?.product?.length > 0 &&
              data?.product?.map((item: any) => (
                <div className="col-span-3 mb-0 p-[14px]">
                  <div className="relative mb-[14px]">
                    {/* <img
                      src={item?.productimage[0]}
                      alt=""
                      className="w-full"
                    /> */}
                    <SmoothImage
                      src={item?.productimage[0]}
                      alt="a nice image of mordor"
                      transitionTime={1.0}
                      containerStyles={{
                        paddingBottom: "308px",
                      }}
                      imageStyles={{
                        maxHeight: "308px",
                        height: "100%",
                      }}
                      //Other props if you choose to use them
                    />
                    {/* <button className="py-[7px] px-[14px] w-[calc(100%-28px)] cursor-pointer border-[1px] flex justify-center items-center border-[#fff] text-[#fff] bg-[#0000004d] text-[13.33px] font-Nunito font-normal absolute top-[] bottom-[14px] rounded-[4px] left-[14px] ">
                      <i className="ri-shopping-cart-line mr-1"></i>
                      <span>Add to Cart</span>
                    </button> */}
                  </div>
                  <div className="flex flex-col items-center">
                    <span className="font-medium font-Nunito text-[16px] truncate text-[#212121] mb-[8px] max-w-[300px]">
                      {item?.title}
                    </span>
                    <span className="font-medium font-Nunito text-[16px] text-[#212121]">
                      ${item?.price}
                    </span>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductList;
