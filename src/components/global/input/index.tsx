import { cn } from "@/lib/utils";
import { FC } from "react";
import { FieldValues, UseFormRegister } from "react-hook-form";

interface InputProps {
  placeholder: string;
  name: string;
  register: UseFormRegister<FieldValues>;
  className?: string;
  type?: string;
}

export const Input: FC<InputProps> = ({
  placeholder,
  name,
  register,
  className,
  type,
}) => {
  return (
    <input
      id={name}
      type={type ? type : "text"}
      placeholder={placeholder}
      className={cn(
        "appearance-none block w-full text-sm rounded-md text-gray-700 border border-gray-300 p-3 placeholder-gray-400 shadow-sm focus:border-2 focus:border-violet-500 focus:outline-none focus:ring-violet-500 active:border-violet-500 cursor-text",
        className,
      )}
      {...register(name)}
    />
  );
};
