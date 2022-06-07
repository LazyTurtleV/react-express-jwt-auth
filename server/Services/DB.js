const mysql = require('mysql2/promise');

class DBservice {
    async init () {
        this.connection = await mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PSWRD,
            database: process.env.DB_NAME,
        })
        console.log('DB connection successfully established.');
    }

    async closeConnection () {
        await this.connection.end();
        this.connection = undefined;
    }
}