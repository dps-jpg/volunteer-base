const NewsModel = require('../models/news-model');
const fileService = require('../service/file-service');
const {Model} = require("mongoose");

class NewsService {
    async getNews(req) {
        const { limit, page, search } = req.query;
        const filter = {title: { $regex: search, $options: 'i' }};
        const totalCount = await NewsModel.countDocuments(filter);
        const news = await NewsModel.find(filter)
            .sort('-createdAt')
            .limit(limit)
            .skip(page * limit)
            .exec();

        return { totalCount, data: news }
    }

    async create(post) {
        return NewsModel.create(post);
    }

    async delete(id) {
        const post = await NewsModel.findById(id);
        const info = await NewsModel.deleteOne({ _id: id })
        fileService.deleteFiles(post.images);
        return info
    }

    async getPostById(id) {
        return NewsModel.findById(id);
    }

    async makeMain(id) {
        await NewsModel.updateOne({ isMain: true }, { isMain: false });
        await NewsModel.updateOne({ _id: id }, { isMain: true });
    }

    async getMainAndLastThreeNews() {
        const mainPost = await NewsModel.findOne({ isMain: true });
        const lastFour = await NewsModel.find()
            .sort('-createdAt')
            .limit(4)
            .exec();
        const filteredLastFour = lastFour.filter((item) => !item.equals(mainPost._id));
        const lastThree = filteredLastFour.slice(0, 3);
        return { main: mainPost, news: lastThree };
    }

}

module.exports = new NewsService()
