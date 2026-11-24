import { z } from 'zod'
import { config } from 'dotenv'
config()

const schema = z.object ({
 port: z.string().default('3000'),
  host: z.string().default('localhost'),
  EMAIL_USER : z.string(),
  EMAIL_PASS : z.string(),
  GOOGLE_WEB_CLIENT_ID : z.string(),
  REDIS_HOST : z.string(),
  REDIS_PORT : z.string().default('6379'),
  REDIS_PASSWORD : z.string().optional(),
  JWT_SECRET : z.string(),
  JWT_REFRESH_SECRET: z.string(),
  MONGODB_URI : z.string(),
  MAILJET_API_KEY : z.string(),
  MAILJET_API_SECRET : z.string(),
  MAILJET_FROM_EMAIL : z.string(),
  MAILJET_FROM_NAME : z.string(),
  S3_BUCKET_NAME:z.string(),
  S3_ACCESS_KEY:z.string(),
  S3_SECRET_ACESS_KEY:z.string(),
  S3_REGION:z.string()
})

const parsed = schema.parse(process.env)

export const env = {
 db : {

    url: parsed.MONGODB_URI

 },
redis : {
  host : parsed.REDIS_HOST,
  port : Number(parsed.REDIS_PORT),
  password : parsed.REDIS_PASSWORD || ''
},



mailjet :{
  apiKey : parsed.MAILJET_API_KEY,
  apiSecret : parsed.MAILJET_API_SECRET,
  fromEmail : parsed.MAILJET_FROM_EMAIL,
  fromName : parsed.MAILJET_FROM_NAME
},
jwt:{
  secret : parsed.JWT_SECRET,
   refreshSecret: parsed.JWT_REFRESH_SECRET

},
google : {
 
    WebclientId : parsed.GOOGLE_WEB_CLIENT_ID
  
},
S3 :{
  bucketname :parsed.S3_BUCKET_NAME,
  accesskey: parsed.S3_ACCESS_KEY,
  secretAceeskey : parsed.S3_SECRET_ACESS_KEY,
  region : parsed.S3_REGION
}

}