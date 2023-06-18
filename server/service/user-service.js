const bcrypt = require('bcrypt');
const XLSX = require('xlsx');
const path = require('path');
const { nanoid } = require("nanoid");

const UserModel = require('../models/user-model');
const UserDto = require('../dtos/user-dto');
const tokenService = require('./token-service');
const fileService = require('./file-service');
const ApiError = require('../exceptions/api-error');

class UserService {
    async registration(body) {
        const { email, password } = body;
        const candidate = await UserModel.findOne({ email });
        if (candidate) {
            throw ApiError.BadRequest(`Пользователь с почтовым адресом ${email} уже существует`);
        }
        const hashPassword = await bcrypt.hash(password, 3);
        const user = await UserModel.create({ ...body, password: hashPassword });

        const userDto = new UserDto(user);
        const tokens = tokenService.generateTokens({ ...userDto });

        return { ...tokens, user: userDto };
    }

    async login(email, password) {
        const user = await UserModel.findOne({ email });
        if (!user) {
            throw ApiError.BadRequest(`Пользователь с почтовым адресом ${email} не найден`);
        }
        const isPassEquals = await bcrypt.compare(password, user.password);
        if (!isPassEquals) {
            throw ApiError.BadRequest('Неверный пароль');
        }
        const userDto = new UserDto(user);
        const tokens = tokenService.generateTokens({ ...userDto });
        return { ...tokens, user: userDto };
    }

    async loginAdmin(email, password) {
        const user = await UserModel.findOne({ email });
        if (!user) {
            throw ApiError.BadRequest(`Пользователь с почтовым адресом ${email} не найден`);
        }
        const isPassEquals = await bcrypt.compare(password, user.password);
        if (!isPassEquals) {
            throw ApiError.BadRequest('Неверный пароль');
        }
        if (user.role !== "ADMIN") {
            throw ApiError.ForbiddenError();
        }

        const userDto = new UserDto(user);
        const tokens = tokenService.generateTokens({ ...userDto });
        return { ...tokens, user: userDto };
    }

    async getAllUsers(req) {
        const { page, limit, search } = req.query;
        const filter = { $or: [{secondName: {$regex: search, $options: 'i'}}, { email: {$regex: search, $options: 'i'}}, { rank: {$regex: search, $options: 'i'} }]};
        const totalCount = await  UserModel.countDocuments(filter);
        const users = await UserModel.find(filter)
            .sort('secondName')
            .select('-password -role')
            .limit(limit)
            .skip(page * limit)
            .exec();
        return { data: users, totalCount };
    }

    async getUserById(id) {
        const user = await UserModel.findById(id)
        return user;
    }

    async downloadUsers() {
        const users = await UserModel.find().exec();
        const arr = users.map((item) => ({
            id: item._id,
            email: item.email,
            firstName: item.firstName,
            secondName: item.secondName,
            middleMame: item.middleMame,
            city: item.city,
            hours: item.hours,
            rank: item.rank,
            phone: item.phone,
        }))

        const worksheet = XLSX.utils.json_to_sheet(arr);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Users');
        const fileName = `users-${nanoid(8)}.xlsx`
        XLSX.writeFile(workbook, path.resolve(__dirname, '../public', fileName));

        setTimeout(() => {
            fileService.deleteFiles([fileName])
        }, 5000)
        fileService.deleteFiles([])
        return fileName;
    }
}

module.exports = new UserService();
