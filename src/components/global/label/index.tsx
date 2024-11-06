import { FC } from "react";

interface LabelProps {
  htmlFor?: string;
  children: React.ReactNode;
  className?: string;
  required?: boolean;
}

export const Label: FC<LabelProps> = ({
  htmlFor,
  className,
  children,
  required,
}) => {
  return (
    <label className="text-sm font-medium text-gray-700">
      <div className="flex text-gray-700">
        {children}
        {required && <span className="text-red-500">*</span>}
      </div>
    </label>
  );
};
