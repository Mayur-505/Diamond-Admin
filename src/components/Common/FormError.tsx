import { FC } from "react";

interface FormErrorProps {
  message: string;
}

const FormError: FC<FormErrorProps> = ({ message }) => {
  return (
    <span className={`font-Nunito text-xs italic text-destructive`}>
      {message}
    </span>
  );
};

export default FormError;
