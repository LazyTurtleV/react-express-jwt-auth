const UserService = require("../Services/UserService");
const { convertDaysToMs } = require("../Utils/time");

class UserController {
    async register(req, res, next) {
        try {
            const { email, password } = req.body;
            const userData = await UserService.register(email, password);

            res.cookie('refToken', userData.refreshToken, { httpOnly: true, maxAge: convertDaysToMs(30) });
            return res.json(userData);
        } catch (e) {
            console.log('ERR WHILE REGISTERING USER', e);
        }
    }
    async login(req, res, next) {
        try {

        } catch (e) {

        }
    }
    async logout(req, res, next) {
        try {

        } catch (e) {

        }
    }
    async activate(req, res, next) {
        try {

        } catch (e) {

        }
    }
    async refresh(req, res, next) {
        try {

        } catch (e) {

        }
    }
    async getUserData(req, res, next) {
        try {
            res.json([1, 25])
        } catch (e) {

        }
    }
}

module.exports = new UserController();