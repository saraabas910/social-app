import { ICloudProvider } from "./cloud.interface.js";
import { S3Client}from "@aws-sdk/client-s3"
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import {
    DeleteObjectCommand,
    GetObjectCommand,
    PutObjectCommand,
    
} from"@aws-sdk/client-s3"


export interface ICloudconfig {
    region:string,
    accessKeyId:string;
    secretAccessKey:string
    bucketName :string

}
export class s3CloudProvider implements ICloudProvider {

    private client:S3Client;
    private readonly bucketName:string;
    constructor(config:ICloudconfig){

      this.client = new S3Client({
    region: config.region,
    credentials: {
        accessKeyId: config.accessKeyId,
        secretAccessKey: config.secretAccessKey
    }
});
      this.bucketName = config.bucketName
         

    }





    
    async uploadfile(file: Express.Multer.File, path: string): Promise<string> {
       const command = new PutObjectCommand({

        Bucket: this.bucketName,
        Body :file.buffer,
        ContentType :file.mimetype,
        Key:`${path}/${new Date().toISOString()}-${file.originalname}`


            
        })

        await this.client.send(command)
        return command.input.Key as string ;
    }


    async deletefile(key: string): Promise<void> {
       const command = new DeleteObjectCommand({
        Bucket: this.bucketName,
        Key:key
       })

       await this.client.send(command)
    }
   async getfile(key: string): Promise<Buffer> {
        const command = new GetObjectCommand({
            Bucket:this.bucketName,
            Key:key
        })

        const response = await this.client.send(command);
        if (!response.Body) {
            throw new Error(`Object not found: ${key}`);
        }

        return Buffer.from(await response.Body.transformToByteArray());
    }
  async generatePresigneedUrl(file: Partial<Express.Multer.File>, path: string){

    const command = new PutObjectCommand({
       Bucket : this.bucketName,
       ContentType:file.mimetype,
       Key : `${path}/${file.originalname}`
    })
    return getSignedUrl(this.client, command, { expiresIn: 60 });
  }
}
   