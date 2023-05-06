const newsService = require('../service/news-service');
const fileService = require('../service/file-service');

class NewsController {
    async getNews(req, res, next) {
        try {
            const news = await newsService.getNews(req);

            res.json(news);
        } catch (e) {
            next();
        }
    }

    async create(req, res, next) {
        try {
            const images = await fileService.saveFiles(req.files);
            await newsService.create({ ...req.body, images });

            res.status(200).send();
        } catch (e) {
            next()
        }
    }

    async delete(req, res, next) {
        try {
            const info = await newsService.delete(req.params.id);
            res.json(info);
        } catch (e) {
            next()
        }
    }

    async getPostById(req, res, next) {
        try {
            const post = await newsService.getPostById(req.params.id);

            res.json(post);
        } catch (e) {
            next()
        }
    }

}

module.exports = new NewsController()
