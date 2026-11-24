import { Router } from 'express';
import { guard } from '../../lib/auth/guard.js';
import userController from './user.controller.js';
import { multerUploadSingle } from '../../lib/media/multer.js';

const router = Router();

router.get('/profile', guard, userController.getProfile);

router.patch('/profile', guard, userController.updateProfile);
router.post('/:id/follow', guard, userController.follow);

router.delete('/:id/follow', guard, userController.unfollow);
router.get('/search', guard, userController.searchUsers);
router.patch(
    '/profile-picture',
    guard,
    multerUploadSingle('profilePicture'),
    userController.uploadProfilePicture
);
router.post('/pic-url',guard,userController.getUrl )
export default router;