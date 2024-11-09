import { z } from "zod";

const passwordValidation =
  /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/;

export const clientRegSchema = z
  .object({
    // step -1
    service: z
      .string({ required_error: "Service is required" })
      .min(1, { message: "Service is required" }),
    serviceSkill: z.array(z.string(), {
      required_error: "Skill is required",
    }),
    country: z
      .string({ required_error: "Country is required" })
      .min(1, { message: "Country is required" }),
    // step -2
    companyLogo: z.any().optional(),
    companyName: z
      .string({ required_error: "Company name is required" })
      .min(1, { message: "Company name is required" }),
    companySize: z
      .string({ required_error: "Company size is required" })
      .min(1, { message: "Company size is required" }),
    industry: z
      .string({ required_error: "Industry is required" })
      .min(1, { message: "Industry is required" }),
    // step -3
    avatar: z.any().optional(),
    fullName: z
      .string({ required_error: "Your name is required" })
      .min(1, { message: "Your name is required" }),
    position: z
      .string({ required_error: "Your position in the company is required" })
      .min(1, { message: "Your position in the company is required" }),
    // step -4
    email: z
      .string({ required_error: "Email is required" })
      .email({ message: "Invalid email address" })
      .min(1, { message: "Email is required" }),
    phoneNumber: z.string().min(5, { message: "Phone number is required" }),
    password: z
      .string({ required_error: "Password is required" })
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

export type ClientRegProps = z.infer<typeof clientRegSchema>;
