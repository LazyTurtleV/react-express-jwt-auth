const mysql = require('mysql2/promise');

class DBModel {
    async init () {
        try {
            this.connection = await mysql.createConnection({
                host: process.env.DB_HOST,
                user: process.env.DB_USER,
                password: process.env.DB_PSWRD,
                database: process.env.DB_NAME,
            })
            console.log('DB connection successfully established.');
        } catch (e) {
            console.error('Error connecting to MySQL', e);
        }
    }

    constructor(){
        this.init();
    }

    //determines if the email  exists on DB
    async validateEmail(email) {
        if (!this.connection) await this.init();

        const query = `call spiValidateEmail(?)`;
        const [ r, f ] = await this.connection.query(query, [email]);

        //some weird response structure determines this magic code
        const rowName = f[0][0].name;
        return !!r[0][0][rowName];
    }

    async createUser(email, password) {
        if (!this.connection) await this.init();

        const query = 'call spiCreateUser(?, ?)';
        await this.connection.query(query, [email, password]);
    }

    async closeConnection () {
        await this.connection.end();
        this.connection = undefined;
    }
}

module.exports = new DBModel();