import { Schema, model, Types } from 'mongoose';

export interface IComment {
    content: string;
    userId: Types.ObjectId;
    postId: Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
}

const schema = new Schema<IComment>({
    content: {
        type: String,
        required: true,
        trim: true,
        minlength: 1,
        maxlength: 500
    },
    userId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    postId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Post'
    }
}, {
    timestamps: true
});

export const Comment = model<IComment>('Comment', schema);