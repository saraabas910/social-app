import { Router } from 'express';
import { commentController } from './controller/comment.controller.js';
import { guard } from '../../lib/auth/guard.js';

const router = Router();

router.post('/:postId', guard, commentController.createComment);
router.get('/post/:postId', guard, commentController.getPostComments);
router.get('/:commentId', guard, commentController.getSingleComment);
router.patch('/:commentId', guard, commentController.updateComment);
router.delete('/:commentId', guard, commentController.deleteComment);

export default router;