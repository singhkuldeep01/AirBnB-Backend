export type ServerConfig = {
    port: number;
    env: string;
}

export type DatabaseConfig = {
    DB_USER: string;
    DB_PASSWORD: string;
    DB_HOST: string;
    DB_NAME: string;
}

// You can add more server-related types here
export type LogLevel = 'error' | 'warn' | 'info' | 'debug';

export type AppEnvironment = 'development' | 'production' | 'test';
