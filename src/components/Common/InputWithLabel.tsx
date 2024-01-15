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
  image?: string;
};

const InputWithLabel = forwardRef<HTMLInputElement, InputWithLabelProps>(
  ({ label, className, id, name, error, image, ...rest }, ref) => {
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
        <div className={`grid items-center gap-1 overflow-hidden ${className}`}>
          <Input {...rest} id={id} name={name} ref={ref} />
          {image && (
            <img
              src={image}
              alt="image"
              className="h-[150px] w-[300px] object-cover"
            />
          )}
        </div>
        {error && <FormError message={error} />}
      </>
    );
  }
);
// "Password doesn't matched."

export default InputWithLabel;
