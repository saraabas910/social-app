import { Router } from 'express';
import { postController } from './controller/post.controller.js';
import { guard } from '../../lib/auth/guard.js';

const router = Router();

router.post('/', guard, postController.createPost);

router.get('/', guard, postController.getAllPosts);

router.get('/:postId', guard, postController.getSinglePost);

router.patch('/:postId', guard, postController.updatePost);

router.delete('/:postId', guard, postController.deletePost);

export default router;