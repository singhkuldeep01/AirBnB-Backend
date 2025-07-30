
import dotenv from 'dotenv';
dotenv.config();

type ServerConfig = {
    port: number;
    env: string;
}

type DatabaseConfig = {
    DB_USER: string;
    DB_PASSWORD: string;
    DB_HOST: string;
    DB_NAME: string;
}

export const serverConfig: ServerConfig = {
    port: Number(process.env.PORT) || 3000, // Default to 3000 if PORT is not set
    env: process.env.NODE_ENV || 'development',
}

export const databaseConfig: DatabaseConfig = {
    DB_USER: process.env.DB_USER || 'root',
    DB_PASSWORD: process.env.DB_PASSWORD || '',
    DB_HOST: process.env.DB_HOST || 'localhost',
    DB_NAME: process.env.DB_NAME || 'airbnbDB',
}