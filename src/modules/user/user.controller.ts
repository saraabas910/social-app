import type { Request, Response, NextFunction } from 'express';
import userService from './user.service.js';
import followService from './follow.service.js';
export class UserController {

    getProfile = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const user = await userService.getProfile(req.user!.id as string);

            res.status(200).json({
                message: 'Profile retrieved successfully',
                user
            });

        } catch (error) {
            next(error);
        }
    };
     updateProfile = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const updatedUser = await userService.updateProfile(
                req.user!.id as string,
                req.body
            );

            return res.status(200).json({
                message: 'Profile updated successfully',
                user: updatedUser
            });
        } catch (error) {
            next(error);
        }
    };
    follow = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await followService.follow(
            req.user!.id as string,
            req.params.id as string
        );

        return res.status(200).json({
            message: 'Followed successfully',
            result
        });
    } catch (error) {
        next(error);
    }
};

unfollow = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await followService.unfollow(
            req.user!.id as string,
            req.params.id as string
        );

        return res.status(200).json({
            message: 'Unfollowed successfully',
            result
        });
    } catch (error) {
        next(error);
    }
};
searchUsers = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const users = await userService.searchUsers(
            req.query.search as string
        );

        return res.status(200).json({
            message: 'Users retrieved successfully',
            users
        });
    } catch (error) {
        next(error);
    }
};


    uploadProfilePicture = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        try {
            if (!req.file) {
                throw new Error('Profile picture is required');
            }

            await userService.uploadProfilePicture(
                req.file,
                req.user!.id as string
            );

            return res.status(200).json({
                message: 'Profile picture uploaded successfully'
            });

        } catch (error) {
            next(error);
        }
    };
    getUrl = async(req: Request,
        res: Response,
        next: NextFunction)=>{

        try {

       const { mimetype, originalname } = req.body
       const userId = req.user?.id; 
       const url = await userService.generateUrl({ mimetype, originalname }, userId)
         res.json({message:"succeess",url})

        }catch(error){
            next(error)

        }

    }

}

export default new UserController();
