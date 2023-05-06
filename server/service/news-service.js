const NewsModel = require('../models/news-model');
const fileService = require('../service/file-service');

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

}

module.exports = new NewsService()
