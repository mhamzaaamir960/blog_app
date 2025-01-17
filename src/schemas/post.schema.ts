import { z } from "zod";

const postSchema = z.object({
  title: z.string(),
  description: z.string(),
  category: z.string(),
  authorId: z.string(),
});

export type Post = z.infer<typeof postSchema>;
