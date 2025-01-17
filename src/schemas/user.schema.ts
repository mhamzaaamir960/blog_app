import { z } from "zod";

const profileSchema = z.object({
  profilePicture: z.string(),
  bio: z.string().optional(),
  role: z.string().optional(),
  username: z.string(),
});

export const userSchema = z
  .object({
    username: z.string().min(5, "Username must be at least 5 characters!"),
    fullName: z.string(),
    email: z.string().email(),
    password: z.string().min(8, "Password must be at least 8 characters!"),
    confirmPassword: z
      .string()
      .min(8, "Password must be at least 8 characters!"),
    profile: profileSchema.optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export type User = z.infer<typeof userSchema>;
