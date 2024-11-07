import { cn } from "@/lib/utils";
import { FC } from "react";

interface StepBarProps {
  active: boolean;
}

export const StepBar: FC<StepBarProps> = ({ active }) => {
  return (
    <span
      className={cn(
        "h-2 w-1/3 rounded-lg p-1 ",
        active ? "bg-violet-600" : "bg-violet-100",
      )}
    ></span>
  );
};
