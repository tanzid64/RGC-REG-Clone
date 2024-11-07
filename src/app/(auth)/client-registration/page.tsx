"use client";
import { MaxWidthWrapper } from "@/components/global/max-width-wrapper";
import { useClientReg } from "@/hooks/use-client-reg";
import {
  AboutYourCompanyIcon,
  OtpIcon,
  ServiceIcon,
  WrapRegIcon,
  YourRoleIcon,
} from "@/icons/client-reg-icons";
import { FC } from "react";
import { ClientRegForm } from "./_components/form/client-reg-form";
import { StepBar } from "./_components/step-bar";
import { StepDetails } from "./_components/step-details";

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

const ClientRegistrationPage: FC = () => {
  const { currentStep, setCurrentStep } = useClientReg();
  return (
    <MaxWidthWrapper className="space-y-14 pt-10">
      <div className="space-y-2">
        <h2 className="text-base font-semibold text-gray-700 md:text-lg">
          Welcome Aboard! Let's get you started with 4 steps
        </h2>
        <p className="text-sm font-medium text-gray-600 sm:text-base">
          The client onboarding process consists of four simple steps. Each step
          is designed to guide you seamlessly through the process of setting up
          your client account and accessing your personalized portal.
        </p>
      </div>
      <div className="min-h-screen">
        <form className="">
          <div className="flex flex-col gap-8 lg:flex-row lg:gap-4 w-full">
            {/* Steps Bar */}
            <div className="flex flex-col items-start justify-start gap-2 ">
              <div className="flex w-full gap-2 lg:hidden">
                {steps.map((step) => (
                  <StepBar
                    key={step.id}
                    active={Number(step.id) <= currentStep}
                  />
                ))}
              </div>
              {/* Steps */}
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
            {/* Forms */}
            <div className="">
              <ClientRegForm />
            </div>
          </div>
        </form>
      </div>
    </MaxWidthWrapper>
  );
};

export default ClientRegistrationPage;
