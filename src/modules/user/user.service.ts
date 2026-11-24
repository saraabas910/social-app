import * as fs from 'node:fs';
import { userRepository } from './user.repository.js';
import { updateProfileDto } from '../auth/dto/dto.js';
import { ICloudProvider } from '../../pkg/cloud/cloud.interface.js';
import { s3Cloud } from '../../lib/cloud/init.js';
export class UserService {

    private readonly cloudProvider: ICloudProvider = s3Cloud;
    private readonly userRepository = userRepository;

    getProfile = async (id: string) => {
    const user = await userRepository.findByIdWithoutPassword(id);
        if (!user) {
            throw new Error('User not found');
        }

        return user;
    };
    updateProfile = async (id: string, data: updateProfileDto) => {

        const updatedUser = await userRepository.update(
            { _id: id },
            data,
            { new: true }
        );

        if (!updatedUser) {
            throw new Error('User not found');
        }

        return updatedUser;
    };
    searchUsers = async (search: string) => {
    return userRepository.searchUsers(search);
};
 uploadProfilePicture = async (
        file: Express.Multer.File,
        userId: string
    ): Promise<void> => {

        file.buffer = fs.readFileSync(file.path);

        const key: string = await this.cloudProvider.uploadfile(
            file,
            `users/${userId}`
        );

        await this.userRepository.update(
            { _id: userId },
            { profilePicturePath: key }
        );

    };


    generateUrl= async (file :Partial<Express.Multer.File>, userId:string)=>{

      return await this.cloudProvider.generatePresigneedUrl(file , `users/${userId}`)

    }
}

export default new UserService();
