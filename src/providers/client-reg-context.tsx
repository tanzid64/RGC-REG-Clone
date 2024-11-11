"use client";
import { onClientRegistration } from "@/actions/client-reg";
import { ClientRegProps, clientRegSchema } from "@/schemas/client-reg";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { createContext, useContext, useState } from "react";
import { SubmitHandler, useForm, UseFormReturn } from "react-hook-form";
import toast from "react-hot-toast";

type AuthContextProps = {
  currentStep: number;
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
  loading: boolean;
  onHandleSubmit: SubmitHandler<ClientRegProps>;
  formMethods: UseFormReturn<ClientRegProps>;
};

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);

  const formMethods = useForm<ClientRegProps>({
    resolver: zodResolver(clientRegSchema),
    defaultValues: {
      password: "",
    },
    mode: "all",
  });

  const onHandleSubmit: SubmitHandler<ClientRegProps> = async (data) => {
    setLoading(true);
    // Handle company logo upload
    if (data.companyLogo.length > 0) {
      // TODO: Upload company logo in a bucket and get the URL
      data.companyLogo = "https://via.placeholder.com/300x300";
    } else {
      data.companyLogo = "";
    }

    // Handle avatar upload
    if (data.avatar.length > 0) {
      // TODO: Upload avatar in a bucket and get the URL
      data.avatar = "https://via.placeholder.com/300x300";
    } else {
      data.avatar = "";
    }


    const response = await onClientRegistration(data);

    if (response.status === 200) {
      toast.success(response.message);
      setLoading(false);
      setCurrentStep(5);
    } else {
      setLoading(false);
      toast.error(response.message);
    }
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
