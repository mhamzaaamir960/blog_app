import { z } from "zod";

const profileSchema = z.object({
  profilePicture: z.string().optional(),
  bio: z.string().optional(),
  role: z.string().optional(),
  username: z.string(),
});

export const userSchema = z.object({
  username: z.string().min(5, "Username must be at least 5 characters!"),
  fullName: z.string(),
  email: z.string().email(),
  password: z.string().min(8, "Password must be at least 8 characters!"),
  confirmPassword: z.string().min(8, "Password must be at least 8 characters!"),
  profile: profileSchema.optional(),
});

export type User = z.infer<typeof userSchema>;
