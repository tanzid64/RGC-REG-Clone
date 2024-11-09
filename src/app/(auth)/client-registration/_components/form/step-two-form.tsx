"use client";
import { getAllIndustries } from "@/actions/client-reg";
import { ClientRegButton } from "@/app/(auth)/client-registration/_components/client-reg-button";
import { ImageInput } from "@/components/global/image-input";
import { Input } from "@/components/global/input";
import { Label } from "@/components/global/label";
import { Select } from "@/components/global/select";
import { useQuery } from "@tanstack/react-query";
import { FC } from "react";
import { useFormContext } from "react-hook-form";
import { ErrorMessage } from "../error-message";
import { GoBack } from "../go-back-button";

export const StepTwoForm: FC = () => {
  const {
    control,
    formState: { errors },
    watch,
    register,
    setValue,
  } = useFormContext();

  // company size options
  const companySizeOptions = [
    { value: "1-10", label: "Less than 10" },
    { value: "11-50", label: "11-50 Employees" },
    { value: "51-100", label: "51-100 Employees" },
    { value: "101-500", label: "101-500 Employees" },
    { value: "501-1000 ", label: "501-1000 Employees" },
    { value: "1000+", label: "More than 1000" },
  ];

  // get all industries list
  const { data: industries, isLoading: industriesLoading } = useQuery({
    queryKey: ["all-industries"],
    queryFn: () => getAllIndustries(),
  });
  // Industries options
  const industryOptions = industries?.industries?.map((i) => ({
    value: i.id,
    label: i.title,
  }));

  return (
    <>
      <GoBack />
      <div className="space-y-4">
        {/* Company Logo */}
        <div className="flex w-full flex-col gap-1">
          <ImageInput
            name="companyLogo"
            register={register}
            control={control}
            labelText="Company Logo"
            setValue={setValue}
          />
          <ErrorMessage errors={errors} name="companyLogo" />
        </div>
        {/* Company Name */}
        <div className="flex w-full flex-col gap-1">
          <Label
            htmlFor="companyName"
            text="What is your company name?"
            required
          />
          <Input
            register={register}
            name="companyName"
            placeholder="Enter your company name"
          />
          <ErrorMessage errors={errors} name="companyName" />
        </div>
        {/* Company Size */}
        <div className="flex w-full flex-col gap-1">
          <Label
            htmlFor="companySize"
            text="What is your company size?"
            required
          />
          <Select
            control={control}
            options={companySizeOptions}
            placeholder="Select your company size..."
            name="companySize"
          />

          <ErrorMessage errors={errors} name="companySize" />
        </div>
        {/* Industry */}
        <div className="flex w-full flex-col gap-1">
          <Label
            htmlFor="industry"
            text="In which industry do you work?"
            required
          />

          <Select
            control={control}
            options={industryOptions}
            placeholder="Select an industry..."
            name="industry"
            isLoading={industriesLoading}
          />

          <ErrorMessage errors={errors} name="industry" />
        </div>
        {/* Button */}
        <ClientRegButton
          disabled={!watch("companySize") || !watch("industry")}
        />
      </div>
    </>
  );
};
