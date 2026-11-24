import { postRepository } from '../repository/post.repository.js';
import type { CreatePostDto } from '../dto/dto.js';

class PostService {

    private postRepository = postRepository;

createPost = async (data: CreatePostDto) => {
    return this.postRepository.create(data);
};
  getAllPosts = async (userId: string) => {
    return this.postRepository.findPostsByUser(userId);
};
getSinglePost = async (postId: string) => {
    const post = await this.postRepository.findPostById(postId);

    if (!post) {
        throw new Error('Post not found');
    }

    return post;
};
updatePost = async (postId: string, userId: string, content: string) => {
    const post = await this.postRepository.findPostById(postId);

    if (!post) {
        throw new Error('Post not found');
    }

    if (post.userId.toString() !== userId) {
        throw new Error('You are not allowed to update this post');
    }

    return this.postRepository.update(
        { _id: postId, userId },
        { content }
    );
};
deletePost = async (postId: string, userId: string) => {
    const post = await this.postRepository.findPostById(postId);

    if (!post) {
        throw new Error('Post not found');
    }

    if (post.userId.toString() !== userId) {
        throw new Error('You are not allowed to delete this post');
    }

    return this.postRepository.delete({
        _id: postId,
        userId
    });
};
}

export const postService = new PostService();