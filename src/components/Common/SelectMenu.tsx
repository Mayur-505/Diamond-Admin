import { FC } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Label } from "../ui/label";
import { ClassValue } from "clsx";
interface OptionsType {
  label: string;
  value: string;
}

interface SelectMenuProps {
  options: OptionsType[];
  value?: string | OptionsType | null;
  onChange?: (val: string) => void;
  placeholder: string;
  label?: string;
  className?: ClassValue;
  selectMenuClassName?: ClassValue;
  icon?: string;
  getCountryCode?: (countryName: string) => string;
}

const SelectMenu: FC<SelectMenuProps> = ({
  options,
  value = "",
  onChange = () => {},
  placeholder,
  label,
  className,
  selectMenuClassName,
  icon,
  getCountryCode,
}) => {
  return (
    <div className={`grid items-center ${className}`}>
      {label && (
        <Label className="text-xs font-[500] font-Nunito md:text-sm">
          {label}
        </Label>
      )}
      <Select onValueChange={onChange} value={value}>
        <SelectTrigger
          className={`h-[36px] border-[#ced4da] w-full px-[12px] py-[8px] font-Poppins text-sm outline-none text-[#222] ${selectMenuClassName}`}
        >
          <div className="flex items-center gap-[6px]">
            {icon && <img src={icon} alt="calendarIcon" />}
            <SelectValue className="" placeholder={placeholder} />
          </div>
        </SelectTrigger>
        {options && (
          <SelectContent className="bg-white">
            {options?.map((option, index) => {
              return (
                <SelectItem
                  key={option?.value}
                  className={`text-sectiontitle font-Poppins  text-sm ${
                    index === 0 ? "mt-[10px]" : ""
                  }`}
                  separatorClassName={
                    index === options.length - 1 ? "mb-0" : ""
                  }
                  value={option?.value}
                >
                  {option?.label}
                </SelectItem>
              );
            })}
          </SelectContent>
        )}
      </Select>
    </div>
  );
};

export default SelectMenu;
