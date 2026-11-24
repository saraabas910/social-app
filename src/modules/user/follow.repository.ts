import { Follow } from '../../lib/database/follow.model.js';

export class FollowRepository {

    async create(followerId: string, followingId: string) {
        return Follow.create({
            followerId,
            followingId
        });
    }

    async findOne(followerId: string, followingId: string) {
        return Follow.findOne({
            followerId,
            followingId
        });
    }

    async delete(followerId: string, followingId: string) {
        return Follow.findOneAndDelete({
            followerId,
            followingId
        });
    }

   
}

export const followRepository = new FollowRepository();