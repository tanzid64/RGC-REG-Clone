import { FC } from "react";
import Select from "react-select";
interface StepOneFormProps {}

export const StepOneForm: FC<StepOneFormProps> = ({}) => {
  const selectOptions = [
    { value: "chocolate", label: "Chocolate" },
    { value: "strawberry", label: "Strawberry" },
    { value: "vanilla", label: "Vanilla" },
  ];
  return (
    <>
      <div className="flex w-full flex-col gap-1">
        <label
          htmlFor=""
          className="appearance-none block text-sm font-medium text-gray-700"
        >
          <div className="flex">
            <p>What service do you need?</p>
            <span className="text-red-500">*</span>
          </div>
        </label>
        <Select options={selectOptions} />
      </div>
    </>
  );
};
