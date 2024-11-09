"use client";
import { getServices, getSkillsUnderService } from "@/actions/client-reg";
import { ClientRegButton } from "@/app/(auth)/client-registration/_components/client-reg-button";
import { Label } from "@/components/global/label";
import { Select } from "@/components/global/select";
import { useQuery } from "@tanstack/react-query";
import { Country } from "country-state-city";
import { FC } from "react";
import { useFormContext } from "react-hook-form";
import { ErrorMessage } from "../error-message";

export const StepOneForm: FC = () => {
  const {
    control,
    formState: { errors },
    watch,
    register,
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
        <Label text="What service do you need?" htmlFor="service" required />
        <Select
          control={control}
          options={serviceOptions}
          placeholder="Select a service..."
          name="service"
          isLoading={servicesLoading}
        />
        <ErrorMessage errors={errors} name="service" />
      </div>
      {/* Service Skills */}
      {watch("service") && (
        <div className="flex w-full flex-col gap-1">
          <Label
            text="What are you particularly looking for?"
            required
            htmlFor="serviceSkill"
          />
          <Select
            control={control}
            options={skillOptions}
            placeholder="Select skills..."
            isMulti={true}
            name="serviceSkill"
            isLoading={skillsLoading}
          />
          <ErrorMessage errors={errors} name="serviceSkill" />
        </div>
      )}
      {/* Country */}
      <div className="flex w-full flex-col gap-1">
        <Label text="Country" htmlFor="country" required />
        <Select
          control={control}
          options={countryOptions}
          placeholder="Select your country"
          name="country"
          isLoading={servicesLoading}
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
