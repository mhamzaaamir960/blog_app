import { z } from "zod";

const commentSchema = z.object({
  content: z.string(),
  postId: z.string().optional(),
  userId: z.string().optional(),
});

export type Comment = z.infer<typeof commentSchema>;
