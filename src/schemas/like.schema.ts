import { z } from "zod";

const likeSchema = z.object({
  isLiked: z.boolean().default(false),
  postId: z.string().optional(),
  userId: z.string().optional(),
});

export type Like = z.infer<typeof likeSchema>;
