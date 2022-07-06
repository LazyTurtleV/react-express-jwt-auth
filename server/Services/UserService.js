const bcrypt = require('bcrypt');
const uuid = require('uuid'); 

const dbModel = require('../Models/DB');
const mailService = require('./MailService');
const tokenService = require('./TockenService');
class UserService {
    async register(email, password) {
        const absent = await dbModel.validateEmail(email);
        if (!absent) {
            throw new Error('The email already exists');
        }

        const hashedPassword = await bcrypt.hash(password, 3);
        const activationLink = uuid.v4();
        const userId = await dbModel.createUser(email, hashedPassword, activationLink);
        
        await mailService.sendActivationMail(email, activationLink);
        const tokens = tokenService.generateToken({ email })
        
        tokenService.updateRefreshToken(userId, tokens.refreshToken);

        return {
            ...tokens,
            user: {
                userId
            }
        }
    }
}

module.exports = new UserService();