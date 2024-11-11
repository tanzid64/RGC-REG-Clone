import { ErrorMessage as ErrMsg } from "@hookform/error-message";
import { FC } from "react";
import { FieldErrors, FieldValues } from "react-hook-form";

interface ErrorMessageProps {
  errors: FieldErrors<FieldValues>;
  name: string;
}

export const ErrorMessage: FC<ErrorMessageProps> = ({ errors, name }) => {
  return (
    <ErrMsg
      errors={errors}
      name={name}
      render={(error) => (
        <div className="flex items-center gap-2 rounded-lg bg-red-100 p-2 text-sm font-medium text-red-600">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            aria-hidden="true"
            data-slot="icon"
            className="h-5 w-5 text-red-500"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z"
            ></path>
          </svg>
          <p>{error.messages ? error.messages[0] : error.message}</p>
        </div>
      )}
    />
  );
};
