const userService = require('../service/user-service');

class UserController {
    async registration(req, res, next) {
        try {
            const userData = await userService.registration(req.body);

            return res.json(userData);
        } catch (e) {
            next(e);
        }
    }

    async login(req, res, next) {
        try {
            const { email, password } = req.body;
            const userData = await userService.login(email, password);

            return res.json(userData);
        } catch (e) {
            next(e);
        }
    }

    async loginAdmin(req, res, next) {
        try {
            const { email, password } = req.body;
            const userData = await userService.loginAdmin(email, password);

            return res.json(userData);
        } catch (e) {
            next(e);
        }
    }

    async activate(req, res, next) {
        try {

        } catch (e) {
            next(e);
        }
    }

    async getUsers(req, res, next) {
        try {
            const users = await userService.getAllUsers(req)
            res.json(users);
        } catch (e) {
            next(e);
        }
    }

    async getUserById(req, res, next) {
        try {
            const user = await userService.getUserById(req.params.id)
            res.json(user);
        } catch (e) {
            next(e);
        }
    }

    async getMe(req, res, next) {
        try {
            const user = await userService.getUserById(req.user.id)
            res.json(user);
        } catch (e) {
            next(e);
        }
    }

    async downloadUsers(req, res, next) {
        try {
            const file = await userService.downloadUsers()

            res.json(file);
        } catch (e) {
            next(e);
        }
    }
}

module.exports = new UserController();
