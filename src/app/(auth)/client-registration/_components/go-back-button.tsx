"use client";
import { GoBackIcon } from "@/icons/client-reg-icons";
import { useAuthContextHook } from "@/providers/client-reg-context";
import { FC } from "react";

interface GoBackProps {}

export const GoBack: FC<GoBackProps> = ({}) => {
  const { setCurrentStep } = useAuthContextHook();
  return (
    <button
      className="flex cursor-pointer items-end"
      onClick={() => setCurrentStep((prev) => prev - 1)}
    >
      <GoBackIcon className="h-5 w-5 text-violet-600" />
      <p className="text-sm font-semibold text-violet-600">Go Back</p>
    </button>
  );
};
