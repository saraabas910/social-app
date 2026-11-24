import { Types } from 'mongoose';
import { z } from 'zod';

export interface CreatePostDto {
    content: string;
     userId: Types.ObjectId;

}

export const CreatePostSchema = z.object({
    content: z.string().min(1).max(500)
});