"use client";
import {
  PasswordEyeIcon,
  PasswordEyeSlashIcon,
} from "@/icons/client-reg-icons";
import { FC, useState } from "react";
import { FieldValues, UseFormRegister } from "react-hook-form";

interface PasswordInputProps {
  placeholder: string;
  name: string;
  register: UseFormRegister<FieldValues>;
}

export const PasswordInput: FC<PasswordInputProps> = ({
  placeholder,
  name,
  register,
}) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
  return (
    <>
      <div className="relative">
        <input
          id={name}
          placeholder={placeholder}
          className="appearance-none block w-full text-sm rounded-md text-gray-700 border border-gray-300 p-3 placeholder-gray-400 shadow-sm focus:border-2 focus:border-violet-500 focus:outline-none focus:ring-violet-500 active:border-violet-500 cursor-text"
          type={isPasswordVisible ? "text" : "password"}
          {...register(name)}
        />
        <div
          className="cursor-pointer"
          onClick={() => setIsPasswordVisible(!isPasswordVisible)}
        >
          {isPasswordVisible ? (
            <PasswordEyeSlashIcon className="absolute right-3 top-3 h-5 w-5 text-violet-400" />
          ) : (
            <PasswordEyeIcon className="absolute right-3 top-3 h-5 w-5 text-violet-400" />
          )}
        </div>
      </div>
    </>
  );
};
