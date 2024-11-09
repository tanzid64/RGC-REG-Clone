"use client";

import { FC } from "react";
import { Control, Controller, FieldValues } from "react-hook-form";
import ReactSelect, { SingleValue, MultiValue } from "react-select";
import { SelectOptionsType } from "@/schemas/types";

interface SelectProps {
  options: SelectOptionsType[] | undefined;
  control: Control<FieldValues>;
  placeholder?: string;
  isMulti?: boolean;
  name: string;
  isLoading?: boolean;
}

export const Select: FC<SelectProps> = ({
  options,
  control,
  placeholder = "Select an option...",
  isMulti=false,
  name,
  isLoading=false
}) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, onBlur, ref } }) => (
        <ReactSelect
          instanceId={`${name}-select`} 
          id={name}
          onBlur={onBlur}
          onChange={(selectedOption) => {
            if (isMulti) {
              onChange(
                (selectedOption as MultiValue<SelectOptionsType>).map(
                  (s) => s.value,
                ),
              );
            } else {
              onChange(
                (selectedOption as SingleValue<SelectOptionsType>)?.value,
              );
            }
          }}
          placeholder={placeholder}
          options={options}
          ref={ref}
          isMulti={isMulti}
          isLoading={isLoading}
        />
      )}
    />
  );
};
