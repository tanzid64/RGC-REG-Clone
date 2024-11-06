import { z } from "zod";

export interface clientRegProps {
  service: string;
  serviceSkill: string[];
  country: string;
  companyLogo: string;
  companyName: string;
  companySize: "<10" | "11-50" | "51-100" | "101-500" | "501-1000" | "1000+";
  industry: string;
  avatar: string;
  fullName: string;
  position: string;
  phoneNumber: string;
  email: string;
  password: string;
  confirmPassword: string;
  acceptTerms: boolean;
}

const passwordValidation = new RegExp(
  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
);

export const clientRegSchema = z
  .object({
    // step -1
    service: z.string().min(1, { message: "Service is required" }),
    serviceSkill: z.array(z.string()),
    country: z.string().min(1, { message: "Country is required" }),
    // step -2
    companyLogo: z.string(),
    companyName: z.string().min(1, { message: "Company name is required" }),
    companySize: z.string().min(1, { message: "Company size is required" }),
    industry: z.string().min(1, { message: "Industry is required" }),
    // step -3
    avatar: z.string(),
    fullName: z.string().min(1, { message: "Your name is required" }),
    position: z
      .string()
      .min(1, { message: "Your position in the company is required" }),
    // step -4
    email: z.string().email().min(1, { message: "Email is required" }),
    phoneNumber: z.string(),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters" })
      .regex(passwordValidation, {
        message:
          "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
      }),
    confirmPassword: z.string(),
    acceptTerms: z.boolean(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });
