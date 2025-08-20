import dotenv from 'dotenv';

function loadEnv(){
    dotenv.config(); // Load environment variables from .env file
}

loadEnv(); // Call the function to load environment variables

type ServerConfig = {
    port: number;
    env: string;
    redis_server_url: string;
    ttl: number;
}


export const serverConfig: ServerConfig = {
    port: Number(process.env.PORT) || 3001, // Default to 3001 if PORT is not set
    env: process.env.NODE_ENV || 'development',
    redis_server_url: process.env.REDIS_SERVER_URL || 'redis://localhost:6379',
    ttl: Number(process.env.TTL) || 60000 * 10,
}