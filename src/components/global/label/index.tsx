import { FC } from "react";

interface LabelProps {
  htmlFor?: string;
  text: string;
  className?: string;
  required?: boolean;
}

export const Label: FC<LabelProps> = ({
  htmlFor,
  className,
  text,
  required,
}) => {
  return (
    <label
      htmlFor="service"
      className="appearance-none block text-sm font-medium text-gray-700"
    >
      <div className="flex">
        <p>{text}</p>
        <span className="text-red-500">{required ? "*" : ""}</span>
      </div>
    </label>
  );
};
