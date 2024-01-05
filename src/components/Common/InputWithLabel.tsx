import { forwardRef } from "react";
import { Input, InputProps } from "../ui/input";
import { Label } from "../ui/label";
import FormError from "./FormError";

type InputWithLabelProps = InputProps & {
  label?: string;
  error?: string;
  className?: string;
  id?: number | string;
  name?: string;
};

const InputWithLabel = forwardRef<HTMLInputElement, InputWithLabelProps>(
  ({ label, className, id, name, error, ...rest }, ref) => {
    return (
      <>
        {label && (
          <Label
            className={` text-xs font-[500] font-Nunito md:text-sm`}
            htmlFor={id}
          >
            {label}
          </Label>
        )}
        <div
          className={`grid w-full items-center gap-1 overflow-hidden ${className}`}
        >
          <Input {...rest} id={id} name={name} ref={ref} />
        </div>
        {error && <FormError message={error} />}
      </>
    );
  }
);
// "Password doesn't matched."

export default InputWithLabel;
