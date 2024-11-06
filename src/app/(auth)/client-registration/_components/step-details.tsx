import { cn } from "@/lib/utils";
import { FC } from "react";

interface StepDetailsProps {
  label: string;
  description: string;
  Icon: React.JSXElementConstructor<{ isActive: boolean }>;
  active: boolean;
}

export const StepDetails: FC<StepDetailsProps> = ({
  label,
  description,
  Icon,
  active,
}) => {
  return (
    <div
      className={cn(
        "p-4 cursor-not-allowed rounded-md flex items-start gap-4",
        active && "bg-violet-50",
      )}
    >
      <Icon isActive={active} />
      <div className="w-3/4">
        <h2
          className={cn(
            "font-semibold ",
            active ? "text-violet-600" : "text-gray-700",
          )}
        >
          {label}
        </h2>
        <h2
          className={cn(
            "font-medium ",
            active ? "text-violet-500" : "text-gray-500",
          )}
        >
          {description}
        </h2>
      </div>
    </div>
  );
};
