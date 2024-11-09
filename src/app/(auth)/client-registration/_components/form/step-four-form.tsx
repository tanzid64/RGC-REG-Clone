import { Input } from "@/components/global/input";
import { Label } from "@/components/global/label";
import { PasswordInput } from "@/components/global/password-input";
import Link from "next/link";
import { FC } from "react";
import { useFormContext } from "react-hook-form";
import { ErrorMessage } from "../error-message";
import { GoBack } from "../go-back-button";
import { PasswordHint } from "../password-hint";

const PasswordRequirements = [
  {
    label: "minLength",
    text: "Must be at least 8 characters.",
    test: (value: string) => value.length >= 8,
  },
  {
    label: "uppercase",
    text: "Must contain atleast one upper case letter.",
    test: (value: string) => /[A-Z]/.test(value),
  },
  {
    label: "lowercase",
    text: "Must contain atleast one lower case letter.",
    test: (value: string) => /[a-z]/.test(value),
  },
  {
    label: "number",
    text: "Must contain one numeric character.",
    test: (value: string) => /[0-9]/.test(value),
  },
  {
    label: "specialChar",
    text: "Must contain one special character.",
    test: (value: string) => /[!@#$%^&*]/.test(value),
  },
];

export const StepFourForm: FC = () => {
  const {
    formState: { errors },
    watch,
    register,
    setValue,
  } = useFormContext();

  // Check if all password requirements are met
  const isPasswordValid = PasswordRequirements.every((req) =>
    req.test(watch("password")),
  );
  return (
    <>
      <GoBack />
      <div className="space-y-4">
        {/*Business Email */}
        <div className="flex w-full flex-col gap-1">
          <Label htmlFor="email" text="Business Email" required />
          <Input
            register={register}
            name="email"
            placeholder="Enter your company email"
          />
          <ErrorMessage errors={errors} name="email" />
        </div>
        {/* Business Phone Number */}
        <div className="flex w-full flex-col gap-1">
          <Label htmlFor="phoneNumber" text="Business Phone Number" required />
          <Input
            register={register}
            name="phoneNumber"
            placeholder="e.g +8801856385033"
          />
          <ErrorMessage errors={errors} name="phoneNumber" />
        </div>
        {/* Password */}
        <div className="flex w-full flex-col gap-1">
          <Label htmlFor="password" text="Password" required />
          <PasswordInput
            name="password"
            register={register}
            placeholder="Enter your password"
          />
        </div>
        <div className="space-y-2">
          {PasswordRequirements.map((req) => (
            <PasswordHint
              key={req.label}
              text={req.text}
              active={req.test(watch("password"))}
            />
          ))}
        </div>
        {/* Confirm Password */}
        <div className="flex w-full flex-col gap-1">
          <Label htmlFor="confirmPassword" text="Confirm Password" required />
          <PasswordInput
            name="confirmPassword"
            register={register}
            placeholder="Re-type your password"
          />
          <ErrorMessage errors={errors} name="confirmPassword" />
        </div>
        {/* Terms & Conditions */}
        <div className="flex items-center">
          <div className="flex items-center gap-2">
            <input
              id="acceptTerms"
              className="border border-gray-600 rounded checked:bg-violet-600 checked:border-transparent w-4 h-4 focus:outline-none"
              type="checkbox"
              {...register("acceptTerms")}
            />
            <label
              className="cursor-pointer text-sm font-medium text-gray-700"
              htmlFor="acceptTerms"
            ></label>
          </div>
          <p className="text-sm font-medium text-gray-500">
            I accept the{" "}
            <Link
              target="_blank"
              href="/terms-and-conditions"
              className="cursor-pointer font-semibold text-violet-500"
            >
              Terms and Conditions
            </Link>{" "}
            and{" "}
            <Link
              href="/privacy-policy"
              target="_blank"
              className="font-semibold text-violet-500"
            >
              Privacy Policy.
            </Link>
          </p>
        </div>
        {/* Button */}
        <button
          disabled={
            !watch("confirmPassword") ||
            !watch("acceptTerms") ||
            !watch("email") ||
            !watch("phoneNumber") ||
            !isPasswordValid
          }
          className="h-fit inline-flex items-center rounded-md shadow-sm text-neutral-50 px-4 py-2 text-sm font-semibold w-full justify-center disabled:cursor-not-allowed disabled:bg-violet-300 hover:bg-violet-700 bg-violet-600/80 cursor-pointer"
        >
          Create Account
        </button>
      </div>
    </>
  );
};
