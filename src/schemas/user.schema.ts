import { z } from "zod";

export const profileSchema = z.object({
  id: z.string().optional(),
  bio: z.string().max(500, "Bio not be more than 500 characters").optional(),
  role: z.string().optional(),
  userId: z.string().min(24, "Invalid userId format"),
});

export const userSchema = z
  .object({
    id: z.string().optional(),
    profilePicture: z.instanceof(File).optional(),
    firstName: z.string().trim(),
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
