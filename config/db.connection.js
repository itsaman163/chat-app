import knex from "knex";
import { config } from "./index.js";

const db = knex({
    client: 'mysql2',
    debug: false, 
    //version: '5.7',
    connection: {
        host : config.db_host,
        port : config.db_port,
        user : config.db_user,
        password : config.db_password,
        database : config.db_database
    }
});
export default db;