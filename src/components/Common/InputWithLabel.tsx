import { forwardRef } from "react";
import { Input, InputProps } from "../ui/input";
import { Label } from "../ui/label";
import FormError from "./FormError";

type InputWithLabelProps = InputProps & {
  label?: string;
  error?: string;
  className?: string;
  id?: number | string;
};

const InputWithLabel = forwardRef<HTMLInputElement, InputWithLabelProps>(
  ({ label, className, error, ...rest }, ref) => {
    console.log("🚀 ~ file: InputWithLabel.tsx:15 ~ rest:", rest);
    return (
      <>
        {label && (
          <Label
            className={` text-xs font-[500] font-Nunito md:text-sm`}
            htmlFor={rest?.id}
          >
            {label}
          </Label>
        )}
        <div
          className={`grid w-full items-center gap-1 overflow-hidden ${className}`}
        >
          <Input {...rest} ref={ref} />
          {error && <FormError message={error} />}
        </div>
      </>
    );
  }
);
// "Password doesn't matched."

export default InputWithLabel;
