import multer from "multer";
export interface ICloudProvider{
    uploadfile(file: Express.Multer.File, path:string):Promise<string>;


    deletefile(key:any):Promise<void>;



    getfile(key:any):Promise<Buffer>

    generatePresigneedUrl(file: Partial<Express.Multer.File>, path: string):Promise<string>
}