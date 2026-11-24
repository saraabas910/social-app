
import type { Request, Response, NextFunction } from 'express';
import { commentService } from '../service/comment.service.js';

class CommentController {
    private commentService = commentService;

    createComment = async (req: Request, res: Response, next: NextFunction) => {
        try {
        const content= req.body.content

            const { postId } = req.params;

        if (!postId || typeof postId !== 'string') {
            throw new Error('Invalid Post ID');
        }
            const comment = await this.commentService.createComment({
                content,
                userId: req.user?.id,postId
            });

            return res.status(201).json({
                message: 'Comment created successfully',
                success: true,
                data: comment
            });
        } catch (error) {
            next(error);
        }
    };

    getPostComments = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { postId } = req.params;

            if (!postId || typeof postId !== 'string') {
                throw new Error('Invalid Post ID');
            }

            const comments = await this.commentService.getPostComments(postId);

            return res.status(200).json({
                message: 'Comments retrieved successfully',
                success: true,
                data: comments
            });
        } catch (error) {
            next(error);
        }
    };

    getSingleComment = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { commentId } = req.params;

            if (!commentId || typeof commentId !== 'string') {
                throw new Error('Invalid Comment ID');
            }

            const comment = await this.commentService.getSingleComment(commentId);

            return res.status(200).json({
                message: 'Comment retrieved successfully',
                success: true,
                data: comment
            });
        } catch (error) {
            next(error);
        }
    };

    updateComment = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { commentId } = req.params;

            if (!commentId || typeof commentId !== 'string') {
                throw new Error('Invalid Comment ID');
            }

            const comment = await this.commentService.updateComment(
                commentId,
                req.user?.id,
                req.body.content
            );

            return res.status(200).json({
                message: 'Comment updated successfully',
                success: true,
                data: comment
            });
        } catch (error) {
            next(error);
        }
    };

    deleteComment = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { commentId } = req.params;

            if (!commentId || typeof commentId !== 'string') {
                throw new Error('Invalid Comment ID');
            }

            await this.commentService.deleteComment(commentId, req.user?.id);

            return res.status(200).json({
                message: 'Comment deleted successfully',
                success: true
            });
        } catch (error) {
            next(error);
        }
    };
}

export const commentController = new CommentController();
