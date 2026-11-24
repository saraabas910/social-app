import { z } from 'zod';
import { Types } from 'mongoose';
export interface CreateCommentDto {
    content: string;
    userId: Types.ObjectId;
    postId: string;
}

export const CreateCommentSchema = z.object({
    content: z.string().min(1).max(500)
});