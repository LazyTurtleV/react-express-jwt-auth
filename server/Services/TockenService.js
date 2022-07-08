const jwt = require('jsonwebtoken');
const DB = require('../Models/DB');
class TockenService {
    generateToken(payload) {
        const accessToken = jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: '15m' });
        const refreshToken = jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: '30d' });

        return {
            accessToken,
            refreshToken
        }
    }

    async updateRefreshToken(userId, refreshToken) {
        try {
            await DB.updateUserRefreshToken(userId, refreshToken);
        } catch (e) {
            console.log('SOME ERR OCCURED WHILE UPDATING TOKEN', e);
        }
    }

    async deleteToken(token) {
        return DB.removeRefreshToken(token);
    }
}

module.exports = new TockenService();