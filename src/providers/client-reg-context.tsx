/*
There are three step for user registration.
1. Select account type
2. Account provide account details & generate otp
3. finally create the account

This is a context provider to track all this steps and pass it to all components that needed for sign up process.
*/
"use client";
import React from "react";

type InitialValueProps = {
  currentStep: number;
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
};

const InitialValues: InitialValueProps = {
  currentStep: 4,
  setCurrentStep: () => undefined,
};

const authContext = React.createContext<InitialValueProps>(InitialValues);

const { Provider } = authContext;

export const AuthContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [currentStep, setCurrentStep] = React.useState<number>(
    InitialValues.currentStep,
  );
  const values = {
    currentStep,
    setCurrentStep,
  };

  return <Provider value={values}>{children}</Provider>;
};

export const useAuthContextHook = () => {
  const state = React.useContext(authContext);
  return state;
};
