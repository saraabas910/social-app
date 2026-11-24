import { Schema, model, Types } from 'mongoose';

export interface IFollow {
    followerId: Types.ObjectId;
    followingId: Types.ObjectId;
}

const schema = new Schema<IFollow>({
    followerId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    followingId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});

schema.index(
    { followerId: 1, followingId: 1 },
    { unique: true }
);

export const Follow = model<IFollow>('Follow', schema);