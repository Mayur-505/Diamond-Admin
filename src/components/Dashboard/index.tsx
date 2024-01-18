import { RiShoppingCartLine } from "react-icons/ri";
import { PiCurrencyDollarSimpleBold } from "react-icons/pi";
import { LuUsers2 } from "react-icons/lu";
import { IoSearchOutline } from "react-icons/io5";
import { FiPlusCircle } from "react-icons/fi";
import { TfiCheckBox } from "react-icons/tfi";
import graphImg1 from "../../assets/Image/graph_Image1.svg";
import graphImg2 from "../../assets/Image/graph_Image2.svg";
import graphImg3 from "../../assets/Image/graph_Image3.svg";
import graphImg4 from "../../assets/Image/graph_Image4.svg";
import {
  MdOutlineCancel,
  MdOutlineMail,
  MdOutlineSettings,
  MdRefresh,
} from "react-icons/md";
import { Progress } from "../ui/progress";
import bambooWatch from "../../assets/Image/bamboo-watch.jpg";
import amyelsnerProfile from "../../assets/Image/amyelsnerProfile.png";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
// import TypedCharts from "./TypedChart";
// import { useState } from "react";
// import PieChart from "./PieChart";

const invoices = [
  {
    image: bambooWatch,
    Product: "Bamboo Watch",
    Sales: "65",
  },
  {
    image: bambooWatch,
    Product: "Black Watch",
    Sales: "72",
  },
  {
    image: bambooWatch,
    Product: "Blue Band",
    Sales: "79",
  },
  {
    image: bambooWatch,
    Product: "Bamboo Watch",
    Sales: "65",
  },
  {
    image: bambooWatch,
    Product: "Black Watch",
    Sales: "72",
  },
  {
    image: bambooWatch,
    Product: "Blue Band",
    Sales: "79",
  },
  {
    image: bambooWatch,
    Product: "Bamboo Watch",
    Sales: "65",
  },
];

const invoices2 = [
  {
    image: amyelsnerProfile,
    name: "Amy Elsner",
    post: "Accounting",
  },
  {
    image: amyelsnerProfile,
    name: "Anna Fali",
    post: "Procurement",
  },
  {
    image: amyelsnerProfile,
    name: "Bernardo Dominic",
    post: "Finance",
  },
  {
    image: amyelsnerProfile,
    name: "Ivan Magalhaes",
    post: "Sales",
  },
  {
    image: amyelsnerProfile,
    name: "Xuxue Feng",
    post: "Management",
  },
];

