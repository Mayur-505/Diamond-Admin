import { forwardRef } from "react";
import { Label } from "../ui/label";
import { Textarea, TextareaProps } from "../ui/textarea";
import FormError from "./FormError";

interface TextAreaWithLabelProps extends TextareaProps {
  label: string;
  textAreaClassName?: string;
  error?: string;
}

const TextAreaWithLabel = forwardRef<
  HTMLTextAreaElement,
  TextAreaWithLabelProps
>(
  (
    { label, error, id, className = "", textAreaClassName = "", ...rest },
    ref
  ) => {
    return (
      <div className={`grid w-full items-center gap-1 ${className}`}>
        <Label
          className="font-ArboriaMedium text-xs font-[400] md:text-sm"
          htmlFor={id}
        >
          {label}
        </Label>
        <Textarea id={id} ref={ref} className={textAreaClassName} {...rest} />
        {error && <FormError message={error} />}
      </div>
    );
  }
);

export default TextAreaWithLabel;
