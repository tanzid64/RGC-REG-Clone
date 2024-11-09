"use client";
import { getAllIndustries } from "@/actions/client-reg";
import { ClientRegButton } from "@/app/(auth)/client-registration/_components/client-reg-button";
import { Input } from "@/components/global/input";
import { Select } from "@/components/global/select";
import { UploadIcon } from "@/icons/client-reg-icons";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { FC, useEffect, useState } from "react";
import { useFormContext, useWatch } from "react-hook-form";
import { ErrorMessage } from "../error-message";
import { GoBack } from "../go-back-button";

export const StepTwoForm: FC = () => {
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const {
    control,
    formState: { errors },
    watch,
    register,
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

  // Use `useWatch` to monitor the companyLogo field and watch for changes
  const companyLogo = useWatch({ control, name: "companyLogo" });

  useEffect(() => {
    // Check if `companyLogo` exists and is an array with at least one `File`
    if (
      companyLogo &&
      companyLogo.length > 0 &&
      companyLogo[0] instanceof File
    ) {
      const imgUrl = URL.createObjectURL(companyLogo[0]);
      setLogoPreview(imgUrl);

      // Cleanup previous URL object to avoid memory leaks
      return () => {
        if (imgUrl) {
          URL.revokeObjectURL(imgUrl);
        }
      };
    } else {
      setLogoPreview(null); // Reset preview if no file
    }
  }, [companyLogo]);

  // get skills based on services
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
          {logoPreview ? (
            <div className="relative h-1/6 w-1/6">
              <Image
                alt="img_preview"
                width="100"
                height="100"
                className="rounded-md"
                src={logoPreview}
              />
              <svg
                onClick={() => setLogoPreview(null)} // Clear the preview when clicked
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                aria-hidden="true"
                className="absolute left-1 top-1 h-5 w-5 cursor-pointer rounded-full bg-white text-black"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </div>
          ) : (
            <>
              <label
                htmlFor="companyLogo"
                className="block text-sm font-medium text-gray-700"
              >
                Company Logo
              </label>
              <div className="flex w-40 items-center justify-start">
                <label
                  htmlFor="companyLogo"
                  className="flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-violet-300 p-6"
                >
                  <UploadIcon className="h-8 w-8 rounded-lg text-violet-600" />
                  <input
                    id="companyLogo"
                    className="hidden"
                    type="file"
                    {...register("companyLogo")}
                  />
                </label>
              </div>
            </>
          )}
          <ErrorMessage errors={errors} name="companyLogo" />
        </div>

        {/* Company Name */}
        <div className="flex w-full flex-col gap-1">
          <label
            htmlFor="companyName"
            className="appearance-none block text-sm font-medium text-gray-700"
          >
            <div className="flex">
              <p>What is your company name?</p>
              <span className="text-red-500">*</span>
            </div>
          </label>
          <Input
            register={register}
            name="companyName"
            placeholder="Enter your company name"
          />
          <ErrorMessage errors={errors} name="companyName" />
        </div>
        {/* Company Size */}
        <div className="flex w-full flex-col gap-1">
          <label
            htmlFor="companySize"
            className="appearance-none block text-sm font-medium text-gray-700"
          >
            <div className="flex">
              <p>What is your company size?</p>
              <span className="text-red-500">*</span>
            </div>
          </label>

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
          <label
            htmlFor="industry"
            className="appearance-none block text-sm font-medium text-gray-700"
          >
            <div className="flex">
              <p>In which industry do you work?</p>
              <span className="text-red-500">*</span>
            </div>
          </label>

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
