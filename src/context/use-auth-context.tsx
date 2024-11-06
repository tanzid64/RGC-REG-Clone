"use client";

import React, { createContext, useContext, useState } from "react";

interface InitialValueProps {
  currentStep: number;
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
}

const initialValue: InitialValueProps = {
  currentStep: 1,
  setCurrentStep: () => undefined,
};

const authContext = createContext<InitialValueProps>(initialValue);

const { Provider } = authContext;

export const AuthContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [currentStep, setCurrentStep] = useState<number>(
    initialValue.currentStep,
  );

  const values = {
    currentStep,
    setCurrentStep,
  };
  return <Provider value={values}>{children}</Provider>;
};

export const useAuthContextHook = () => {
  const state = useContext(authContext);
  return state;
};
