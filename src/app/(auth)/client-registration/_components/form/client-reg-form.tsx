'use client';
import { useClientReg } from '@/hooks/use-client-reg';
import { FC } from 'react';
import { StepOneForm } from './step-one-form';

interface ClientRegFormProps {}

export const ClientRegForm: FC<ClientRegFormProps> = ({}) => {
  const {currentStep} = useClientReg();
  switch (currentStep) {
    case 1:
      return <StepOneForm/>
    case 2:
      return <div>Step 2</div>;
    case 3:
      return <div>Step 3</div>;
    case 4:
      return <div>Step 4</div>;
    default:
      return <StepOneForm />;
  }
};
