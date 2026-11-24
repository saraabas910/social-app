import { RedisCache } from '../../pkg/cache/redis.js'
import { env } from '../config/env.js'

export const cacheProvider = new RedisCache({
    host: env.redis.host,
    port: env.redis.port,
    password: env.redis.password || ''
});