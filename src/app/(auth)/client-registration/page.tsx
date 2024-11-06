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
      <div className="">
        {/* Steps */}
        <div className="">
          {steps.map((step) => (
            <StepDetails
              key={step.id}
              {...step}
              active={currentStep === step.id}
            />
          ))}
        </div>
        {/* Forms */}
        <div className="">
          <p onClick={() => setCurrentStep(2)}>Form 1</p>
          <p>Form 2</p>
          <p>Form 3</p>
          <p>Form 4</p>
          <p>Form 5</p>
        </div>
      </div>
    </MaxWidthWrapper>
  );
};

export default ClientRegistrationPage;
