import { cn } from "@/lib/utils";
import Link from "next/link";
import { FC } from "react";

interface ClientRegButtonProps {
  disabled?: boolean;
}

export const ClientRegButton: FC<ClientRegButtonProps> = ({ disabled }) => {
  return (
    <>
      <button
        className={cn(
          "h-fit inline-flex items-center rounded-md shadow-sm  text-neutral-50 px-4 py-2 text-sm font-semibold w-full justify-center",
          disabled
            ? "bg-violet-300 cursor-not-allowed"
            : "hover:bg-violet-700 bg-violet-600 cursor-pointer",
        )}
        type="button"
        disabled={true}
      >
        Save &amp; Continue
      </button>
      <div className="flex justify-center">
        <p className="text-sm font-medium text-gray-500">
          Already have an account?{" "}
          <Link className="font-semibold text-violet-600" href="/">
            Login
          </Link>
        </p>
      </div>
    </>
  );
};
