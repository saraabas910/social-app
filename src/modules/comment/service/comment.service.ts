import { commentRepository } from '../repository/comment.repository.js';
import type { CreateCommentDto } from '../dto/dto.js';
import { postRepository } from '../../post/repository/post.repository.js';
import { Types } from 'mongoose';
class CommentService {
    private commentRepository = commentRepository;

createComment = async (data: CreateCommentDto) => {
    const post = await postRepository.findPostById(data.postId.toString());

    if (!post) {
        throw new Error('Post not found');
    }

    if (!post.allowedcomments) {
        throw new Error('Comments are disabled for this post');
    }

    return this.commentRepository.create({
        content: data.content,
        userId: data.userId,
        postId: new Types.ObjectId(data.postId)
    });
};
getPostComments = async (postId: string) => {
    const post = await postRepository.findPostById(postId);

    if (!post) {
        throw new Error('Post not found');
    }

    return this.commentRepository.findCommentsByPost(postId);
};

getSingleComment = async (commentId: string) => {
    const comment = await this.commentRepository.findCommentById(commentId);

    if (!comment) {
        throw new Error('Comment not found');
    }

    return comment;
};

updateComment = async (commentId: string, userId: string, content: string) => {
    const comment = await this.commentRepository.findCommentById(commentId);

    if (!comment) {
        throw new Error('Comment not found');
    }

    if (comment.userId.toString() !== userId) {
        throw new Error('You are not allowed to update this comment');
    }

    return this.commentRepository.update(
        { _id: commentId, userId },
        { content }
    );
};
deleteComment = async (commentId: string, userId: string) => {
    const comment = await this.commentRepository.findCommentById(commentId);

    if (!comment) {
        throw new Error('Comment not found');
    }

    const post = await postRepository.findPostById(comment.postId.toString());

    if (!post) {
        throw new Error('Post not found');
    }

    if (
        comment.userId.toString() !== userId && post.userId.toString() !== userId ) {
        throw new Error('You are not allowed to delete this comment');
    }

    return this.commentRepository.delete({ _id: commentId });
};




}

export const commentService = new CommentService();