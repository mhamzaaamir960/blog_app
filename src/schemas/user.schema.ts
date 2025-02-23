import { z } from "zod";

const profileSchema = z.object({
  bio: z.string().optional(),
  role: z.string().optional(),
  username: z.string(),
});

export const userSchema = z
  .object({
    profilePicture: z.instanceof(File).optional(),
    firstName: z.string(),
    lastName: z.string().optional(),
    username: z
      .string()
      .min(5, "Username must be at least 5 characters!")
      .max(20, "Username cannot exceed 20 characters!")
      .toLowerCase()
      .trim()
      .regex(
        /^[a-z0-9-_]+$/,
        "Username can only contain letters, numbers, dashes, and underscores!"
      ),
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

type Profile = z.infer<typeof profileSchema>;
type User = z.infer<typeof userSchema>;

export type { Profile, User };
