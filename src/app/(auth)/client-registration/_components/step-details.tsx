import { cn } from "@/lib/utils";
import { FC } from "react";

interface StepDetailsProps {
  label: string;
  description: string;
  Icon: React.JSXElementConstructor<{ className?: string }>;
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
        active ? "bg-violet-50" : "hidden lg:flex",
      )}
    >
      <Icon
        className={cn(
          "h-10 w-10 p-2 rounded-full",
          active
            ? "bg-violet-600 stroke-violet-50"
            : "bg-violet-100 stroke-violet-600",
        )}
      />
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
