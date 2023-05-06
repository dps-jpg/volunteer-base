const eventService = require('../service/event-service');
const fileService = require('../service/file-service');

class EventController {
    async getEvents(req, res, next) {
        try {
            const news = await eventService.getEvents(req);

            res.json(news);
        } catch (e) {
            next();
        }
    }

    async getEventById(req, res, next) {
        try {
            const event = await eventService.getEventById(req.params.id);

            res.json(event);
        } catch (e) {
            next()
        }
    }

    async create(req, res, next) {
        try {
            const {body, files} = req;
            const images = fileService.saveFiles(files);
            await eventService.create({ ...body, images });
            res.status(200).send();
        } catch (e) {
            next()
        }
    }

    async delete(req, res,next) {
        try {
            const info = await eventService.delete(req.params.id);

            res.status(200).send()
        } catch {
            next()
        }
    }
}

module.exports = new EventController();
