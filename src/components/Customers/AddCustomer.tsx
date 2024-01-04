import React, { useMemo } from "react";
import { countries } from "@/utils/CountryJson";
import InputWithLabel from "../Common/InputWithLabel";
import SelectMenu from "../Common/SelectMenu";
import { useNavigate } from "react-router-dom";

// {
//     name: "Yuki Whobrey",
//     country: {
//       name: "Israel",
//       code: "il",
//     },
//     company: "Farmers Insurance Group",
//     activity: 16,
//     balance: 9257,
//   },

const AddCustomer = () => {
  const [value, setValue] = React.useState<null | string>(null);
  const navigate = useNavigate();
  const countryOptions = useMemo(() => {
    return countries.map((country) => {
      return {
        label: country.name,
        value: country.code,
      };
    });
  }, [countries]);

  function getCountryCode(countryName: string) {
    console.log(countryName);
    return `https://flagcdn.com/48x36/${countryName}.png`;
  }

  return (
    <div className="custom_contener !p-[17.5px] !mb-[28px] customShadow">
      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-2">
          <h3 className="text-[17.5px] font-Nunito font-[700] mb-[21px]">
            Create Customer
          </h3>
        </div>
        <div className="col-span-10 grid grid-cols-12 gap-4">
          <div className="col-span-8">
            <InputWithLabel
              id="customer-name"
              placeholder="Customer Name"
              className="border border-[#ced4da] rounded-[4px] placeholder:opacity-[0.6] "
            />
          </div>
          <div className="col-span-4">
            <InputWithLabel
              id="company-name"
              placeholder="Company Name"
              className="border border-[#ced4da] rounded-[4px] placeholder:opacity-[0.6] "
            />
          </div>
          <div className="col-span-4">
            {/* <InputWithLabel
              id="country-name"
              placeholder="Country Name"
              className="border border-[#ced4da] rounded-[4px] placeholder:opacity-[0.6] "
            /> */}
            <SelectMenu
              options={countryOptions}
              selectMenuClassName="border border-[#ced4da] rounded-[4px] placeholder:opacity-[0.6] "
              onChange={(e: any) => setValue(e)}
              value={value}
              getCountryCode={getCountryCode}
              placeholder="Country Name"
            />
          </div>
          <div className="col-span-4">
            <InputWithLabel
              id="balance"
              type="number"
              placeholder="Balance"
              className="border border-[#ced4da] rounded-[4px] placeholder:opacity-[0.6] "
            />
          </div>
          <div className="col-span-12 flex items-center gap-4">
            <button
              className="px-5 py-1.5 bg-[#2796ef] rounded-[4px] text-[#ffffff] border border-transparent font-Nunito font-[600]"
              type="button"
            >
              Create Customer
            </button>
            <button
              className="px-5 py-1.5 rounded-[4px] text-[#ff0000] border border-[#ff0000] font-Nunito font-[600]"
              type="button"
              onClick={() => navigate("/customer-contact/customer")}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddCustomer;
