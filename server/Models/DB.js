const mysql = require('mysql2/promise');


class DBModel {
    static number = 0;

    getFieldValue(mysqlResponse) {
        const [r, f] = mysqlResponse;

        //some weird response structure determines this magic code
        const rowName = f[0][0].name;
        return r[0][0][rowName];
    }

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
        const res = await this.connection.query(query, [email]);

        return !!this.getFieldValue(res);
    }

    async getUser(email) {
        const query = `call spiGetUser(?)`;
        const res = await this.connection.query(query, [email]);

        return res[0][0][0];
    }

    async updateUserRefreshToken(userId, refreshToken) {
        if (!this.connection) await this.init();

        const query = `call spiUpdateUserToken(?, ?)`;
        await this.connection.query(query, [userId, refreshToken]);
    }

    async removeRefreshToken(token) {
        const query = `call spiRemoveToken(?)`;
        await this.connection.query(query, [token]);
    }

    async createUser(email, password, activationLink) {
        if (!this.connection) await this.init();

        const query = 'call spiCreateUser(?, ?, ?)';
        const res = await this.connection.query(query, [email, password, activationLink]);
        
        return this.getFieldValue(res);
    }

    async closeConnection () {
        await this.connection.end();
        this.connection = undefined;
    }

    async activateUser(activationLink) {
        const query = 'call spiActivateUser(?)';
        const res = await this.connection.query(query, [activationLink]);
    }
}

module.exports = new DBModel();