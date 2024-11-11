"use client";
import { Label } from "@/components/global/label";
import OTPField from "@/components/global/otp-input";
import { FC } from "react";
import { useFormContext } from "react-hook-form";

export const StepFiveForm: FC = () => {
  return (
    <div className="space-y-4">
      {/* Country */}
      <div className="flex w-full items-center justify-center flex-col gap-5">
        <Label text="OTP" htmlFor="country" required />
        <OTPField />
      </div>
    </div>
  );
};
