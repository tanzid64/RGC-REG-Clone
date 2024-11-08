"use client";
import { getServices } from "@/actions/client-reg";
import { clientRegSchema } from "@/schemas/client-reg";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

export const useClientReg = () => {
  const [currentStep, setCurrentStep] = useState<number>(1); // to track current step
  const [loading, setLoading] = useState<boolean>(false); // to track loading state

  const methods = useForm<z.infer<typeof clientRegSchema>>({
    resolver: zodResolver(clientRegSchema),
    mode: "onBlur",
  });

  const onHandleSubmit = methods.handleSubmit((data) => {
    // setLoading(true);
    console.log(data);
  });

  

  return {
    currentStep,
    setCurrentStep,
    loading,
    setLoading,
    onHandleSubmit,
    methods,
  };
};
