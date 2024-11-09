"use client";
import { useAuthContextHook } from "@/providers/client-reg-context";
import { FC } from "react";
import { StepFourForm } from "./step-four-form";
import { StepOneForm } from "./step-one-form";
import { StepThreeForm } from "./step-three-form";
import { StepTwoForm } from "./step-two-form";

interface ClientRegFormProps {}

export const ClientRegForm: FC<ClientRegFormProps> = () => {
  const { currentStep } = useAuthContextHook();

  switch (currentStep) {
    case 1:
      return <StepOneForm />;
    case 2:
      return <StepTwoForm />;
    case 3:
      return <StepThreeForm />;
    case 4:
      return <StepFourForm />;
    default:
      return <div className="">sept 1</div>;
  }
};
