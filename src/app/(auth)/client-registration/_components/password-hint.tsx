import { cn } from "@/lib/utils";
import { FC } from "react";

interface PasswordHintProps {
  text: string;
  active?: boolean;
}

export const PasswordHint: FC<PasswordHintProps> = ({ text, active }) => {
  return (
    <div className="flex items-center gap-2">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
        aria-hidden="true"
        data-slot="icon"
        className={cn(
          "h-5 w-5 rounded-full p-1 font-bold text-white",
          active ? "bg-violet-600" : "bg-gray-300",
        )}
      >
        <path
          fillRule="evenodd"
          d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z"
          clipRule="evenodd"
        ></path>
      </svg>
      <p className="text-sm font-medium text-gray-500">{text}</p>
    </div>
  );
};
