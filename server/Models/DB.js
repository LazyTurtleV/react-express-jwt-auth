const mysql = require('mysql2/promise');


class DBModel {
    static number = 0;

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

    //determines if the email  exists on DB
    async validateEmail(email) {
        if (!this.connection) await this.init();

        const query = `call spiValidateEmail(?)`;
        const [ r, f ] = await this.connection.query(query, [email]);

        //some weird response structure determines this magic code
        const rowName = f[0][0].name;
        return !!r[0][0][rowName];
    }

    async updateUserRefreshToken(userId, refreshToken) {
        if (!this.connection) await this.init();

        const query = `call spiUpdateUserToken(?, ?)`;
        await this.connection.query(query, [userId, refreshToken]);
    }

    async createUser(email, password, activationLink) {
        if (!this.connection) await this.init();

        const query = 'call spiCreateUser(?, ?, ?)';
        await this.connection.query(query, [email, password, activationLink]);
    }

    async closeConnection () {
        await this.connection.end();
        this.connection = undefined;
    }
}

module.exports = new DBModel();