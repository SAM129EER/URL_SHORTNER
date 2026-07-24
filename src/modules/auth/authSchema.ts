import { z } from "zod";

export const registerUserSchema = z
  .object({
    username: z
      .string("username is required")
      .min(2, "username should be more then 2 character"),
    email: z.email("email is required"),
    password: z
      .string("password is required")
      .min(6, "password must be more then 6 character"),
    confirmPassword: z.string().min(6, "Password must be 8 characters"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });

export const signInUserSchema = z.object({
  email: z.email("Invalid email address"),
  password: z.string().min(6, "Password is required"),
});

export const forgotPasswordSchema = z.object({
  email: z.email("Invalid email address"),
});

export const resetPasswordSchema = z
  .object({
    token: z.string().min(1, "Reset token is required"),
    newPassword: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z
      .string()
      .min(8, "Password must be at least 8 characters"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });

export const verifyEmailSchema = z.object({
  token: z.string().min(1, "Verification token is required"),
});

export type userSchemaData = z.infer<typeof registerUserSchema>;

export type signInUserSchemaData = z.infer<typeof signInUserSchema>;
