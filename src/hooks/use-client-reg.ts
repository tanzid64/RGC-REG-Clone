"use client";

import { useState } from "react";

export const useClientReg = () => {
  const [currentStep, setCurrentStep] = useState<number>(1); // to track current step
  const [loading, setLoading] = useState<boolean>(false); // to track loading state
  return {
    currentStep,
    setCurrentStep,
    loading,
    setLoading,
  };
};
