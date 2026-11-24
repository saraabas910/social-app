import { Schema, model, Types } from 'mongoose';

export interface IPost {
    content: string;
    userId: Types.ObjectId;
    commentsCount: number;
    ReactionsCount: number;
    allowedcomments: boolean;
    createdAt: Date;
    updatedAt: Date;
}

const schema = new Schema<IPost>({
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
    commentsCount: {
        type: Number,
        default: 0
    },
    ReactionsCount: {
        type: Number,
        default: 0
    },
    allowedcomments: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
});

export const Post = model<IPost>('Post', schema);