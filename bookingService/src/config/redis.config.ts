import IORedis from 'ioredis';
import Redlock from 'redlock';
import { serverConfig } from '.';

export const redisClient = new IORedis(serverConfig.redis_server_url);

export const redlock = new Redlock([redisClient],{
    driftFactor: 0.01, // time in ms
    retryCount: 10,
    retryDelay: 200
});
