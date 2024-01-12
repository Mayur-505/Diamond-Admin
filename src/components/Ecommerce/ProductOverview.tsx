import { Link } from "react-router-dom";
import Product1 from "../../assets/Image/product-overview-1.png";
import Product3 from "../../assets/Image/product-overview--3.png";
import Product4 from "../../assets/Image/product-overview-4.png";
import Product2 from "../../assets/Image/product-overview-3-4.png";
import Product5 from "../../assets/Image/product-overview-3-2.png";
import { useEffect, useState } from "react";
import { FiPlus } from "react-icons/fi";
import { LuMinus } from "react-icons/lu";
import { useQuery } from "@tanstack/react-query";
import { getProduct } from "@/services/productService";

const ProductOverview = () => {
  const [count, setCount] = useState<number>(0);
  const [activeTab, setActiveTab] = useState<string>("details"); // Set the initial active tab
  const currentURL = window.location.href;
  const [productData, setproductData] = useState({})
  const [selectedImage, setSelectedImage] = useState<string>([]);
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
  console.log('productData', productData);

  useEffect(() => {
    if (productData?.productimage?.length) {
      setSelectedImage(productData?.productimage[0])
    }
  }, [productData])

  const { data, isLoading } = useQuery({
    queryKey: ["GET_CUT", { filter }],
    queryFn: () => getProduct(filter),
  });
  console.log('data', data)

  useEffect(() => {
    if (!isLoading && data) {
      const productId = currentURL.split('/').pop();
      const productData = data.product.find((product: any) => product.id === productId);
      if (productData) {
        setproductData(productData)
      } else {
        console.log("Product not found");
      }
    }
  }, [data, isLoading, currentURL]);

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
  };

  const handleThumbnailClick = (thumbnailImage: string) => {
    setSelectedImage(thumbnailImage);
  };

  const handleIncrement = () => {
    setCount(count + 1);
  };
  const handleDecrement = () => {
    if (count > 0) {
      setCount(count - 1);
    }
  };
  return (
    <div className="custom_contener !pb-[28px] !px-[28px]">
      <div>
        <div className="mb-[0] bg-[#ffffff] rounded-[4px] p-[14px]">
          <div className="mx-[-16px] my-[-16px] mb-[56px] flex flex-wrap">
            <div className="lg:w-[58.33%] w-full p-[16px] ">
              <div className="flex">
                <div className="w-[16.6667%] flex gap-x-[16px] justify-between flex-col ">
                  {[productData?.productimage, productData?.diamond_clarity?.clarityimage, productData?.diamond_color?.colorimage, productData?.diamond_cut?.cutimage, productData?.diamond_size?.sizeimages].map(
                    (thumbnail, index) => (
                      <img
                        key={index}
                        src={thumbnail}
                        alt={`Product${index + 1}`}
                        className="cursor-pointer w-full rounded-[4px] border-[2px] border-transparent transition-all"
                        onClick={() => handleThumbnailClick(thumbnail)}
                      />
                    )
                  )}
                </div>
                <div className="pl-3 w-[83.3333%] flex">
                  <img
                    src={selectedImage}
                    alt="Selected Product"
                    className="w-full rounded-[4px] border-[2px] border-transparent"
                  />
                </div>
              </div>
            </div>
            <div className="lg:py-[14px] p-[16px] lg:pl-[42px] lg:pr-[14px] lg:w-[33.33%] w-full">
              <div className="flex items-center mb-[21px] text-[#000] font-medium text-[17.5px] font-Nunito">
                {productData?.maintitle}
              </div>
              <div className="flex items-center justify-between mb-[28px] ">
                <span className="text-[#000] font-medium text-[24.5px] font-Nunito">
                  {productData?.price}
                </span>
                <div className="flex items-center ">
                  <span className="mr-3">
                    <i className="ri-star-fill text-yellow-500 mr-1"></i>
                    <i className="ri-star-fill text-yellow-500 mr-1"></i>
                    <i className="ri-star-fill text-yellow-500 mr-1"></i>
                    <i className="ri-star-fill text-yellow-500 mr-1"></i>
                    <i className="ri-star-line text-600  mr-1"></i>
                  </span>
                  <span className="text-xs font-normal font-Nunito">
                    <b className="text-[#212121] mr-1">24</b>
                    <span className="text-[#9e9e9e]">reviews</span>
                  </span>
                </div>
              </div>
              <div className="font-Nunito mb-[14px] font-bold text-[#212121] text-sm ">
                Color
              </div>
              <div className="flex items-center mb-5">
                <div className="h-[24px] w-[24px] bg-[#607d8b] mxr-1 rounded-[50%] border-[2px] cursor-pointer"></div>
                <div className="h-[24px] w-[24px] bg-[#4caf50] border-[#dee2e6] mr-1 rounded-[50%] border-[2px] cursor-pointer"></div>
                <div className="h-[24px] w-[24px] bg-[#2196f3] border-[#dee2e6] mr-1 rounded-[50%] border-[2px] cursor-pointer"></div>
              </div>
              <div className="mb-3 flex items-center justify-between">
                <span className="font-bold text-[#212121] text-sm font-Nunito">
                  Size
                </span>
                <Link
                  to=""
                  className="font-semibold text-xs cursor-pointer flex items-center font-Nunito"
                >
                  Size Guide <i className="ri-arrow-right-s-line"></i>
                </Link>
              </div>
              <div className="mb-[28px] flex items-center mx-0 mt-0 flex-wrap">
                <div className="rounded-[4px] h-[40px] cursor-pointer border border-[#E0E0E0] w-[69px] flex items-center justify-center mr-[15px] text-[#212121] font-Nunito text-sm font-normal">
                  XS
                </div>
                <div className="rounded-[4px] h-[40px] cursor-pointer border border-[#E0E0E0] w-[69px] flex items-center justify-center mr-[15px] text-[#212121] font-Nunito text-sm font-normal">
                  S
                </div>
                <div className="rounded-[4px] h-[40px] cursor-pointer border border-[#E0E0E0] w-[69px] flex items-center justify-center mr-[15px] text-[#212121] font-Nunito text-sm font-normal">
                  M
                </div>
                <div className="rounded-[4px] h-[40px] cursor-pointer border border-[#E0E0E0] w-[69px] flex items-center justify-center mr-[15px] text-[#212121] font-Nunito text-sm font-normal">
                  L
                </div>
                <div className="rounded-[4px] h-[40px] cursor-pointer border border-[#E0E0E0] w-[69px] flex items-center justify-center text-[#212121] font-Nunito text-sm font-normal">
                  XL
                </div>
              </div>
              <div className="mb-[14px] font-Nunito text-[14px] font-bold text-[#212121]">
                Quantity
              </div>
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
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
                <div className="flex items-center sm:ml-[28px] sm:mt-[0] flex-1">
                  <button className="mr-[28px] flex-1 text-[#fff] bg-[#2196F3] border text-sm rounded-[4px] font-normal font-Nunito py-[7px] px-[14px] border-[#2196F3]">
                    Add to Cart
                  </button>
                  <i className="ri-heart-line text-[#757575] text-[21px]"></i>
                </div>
              </div>
            </div>
          </div>
          <p>
            <div>
              <div>
                <div className="scroll-p-[37.712px]">
                  <ul className="bg-[#fff] border-b-[2px] flex min-w-[100%] border-[#dee2e6] cursor-pointer m-0 p-0 list-none h-[42px]">
                    <li
                      className={`mr-0 ${activeTab === "details"
                        ? "border-b-[2px] border-[#2196F3] text-[#2196F3]"
                        : "text-[#6c757d] hover:border-[#6c757d] hover:border-b-[2px]"
                        }`}
                    >
                      <Link
                        to={""}
                        onClick={() => handleTabClick("details")}
                        className="px-[14px] font-semibold rounded-[4px] mb-[-2px] bg-[#ffffff] text-[14px] font-Nunito"
                      >
                        Details
                      </Link>
                    </li>
                    <li
                      className={`mr-0 ${activeTab === "reviews"
                        ? "border-b-[2px] border-[#2196F3] text-[#2196F3]"
                        : "text-[#6c757d] hover:border-[#6c757d] hover:border-b-[2px]"
                        }`}
                    >
                      <Link
                        to={""}
                        onClick={() => handleTabClick("reviews")}
                        className="px-[14px] font-semibold rounded-[4px] mb-[-2px] bg-[#ffffff] text-[14px] font-Nunito"
                      >
                        Reviews
                      </Link>
                    </li>
                    <li
                      className={`mr-0 ${activeTab === "shipping"
                        ? "border-b-[2px] border-[#2196F3] text-[#2196F3]"
                        : "text-[#6c757d] hover:border-[#6c757d] hover:border-b-[2px]"
                        }`}
                    >
                      <Link
                        to={""}
                        onClick={() => handleTabClick("shipping")}
                        className="px-[14px] font-semibold rounded-[4px] mb-[-2px] bg-[#ffffff] text-[14px] font-Nunito"
                      >
                        Shipping and Returns
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="bg-[#fff] p-[14px] text-[#495057] rounded-[4px]">
                <p className="text-[#495057]">
                  {activeTab === "details" && (
                    <div className="">
                      <div className="mb-[21px] mt-[7px] font-bold text-[24.5px] text-[#212121] ">
                        Product Details
                      </div>
                      <p className="mx-0 mb-[21px] mt-[0] text-[#757575] text-[14px] font-normal font-Nunito">
                        Volutpat maecenas volutpat blandit aliquam etiam erat
                        velit scelerisque in. Duis ultricies lacus sed turpis
                        tincidunt id. Sed tempus urna et pharetra. Metus
                        vulputate eu scelerisque felis imperdiet proin
                        fermentum. Venenatis urna cursus eget nunc scelerisque
                        viverra mauris in. Viverra justo nec ultrices dui sapien
                        eget mi proin. Laoreet suspendisse interdum consectetur
                        libero id faucibus.
                      </p>
                      <div className="flex flex-wrap mx-[-14px] mt-[-14px]">
                        <div className="p-[14px] lg:w-[33.33%] w-full">
                          <span className="mb-[14px] font-bold text-[#212121] block text-[14px]">
                            Highlights
                          </span>
                          <ul className="mb-[14px] py-0 pl-[14px] text-[#757575] font-Nunito text-[14px] list-disc">
                            <li className="mb-[7px]">Vulputate sapien nec.</li>
                            <li className="mb-[7px]">
                              Purus gravida quis blandit.
                            </li>
                            <li className="mb-[7px]">
                              Nisi quis eleifend quam adipiscing.
                            </li>
                            <li className="">Imperdiet proin fermentum.</li>
                          </ul>
                        </div>
                        <div className="p-[14px] lg:w-[33.33%] w-full">
                          <span className="mb-[14px] font-bold text-[#212121] block text-[14px]">
                            Size and Fit
                          </span>
                          <ul className="m-0 mb-[21px] py-0 text-[#757575] font-Nunito text-[14px] list-none">
                            <li className="mb-[14px]">
                              <span className="font-semibold">Leo vel:</span>{" "}
                              Egestas congue.
                            </li>
                            <li className="mb-[14px]">
                              <span className="font-semibold">
                                Sociis natoque:{" "}
                              </span>{" "}
                              Parturient montes nascetur.
                            </li>
                            <li className="">
                              <span className="font-semibold">
                                Suspendisse in:{" "}
                              </span>{" "}
                              Purus sit amet volutpat.
                            </li>
                          </ul>
                        </div>
                        <div className="p-[14px] lg:w-[33.33%] w-full">
                          <span className="mb-[14px] font-bold text-[#212121] block text-[14px]">
                            Material & Care
                          </span>
                          <ul className="m-0 p-0 flex flex-wrap flex-col xl:flex-row text-[#757575] text-[14px] font-normal">
                            <li className="flex items-center whitespace-nowrap w-[140px] mr-[7px] mb-[14px]">
                              <i className="ri-sun-line mr-[7px]"></i>{" "}
                              <span>Not dryer safe</span>
                            </li>
                            <li className="flex items-center whitespace-nowrap w-[140px] mr-[7px] mb-[14px]">
                              <i className="ri-close-circle-line mr-[7px]"></i>{" "}
                              <span>No chemical wash</span>
                            </li>
                            <li className="flex items-center whitespace-nowrap w-[140px] mr-[7px] mb-[14px]">
                              <i className="ri-equalizer-fill mr-[7px]"></i>
                              <span>Iron medium heat</span>
                            </li>
                            <li className="flex items-center whitespace-nowrap w-[140px] mr-[7px] mb-[14px]">
                              <i className="ri-indeterminate-circle-line mr-[7px]"></i>
                              <span>Dry flat</span>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  )}
                  {activeTab === "reviews" && (
                    <div>
                      <div>
                        <div className="mb-[21px] mt-[7px] text-[24.5px] font-Nunito font-bold text-[#212121]">
                          Customer Reviews
                        </div>
                        <ul className="list-none p-0 m-0">
                          <li className="border-b-[1px] border-[#dee2e6] pb-[28px]">
                            <span className="">
                              <i className="ri-star-fill text-yellow-500 mr-1"></i>
                              <i className="ri-star-fill text-yellow-500 mr-1"></i>
                              <i className="ri-star-fill text-yellow-500 mr-1"></i>
                              <i className="ri-star-fill text-yellow-500 mr-1"></i>
                              <i className="ri-star-line text-600  mr-1"></i>
                            </span>
                            <div className="my-[14px] text-[#212121] font-bold font-Nunito text-[17.5px] ">
                              Absolute Perfection!
                            </div>
                            <p className="mt-0 mx-0 mb-[14px] font-normal text-[14px] font-Nunito text-[#757575]">
                              Blandit libero volutpat sed cras ornare arcu dui
                              vivamus. Arcu dictum varius duis at consectetur
                              lorem donec massa. Imperdiet proin fermentum leo
                              vel orci porta non. Porttitor rhoncus dolor purus
                              non.
                            </p>
                            <span className="font-medium text-[14px] font-Nunito text-[#757575]">
                              Darlene Robertson, 2 days ago
                            </span>
                          </li>
                          <li className="border-b-[1px] border-[#dee2e6] py-[28px]">
                            <span className="">
                              <i className="ri-star-fill text-yellow-500 mr-1"></i>
                              <i className="ri-star-fill text-yellow-500 mr-1"></i>
                              <i className="ri-star-fill text-yellow-500 mr-1"></i>
                              <i className="ri-star-fill text-yellow-500 mr-1"></i>
                              <i className="ri-star-line text-600  mr-1"></i>
                            </span>
                            <div className="my-[14px] text-[#212121] font-bold font-Nunito text-[17.5px] ">
                              Classy
                            </div>
                            <p className="mt-0 mx-0 mb-[14px] font-normal text-[14px] font-Nunito text-[#757575]">
                              Venenatis cras sed felis eget. Proin nibh nisl
                              condimentum id venenatis a condimentum.
                            </p>
                            <span className="font-medium text-[14px] font-Nunito text-[#757575]">
                              Kristin Watson, 2 days ago
                            </span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  )}
                  {activeTab === "shipping" && (
                    <div>
                      <div className="mb-[21px] mt-[7px] font-bold text-[24.5px] text-[#212121] font-Nunito">
                        Shipping Placeholder
                      </div>
                      <p className="p-0 mx-0 mt-0 mb-[21px] text-sm font-normal font-Nunito text-[#757575]">
                        Mattis aliquam faucibus purus in massa tempor nec
                        feugiat nisl. Justo donec enim diam vulputate ut
                        pharetra. Tempus egestas sed sed risus. Feugiat sed
                        lectus vestibulum mattis. Tristique nulla aliquet enim
                        tortor at auctor urna nunc. Habitant morbi tristique
                        senectus et. Facilisi nullam vehicula ipsum.
                      </p>
                      <div className="flex flex-wrap mx-[-14px] mt-[-14px]">
                        <div className="p-[14px] md:w-[50%] w-full">
                          <span className="mb-[14px] font-bold text-sm font-Nunito text-[#212121] block">
                            Shipping Costs
                          </span>
                          <ul className="text-sm py-0 pl-[14px] text-[#757575] list-disc">
                            <li className="mb-[7px]">Japan - JPY 2,500.</li>
                            <li className="mb-[7px]">Europe - EUR 10</li>
                            <li className="mb-[7px]">Switzerland - CHF 10</li>
                            <li className="mb-[7px]">Canada - CAD 25</li>
                            <li className="mb-[7px]">USA - USD 20</li>
                            <li className="mb-[7px]">Australia - AUD 30</li>
                            <li className="mb-[7px]">
                              United Kingdom - GBP 10
                            </li>
                          </ul>
                        </div>
                        <div className="p-[14px] md:w-[50%] w-full">
                          <span className="mb-[14px] font-bold text-sm font-Nunito text-[#212121] block">
                            Return Policy
                          </span>
                          <p className="text-[14px] font-normal p-0 m-0 text-[#757575] ">
                            Pharetra et ultrices neque ornare aenean euismod
                            elementum nisi. Diam phasellus vestibulum lorem sed.
                            Mattis molestie a iaculis at.{" "}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </p>
              </div>
            </div>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductOverview;
