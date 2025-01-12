import { z } from "zod";

export const profileSchema = z.object({
  bio: z.string().max(200, "Bio must be at most 200 characters!").optional(),
  role: z.string().max(30, "Role must be at most 30 characters!").optional(),
  username: z.string().min(5, "Username must be at least 5 characters!"),
});

export const userSchema = z.object({
  username: z.string().min(5, "Username must be at least 5 characters!"),
  fullName: z.string(),
  email: z.string().email(),
  password: z.string().min(8, "Password must be at least 8 characters!"),
  confirmPassword: z.string().min(8, "Password must be at least 8 characters!"),
  profile: profileSchema.optional(),
});
