import { z } from "zod";

export const postSchema = z.object({
  title: z.string(),
  description: z.string(),
  category: z.string(),
  authorId: z.string().optional(),
});

export type Post = z.infer<typeof postSchema>;
