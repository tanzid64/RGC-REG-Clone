"use client";
import { getServices, getSkillsUnderService } from "@/actions/client-reg";
import { ClientRegButton } from "@/components/global/buttons/client-reg-button";
import { useQuery } from "@tanstack/react-query";
import { Country } from "country-state-city";
import { FC } from "react";
import { Controller, useFormContext } from "react-hook-form";
import ReactSelect from "react-select";
import { ErrorMessage } from "../error-message";
interface StepOneFormProps {}

export const StepOneForm: FC<StepOneFormProps> = ({}) => {
  const {
    control,
    register,
    formState: { errors },
    getValues,
    watch,
  } = useFormContext();
  const countries = Country.getAllCountries();

  // Get services data from db
  const { data: services, isLoading: servicesLoading } = useQuery({
    queryKey: ["all-services"],
    queryFn: () => getServices(),
  });

  // Services Options
  const serviceOptions = services?.services.map((s) => ({
    value: s.id,
    label: s.title,
  }));

  // get skills based on services
  const { data: skills, isLoading: skillsLoading } = useQuery({
    queryKey: ["skills-under-service", watch("service")],
    queryFn: () => getSkillsUnderService(watch("service")),
  });
  // Services Options
  const skillOptions = skills?.skills?.map((s) => ({
    value: s.id,
    label: s.title,
  }));

  // Country Options
  const countryOptions = countries.map((c) => ({
    value: c.name,
    label: c.name,
  }));

  return (
    <div className="space-y-4">
      {/* Services */}
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

        <Controller
          control={control}
          name="service"
          render={({ field: { onChange, onBlur, ref } }) => (
            <ReactSelect
              id="service"
              onBlur={onBlur}
              onChange={(selectedOption) => {
                if (selectedOption) {
                  onChange(selectedOption.value);
                }
              }}
              placeholder="Select option"
              options={serviceOptions}
              ref={ref}
              isLoading={servicesLoading}
            />
          )}
        />
        <ErrorMessage errors={errors} name="service" />
      </div>
      {/* Service Skills */}
      {watch("service") && (
        <div className="flex w-full flex-col gap-1">
          <label
            htmlFor="serviceSkill"
            className="appearance-none block text-sm font-medium text-gray-700"
          >
            <div className="flex">
              <p>What are you particularly looking for?</p>
              <span className="text-red-500">*</span>
            </div>
          </label>

          <Controller
            control={control}
            name="serviceSkill"
            render={({ field: { onChange, onBlur, ref } }) => (
              <ReactSelect
                id="serviceSkill"
                onBlur={onBlur}
                onChange={(selectedOption) => {
                  if (selectedOption) {
                    onChange(selectedOption.map((s) => s.value));
                  }
                }}
                placeholder="Select option"
                options={skillOptions}
                ref={ref}
                isLoading={skillsLoading}
                isMulti
              />
            )}
          />
          <ErrorMessage errors={errors} name="serviceSkill" />
        </div>
      )}
      {/* Country */}
      <div className="flex w-full flex-col gap-1">
        <label
          htmlFor="country"
          className="appearance-none block text-sm font-medium text-gray-700"
        >
          <div className="flex">
            <p>Country</p>
            <span className="text-red-500">*</span>
          </div>
        </label>

        <Controller
          control={control}
          name="country"
          render={({ field: { onChange, onBlur, ref } }) => (
            <ReactSelect
              id="country"
              onBlur={onBlur}
              onChange={(selectedOption) => {
                if (selectedOption) {
                  onChange(selectedOption.value);
                }
              }}
              placeholder="Select option"
              options={countryOptions}
              ref={ref}
              isLoading={servicesLoading}
            />
          )}
        />
        <ErrorMessage errors={errors} name="country" />
      </div>
      {/* Button */}
      <ClientRegButton
        disabled={
          !watch("service") ||
          !watch("country") ||
          !watch("serviceSkill")?.length
        }
      />
    </div>
  );
};
