import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .email("Please enter a valid email address"),

  password: z
    .string()
    .min(6, "Password must be at least 6 characters"),
});

export const registerSchema = z
  .object({
    firstName: z.string().min(2, "First name is required"),

    lastName: z.string().min(2, "Last name is required"),

    email: z.email("Please enter a valid email"),

    mobile: z
      .string()
      .min(10, "Mobile number must be 10 digits")
      .max(10, "Mobile number must be 10 digits"),

    password: z
      .string()
      .min(8, "Password must be at least 8 characters"),

    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type LoginFormData = z.infer<typeof loginSchema>;

export type RegisterFormData = z.infer<typeof registerSchema>;