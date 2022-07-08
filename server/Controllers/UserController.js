const { validationResult } = require('express-validator');

const UserService = require("../Services/UserService");
const { convertDaysToMs } = require("../Utils/time");
const { error: HttpError } = require('../exceptions/http-error');

class UserController {
    async register(req, res, next) {
        try {
            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                throw HttpError.badRequest("Validation error", errors.array());
            }

            const { email, password } = req.body;
            const userData = await UserService.register(email, password);

            res.cookie('refToken', userData.refreshToken, { httpOnly: true, maxAge: convertDaysToMs(30) });
            return res.json(userData);
        } catch (e) {
            next(e);
        }
    }
    async login(req, res, next) {
        try {
            const { email, password } = req.body;
            const userData = await UserService.login(email, password);

            res.cookie('refToken', userData.refreshToken, { httpOnly: true, maxAge: convertDaysToMs(30) });
            return res.json(userData);
        } catch (e) {
            next(e);
        }
    }
    async logout(req, res, next) {
        try {

        } catch (e) {
            next(e);
        }
    }
    async activate(req, res, next) {
        try {
            const link = req.params.link;
            await UserService.activate(link);

            return res.redirect(process.env.CLIENT_URL);
        } catch (e) {
            next(e);
        }
    }
    async refresh(req, res, next) {
        try {

        } catch (e) {
            next(e);
        }
    }
    async getUserData(req, res, next) {
        try {
            res.json([1, 25])
        } catch (e) {
            next(e);
        }
    }
}

module.exports = new UserController();