import dotenv from 'dotenv';

dotenv.config();


class Env {
    PORT: string | undefined;
    DB_HOST: string;
    DB_NAME: string;
    DB_USER: string;
    DB_PASSWORD: string;
    JWT_KEY: string;
    constructor() {
        this.PORT = process.env.PORT;
        
        this.DB_HOST = process.env.DB_HOST!;
        this.DB_NAME = process.env.DB_NAME!;
        this.DB_USER = process.env.DB_USER!;
        this.DB_PASSWORD = process.env.DB_PASSWORD!;

        this.JWT_KEY = process.env.JWT_KEY!;
    }
}

export default new Env();