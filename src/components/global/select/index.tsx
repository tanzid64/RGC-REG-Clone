"use client";

import { SelectOptionsType } from "@/schemas/types";
import { FC } from "react";
import { Control, Controller, FieldValues } from "react-hook-form";
import ReactSelect, { MultiValue, SingleValue } from "react-select";

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
  isMulti,
  name,
  isLoading,
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
          theme={(theme) => ({
            ...theme,
            borderRadius: 6,
            colors: {
              ...theme.colors,
              primary25: "#6d28d9",
              primary: "#6d28d9",
            },
          })}
          styles={{
            control: (base) => ({
              ...base,
              padding: "4px",
              backgroundColor: "#fff",
              border: "1px solid #6d28d9",

            }),
            option: (base, state) => ({
              ...base,
              color: (state.isSelected || state.isFocused) ? "#fff" : "#6d28d9",
              boxShadow: "none",
              scrollBehavior: "smooth",
              "&:hover": {
                color: "#fff",
                opacity: "90%",
              },
            }),
            menu: (base) => ({
              ...base,
              padding: 0,
              borderRadius: 6,
            }),
            placeholder: (base) => ({
              ...base,
              color: "#9ca3af",
              fontSize: "14px",
              lineHeight: "20px",
            }),
            singleValue: (base) => ({
              ...base,
              color: "#6d28d9",
              fontSize: "14px",
              lineHeight: "20px",
              backgroundColor: "#fff",
            }),
            multiValueLabel: (base) => ({
              color: "#6d28d9",
              fontSize: "14px",
              lineHeight: "20px",
              borderRight: "none",
              backgroundColor: "#fff",
              borderRadius: "20px 0 0 20px",
              border: "1px solid #6d28d9",
              padding: "2px 6px",
            }),
            multiValueRemove: (base) => ({
              color: "#6d28d9",
              fontSize: "14px",
              lineHeight: "20px",
              backgroundColor: "#fff",
              borderRadius: "0px 20px 20px 0px",
              border: "1px solid #6d28d9",
              borderLeft: "none",
              padding: "2px 6px",
              "&:hover": {
                backgroundColor: "#fff",
                color: "#6d28d9",
              },
            }),
          }}
        />
      )}
    />
  );
};
