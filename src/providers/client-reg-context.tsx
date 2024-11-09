"use client";
import { clientRegSchema } from "@/schemas/client-reg";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { createContext, useContext, useState } from "react";
import { SubmitHandler, useForm, UseFormReturn } from "react-hook-form";
import { z } from "zod";

type FormData = z.infer<typeof clientRegSchema>; // Correct type for your form data

type AuthContextProps = {
  currentStep: number;
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
  loading: boolean;
  onHandleSubmit: SubmitHandler<FormData>; // This expects the form data, not the event
  formMethods: UseFormReturn<FormData>; // UseFormReturn is the correct type for formMethods
};

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);

  const formMethods = useForm<FormData>({
    resolver: zodResolver(clientRegSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
    mode: "onBlur",
  });

  const onHandleSubmit: SubmitHandler<FormData> = (data) => {
    // setLoading(true);
    console.log(data);
  };

  const contextValue = {
    currentStep,
    setCurrentStep,
    loading,
    onHandleSubmit,
    formMethods,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export const useAuthContextHook = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error(
      "useAuthContext must be used within an AuthContextProvider",
    );
  }
  return context;
};
