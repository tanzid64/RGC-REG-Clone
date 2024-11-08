"use client";
import {
  AboutYourCompanyIcon,
  OtpIcon,
  ServiceIcon,
  WrapRegIcon,
  YourRoleIcon,
} from "@/icons/client-reg-icons";
import { useAuthContextHook } from "@/providers/client-reg-context";
import { FC } from "react";
import { StepBar } from "../step-bar";
import { StepDetails } from "../step-details";
import { ClientRegForm } from "./client-reg-form";
const steps = [
  {
    id: 1,
    label: "Service Request",
    description: "Describe the service and skillset you are looking for.",
    Icon: ServiceIcon,
  },
  {
    id: 2,
    label: "About your Company",
    description: "Provide essential information about your company.",
    Icon: AboutYourCompanyIcon,
  },
  {
    id: 3,
    label: "What's Your Role?",
    description: "Describe what you are working as in the company.",
    Icon: YourRoleIcon,
  },
  {
    id: 4,
    label: "Wrap up registration",
    description: "Create your account by providing necessary credentials.",
    Icon: WrapRegIcon,
  },
  {
    id: 5,
    label: "OTP",
    description: "Create your account by providing necessary credentials.",
    Icon: OtpIcon,
  },
];
export const ClientRegStep: FC = () => {
  const { currentStep } = useAuthContextHook();
  return (
    <div className="flex flex-col gap-8 lg:flex-row lg:gap-4 w-full">
      <div className="flex flex-col items-start justify-start gap-2 ">
        <div className="flex w-full gap-2 lg:hidden">
          {steps.map((step) => (
            <StepBar key={step.id} active={Number(step.id) <= currentStep} />
          ))}
        </div>
        <div className="w-full space-y-4 lg:space-y-4 lg:border-r lg:border-gray-300 lg:pr-4">
          {steps.map((step) => (
            <StepDetails
              key={step.id}
              {...step}
              active={currentStep === step.id}
            />
          ))}
        </div>
      </div>
      <div className="m-auto w-full space-y-4 lg:w-3/5 lg:max-w-xl">
        <div className="space-y-4">
          <ClientRegForm />
        </div>
      </div>
    </div>
  );
};
