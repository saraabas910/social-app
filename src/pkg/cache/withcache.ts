import type { Request, Response, NextFunction } from 'express';
import {cacheProvider} from '../../lib/cache/init.js'

async function withCache(ttl =3600){

    return async function(req:Request, res:Response, next:NextFunction) {

        let key =`${req.method}:${req.originalUrl}`;
         const cached = await cacheProvider.get(key);
         if (cached) {
           res.setHeader('X-Cache', 'HIT');
            return res.json(JSON.parse(cached));
         }
        
          const originalJson = res.json.bind(res);
         res.json =  (body) => {
           if(res.statusCode>= 200 && res.statusCode<300 ){
             //chache first 
             cacheProvider.set(key,JSON.stringify(body),ttl);
            //then send the response
            res.setHeader('X-Cache', 'MISS');
           
          }
           return originalJson(body);
        }
         next();

         

    }
}