import {s3CloudProvider} from "../../pkg/cloud/s3.cloud.js"
import { env } from "../config/env.js"


export const s3Cloud = new s3CloudProvider({
    region: env.S3.region,
    accessKeyId: env.S3.accesskey,
    secretAccessKey: env.S3.secretAceeskey,
    bucketName : env.S3.bucketname

})