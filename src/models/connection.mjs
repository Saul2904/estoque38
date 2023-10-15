import Pool from 'pg-pool';
import dotenv from "dotenv";

//dotenv.config({path: '..//.env'})

const connection = new Pool({
    host: process.env.PG_HOST,
    database: process.env.PG_DB,
    port: process.env.PG_PORT,
    user: process.env.PG_USER,
    password: process.env.PG_PASSWORD,
    max: 20,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000,
});

export default connection;