import { followRepository } from './follow.repository.js';
import { userRepository } from './user.repository.js';

export class FollowService {

    async follow(followerId: string, followingId: string) {

        if (followerId === followingId) {
            throw new Error("You cannot follow yourself");
        }

        const user = await userRepository.findById(followingId);

        if (!user) {
            throw new Error("User not found");
        }

        const isFollowing = await followRepository.findOne(
            followerId,
            followingId
        );

        if (isFollowing) {
            throw new Error("You already follow this user");
        }

        return followRepository.create(followerId, followingId);
    }

    async unfollow(followerId: string, followingId: string) {

        const follow = await followRepository.delete(
            followerId,
            followingId
        );

        if (!follow) {
            throw new Error("You are not following this user");
        }

        return follow;
    }
}

export default new FollowService();