const Index = () => {
  // const [dataArray, setDataArray] = useState([2, 7, 20, 9, 16, 9, 5]);
  // const [color, setColor] = useState("#e3f2fd66");
  // const [bgColor, setBgColor] = useState("#9bddff");

  // const handelchangegraph = (
  //   array: number[],
  //   color: string,
  //   bgcolor: string
  // ) => {
  //   setDataArray(array);
  //   setColor(color);
  //   setBgColor(bgcolor);
  // };
  return (
    <div className="custom_contener !px-[28px]">
      <div className="flex justify-center xl:flex-nowrap flex-wrap gap-[28px] mt-[28px] mb-[32px]">
        <div className="bg-[#FFF] max-w-[341px] shadow-md w-full border-l-[4px] p-[17px] border-solid border-[#64b5f6] rounded-[4px]">
          <div className="flex gap-[7px] items-center">
            <div className="h-[28px] w-[28px] bg-[#64b5f6] rounded-[4px] flex items-center justify-center">
              <RiShoppingCartLine style={{ fontSize: "14px" }} />
            </div>
            <p className="text-[#64b5f6] font-Nunito font-[600] text-[17px]">
              Orders
            </p>
          </div>
          <div className="flex items-center mt-3 w-full">
            <div className="border-[#dee2e6] text-center w-[50%] border-r-[1px] border-solid p-[14px]">
              <h3 className="text-[#495057] font-Nunito font-[600] text-[21px]">
                640
              </h3>
              <p className="text-[#495057] font-Nunito font-[600] text-[14px]">
                Pending
              </p>
            </div>
            <div className="text-center p-[14px] w-[50%]">
              <h3 className="text-[#495057] font-Nunito font-[600] text-[21px]">
                1420
              </h3>
              <p className="text-[#495057] font-Nunito font-[600] text-[14px]">
                completed
              </p>
            </div>
          </div>
        </div>
        <div className="bg-[#FFF] max-w-[341px] shadow-md w-full border-l-[4px] p-[17px] border-solid border-[#7986cb] rounded-[4px]">
          <div className="flex gap-[7px] items-center">
            <div className="h-[28px] w-[28px] bg-[#7986cb] rounded-[4px] flex items-center justify-center">
              <PiCurrencyDollarSimpleBold style={{ fontSize: "14px" }} />
            </div>
            <p className="text-[#7986cb] font-Nunito font-[600] text-[17px]">
              Revenue
            </p>
          </div>
          <div className="flex items-center mt-3 w-full">
            <div className="border-[#dee2e6] text-center w-[50%] border-r-[1px] border-solid p-[14px]">
              <h3 className="text-[#495057] font-Nunito flex items-center justify-center font-[600] text-[21px]">
                <PiCurrencyDollarSimpleBold style={{ fontSize: "20px" }} />
                2,100
              </h3>
              <p className="text-[#495057] font-Nunito font-[600] text-[14px]">
                Expenses
              </p>
            </div>
            <div className="text-center p-[14px] w-[50%]">
              <h3 className="text-[#495057] flex items-center justify-center font-Nunito font-[600] text-[21px]">
                <PiCurrencyDollarSimpleBold style={{ fontsize: "20px" }} />
                9,640
              </h3>
              <p className="text-[#495057] font-Nunito font-[600] text-[14px]">
                income
              </p>
            </div>
          </div>
        </div>
        <div className="bg-[#FFF] max-w-[341px] shadow-md w-full border-l-[4px] p-[17px] border-solid border-[#4db6ac] rounded-[4px]">
          <div className="flex gap-[7px] items-center">
            <div className="h-[28px] w-[28px] bg-[#4db6ac] rounded-[4px] flex items-center justify-center">
              <LuUsers2 style={{ fontSize: "14px" }} />
            </div>
            <p className="text-[#4db6ac] font-Nunito font-[600] text-[17px]">
              Customers
            </p>
          </div>
          <div className="flex items-center mt-3 w-full">
            <div className="border-[#dee2e6] text-center w-[50%] border-r-[1px] border-solid p-[14px]">
              <h3 className="text-[#495057] font-Nunito font-[600] text-[21px]">
                8272
              </h3>
              <p className="text-[#495057] font-Nunito font-[600] text-[14px]">
                Active
              </p>
            </div>
            <div className="text-center p-[14px] w-[50%]">
              <h3 className="text-[#495057] font-Nunito font-[600] text-[21px]">
                25402
              </h3>
              <p className="text-[#495057] font-Nunito font-[600] text-[14px]">
                Registered
              </p>
            </div>
          </div>
        </div>
        <div className="bg-[#FFF] max-w-[341px] shadow-md w-full border-l-[4px] p-[17px] border-solid border-[#4dd0e1] rounded-[4px]">
          <div className="flex gap-[7px] items-center">
            <div className="h-[28px] w-[28px] bg-[#4dd0e1] rounded-[4px] flex items-center justify-center">
              <LuUsers2 style={{ fontSize: "14px" }} />
            </div>
            <p className="text-[#4dd0e1] font-Nunito font-[600] text-[17px]">
              Comments
            </p>
          </div>
          <div className="flex items-center mt-3 w-full">
            <div className="border-[#dee2e6] text-center w-[50%] border-r-[1px] border-solid p-[14px]">
              <h3 className="text-[#495057] font-Nunito font-[600] text-[21px]">
                12
              </h3>
              <p className="text-[#495057] font-Nunito font-[600] text-[14px]">
                New
              </p>
            </div>
            <div className="text-center p-[14px] w-[50%]">
              <h3 className="text-[#495057] font-Nunito font-[600] text-[21px]">
                85
              </h3>
              <p className="text-[#495057] font-Nunito font-[600] text-[14px]">
                Responded
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex xl:flex-nowrap flex-wrap justify-center w-full gap-[28px]">
        <div className="max-w-[710px] bg-[#FFF] cardShadow w-full p-[17px]">
          <div className="flex justify-between items-center mb-[17px]">
            <h3 className="font-Nunito font-[600] text-[#000] text-[21px]">
              Orders
            </h3>
            <div className="flex items-center gap-[7px] px-[14px] py-[7px] cursor-pointer">
              <IoSearchOutline />
              <span className="font-Nunito font-[600] text-[#495057] text-[12px]">
                Show
              </span>
            </div>
          </div>
          <div className="flex gap-[10px] mb-[42px] cursor-pointer">
            <div
              className="hover:shadow-md px-[7px]"
              // onClick={() =>
              //   handelchangegraph(
              //     [2, 7, 20, 9, 16, 9, 5],
              //     "#e3f2fd66",
              //     "#9bddff"
              //   )
              // }
            >
              <h2 className="flex text-[#495057] font-Nunito font-normal text-[14px] items-center gap-[7px] py-[17px]">
                <FiPlusCircle />
                <span>New</span>
              </h2>
              <img src={graphImg1} alt="graphImg1" />
            </div>
            <div
              className="hover:shadow-md px-[7px]"
              // onClick={() =>
              //   handelchangegraph(
              //     [2, 4, 9, 20, 16, 12, 10],
              //     "#e8eaf633",
              //     "#c5cae9"
              //   )
              // }
            >
              <h2 className="flex text-[#495057] font-Nunito font-normal text-[14px] items-center gap-[7px] py-[17px]">
                <TfiCheckBox />
                <span>Completed</span>
              </h2>
              <img src={graphImg2} alt="graphImg2" />
            </div>
            <div
              className="hover:shadow-md px-[7px]"
              // onClick={() =>
              //   handelchangegraph(
              //     [2, 17, 7, 15, 4, 20, 8],
              //     "#b2dfdb33",
              //     "#b2dfdb"
              //   )
              // }
            >
              <h2 className="flex text-[#495057] font-Nunito font-normal text-[14px] items-center gap-[7px] py-[17px]">
                <MdRefresh />
                <span>Refunded</span>
              </h2>
              <img src={graphImg3} alt="graphImg3" />
            </div>
            <div
              className="hover:shadow-md px-[7px]"
              // onClick={() =>
              //   handelchangegraph(
              //     [2, 2, 20, 4, 17, 16, 20],
              //     "#b2ebf233",
              //     "#b2ebf2"
              //   )
              // }
            >
              <h2 className="flex text-[#495057] font-Nunito font-normal text-[14px] items-center gap-[7px] py-[17px]">
                <MdOutlineCancel />
                <span>Cancelled</span>
              </h2>
              <img src={graphImg4} alt="graphImg4" />
            </div>
          </div>
          {/* <TypedCharts array={dataArray} border={color} bgColor={bgColor} /> */}
        </div>
        <div className="max-w-[710px] w-full bg-[#FFF] cardShadow p-[17px]">
          <div>
            <h3 className="font-Nunito font-[600] text-[#000] text-[21px] mb-[14px] leading-[normal]">
              Recent Sales
            </h3>
            <p className="text-[#495057] font-Nunito font-normal text-[14px]">
              Your sales activity over time.
            </p>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-12 gap-[20px] my-[20px]">
        <div className="col-span-4">
          <div className="bg-[#FFF] cardShadow w-full p-[17px]">
            <div>
              <h3 className="font-Nunito font-[600] text-[#000] text-[21px] mb-[14px] leading-[normal]">
                Tasks
              </h3>
              <p className="text-[#495057] font-Nunito font-normal text-[14px]">
                Overview of your pending tasks.
              </p>
            </div>
            <div className="pt-[21px]">
              <h3 className="text-[#495057] font-Nunito font-[600] text-[14px] mb-[7px]">
                12 Orders to fulfill
              </h3>
              <Progress
                value={60}
                thumbClassName="bg-[#64B5F6]"
                className="h-2"
              />
            </div>
            <div className="pt-[21px]">
              <h3 className="text-[#495057] font-Nunito font-[600] text-[14px] mb-[7px]">
                40+ Payments to withdraw
              </h3>
              <Progress
                value={50}
                thumbClassName="bg-[#A5D6A7]"
                className="h-2"
              />
            </div>
            <div className="pt-[21px]">
              <h3 className="text-[#495057] font-Nunito font-[600] text-[14px] mb-[7px]">
                4 Repors to revise
              </h3>
              <Progress
                value={70}
                thumbClassName="bg-[#7986CB]"
                className="h-2"
              />
            </div>
            <div className="pt-[21px]">
              <h3 className="text-[#495057] font-Nunito font-[600] text-[14px] mb-[7px]">
                6 Questions to respond
              </h3>
              <Progress
                value={40}
                thumbClassName="bg-[#9575CD]"
                className="h-2"
              />
            </div>
            <div className="pt-[21px]">
              <h3 className="text-[#495057] font-Nunito font-[600] text-[14px] mb-[7px]">
                2 Chargebacks to review
              </h3>
              <Progress
                value={55}
                thumbClassName="bg-[#4DB6AC]"
                className="h-2"
              />
            </div>
          </div>
          <div className="bg-[#FFF] cardShadow w-full p-[17px] mt-[28px]">
            <div>
              <h3 className="font-Nunito font-[600] text-[#000] text-[21px] mb-[14px] leading-[normal]">
                Best Sellers
              </h3>
              <p className="text-[#495057] font-Nunito font-normal text-[14px]">
                Most popular products from your collection.
              </p>
            </div>
            <div className="pt-[14px]">
              <Table>
                <TableHeader>
                  <TableRow className="flex items-center justify-between p-[14px]">
                    <TableHead className="font-[700] font-Nunito text-[#495057] text-[14px]">
                      Product
                    </TableHead>
                    <TableHead className="font-[700] font-Nunito text-[#495057] text-[14px]">
                      Sales
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {invoices.map((invoice, index) => (
                    <TableRow
                      key={index}
                      className="flex items-center justify-between border-b-[1px] border-solid border-[#dee2e6]"
                    >
                      <TableCell className="flex p-[14px] items-center gap-[14px]">
                        <img
                          src={invoice.image}
                          className="max-w-[70px] shadow-imageShadow"
                          alt={invoice.image}
                        />
                        <p className="font-normal font-Nunito text-[#495057] text-[14px]">
                          {invoice.Product}
                        </p>
                      </TableCell>
                      <TableCell className="p-[14px] font-[600] font-Nunito text-[#495057] text-[14px]">
                        {invoice.Sales}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </div>
        <div className="col-span-8 w-full">
          <div className="bg-[#FFF] cardShadow w-full p-[17px]">
            <div>
              <h3 className="font-Nunito font-[600] text-[#000] text-[21px] mb-[14px] leading-[normal]">
                Revenue stream
              </h3>
              <p className="text-[#495057] font-Nunito font-normal text-[14px]">
                Comparison of your revenue sources.
              </p>
            </div>
            <div className="pt-[14px]">{/* <PieChart /> */}</div>
          </div>
          <div className="bg-[#FFF] cardShadow w-full p-[17px] mt-[28px]">
            <div>
              <h3 className="font-Nunito font-[600] text-[#000] text-[21px] mb-[14px] leading-[normal]">
                Team Members
              </h3>
            </div>
            <Table>
              <TableBody>
                {invoices2.map((invoice, index) => (
                  <TableRow
                    key={index}
                    className="flex items-center justify-between border-b-[1px] border-solid border-[#dee2e6]"
                  >
                    <TableCell className="flex p-[14px] items-center gap-[14px]">
                      <img
                        src={invoice.image}
                        className="max-w-[70px]"
                        alt={invoice.image}
                      />
                      <div>
                        <p className="font-bold font-Nunito text-[#495057] text-[17px]">
                          {invoice.name}
                        </p>
                        <p className="font-normal font-Nunito text-[#495057] text-[14px]">
                          {invoice.post}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell className="p-[14px] flex gap-[7px]">
                      <div className="w-[33px] text-[#FFF] h-[33px] rounded-full bg-[#689F38] flex items-center justify-center">
                        <MdOutlineMail />
                      </div>
                      <div className="w-[33px] h-[33px] rounded-full bg-[#FBC02D] flex items-center justify-center">
                        <MdOutlineSettings />
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
