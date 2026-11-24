import type { Request, Response, NextFunction } from 'express';
import { postService } from '../service/post.service.js';

class PostController {

    createPost = async (req: Request, res: Response, next: NextFunction) => {
        try {
             const content= req.body.content
                const userId= req.user?.id

               const post = await postService.createPost({
                content,
                userId
            });

            return res.status(201).json({
                message: 'Post created successfully',
                success: true,
                data: post
            });
        } catch (error) {
            next(error);
        }

      
};


  getAllPosts = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const posts = await postService.getAllPosts(req.user?.id);

        return res.status(200).json({
            message: 'Posts fetched successfully',
            success: true,
            data: posts
        });
    } catch (error) {
        next(error);
    }





    };
getSinglePost = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { postId } = req.params;
        if (!postId || typeof postId !== 'string') {
    throw new Error('Invalid Post ID');
         }
        if (!postId ) {
            throw new Error('Invalid Post ID');
        }

        const post = await postService.getSinglePost(postId  );

        return res.status(200).json({
            message: 'Post fetched successfully',
            success: true,
            data: post
        });
    } catch (error) {
        next(error);
    }
};



updatePost = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { postId } = req.params;

        if (!postId || typeof postId !== 'string') {
            throw new Error('Invalid Post ID');
        }

        const post = await postService.updatePost(
            postId,
            req.user?.id,
            req.body.content
        );

        return res.status(200).json({
            message: 'Post updated successfully',
            success: true,
            data: post
        });
    } catch (error) {
        next(error);
    }
};

deletePost = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { postId } = req.params;

        if (!postId || typeof postId !== 'string') {
            throw new Error('Invalid Post ID');
        }

        const post = await postService.deletePost(
            postId,
            req.user?.id
        );

        return res.status(200).json({
            message: 'Post deleted successfully',
            success: true,
            data: post
        });
    } catch (error) {
        next(error);
    }
};


}

export const postController = new PostController();