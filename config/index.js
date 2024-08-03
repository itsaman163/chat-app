/**
 * make all config variables here 
 */
import dotenv from "dotenv";
dotenv.config();

export const config = {
    port: process.env.PORT || '5000',
    db_port: process.env.DB_PORT || '',
    db_host: process.env.DB_HOST || 'localhost',
    db_user: process.env.DB_USERNAME || 'root',
    db_password: process.env.DB_PASSWORD || '',
    db_database: process.env.DB_DATABASE || 'crud',
    db_dialect: process.env.DB_DIALECT || 'mysql',
    db_debug: process.env.DB_DEBUG || false
    
};